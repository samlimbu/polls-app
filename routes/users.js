const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');
//Register'


router.post('/register',(req,res,next)=>{
     let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username:req.body.username,
          password: req.body.password
     });
     User.addUser(newUser, (err,user)=>{
          if(err){
               res.json({sucess: false,msg:'failed to register user'});

          }
          else{

               res.json({sucess: true,msg:'user registered'});
          }
     });
});
//Authenticate
router.post('/authenticate',(req,res,next)=>{
     const username = req.body.username;
     const password = req.body.password;
     console.log(req.body);
     console.log(username, password);
     User.getUserByUsername(username, (err,user)=>{
          if(err)
          {throw err}
          if(!user){
               return res.json({sucess: false, msg:'User not found'});
          }
          User.comparePassword(password, user.password, (err, isMatch)=>{
               if(err) throw err;
               if(isMatch){
                    const token = jwt.sign({data: user}, config.secret, {
                         expiresIn: 45 //in seconds
                    });
                    res.json({
                         sucess:true, 
                         token: 'JWT '+token,
                         user: {
                              id: user._id,
                              name: user.name,
                              username: user.username,
                              email: user.email
                         }
                    })
               }
               else{
                    return res.json({
                         sucess: false,
                         msg: 'wrong password'
                    });
               }
          });

     });
});
//profile 
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
     res.json({user: req.user});
});

module.exports =router;
