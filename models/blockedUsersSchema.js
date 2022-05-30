const mongoose=require('mongoose')
const blockedUsersSchema =new mongoose.Schema({
    blockedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    blockedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
},  { timestamps: true })

module.exports = mongoose.model('blockedUsers', blockedUsersSchema)

// delete below


// var dbUrl = "mongodb://localhost:27017/HFV";


//  mongoose.connect(dbUrl, function(err) {
//      if (err) {
//         return console.log('Problem arised in connecting to DB' + err);
//      }
    
//      console.log('Database connected Successfully!');
//  });

