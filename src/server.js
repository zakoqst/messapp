const dotenv =require("dotenv").config();
const express =require("express")
// require('dotenv').config();
// import express from "express";
const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./routes/web")

// import configViewEngine from "./config/viewEngine_1";
// import initWebRoutes from "./routes/web_1";
const bodyParser =require("body-parser")
// import bodyParser from "body-parser";

let app = express();

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//config web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Messenger bot is running at the port ${port}`);
});








// // const { config } = require("dotenv");
// const dotenv =require("dotenv").config();
// const express =require("express")
// // import express from "express";
// // import configViewEngine from "./config/viewEngine";
// const configViewEngine = require("./config/viewEngine")
// const initWebRoutes = require("./routes/web")
// // import initWebRoutes from "./routes/web";


// // import bodyParser from "body-parser";
// const bodyParser = require("body-parser")


// const app = express();





// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //config view engine
// configViewEngine(app);

// //init web routes
// initWebRoutes(app);

// let port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`Messenger Jisr bot is running at the port ${port}`);
// });