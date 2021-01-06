const mongoose = require('mongoose')
const News=require('./news')
const CommentsSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        maxlength:300
    },
    NewsID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'News'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
    
})


const Comment=mongoose.model("comments",CommentsSchema)
module.exports=Comment