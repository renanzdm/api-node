'use-strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().then(X => {
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


exports.get = (req, res, next) => {

    Product.find({ active: true }, 'title slug price').then(data => {
        res.status(201).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};

exports.getBySlug = (req, res, next) => {

    Product.findOne({ slug: req.params.slug, active: true }, 'title slug price description tags').then(data => {
        res.status(201).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};
exports.getById = (req, res, next) => {

    Product.findById({ slug: req.params.id }).then(data => {
        res.status(201).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};


exports.getByTag = (req, res, next) => {

    Product.find({ tags:req.params.tag }, 'title slug price description tags').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
$set:{
    title:req.body.title,
    description: req.body.description,
    price:req.body.price
}
    }).then(X => {
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
    Product.findOneAndDelete(req.body.id).then(X => {
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