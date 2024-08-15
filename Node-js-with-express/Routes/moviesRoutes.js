const express = require('express');
const router = express.Router();
const movieControllers = require('./../Controllers/moviesControllers');
const authController = require('./../Controllers/authController');


router.route('/highest-rated')
    .get(movieControllers.getHighestRated, movieControllers.getAllMovies);

router.route('/movie-stats')
    .get(movieControllers.getMovieStats);

router.route('/movies-by-genre/:genre')
    .get(movieControllers.getMoviesByGenre);

router.route('/')
    .get(authController.protect, movieControllers.getAllMovies)
    .post(movieControllers.createMovie)

router.route('/:id')
    .get(movieControllers.getMovieById)
    .patch(movieControllers.updateMovie)
    .delete(movieControllers.deleteMovie);

module.exports = router;