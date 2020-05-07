const jwt  = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req,res,next) => {
    try {
        const token = req.header('authorization').replace('Bearer', '').trim()
        
        const decoded  = jwt.verify(token, 'thisismynewblog')
       
        const user  = await User.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!user){
            res.status(401).send({error:'Invalid user or password'})
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth