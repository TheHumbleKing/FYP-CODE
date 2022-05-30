const mongoose = require('mongoose')
// const { USERS } = require('../constants/users');
// const { userSchema } = require('../models/userSchema');
const vendorproductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productLayout: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    VendorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
})
const VendorProductmodel = mongoose.model('VendorProduct', vendorproductSchema);
module.exports = { VendorProductmodel };
