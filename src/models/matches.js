const mongoose =require('mongoose')
const Exception=require('./exception')
const matchesSchema=new mongoose.Schema({
    teamAName:{
        type:String,
        required:true,
        trim:true
    },
    teamBName:{
        type:String,
        required:true,
        trim:true
    },
    teamALogo:{
        type:String,
        default:'_',
        required:true,
    },
    teamBLogo:{
        type:String,
        default:'_',
        required:true
    },
    matchResult:{
        type:String,
        default:"0:0",
        required:true,
    },
    dayOfMatch:{
        type:String,
        required:true
    },
    timeOfMatch:{
        type:String,
        required:true,
    }
})
matchesSchema.virtual('exception',{
    ref:'exception',localField:'_id',foreignField:'matchID'
})
const Match=mongoose.model('Match',matchesSchema)
module.exports=Match