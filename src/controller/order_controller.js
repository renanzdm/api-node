'use-strict';

const repository = require('../repositories/order_repository');
const guid = require('guid');


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
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(200).send({
            message: 'Sucess'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisicao",
            erro: error
        });
    }


};