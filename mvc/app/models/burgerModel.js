const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
    burgerimage : {
        type : String, 
        trim: true, 
        required : true
    }, 
    burgername : {
        type : String, 
        trim : true, 
        required : true, 
        unique : true
    }, 
    burgerprice : {
        type : Number, 
        required : true
    }, 
    burgerquantity : {
        type : Number, 
        required : true
    },
    sale : {
        type : Boolean, 
        required : true, 
        default : false
    }, 
    created : {
        type : Date, 
        default : Date.now()
    }
});

mongoose.model('Burger', burgerSchema);