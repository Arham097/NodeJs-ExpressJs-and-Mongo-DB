// Lecture 30: Introduction to Express JS////////////////
// const express = require('express');
// const app = express();

// // ROUTE = HTTP Method + URL
// app.get('/',(req,res)=>{
//     // res.status(200).send("<h1>Hello from express Server</h1>");
//     res.status(200).json({message:"Hello World",status:200});
// })

// // Create a Server
// const port = 3000;
// app.listen(port,()=>{
//     console.log("Server has started");
// })

// Lecture 34: API: Handling "GET" Request

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

// app.get('/api/v1/movies',(req,res)=>{
//     res.status(200).json({
//         status: "success",
//         count: movies.length,
//         data: {
//             movies:movies
//         }

//     })
// })

// // Create a Server
// const port = 3000;
// app.listen(port, ()=>{
//     console.log("Server has started");
// })

// Lecture 35: API: Handling "POST" Request

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

// // This "express.json()" acts as a middleware (Modify incoming request data (Here help us to attach request body to below req object))
// app.use(express.json());

// app.get("/api/v1/movies",(req,res)=>{
//     res.status(200).json({
//         status: "success",
//         count: movies.length,
//         data : {
//             movies:movies
//         }
//     });
// });

// app.post("/api/v1/movies",(req,res)=>{
//     const newId = movies[movies.length-1].id +1;
//     const newMovie = Object.assign({id: newId}, req.body);
//     movies.push(newMovie);
//     fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
//         res.status(201).json({
//             status:"success",
//             data: {
//                 movies: newMovie,
//             }
//         });
//     });

// })
// app.listen(3000,()=>{
//     console.log("Server has started..");
// })

// Lecture 36: Handling Route Parameters/////////////////////////

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

// // GET - /api/v1/movies
// app.get("/api/v1/movies",(req,res)=>{
//     res.status(200).json({
//         status: "succes",
//         count: movies.length,
//         data:{
//             movies:movies
//         }
//     });
// });

// // GET - /api/v1/movies/:id

// app.get("/api/v1/movies/:id",(req,res)=>{
//     const id = req.params.id*1;
//     const movie = movies.find(el=>el.id===id);
//     if(!movie){
//         return res.status(404).json({
//             status: "failed",
//             message: "Movie with this ID "+id+ " is not present"
//         });
//     };
//     res.status(200).json({
//         status: "success",
//         data :{
//             movie: movie
//         }
//     })
// })

// app.listen(3000, ()=>{
//     console.log("Server has started");
// })

// Lecture 37: API: Handling "PATCH" Request

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// app.use(express.json());

// // PATCH - /api/v1/movies/:id
// app.patch('/api/v1/movies/:id',(req,res)=>{
//     const id = req.params.id*1;
//     const movieToUpdate = movies.find(el=>el.id===id);
//     if(!movieToUpdate){
//         return res.status(404).json({
//             status: "failed",
//             message: "there is no movie with ID: "+id+ " is presesnt"
//         })
//     }
//     const index = movies.indexOf(movieToUpdate);
//     Object.assign(movieToUpdate,req.body);
//     movies[index] = movieToUpdate;

//     fs.writeFile("./data/movies.json",JSON.stringify(movies), (err)=>{
//         res.status(200).json({
//             status: "success",
//         data: {
//             movies: movieToUpdate
//         }
//         })
//     })
// })


// Lecture 38: API: Handling "DELETE" Request

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync('./data/movies.json'));


// // DELETE - /api/v1/movies/:id
// app.delete('/api/v1/movies/:id',(req,res)=>{
//     const id = req.params.id*1;
//     const movietoDelete = movies.find(el=>el.id===id);
//     if(!movietoDelete){
//         return res.status(404).json({
//             status: "failed",
//             message: "movie with ID: "+id+" is not present"
//         })
//     }
//     const index = movies.indexOf(movietoDelete);
//     movies.splice(index,1);

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({
//             status: "success",
//             data: {
//                 movie: null
//             }
//         })
//     })
// })

// app.listen(3000,()=>{
//     console.log("Server has started");
// })

// Lecture 40: Creating a Custom Middleware

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

// const logger = (req,res,next)=>{
//     console.log("logger called");
//     next();
// }
// app.use(express.json());
// app.use(logger);
// app.use((req,res,next)=>{
//     req.requestedAt = new Date().toISOString();
//     next();
// })

// app.get('/api/v1/movies',(req,res)=>{
//     res.status(200).json({
//         status: "success",
//         requested: req.requestedAt,
//         count: movies.length,
//         data: {
//             movies:movies
//         }

//     })
// })
// // Create a Server
// const port = 3000;
// app.listen(port, ()=>{
//     console.log("Server has started");
// })

// Lecture 41: Using Third Party Middleware

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
// // THird marty Middleware(Morgan) (Give Info about the request URL)
// const morgan = require('morgan');
// app.use(express.json());
// app.use((req,res,next)=>{
//     req.requestedAt = new Date().toISOString();
//     next();
// })
// app.use(morgan('dev'));
// app.get('/api/v1/movies',(req,res)=>{
//     res.status(200).json({
//         status: "success",
//         count: movies.length,
//         data: {
//             movies:movies
//         }

//     })
// })

// // Create a Server
// const port = 3000;
// app.listen(port, ()=>{
//     console.log("Server has started");
// })

// Code Refactoring////////////////////////////////////

// const exp = require('constants');
const express = require('express');
const app = express();
const MovieRouter = require('./Routes/moviesRoutes');
const morgan = require('morgan');
const authRouter = require('./Routes/authRouter');
const customError = require('./Utils/customError');
const globalErrorHandler = require('./Controllers/errorController');
const userRoute = require('./Routes/userRoute');

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/movies', MovieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRoute);

// Default Route
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'failed',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })
    const err = new customError(`Can't find ${req.originalUrl} on this server`, 404);
    next(err);
})

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;

