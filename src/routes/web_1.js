import express from "express";
import homepageController_1 from "../controllers/homepageController_1";

let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
    router.get("/", homepageController_1.getHomepage);
    router.get("/webhook", homepageController_1.getWebhook);
    router.post("/webhook", homepageController_1.postWebhook);
    router.post('/setup', homepageController_1.handleSetupInfor); //set up the persistent menu & get started button
    router.get('/get-survey', homepageController_1.handleGetSurveyPage); //webview
    router.post('/post-survey', homepageController_1.handlePostSurvey);
    // router.post('/write-data', homepageController.writeDataToGoogleSheet);
    return app.use("/", router);
};

module.exports = initWebRoutes;