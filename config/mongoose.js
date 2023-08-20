//text -> default database name        
// This code connects to a MongoDB database named contacts_list_db using the Mongoose library, 
const mongoose = require('mongoose'); //require library

//connect to the database
main().catch(err => console.log(err)); 


//contacts_list_db -> a mongoDB database
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db'); //connect to this db
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//the connection b/w database and mongoose gives us access to the database
//acquire the connection to check if it is successful
const db = mongoose.connection; //connetion with our db

//on error event, print error msg
db.on('error', console.error.bind(console, 'error connecting to db'));

//once it's setup and running, the print the msg
db.once('open', function(){
    console.log('Successfully connected to the database');
})


// module.exports = mongoose;
