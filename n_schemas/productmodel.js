const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    name: { type: String, required: true },
    layout: { type: String, required: true },
    description: { type: String, required: true }

})
const ProductModel = new mongoose.model('Product', productSchema);

module.exports = { ProductModel };