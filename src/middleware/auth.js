const jwt = require('jsonwebtoken')
const User = require('../models/users')
const auth = async( req, res, next ) => {
    try{
        const token = req.header('Authorization').replace('bearer ','')
       
        const decoded = jwt.verify(token,'AaAaBbBb')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) throw new Error('')
        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(200).send({
            status:0,
            data:e,
            message: "Please authorize your data"
        })
    }
}

module.exports = auth