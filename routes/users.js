const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');
//status
router.get('/status', (req, res, next)  => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'error'
    });
  }
  // simulate token decoding
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  if (token === '1234567') {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(401).json({
      status: 'error'
    });
  }
});
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
                         expiresIn: 10024 //in seconds
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
