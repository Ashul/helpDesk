//=========================================
// get the required packages ==============
//=========================================
var express = require('express');
var mongoose = require('mongoose');
var generateTicket = mongoose.model('generateTicket');
var answerTicket = mongoose.model('answerTicket');
var nodemailer = require('nodemailer');
var ticketRouter = express.Router();
module.exports.Controller = function(app){

//===================================================
// API to get Question id ==========================
//===================================================
    ticketRouter.param("qID", function(req, res, next, id) {
    generateTicket.findById(id, function(e, question) {
        if (e) return next(e);
        if (!question) {
            e = new Error("Not found (404)");
            e.status = 404;
            return next(e);
        }
        req.question = question;
        return next();
    });
});


//===================================================
// API to get answer id ==========================
//===================================================
ticketRouter.param("aID", function(req, res, next, id) {
    req.answer = req.question.answers.id(id);
    if (!req.answer) {
        e = new Error("Not found (404)");
        e.status = 404;
        return next(e);
    }
    next();
});

//===================================================
// API to get all Questions ==========================
//===================================================
    ticketRouter.get('/all', function(req, res){
        generateTicket.find({}, function(err, ticket){
            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
            }else{
                res.send(ticket)
            }
        });
    });


//===================================================
// API to get single Question =======================
//===================================================
    ticketRouter.get('/:id', function(req, res){
         var id = req.params.id;
         generateTicket.find({ _id: id }, function(err, ticket) {

            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
            }else{
                res.send(ticket)
            }
        })
    })

//===================================================
// API to update current Question status ==========================
//===================================================
    ticketRouter.put('/:id', function(req, res){
         var id = req.params.id;
         generateTicket.findOneAndUpdate({ _id: id },req.body, {new: true}, function(err, status) {

            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
            }else{
                res.send(status)
            }
        })
    })

//===================================================
// API to post answer ===============================
//===================================================
    ticketRouter.post('/:qID/answers', function(req, res, next) {
        var newAnswer = new answerTicket({
            firstName   : req.body.firstName,
            lastName    : req.body.lastName,
            email       : req.body.email,
            mobile      : req.body.mobile,
            answer      : req.body.answer

        })

         req.question.answer.push(newAnswer);
         req.question.save(function(err, question) {
              if (err){
                     res.status(err.status || 500);                
                     // send back json data
                     res.send({message: err.message})

                  }
              else{
                res.status(201);
                res.json(question);
                 }
         });
    });


//===================================================
// API to find single (user) Question ===============
//===================================================
    ticketRouter.post('/myTicket', function(req, res){
        generateTicket.find({'email':req.body.email}, function(err, ticket){
            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
            }else{
                res.send(ticket)
            }
        })
    });
    

//===================================================
// API to create question ===========================
//===================================================
    ticketRouter.post('/createTicket', function(req,res){
            if(req.body.firstName != undefined && 
            req.body.lastName != undefined && 
            req.body.email != undefined && 
            req.body.mobile != undefined && 
            req.body.question != undefined && 
            req.body.Qdetails != undefined){

                var newTicket = new generateTicket({
                    firstName   : req.body.firstName,
                    lastName    : req.body.lastName,
                    email       : req.body.email,
                    mobile      : req.body.mobile,
                    question    : req.body.question,
                    Qdetails    : req.body.Qdetails,
                    // answer      : req.body.answer

                })
            newTicket.save(function(err, ticket){
            if(err){
                res.status(err.status || 500);                
                // send back json data
                res.send({message: err.message})
              }
            else{

                res.send(ticket)
            }
        })
            }else{
            res.json('some body parameter missing in create Question API')
            }
    })


//===================================================
// API to send mail for answer ======================
//===================================================
ticketRouter.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "anshulupsc@gmail.com",
          pass: "bdmevoojancbbzdh" 
      }
  });
  //Mail options

  mailOpts = {
    //   from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: req.body.email,
      subject: 'Someone replied to your Question',
      text: 'Please login and check the answer'
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.status(error.status || 500);                
          // send back json data
          res.send({message: error.message})}
      //Yay!! Email sent
      else {
          res.send(response)      }
  });
});


//===================================================
// API to send mail for status change ===============
//===================================================
ticketRouter.post('/status', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "anshulupsc@gmail.com",
          pass: "bdmevoojancbbzdh" 
      }
  });
  //Mail options

  mailOpts = {
    //   from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: req.body.email,
      subject: 'Question Status Changed ',
      text: 'Please login and check'
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.status(error.status || 500);                
          // send back json data
          res.send({message: error.message})}
      //Yay!! Email sent
      else {
          res.send(response)      }
  });
});


//===================================================
// use app level middleware =========================
//===================================================
app.use('/ticket', ticketRouter)
}