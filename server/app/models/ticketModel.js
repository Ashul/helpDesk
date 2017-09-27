//======================================
// Get the required packages ===========
//======================================
var mongoose = require('mongoose');

//======================================
//define a schema ======================
//======================================
var Schema = mongoose.Schema;

//======================================
// Make Instance Of AnswerSchema =======
//======================================
var AnswerSchema = new Schema({
    firstName   :   {type:String, trim:true, },
    lastName    :   {type:String, trim:true, },
    answer      :   {},
    email    :   {type:String, trim:true, lowercase:true},
    createdAt: { type: Date, default: Date.now },
});


//======================================
// Make Instance Of ticketSchema =======
//======================================
var ticketSchema = new Schema({
    firstName   :   {type:String, trim:true, required: true},
    lastName    :   {type:String, trim:true, required:true},
    email       :   {type:String, trim:true, required:true, lowercase:true},
    mobile      :   {type:String, required:true},
    question    :   {type:String},
    Qdetails    :   {type:String},
    Qstatus     :   {type: [{type: String,
                             enum: ['open', 'closed']}],
                             default: ['open']},
    answer      :   [AnswerSchema],
    created     :   {type:Date, default:Date.now}
});


//======================================
// Define all models ===================
//======================================
mongoose.model('generateTicket', ticketSchema);
mongoose.model('answerTicket', AnswerSchema);
