var express = require('express');
var router = express.Router();
const User = require('../models/users');
const { ObjectID } = require('mongodb');
const authenticate = require("../middleware/auth");
/* GET users listing. */


router.post('/', async (req, res) => {
  //find an existing user

  let user = await User.findOne({ email: req.body.email });
  if (user) {
      console.log( {error : "User already exits"}); 
      return res.status(400).send({error : "User already exits"});
  }

  user = new User({
      method: 'local',
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
  });
  try {
      await user.save()
      res.status(201).send({ success : true })
  } catch (e) {
      res.status(400).send({error : "Server error"})
  }
})



  
router.delete('/me', async (req, res) => {
  if (!ObjectID.isValid(req.user._id)) {
      return res.status(404).send({error : "User id not valid"});
  }

  try {
      await req.user.remove()
      res.send(req.user)
  } catch (error) {
      res.status(500).send({error : "Server error"})
  }
})



router.post('/getUser', async (req, res) => {
    if (!ObjectID.isValid(req.body.userid)) {
        console.log(req.body.userid         )
        return res.status(404).send({error : "User id not valid"});
    }
    try {
        let user = await User.findOne({ _id: req.body.userid }).select( 
            'email username birthDate gender biography rating totalExchanges exchangesCanceled exchangesCanceledByOthers exchangeList garmentList magazineList profilePhoto');
        res.send(user);
    }catch (error) {
        res.status(400).send({error : "Server error"})
    }
  })


router.get('/getUsers', async (req, res) => {
    try {
        let user  = await User.find({});
        res.send({ users : user});
    }catch (error) {
        res.status(400).send({error : "Server error"})
    }
})
//router.post('/oauth/google', passport.authenticate('googleToken', { session: false }));


module.exports = router