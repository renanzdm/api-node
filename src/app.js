'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('./config');

const app = express();


//caregga models
const Product = require('./models/product_model');
const Customer = require('./models/customer');
const Order = require('./models/order');


mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
//carega routes
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');
const customerRoutes = require('./routes/customer_route');
const orderRoutes = require('./routes/order_route');

app.use(bodyParser.json({
    limit:'5m'
}));
app.use(bodyParser.urlencoded({ extended: false }));







app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);


module.exports = app;