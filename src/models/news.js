const mongoose = require('mongoose')
const comments=require('./comments')
const NewsSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required: true,
        trim: true,
        unique:true
        // minlength:10,
        // maxLength:100
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
      type:String,
      default:"_"
    },
    OwnerLeague:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'leagues'
    }
   
    

},{timestamps:true})
NewsSchema.virtual('comments',{
    ref:'comments', localField:'_id', foreignField:'newsID'
})

const news=mongoose.model('news',NewsSchema)
module.exports=news
