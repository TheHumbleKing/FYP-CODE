const mongoose=require('mongoose')
const applicationfeedbackSchema = Schema({
    
    VendorID:{type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Vendor'},
    CustomerID:{type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Customer'},
    
    
  });
  const ApplicationFeedbackmodel=new mongoose.model('ApplicationFeedback',applicationfeedbackSchema);