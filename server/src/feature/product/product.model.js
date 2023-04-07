const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    id: { type: Number },
    brand: { type: String },
    title: { type: String },
    color: { type: String },
    category: { type: String },
    is_stock: { type: String },
    price: { type: Number },
    actual_price: { type: Number },
    size: { type: String },
    images: { type: String },
    section: { type: String }
});

const ProductModel = model('product', productSchema);

module.exports = ProductModel;