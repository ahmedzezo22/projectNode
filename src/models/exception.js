const mongoose=require('mongoose');
const match=require('./matches')
const user=require('./users')
const ExceptionSchema=new mongoose.Schema({
      UserException:{
          type:String,
          required:true,
          trim:true
      },
      matchID:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'match'
      },
      userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
      },
      userScore:{
          type:Number,
          default:0
      }
})
const Exception=mongoose.model('Exception',ExceptionSchema)
module.exports=Exception