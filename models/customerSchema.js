const mongoose=require('mongoose')
const customerSchema=mongoose.Schema({
    CuctomerID:{type:mongoose.Schema.Types.ObjectId,
        required:true},
    customerEmail:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
})
const Customermodel=new mongoose.model('Customer',customerSchema);
