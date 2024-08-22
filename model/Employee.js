const mongoose= require('mongoose');

const Schema =mongoose.Schema;

const employeeSchema = new Schema({
    firstname:{
        required:true,
        type:String
    },
    lastname:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model('Employee',employeeSchema);