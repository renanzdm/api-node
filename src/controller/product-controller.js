'use-strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const { report } = require('../routes/index-route');




exports.get = (req, res, next) => {
    repository.get().then(data => {
        res.status(201).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};

exports.getBySlug = (req, res, next) => {

    repository.getBySlug(req.params.slug)
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });

};
exports.getById = (req, res, next) => {

    repository.getById(req.params.id).then(data => {
        res.status(201).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};


exports.getByTag = (req, res, next) => {

    repository.getByTag(req.params.tag).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};

exports.put = (req, res, next) => {
   repository.update(req.params.id, req.body)
   .then(X => {
        res.status(200).send({
            message: 'Atualizado'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            error: e
        });
    });
};


exports.delete = (req, res, next) => {
    repository.delete(req.params.id)
    .then(X => {
        res.status(200).send({
            message: 'Removiddo'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            error: e
        });
    });
};

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    repository.
    create(req.body)
    .then(X => {
        res.status(201).send({
            message: 'Sucess'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha',
            error: e
        });
    });

};