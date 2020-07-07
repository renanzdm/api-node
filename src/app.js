'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();


//caregga models
const Product = require('./models/product_model');


mongoose.connect('mongodb+srv://renanzdm:404345682@nodestore.jqmty.mongodb.net/teste?retryWrites=true&w=majority',{ useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true});
//carega routes
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.use('/', indexRoutes);
app.use('/products', productRoutes);


module.exports = app;