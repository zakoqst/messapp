const express =require("express")
// import express from "express";
/*
config view engine for app
 */

let configViewEngine = (app) =>{
    app.use(express.static("./src/public"));
    app.use(express.static("./src/services"));
    app.set("view engine", "ejs");
    app.set("views","./src/views");
};

module.exports = configViewEngine;
