const mongoose = require('mongoose')
const feedbackSchema = new mongoose.Schema({
  feedbackBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedback: { type: String },
  feebackResponse: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('feedbacks', feedbackSchema)