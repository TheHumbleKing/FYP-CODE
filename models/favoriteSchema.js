const mongoose=require('mongoose')
const favoriteSchema=mongoose.Schema({
    ProductID:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    CustomerID:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},

})
const Favoritemodel=new mongoose.model('Favorite', favoriteSchema);