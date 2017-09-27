//======================================
//get the packages we need =============
//======================================
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//======================================
// Define a Schema =====================
//======================================
var Schema = mongoose.Schema;

//======================================
// Make Instance Of Schema =============
//======================================
var userSchema = new Schema({
    firstName   :   {type:String, trim:true, required: true},
    lastName    :   {type:String, trim:true, required:true},
    email       :   {type:String, trim:true, required:true, lowercase:true},
    mobile      :   {type:Number, required:true},
    hash        :   {type:String},
    salt        :   {type:String},
    created     :   {type:Date, default:Date.now}
});


//======================================
// Set the password =====================
//To save the reference to the password we 
//can create a new method called setPassword 
//on the userSchema schema that accepts a password parameter.
//======================================
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


//======================================
// Checking the password ===============
//======================================
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

//======================================
//Generating a JSON web Token ==========
//======================================
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName:this.lastName,
    mobile:this.mobile,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); 
};

//======================================
//define a model =======================
//======================================
mongoose.model('User', userSchema);