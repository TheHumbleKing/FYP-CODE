const mongoose=require('mongoose')
const chatSchema=mongoose.Schema({
    ProductID:{type:mongoose.Schema.Types.ObjectId,
        ref:'Product'},
    VendorID:{type:mongoose.Schema.Types.ObjectId
        ,required:true,
        ref:'Vendor'},
    CustomerID:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'},
    DownloadChat:{type:String}

})
const Chatmodel=new mongoose.model('Chat',chatSchema);