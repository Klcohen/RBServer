const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//allows a new user to be created w/ user and pass
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
    bio: req.body.user.bio
  })
  .then(
    function createSuccess(user) {

      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
    
      res.json({
        user: user,
        message: "Welcome to why that picture?",
        sessionToken: token
      })
    },
    createError = err => res.send(500, err)
  );
});

//login

router.post("/login",(req,res)=>{
  console.log(req.body.user)
  User.findOne({where: {email: req.body.user.email}})
  .then(user => {
      if(user){
          bcrypt.compare(req.body.user.password, user.password, (err, matches)=>{
              if(matches){
                  let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                  res.json({
                      user: user,
                      message:"successfully authenticated",
                      sessionToken:token
                  })
              }else{
                  res.status(502).send({error: err + "bad gateway"});
              }
          })
      }else{
          res.status(500).send({error:'failed to authenticate'});
      }
  })
  err => res.status(501).send({error:'failed to process'})
});

module.exports = router;