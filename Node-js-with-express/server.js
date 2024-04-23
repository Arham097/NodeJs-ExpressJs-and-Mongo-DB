const mongoose = require('mongoose');
// Lecture 48: Environment Variable with configuration file
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
//////////////////// Lecture 48 END////////////////////
const app = require('./app');

// Lecture 47: Environment Variables///////////
// Environment Variables are the global varibles that are used to define the environment in which node app are running

// This 'env' is set by express js
// console.log(app.get('env'));

// Node js's Environment Variables
console.log(process.env);
// Setting Environment Varibles by Terminal
// SET NODE_ENV = development etc.

mongoose.connect(process.env.CONN_STRING,{
    useNewUrlParser : true
}).then((conn)=>{
    console.log("Database connected succesfully");
}).catch((error)=>{
    console.log("Some error has occured");
})

// Create a Server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server has started");
})
