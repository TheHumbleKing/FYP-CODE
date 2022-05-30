// products

const mongoose = require('mongoose');
const { USERS } = require('../constants/users');
const { userSchema } = require('../models/userSchema');
const vendorSchema = new mongoose.Schema({
    ...userSchema.obj,
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ],
    role: { type: String, default: "vendor" }

})

const VendorModel = mongoose.model('Vendor', vendorSchema);

module.exports = { VendorModel };
