const express=require('express')
const auth=require('../middleware/auth')
const router=new express.Router()
const Exception=require('../models/exception')
const Match=require('../models/matches')
// add exception in match
router.post('/exception/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
    const Exceptions=new Exception({
        ...req.body,
        matchID:_id,
        userID:req.user._id
    })
    await Exceptions.save()
    res.status(200).send({
        status:1,
        data:Exceptions,
        msg:'your exception added successfully'
    })
}catch(e){
    res.status(200).send({
        status:0,
        data:e,
        msg:"Error occure"
    })
}

})
//get all exceptons
router.get('/exception',async(req,res)=>{
    try{
        const Exceptions=await Exception.find({})
        res.status(200).send({
            status:1,
            data:Exceptions,
            msg:"Exceptions retrive successfully"
        })
    }catch(e){
        res.status(200).send({
            status:0,
            data:e,
            msg:'Error occure'
        })
    }
})
// get exception of single user
router.get('/exception/:userid',async(req,res)=>{
    
    try{
        const userId=req.params.userid
        const userException=await Exception.find({userID:userId})
            
        res.status(200).send({
            status:1,
            data:userException,
            msg:"user exception retrive successfully"
        })
    
    }catch(e){
        res.status(200).send({
            status:0,
            data:'',
            msg:"error occure"
        })
    }
})

module.exports=router