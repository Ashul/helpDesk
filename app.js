//======================================
// get the packages we need ============
//======================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var path = require('path');
var fs = require('fs');

var app = express();


//======================================
//connect to client ====================
//======================================
app.use(express.static('./client'));
app.get('/', function(req, res){
    res.sendFile(__dirname+"/client/index.html")
});

//======================================
//initialize middlewares ===============
//======================================
app.use(bodyParser.json({limit:'10mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));
app.use(cookieParser());
app.use(passport.initialize());


//======================================
//setup mongodb connection =============
//======================================
var dbURI = 'mongodb://localhost/helpdeskNew';
mongoose.connect(dbURI);
mongoose.connection.once('connected', function(){
    console.log(dbURI + ' Database connected')
});


//======================================
//include all model files using fs modules ===
//======================================
fs.readdirSync('./server/app/models').forEach(function(file){
    //check if file has .js extension
    if(file.indexOf('.js'));
    require('./server/app/models/' + file);
});


//======================================
//include all controllers files using fs modules ===
//======================================
fs.readdirSync('./server/app/controllers').forEach(function(file){
    //check if file has js extension
    if(file.indexOf('.js'));
    var route = require('./server/app/controllers/' + file);
    route.Controller(app);
})


//======================================
// listen on port ======================
//======================================
app.listen(8000, function(){
    console.log("listening... on port 8000")
})