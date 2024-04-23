// This is the code which has removed from previous lecture because of implementation from JSON file and for new implementation by MONGO DB

// Continue of lecture 44 (Understanding of param Middleware)/////////////
exports.checkId = (req,res,next,value)=>{
    const movieToUpdate = movies.find(el=>el.id===value*1);
    if(!movieToUpdate){
        return res.status(404).json({
            status: "failed",
            message: "there is no movie with ID: "+value+" is present",
        })
    };
    next();
}

// Continue of lecture 45 (Chaining multiple Middleware)
exports.validateBody = (req,res,next)=>{
    if(!req.body.name || !req.body.releaseYear){
        return res.status(400).json({
            status: 'fail',
            message: 'not a valid movie data'
        })
    };
    next();
}
///////////////////////////////////////////////////////////

const getAllMovies = (req,res)=>{
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
};

const getMovieById = (req,res)=>{
    const id = req.params.id*1;
    const movie = movies.find(el=>el.id===id);
    if(!movie){
        return res.status(404).json({
            status: "failed",
            message: "there is no movie with ID: "+id+" is present",
        })
    }
    res.status(200).json({
        status:"success",
        data: {
            movie: movie
        }
    });
};

const createMovie = (req,res)=>{
    const newId = movies[movies.length-1].id+1;
    const newMovie = Object.assign({id:newId},req.body);
    movies.push(newMovie),
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"success",
            data: {
            movies: newMovie
            }
        });
    });
};

const updateMovie = (req,res)=>{
    const id = req.params.id*1;
    const movieToUpdate = movies.find(el=>el.id===id);
    if(!movieToUpdate){
        return res.status(404).json({
            status: "failed",
            message: "there is no movie with ID: "+id+" is present",
        })
    };
    const index = movies.indexOf(movieToUpdate);
    Object.assign(movieToUpdate,req.body);
    movies[index] = movieToUpdate;
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data: {
            movies: movieToUpdate,
            }
        });
    });
};

const deleteMovie = (req,res)=>{
    const id = req.params.id*1;
    const movietoDelete = movies.find(el=>el.id===id);
    if(!movietoDelete){
        return res.status(404).json({
            status: "failed",
            message: "there is no movie with ID: "+id+" is present",
        });
    };
    const index = movies.indexOf(movietoDelete);
    movies.splice(index,1);

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status:"success",
            data: {
            movie: null,
            }
        });
    });
}