// const { config } = require("dotenv");
const dotenv =require("dotenv").config();
const express =require("express")
// import express from "express";
// import configViewEngine from "./config/viewEngine";
const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./routes/web")
// import initWebRoutes from "./routes/web";


// import bodyParser from "body-parser";
const bodyParser = require("body-parser")

// const Parse = require('parse/node')
// // // const express = require('express')
// const APP_ID="57QeEwR8Jc0rC5Fg6yXyTpCGzpn8zijeHSHqHBNQ"
// const JAVASCRIPT_ID="WqGAtQtmSxDfelKaCn5T02XCPDjmd9Zpf3PFhKQc"

// Parse.initialize(APP_ID,JAVASCRIPT_ID);
// Parse.serverURL='https://parseapi.back4app.com/'

// const Appartement = Parse.Object.extend("Appartement");
// const appartement = new Appartement();
// const appartementQuery = new Parse.Query(Appartement);

// // // const appp = express();
let app = express();
// app.get('/',(req,res)=>{

//     appartementQuery.find()
//     .then((obj)=>res.json(obj))
//     .catch((err)=>res.json(err))
// })

// const portt = process.env.PORT || 4000
// app.listen(portt,()=>{
//     console.log("server is running on port", portt)
// })



// let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Messenger Jisr bot is running at the port ${port}`);
});