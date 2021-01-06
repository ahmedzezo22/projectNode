const express = require('express')
const news=require('../models/news')
const router = new express.Router()
const auth = require('../middleware/auth')
const Comment=require('../models/comments')
// add comment in news 
router.post('/comment/:id',auth,async(req,res)=>{
   
        try{
            const _id=req.params.id
    
            const com=new Comment({
                ...req.body,
                NewsID:_id,
                owner:req.user._id
            })
            await com.save()
            res.send({
                data:com,
                status:1,
                msg:"comment added successfully"
            })

        }catch(e){
            res.send({
                data:e,
                status:0,
                msg:"error occure"
            })
        
}
})
// delete comment
router.delete('/comment/:id',auth,async(req,res)=>{
   const _id=req.params.id
   try{
       const com=await Comment.findByIdAndDelete(_id)
       if(!com) {
           res.send({
               msg:"no comment to delete"
           })
       }
       res.status(200).send({
           status:1,
           data:'',
           msg:"comment deleted successfully"
       })
   }catch(e){
       res.status(200).send({
           status:0,
           data:e,
           msg:"error occure"
       })
   }
})
//edit comment
router.patch('/comment/:id',auth,async(req,res)=>{
  
        const _id=req.params.id
        const updates=req.body   
         try{
            const com=await Comment.findByIdAndUpdate(_id,updates,{
                new:true,
                runValidators:true 
            })
            res.status(200).send({
                status:1,
                data:com,
                msg:"comment updated successfully"
            })
        }catch(e){
            res.status(400).send({
                status:0,
                data:e,
                msg:'error occure'
            })
        }
    })
 //get all comments
 router.get('/comment',async(req,res)=>{
     
     try{
        const com=await Comment.find({})
        if(!com){
            res.send({
                msg:"No comments found"
            })
        }else
        res.status(200).send({
          status:1,
          data:com,
          msg:"comments retrive successfully"
        })
     }catch(e){
         res.send({
             status:0,
             data:e,
             msg:'error occure'
         })
     }
 })
 //comments for single news
 router.get('/comment/:id',async(req,res)=>{
    
     try{
        const _id=req.params.id
        const NewsComments=await Comment.find({NewsID:_id})
        console.log(NewsComments)
        res.status(200).send({
            status:1,
            data:NewsComments,
            msg:"data retrive successfully"

        })
     }catch(e){
        res.status(200).send({
            status:1,
            data:e,
            msg:"error occure"

        })
     }
 })

module.exports=router