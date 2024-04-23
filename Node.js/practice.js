// const read = require('readline');
// const interface = read.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// interface.question("Enter Your Name: ",(name)=>{
//     console.log(name);
//     interface.close();
// })

// interface.on("close",()=>{
//     console.log("Closed");
//     process.exit(0);
// })


// const read = require('fs');
// const file = read.readFileSync("./FIles/input.txt","utf-8");
// // console.log(file);
// read.writeFileSync("./Files/another.txt",file);

// console.log("script start");

// const read = require('fs');
// read.readFile("./Files/another.txt","utf-8",(error,data)=>{
//     console.log(data);
// })
// console.log("script end");


const http = require('http');

const server = http.createServer((request,response)=>{
    response.end("<h1>This is the response</h1>");
    console.log(response);
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("Server Has started");
})
