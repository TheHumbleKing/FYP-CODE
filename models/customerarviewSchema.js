const mongoose=require('mongoose')
const customerarviewSchema=mongoose.Schema({
    CuctomerID:{type:mongoose.Schema.Types.ObjectId,
        required:true,ref:'Customer'},
    VendorID:{type:mongoose.Schema.Types.ObjectId,
        required:true,ref:'Vendor'},
    productID:{type:mongoose.Schema.Types.ObjectId,
        required:true,ref:'Product'},
})
const CustomerARmodel=new mongoose.model('Customer AR',customerarviewSchema);