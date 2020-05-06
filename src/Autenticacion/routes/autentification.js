var express = require('express');
var router = express.Router();
const User = require('../models/users');
const { ObjectID } = require('mongodb');
const authenticate = require("../middleware/auth");
/* GET users listing. */


//router.post('/oauth/google', passport.authenticate('googleToken', { session: false }));


router.post('/login', async (req, res) => {
    try {
        const user = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        res.send({ user : user , token : token})
    } catch (error) {
        res.status(400).send({error : 'Invalid user or password'})
    }
  })

router.get('/me', authenticate, async (req, res) => {
    res.send( { user : req.user })
})

router.patch('/me', authenticate, async (req, res) => {
  const updates = Object.keys(req.body)

  if(req.body.password){
      if(!req.body.currentPassword){
          return res.status(401).send( {error: 'Please send Current Password'});
      }

      const isMatch = await req.user.checkPassword(req.body.currentPassword) 

      if (!isMatch) {
          return res.status(401).send( {error: 'Current Password is not valid'});
      }
  }

  const allowedUpdates = ["username", "password", "currentPassword", "birthDate", "gender", "biography", "rating", "categories", "subCategories", "profilePhoto"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  const _id = req.user._id

  if (!isValidOperation) {
      console.log(isValidOperation)
      res.status(400).send({ error: 'Invalid request' })
  }

  if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send({ user : req.user});
  } catch (error) {
      res.status(400).send({error : "Server error"})
  }

})



router.post('/logout',  async (req, res) => {
  try {
      console.log(req.body)
      const user  = await  User.findOne({ _id:req.body.user._id}) 

      user.tokens = user.tokens.filter((token) => {
          return token.token !== req.body.token
      })
      await user.save()
      res.send({ success : true })
  } catch (error) {
      res.status(500).send({error : "Server error"})
  }
})


router.post('/logoutall',  async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.send({ success : true })
  } catch (error) {
      res.status(500).send({error : "Server error"})
  }
})



module.exports = router
