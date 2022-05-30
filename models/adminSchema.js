const mongoose=require('mongoose');
const { boolean } = require('webidl-conversions');
const adminSchema=mongoose.Schema({
    AdminID:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
    FeedBackID:{type:mongoose.Schema.Types.ObjectId,
        ref:'Feedback'},
    adminEmail:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
    AdminStatus:{type:boolean,
    ref:'User'}
    
 
})
const Adminmodel=new mongoose.model('Admin',adminSchema);