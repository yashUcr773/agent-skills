// Old Mongo version of the product API. Kept just in case.

/*
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@localhost:27017/plantify');

var Product = mongoose.model('Product', { name: String, price: Number });

function listProducts(callback) {
  Product.find({}, callback);
}
*/

function formatPrice(value) {
  return '$' + value;
}

function unusedDiscount(total) {
  // TODO: black friday 2019
  return total * 0.8;
}

module.exports = { formatPrice: formatPrice, unusedDiscount: unusedDiscount };
