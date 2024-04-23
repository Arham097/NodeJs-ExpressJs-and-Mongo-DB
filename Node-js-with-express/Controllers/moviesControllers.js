const Movie = require('./../Models/movieModel');



///////////////////////// Lecture 45 Ended//////////////////////////

// Route Handler Functions
exports.getAllMovies = async (req,res)=>{
    try{
        const movies = await Movie.find();
        res.status(200).json({
            status:"succes",
            data: {
                movies
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message : err.message
        })
    }
    
};

exports.getMovieById = async (req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status:"succes",
            data: {
                movie
            }
        })
    } catch(err){
        res.status(404).json({
            status:"fail",
            message : err.message
        })
    }
    
};

exports.createMovie = async(req,res)=>{
    try{
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data:{
                movie
            }
        })    
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: "Error occured: "+err.message
        })
    }
};

exports.updateMovie = async (req,res)=>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status: 'success',
            data:{
                movie : updatedMovie
            }
        })    
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
    
};

exports.deleteMovie = async (req,res)=>{
    try{
        await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:"success",
            data :{
                movie: null
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

