'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer_repository');
const md5 = require('md5');


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
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(200).send({
            message: 'Sucess'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao"
        });
    }


};