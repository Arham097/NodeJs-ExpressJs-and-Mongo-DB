
// Lecture 4 : Reading Input % Writing Output////////////////////////////////

// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question("Enter Your Name Here: ",(name)=>{
//     console.log("Your name is: ",name);
//     rl.close();
// })

// rl.on('close',()=>{
//     console.log("interface closed");
//     process.exit(0);
// })

// Lecture 5 : Reading and Writing to a File Synchoronously ///////////////////

// const fs = require('fs');
// const read = fs.readFileSync("./Files/input.txt","utf-8");
// console.log(read);

// let content = `Data read from input.txt: ${read}  \nDate Created: ${new Date()} `;
// fs.writeFileSync("./Files/output.txt", content);


// Lecture 6 : Asynchronous nature of Node JS /////////////////////////

// let fs = require('fs');

// fs.readFile('./Files/input.txt','utf-8',(err,data)=>{
//     console.log(data);
// })
// console.log("Reading");

// Lecture 7 : Reading and Writing to a File Asynchronously //////////////

// const fs = require('fs');
// fs.readFile('./Files/start.txt','utf-8',(error,data)=>{
//     console.log(data);
//     fs.readFile(`./Files/${data}.txt`,"utf-8", (error2,data2)=>{
//         console.log(data2);
//         fs.readFile('./Files/another.txt','utf-8',(error3,data3)=>{
//             console.log(data3);
//             fs.writeFile('./Files/output.txt',data2, ()=>{
//                 console.log("wriiten succesfully");
//             })
//         })
//     })
// })


// Lecture 8 : Creating a simple web server ///////////////

// const http = require('http');

// // Step 1: Create a Server
// const server = http.createServer((request,response)=>{
//     // response.end("Hello from this server");
//     console.log("A new request received");
//     console.log(request);
// })
// // Step 2: Start a Server
// server.listen(8000, '127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 12: Creating Routes in Node JS

// const http = require('http');
// const server = http.createServer((request,response)=>{
//     let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.end("This is home page");
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end("This is About page");
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end("This is contact page");
//     }else{
//         response.end("Error 404: Not Found");
//     }
// })


// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 13: Sending HTML Response

// const http = require('http');
// const read = require('fs');
// const html = read.readFileSync("./Template/index.html","utf-8");

// const server = http.createServer((request,response)=>{
//     let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on Home Page"));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else{
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// })


// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 14: Setting Header for Response

// const http = require('http');
// const read = require('fs');
// const html = read.readFileSync("./Template/index.html","utf-8");

// const server = http.createServer((request,response)=>{
//     let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "You are on Home Page"));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 15: Working with JSON Data

// const http = require('http');
// const read = require('fs');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");

// const server = http.createServer((request,response)=>{
//     let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "You are on Home Page"));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         response.writeHead(200,{ 'Content-Type': 'application/json'});
//         response.end("You are on prodyct page");
//         console.log(products);
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })


// Lecture 16: Trasforming JSON data into HTML

// const http = require('http');
// const read = require('fs');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");
// const productListHTML = read.readFileSync("./Template/product-list.html","utf-8");

// let productHTMLArray = products.map((prod)=>{
//    let output = productListHTML.replace("{{%IMAGE%}}",prod.productImage);
//    output = output.replace("{{%NAME%}}",prod.name);
//    output = output.replace("{{%MODELNAME%}}",prod.modelName);
//    output = output.replace("{{%MODELNO%}}",prod.modelNumber);
//    output = output.replace("{{%SIZE%}}",prod.size);
//    output = output.replace("{{%CAMERA%}}",prod.camera);
//    output = output.replace("{{%CAMERA%}}",prod.camera);
//    output = output.replace("{{%PRICE%}}",prod.price);
//    output = output.replace("{{%COLOR%}}",prod.color);
//    return output;
// })

// const server = http.createServer((request,response)=>{
//     let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', productListHTML));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         let productResponseHTML = html.replace("{{%CONTENT%}}",productHTMLArray.join(','));
//         response.writeHead(200,{ 'Content-Type': 'text/html'});
//         response.end(productResponseHTML);
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 17: Parsing Query String from URL

// const http = require('http');
// const read = require('fs');
// const url = require('url');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");
// const productListHTML = read.readFileSync("./Template/product-list.html","utf-8");

// let productHTMLArray = products.map((prod)=>{
//    let output = productListHTML.replace("{{%IMAGE%}}",prod.productImage);
//    output = output.replace("{{%NAME%}}",prod.name);
//    output = output.replace("{{%MODELNAME%}}",prod.modelName);
//    output = output.replace("{{%MODELNO%}}",prod.modelNumber);
//    output = output.replace("{{%SIZE%}}",prod.size);
//    output = output.replace("{{%CAMERA%}}",prod.camera);
//    output = output.replace("{{%CAMERA%}}",prod.camera);
//    output = output.replace("{{%PRICE%}}",prod.price);
//    output = output.replace("{{%COLOR%}}",prod.color);
//    output = output.replace("{{%ID%}}",prod.id);
//    return output;
// })

// const server = http.createServer((request,response)=>{
//     let {query,pathname:path} =  url.parse(request.url,true);
//     // console.log(x);
//     // let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', productListHTML));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         if(!query.id){
//             let productResponseHTML = html.replace("{{%CONTENT%}}",productHTMLArray.join(','));
//             response.writeHead(200,{ 'Content-Type': 'text/html'});
//             response.end(productResponseHTML);
//         }else{
//             response.end("This is a product with id = " + query.id);
//         }
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// });
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 18: Creating a Reusable Function

// const http = require('http');
// const read = require('fs');
// const url = require('url');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");
// const productListHTML = read.readFileSync("./Template/product-list.html","utf-8");
// const productDetailHTML = read.readFileSync("./Template/product-details.html","utf-8");


// function replaceHtml(template,product){
// let output = productListHTML.replace("{{%IMAGE%}}",product.productImage);
//    output = output.replace("{{%NAME%}}",product.name);
//    output = output.replace("{{%MODELNAME%}}",product.modeName);
//    output = output.replace("{{%MODELNO%}}",product.modelNumber);
//    output = output.replace("{{%SIZE%}}",product.size);
//    output = output.replace("{{%CAMERA%}}",product.camera);
//    output = output.replace("{{%PRICE%}}",product.price);
//    output = output.replace("{{%COLOR%}}",product.color);
//    output = output.replace("{{%ID%}}",product.id);
//    output = output.replace("{{%ROM%}}",product.ROM);
//    output = output.replace("{{%DESC%}}",product.Description);
//    return output;
// }

// const server = http.createServer((request,response)=>{
//     let {query,pathname:path} =  url.parse(request.url,true);
//     // console.log(x);
//     // let path = request.url;
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', productListHTML));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         if(!query.id){
//             let productHTMLArray = products.map((prod)=>{
//                 return replaceHtml(productListHTML,prod);
//             })
//             let productResponseHTML = html.replace("{{%CONTENT%}}",productHTMLArray.join(','));
//             response.writeHead(200,{ 'Content-Type': 'text/html'});
//             response.end(productResponseHTML);
//         }else{
//             let prod = products[query.id];
//             let productResponseHTML = replaceHtml(productDetailHTML,prod);
//             response.end(html.replace("{{%CONTENT%}}",productResponseHTML));
//         }
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// });
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 19: Creating a Custom Module

// Core Modules 
// const http = require('http');
// const read = require('fs');
// const url = require('url');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");
// const productListHTML = read.readFileSync("./Template/product-list.html","utf-8");
// const productDetailHTML = read.readFileSync("./Template/product-details.html","utf-8");

// User Defined Modules
// const replaceHtml = require('./Modules/replaceHtml');

// const server = http.createServer((request,response)=>{
//     let {query,pathname:path} =  url.parse(request.url,true);

//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', productListHTML));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         if(!query.id){
//             let productHTMLArray = products.map((prod)=>{
//                 return replaceHtml(productListHTML,prod);
//             })
//             let productResponseHTML = html.replace("{{%CONTENT%}}",productHTMLArray.join(','));
//             response.writeHead(200,{ 'Content-Type': 'text/html'});
//             response.end(productResponseHTML);
//         }else{
//             let prod = products[query.id];
//             let productResponseHTML = replaceHtml(productDetailHTML,prod);
//             response.end(html.replace("{{%CONTENT%}}",productResponseHTML));
//         }
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// });
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 20 : Understanding Event-Driven Architecture

// CORE MODULES
// const http = require('http');
// const read = require('fs');
// const url = require('url');
// const products = JSON.parse(read.readFileSync('./Data/product.json','utf-8'));
// const html = read.readFileSync("./Template/index.html","utf-8");
// const productListHTML = read.readFileSync("./Template/product-list.html","utf-8");
// const productDetailHTML = read.readFileSync("./Template/product-details.html","utf-8");

// // USER DEFINED MODULES
// const replaceHtml = require('./Modules/replaceHtml');

// // Server Inherits from EventEmitter
// // Whenever there is a request recieved server emits "request" event
// const server = http.createServer();

// // On method listens the "request event"......////////
// server.on('request',(request,response)=>{
//     let {query,pathname:path} =  url.parse(request.url,true);
//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200,{
//             'Content-type':'text/html'
//         })
//         response.end(html.replace('{{%CONTENT%}}', productListHTML));
//     }else if(path.toLocaleLowerCase() === '/about'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on About Page"));
//     }else if(path.toLocaleLowerCase() === '/contact'){
//         response.end(html.replace('{{%CONTENT%}}', "You are on contact Page"));
//     }else if(path.toLocaleLowerCase() === '/products'){
//         if(!query.id){
//             let productHTMLArray = products.map((prod)=>{
//                 return replaceHtml(productListHTML,prod);
//             })
//             let productResponseHTML = html.replace("{{%CONTENT%}}",productHTMLArray.join(','));
//             response.writeHead(200,{ 'Content-Type': 'text/html'});
//             response.end(productResponseHTML);
//         }else{
//             let prod = products[query.id];
//             let productResponseHTML = replaceHtml(productDetailHTML,prod);
//             response.end(html.replace("{{%CONTENT%}}",productResponseHTML));
//         }
//     }
//     else{
//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not Found"));
//     }
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server has started");
// })

// Lecture 21: Emitting & Handling Custom Events

//Core Module
// const events = require('events');
// //USr Defined Module
// const user = require("./Modules/user");
// const myEmitter = new user();

// myEmitter.on('userCreated', (name,id)=>{
//     console.log(`A new user is created has name: ${name} and id: ${id}`);
// })
// myEmitter.on('userCreated',(name,id)=>{
//     console.log(`A new member is added to database had name: ${name} and id: ${id}`);
// })
// myEmitter.emit('userCreated', 'Arham',39);

//

// Lecture 23: Understanding Streams in Practice//////////////////////////////

// Solution 1: Without a Readable Stream

// const fs = require('fs');
// const http = require('http');

// const server = http.createServer((request,response)=>{
//     fs.readFile("./Files/large-file.tx","utf-8",(error,data)=>{
//         if(error){
//             response.end("Something went wrong");
//             return;
//         }
//         response.end(data);
//     })
// });
// server.listen(8000,'127.0.0.1');

// Solution 2: Using a Readable & Writable Stream

// const fs = require('fs');
// const http = require('http');

// const server = http.createServer((request,response)=>{
//     let rs = fs.createReadStream("./Files/large-file.txt");

    // whenever "createReadStream" method read the chunk of data it emits a "data" event which can be listen by on function

//     rs.on('data',(chunk)=>{
//         response.write(chunk);
//     })

    //After read all data it emits end event that can be listen

//     rs.on('end',()=>{
//         response.end();
//     })

//     rs.on('error',(error)=>{
//         response.end(error.message);
//     })
// })
// server.listen(8000,'127.0.0.1');

// Solution 3: Using pipe method

// const fs = require('fs');
// const http = require('http');

// const server = http.createServer((request,response)=>{
//     let rs = fs.createReadStream("./Files/large-file.txt");
//     // pipe method helps in maintaining back pressure (means data read faster than write)
//     rs.pipe(response);

// })
// server.listen(8000,'127.0.0.1');

// console.log("nodemon is working");

// Lecture 29 : Node JS Event Loop in Practice......./////////////////////////////////////////////////

// Example 1
// Below, in these two lines because of top level code these lines executed line by line synchronously
// console.log("program has started");
// console.log("program has ended");

// Example 2
// In this example firstly all top level code executed while after expired of set timeout callback func. pass to 1st phase of event loop 
//which wait until top level code executed then pass to main thread to execute the callback
// console.log("program has started");

// // Stored in 1st Phase
// setTimeout(()=>{
//     console.log("timer callback executed");
// },0)

// console.log("program has ended");

// Example 3
// console.log("program has started");

// // Stored in 1st Phase
// setTimeout(()=>{
//     console.log("timer callback executed");
// },0)
// // Stored in third phase
// setImmediate(()=>{console.log("Set immediate callback executed")});

// console.log("program has ended");


// Example 4
// const fs = require('fs');
// console.log("program has started");

// // Stored in 1st Phase
// setTimeout(()=>{
//     console.log("timer callback executed");
// },0)

// //Stored in 2nd Phase
// fs.readFile('./Files/input.txt',()=>{
//     console.log("file read complete");
// })

// // Stored in third phase
// setImmediate(()=>{console.log("Set immediate callback executed")});

// console.log("program has ended");

// // Example 5
// const fs = require('fs');
// console.log("program has started");

// //Stored in 2nd Phase
// fs.readFile('./Files/input.txt',()=>{
//     console.log("file read complete");

//     // Stored in 1st Phase
//     setTimeout(()=>{
//         console.log("timer callback executed");
//     },0)
    
//     // Stored in third phase
//     setImmediate(()=>{console.log("Set immediate callback executed")});
// })

// console.log("program has ended");

// Example 6
const fs = require('fs');
console.log("program has started");

//Stored in 2nd Phase
fs.readFile('./Files/input.txt',()=>{
    console.log("file read complete");

    // Stored in 1st Phase
    setTimeout(()=>{
        console.log("timer callback executed");
    },0)
    
    // Stored in third phase
    setImmediate(()=>{console.log("Set immediate callback executed")});

    process.nextTick(()=>{console.log("Process.nextTick callback executed")});
})

console.log("program has ended");

