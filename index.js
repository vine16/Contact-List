//CONTROLLER                        
                // express
                //    ^
                //    |
                //    |
                //    |
                // mongoose(ODM)
                //    ^
                //    |
                //    |
                //    |
                // contacts_db(mongoDB database)    
                
//schema is written for mongoose to acess the db and populate it

//frameworks good at handling basic dependencies
const path = require('path');
const express = require('express'); //including library
const port = 8000;                  
require('./config/mongoose')
const Contact = require('./models/contact'); //schema of contact

//setting up the basic structure and functionality that our application needs to run.
//BTS 'new' keyword is used to create the instance of express application
const app = express(); //all the functionalities of this library which i needed to run a server

//middleware to include form data in req.body
const bodyParser = require('body-parser');
//extended:false, nested obj and arrays will be parsed as strings(uses 'querystring' library)
//extended:true, neested obj and arrays will be parsed as obj and arrays(uses 'qs' library)
app.use(bodyParser.urlencoded({ extended: true }));

//serving static fiels from assets directory
// the express.static middleware will look for the 'assets' directory in the root directory of your Node.js application.
//here contact_list
app.use(express.static(path.join(__dirname, 'assets')));

//middleware1
app.use(function(req, res, next){
    // req.query.name = "abc";
    console.log("middleware1 called");
    // console.log(res);
    next();
});



//middleware2
// app.use(function(req, res, next)
// {
//     console.log("middleware 2 called");
//     next();
// })

//keys are fixed keywords
// The code sets the view engine to ejs, which is a popular templating engine for Node.js. This tells express to use ejs for rendering views (templates) for the client.
app.set('view engine', 'ejs'); //set value to 'view engine' property
app.set('views', path.join(__dirname, 'views_'));//directory to look for the view files.
//by default it will look for 'views'

//Cannot GET / -> error handling by express.js, if we don't return anything
//in nodex.js the browser was just loading and loading

//array of objects
let contactList = [
    {
        'name': 'vinay',
        'mobile_no': 868584645
    },
    {
        'name': 'krishan',
        'mobile_no': 9911183160
    },
    {
        'name': 'mukesh',
        'mobile_no': 9812988820
    },
    {
        'name': 'nitesh',
        'mobile_no': 7214838384
    }
];


app.get('/', async function(req, res){ //handles HTTP 'GET' request 
    // res.sendFile('C:/Users/HP/OneDrive/Desktop/Backend/Express.js/contact_list/education.html');
    // res.sendFile(__dirname + '/education.html');
    // res.send('<h1> it is working </h1>');
// console.log(__dirname);

    try{
        const contacts = await Contact.find({});
        return res.render('home', {
            contact_list : contacts,
            title: 'my contacts list'
        });

    }
    catch(err)
    {
        console.log(err, 'in fetching contacts from db');
        return;
    }

    //good to write the retur keyword, otherwise it will continue to search for file
    // console.log(req.body);
    // console.log(__dirname);
    // return res.render('home', {
    //     contact_list: contactList,
    //     title: 'my contacts list'
    // });
    //there is an object 'locals' inside the res and there title is set as 'ilu'
}) //needs absolute path always

// res.render() method already handles generating and sending the response to the client, so there is no need to return anything from the callback function.

app.get('/practise', function(req, res)
{
    return res.render('practise', {
        title: "lets play with ejs"
    })
})

app.get('/create-contact', async function(req, res){

    // contactList.push(req.body);
    // console.log(req.query);
    // console.log(req.url);
    // contactList.push({
    //     'name': req.query.name,
    //     'mobile_no': req.query.number
    // });

    // Contact.create({
    //     name: req.query.name,
    //     phone : req.query.number
    // }).then((newContact) =>{
        
    //     console.log(newContact);
    // }).catch((err)=>{
    //     console.log(err);
    // });
    try{
        let newContact = await Contact.create({
            name: req.query.name,
            phone : req.query.number
        })

        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    contactId: newContact._id,
                    name: req.query.name,
                    phone : req.query.number
                },
                message: 'contact added successfully'
            });
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
    // .create function non longer accepts a callback function
    //     // console.log('*******', newContact);

    //     // return res.redirect('back');
    //     try{
    //         await console.log('******', newContact);
    //     }
    //     catch(err)
    //     {
    //         console.log('error',error);
    //     }
    // })
    return res.redirect('back'); //in response tell browser to redirect to this route
})

//for deleting a contact
app.get('/delete-contact', async function(req, res)
{

    //get the id from the query in the parameter(url)
    let id = req.query.id;

    //find the contact with this id and delete it
    try{
        await Contact.findByIdAndDelete(id);

        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    id: id
                }
            })
        }
    }
    catch(err)
    {
        console.error('error in deleting contact from db', err);
    }
    //get the query from the url
    // let phone = req.query.phone;


    //iterate over all contacts, if not found return -1
    // let contactIndex = contactList.findIndex(contact => contact.mobile_no == phone);

    // if(contactIndex != -1)
    // {
    //     console.log('deleted');
    //     //remove that from the array
    //     contactList.splice(contactIndex, 1);
    // }

    return res.redirect('back');
});



app.listen(port, function(error){
    if(error)
    {
        console.log("something went wrong in server: ", err);
    }
    else{
        console.log("my express server is running on port:", port);
    }
});