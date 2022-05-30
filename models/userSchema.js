const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: { type: String, required: true, enum: ["ADMIN", "CUSTOMER", "VENDOR"] }
    // profilePic:{type:String}
},
    { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel, userSchema };



