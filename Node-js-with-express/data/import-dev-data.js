const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');

dotenv.config({path: './config/env'});

mongoose.connect(process.env.CONN_STRING,{
    useNewUrlParser : true
}).then((conn)=>{
    console.log("DB Connection successful");

}).catch((err)=>{
    console.log(err.messsage);
})

const movie = JSON.parse(fs.readFileSync('./data/movies.json','utf-8'));

// DELETE EXISTING MOVIE DOCUMENTS FROM COLLECTION
const deleteMovies = async()=>{
    try{
        await Movie.deleteMany();
        console.log("data deleted Succesfully");
    }
    catch(err){
        console.log(err.message);
    }
}

// IMPORT MOVIE DATA TO MONGODB COLLECTION
const importMovies = async()=>{
    try{
        await Movie.create(movie);
        console.log("data inserted successfully");
    }
    catch(err){
        console.log(err.message);
    }
}

// console.log(process.argv);
if(process.argv[2]==="--delete"){
    deleteMovies();
}
if(process.argv[2]==="--import"){
    importMovies();
}