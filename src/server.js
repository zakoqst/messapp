require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";



let app = express();



//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Messenger Jisr bot is running at the port ${port}`);
});