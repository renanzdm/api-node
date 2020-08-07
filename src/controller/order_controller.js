'use-strict';

const repository = require('../repositories/order_repository');
const guid = require('guid');
const authService = require('../services/auth_services');



exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao",

        });
    }

};


exports.post = async (req, res, next) => {

    try {
        const token = await req.body.token || req.query.token|| req.headers["x-access-token"];
        const data = await authService.decodeToken(token);



        await repository.create({
            customer:data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Sucess'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao",
            erro: error
        });
    }


};