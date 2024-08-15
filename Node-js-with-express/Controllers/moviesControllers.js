const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeature');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('../Utils/customError');


///////////////////////// Lecture 45 Ended//////////////////////////

// Route Handler Functions

exports.getHighestRated = (req, res, next) => {
    req.query.limit = '3';
    req.query.sort = '-ratings';
    next();
}

exports.getAllMovies = asyncErrorHandler(async (req, res, next) => {
    const features = new ApiFeatures(Movie.find(), req.query).filter().sort().limitFields().paginate();
    let movies = await features.query;

    res.status(200).json({
        status: "success",
        length: movies.length,
        data: {
            movies
        }
    });
});

exports.getMovieById = asyncErrorHandler(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        const err = new CustomError("Movie with this ID is not present", 404);
        return next(err);
    }

    res.status(200).json({
        status: "succes",
        data: {
            movie
        }
    })
});



exports.createMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = await Movie.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            movie
        }
    })
});

exports.updateMovie = asyncErrorHandler(async (req, res, next) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedMovie) {
        const err = new CustomError("Movie with this ID is not present", 404);
        return next(err);
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie: updatedMovie
        }
    })
});

exports.deleteMovie = asyncErrorHandler(async (req, res, next) => {

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
        const err = new CustomError("Movie with this ID is not present", 404);
        return next(err);
    }

    res.status(204).json({
        status: "success",
        data: {
            movie: null
        }
    })
});

// aggregation pipeline
exports.getMovieStats = asyncErrorHandler(async (req, res, next) => {
    const stats = await Movie.aggregate([
        { $match: { ratings: { $gte: 1 } } },
        {
            $group: {
                _id: '$releaseYear',
                avgRating: { $avg: '$ratings' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                priceTotal: { $sum: '$price' },
                movieCount: { $sum: 1 },
            }
        },
        { $sort: { minPrice: 1 } },

    ])
    res.status(200).json({
        status: "success",
        count: stats.length,
        data: {
            movie: stats
        }
    })
});

exports.getMoviesByGenre = asyncErrorHandler(async (req, res, next) => {
    const genre = req.params.genre;
    const movies = await Movie.aggregate([
        { $unwind: '$Genres' },
        {
            $group: {
                _id: '$Genres',
                movieCount: { $sum: 1 },
                movies: { $push: '$name' }
            }
        },
        { $addFields: { genre: '$_id' } },
        { $project: { _id: 0 } },
        { $sort: { movieCount: -1 } },
        { $limit: 2 },
        { $match: { genre: genre } }
    ])
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies
        }
    })
});