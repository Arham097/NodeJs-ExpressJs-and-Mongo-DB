const mongoose = require('mongoose');
const fs = require('fs');
const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required field!"],
        unique : true,
        maxlength: [70, "A movie name must have less or equal then 70 characters!"],
        minlength: [3, "A movie name must have more or equal then 3 characters!"],
        trim: true
    },
    description : {
        type : String,
        required : [true, "Description is required field!"],
        trim: true
    },
    duration: {
        type : Number,
        required : [true, "duration is required field!"],
    },
    rating: {
        type: Number,
        validate:{
            validator: function(value){
                return value >=1 && value <= 10;    
            },
            message: "Rating ({VALUE}) must be between 1 and 10"
        } 
    },
    totalRating:{
        type: Number,
    },
    releaseYear: {
        type: Number,
        required: [true, "Release Year is required field"],
    },
    releaseDate:{
        type: Date,
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
    Genres:{
        type : [String],
        required : [true, "Genres is required field"]
    },
    directors : {
        type : [String],
        required : [true, "Directors is required field"]
    },
    coverImage :{
        type : String,
        required : [true, "Cover Image is required field"]
    },
    actors: {
        type : [String],
        required : [true, "Actors is required field"]
    },
    price: {
        type: Number,
        required : [true, "Price is required field"]
    },
    createdBy: String

});
// Document Middleware
movieSchema.pre('save',function(next){
    this.createdBy = 'Arham';
    console.log(this);
    next();
})

movieSchema.post('save',function(doc,next){
    const content = `A new movie with name {${doc.name}} has been created by {${doc.createdBy}} at {${doc.createdAt}}\n`;
    fs.writeFileSync('./Log/log.txt',content,{flag: 'a'},(err)=>{
        console.log(err.message);
    });
    next();
})

// Query Middleware
movieSchema.pre(/^find/,function(next){
    this.find({releaseDate : {$lte:Date.now()}});
    this.start = Date.now();
    next();
})

movieSchema.post(/^find/,function(docs,next){
    this.find({releaseDate : {$lte:Date.now()}});
    this.end = Date.now();
 
    const content = `Query took ${this.end - this.start} milliseconds\n`;
    fs.writeFileSync('./Log/log.txt',content,{flag: 'a'},(err)=>{
        console.log(err.message);
    });
    console.log(docs);
    next();
})

// Aggregation Middleware
movieSchema.pre('aggregate',function(next){
    console.log(this.pipeline().unshift({$match:{releaseDate: {$lte:new Date()}}}));
    console.log(this);
    next();
})
const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;
