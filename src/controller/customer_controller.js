'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer_repository');
const md5 = require('md5');
const emailservice = require('../services/email_service');
const authService = require('../services/auth_services');



exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O email deve ser valido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:['user']
        });
        emailservice.send(req.body.email, 'Bem vindo', global.EMAIL_TMPL.replace('{0}', req.body.name));


        res.status(200).send({
            message: 'Sucess'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao"
        });
    }


};

exports.authenticate = async (req, res, next) => {

    try {

        const customer = await repository.authenticate({

            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!customer) {
            res.status(404).send({
                message:"Usuario ou sneha invalidos"
            });
            return;
        }

        const token = await authService.generateToken({ email: customer.email, name: customer.name ,id:customer._id,roles:customer.roles});

        res.status(200).send({
           token:token,
           data:{
               email:customer.email,
               name:customer.name
           }
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao"
        });
    }


};
exports.refreshToken = async (req, res, next) => {

    try {
        const token = await req.body.token || req.query.token|| req.headers["x-access-token"];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);
        if (!customer) {
            res.status(404).send({
                message:"Usuario não encontrado"
            });
            return;
        }

        const tokenData = await authService.generateToken({ email: customer.email, name: customer.name ,id:customer._id,roles:customer.roles});

        res.status(200).send({
           token:token,
           data:{
               email:customer.email,
               name:customer.name
           }
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao"
        });
    }


};