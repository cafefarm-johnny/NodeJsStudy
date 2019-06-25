const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String, 
    userid : String, 
    password : String, 
    email : String
});

mongoose.model('User', userSchema);