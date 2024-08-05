const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    age : Number,
    designation : String
});

const employeemodel = mongoose.model('Employee',employeeSchema);

module.exports = employeemodel;