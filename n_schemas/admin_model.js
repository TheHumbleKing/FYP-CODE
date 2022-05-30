const mongoose = require('mongoose');
const { USERS } = require('../constants/users');
const { userSchema } = require('../models/userSchema');
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ],
    role: { type: String, default: "admin" }

})

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = { AdminModel };
