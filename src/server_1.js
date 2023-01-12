const dotenv =require("dotenv").config();
const express =require("express")
// require('dotenv').config();
// import express from "express";
const configViewEngine = require("./config/viewEngine_1")
const initWebRoutes = require("./routes/web_1")

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