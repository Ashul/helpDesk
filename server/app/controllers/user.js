//======================================
// get the packages we need ============
//======================================
var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userRouter = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


module.exports.Controller = function(app){

//=========================================
// signup API =============================
//=========================================
userRouter.post('/signup', function(req,res){
    if(req.body.firstName != undefined && req.body.lastName != undefined && req.body.email != undefined && req.body.mobile != undefined && req.body.password != undefined){
        var newUser = new User({
            firstName   : req.body.firstName,
            lastName    : req.body.lastName,
            email       : req.body.email,
            mobile      : req.body.mobile,
        });
        newUser.setPassword(req.body.password)
        newUser.save(function(err){
            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
            }
            else{
                var token;
                token = newUser.generateJwt();
                res.status(200);
                res.json({
                    "token":token
                });
                }
        });
    }
    else{
        res.json('some body parameter missing')
    }
})


//====================================================
// LOGIN API =========================================
//====================================================
userRouter.post('/login', function(req, res) {
  User.findOne({email:req.body.email}, function(err, user){
      if(err) {
            res.status(err.status || 500);                
            // send back json data
            res.send({message: err.message})
        }
      if(!user){
            res.json({sucess:false, message: 'login falied. No email found'})
        }
      else if(user){
           //if user found and password correct
          //cretae a token
         // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = {id: user.id};
        var token = user.generateJwt();
        res.json({message: "ok", token: token});
        }
       
    })});


//===================================================
// API to get All Users =============================
//===================================================
userRouter.get('/all', function(req, res){
    User.find({}, function(err, user){
        if(err){
            res.status(err.status || 500);                
            // send back json data
            res.send({message: err.message})
        }else{
            res.send(user)
        }
    })
})


//===================================================
// API to get current User ==========================
//===================================================
userRouter.get('/me', auth, function(req, res){
    if (!req.payload._id) {
            res.status(401).json({
            "message" : "UnauthorizedError: private profile"
            });
        } 
        else {
             User
             .findById(req.payload._id)
             .exec(function(err, user) {
             res.status(200).json(user);
             });
        }
});

//===================================================
// use app level middleware =========================
//===================================================
app.use('/user', userRouter)
}