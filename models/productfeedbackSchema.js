const mongoose=require('mongoose')
const productfeedbackSchema = Schema({
    ProductID:{type:mongoose.Schema.Types.ObjectId,
      ref:'Product'},
    
  })
  const ProductFeedbackmodel=new mongoose.model('ProductFeedback',productfeedbackSchema);