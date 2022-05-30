const mongoose = require('mongoose');
const { USERS } = require('../constants/users');
const { userSchema } = require('../models/userSchema');
const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ],
    role: { type: String, default: "customer" }

})

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = { CustomerModel };