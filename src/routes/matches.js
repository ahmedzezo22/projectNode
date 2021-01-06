const e = require('express')
const express=require('express')
const Match=require('../models/matches')
const router=new express.Router()
// add match
router.post('/match',async(req,res)=>{
    const match=new Match(req.body)
    try{
        await match.save()
        res.status(200).send({
            status:1,
            data:match,
            msg:"match added successfully"
        })
    }catch(e){
        res.status(200).send({
            status:0,
            data:e,
            msg:"error occure"
        })
    }
})
// get all matches
router.get('/match',async(req,res)=>{
    const match=await Match.find({})
        try{   
          res.status(200).send({
              status:1,
              data:match,
              msg:"matches retrive successfully"
          })
            
        }catch(e){
            res.status(200).send({
                status:0,
                data:e,
                msg:"error occure"
            })
        }
})
// edit match
router.patch("/match/:id",async(req,res)=>{
    const _id=req.params.id
    const updates=req.body
    const updateskey=Object.keys(req.body)
    const allowedUpdated=["matchResult","dayOfMatch","timeOfMatch"]
     const validUpdate=updateskey.every((u)=>allowedUpdated.includes(u))
     if(!validUpdate)
     res.status(400).send({
        status:4,
        data:'',
        msg:'invalid updates'
    })
        try{
           const match=await Match.findOneAndUpdate(_id,updates,{
            new:true,
            runValidators:true
           })
           await match.save()
           res.status(200).send({
               status:1,
               data:match,
               msg:"match updated successfully"
           })
        }catch(e){
            res.status(200).send({
              status:0,
              data:e,
              msg:"error occure"
            })
        }
})
// delete match
router.delete('/match/:id',async(req,res)=>{
        const _id=req.params.id
        try{
            const match=await Match.findOneAndDelete(_id)
            res.status(200).send({
                status:1,
                data:match,
                msg:"match delete successfuly"
            })
        }catch(e){
            res.status(200).send({
                status:0,
                data:e,
                msg:"error occure"
            })
        }
})
//get match with 
router.get('/match/:id',async(req,res)=>{
    const _id=req.params.id
    try{
         const match=await Match.find({_id:_id})
         res.status(200).send({
             status:0,
             data:match,
             msg:'match retrive successfully'
         })
    }catch(e){
       res.status(200).send({
           status:0,
           data:e,
           msg:"error occure"
       })
    }
})

module.exports=router