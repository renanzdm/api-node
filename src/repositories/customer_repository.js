
'use-strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Product.find({ active: true }, 'title slug price');
    return res;
}
exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();

}