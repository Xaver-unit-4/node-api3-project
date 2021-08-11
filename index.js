const express = require("express");
const cors = require("cors");
const path = require("path");


// require your server and launch it
const server = require('./api/server');

const port = process.env.PORT || 9000;

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "client/build")));
server.use("/api/",(_,res)=>{
  res.json({data:"The API is serving data!!!"})
})


server.listen(port, () => {
  console.log(`Message in the terminal. Server started on localhost: ${port}`)
})

server.use("*",(_,res)=>{
  res.sendFile(path.join(__dirname,"client/build","index.html"))
})


console.log("It's alive!!!!")
console.log(__dirname)
console.log(__filename)
console.log(process.env.USER)
console.log(process.env.PORT)
console.log(process.env.FUN_FACT)
console.log(process.env.FOOD)
console.log(process.env.COHORT)