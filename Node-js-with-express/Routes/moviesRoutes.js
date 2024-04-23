const express = require('express');
const router = express.Router();
const movieControllers = require('./../Controllers/moviesControllers');

router.route('/')
    .get(movieControllers.getAllMovies)
    .post(movieControllers.createMovie) 
    
router.route('/:id')
    .get(movieControllers.getMovieById)
    .patch(movieControllers.updateMovie)
    .delete(movieControllers.deleteMovie);

module.exports = router;