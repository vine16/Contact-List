//defining the schema
//mongoose -> module name
const mongoose = require('mongoose'); //same instance as the lib imported in index.js

const contactSchema = new mongoose.Schema({

    //fields
    name: {
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true //we add can many validations here like start with 9
    }
})


//defining collection
//Contact -> collection name
//contactSchems -> schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;