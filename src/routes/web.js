// const express =require("express")
// // import express from "express";
// const homepageController =require("../controllers/homepageController")
// // import homepageController from "../controllers/homepageController";
// const router = express.Router();
// // let router = express.Router();

// //init all web routes
// let initWebRoutes = (app) => {
//     router.get("/", homepageController.getHomepage);
//     router.get("/webhook", homepageController.getWebhook);
//     router.post("/webhook", homepageController.postWebhook);
//     router.post('/setup', homepageController.handleSetupInfor); //set up the persistent menu & get started button
//     router.get('/get-survey', homepageController.handleGetSurveyPage); //webview
//     router.post('/post-survey', homepageController.handlePostSurvey);
    
//     router.get("/info-order", homepageController.getInfoOrderPage);
//     router.post("/set-info-order", homepageController.setInfoOrder);

//     router.post('/write-data', homepageController.writeDataToGoogleSheet);
//     return app.use("/", router);
// };
// // module.exports = {
// //     // initWebRoutes: initWebRoutes,
// //     router: router,
// // };
// module.exports = {initWebRoutes};
// // module.exports = router;


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------



const express =require("express")
// // import express from "express";
// // import homepageController from "../controllers/homepageController";
const homepageController =require("../controllers/homepageController");
const sheetService = require("../services/sheetService");

let router = express.Router();

let initWebRoutes = (app)=> {
    
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", homepageController.getWebhook);
    router.post("/webhook", homepageController.postWebhook);
    router.post("/set-up-profile", homepageController.handleSetupProfile);
    router.post('/hook', (req, res) => {
        // Log the incoming data to the console
        console.log('Webhook Received:', req.body);
      
        // Respond to the incoming request
        res.status(200).send('Webhook received successfully.');
      });
      
        // router.post('/setup', homepageController.handleSetupInfor); //set up the persistent menu & get started button
    router.get("/set-up-profile", homepageController.getSetupProfilePage);
    // router.get('/get-survey', homepageController.handleGetSurveyPage); //webview
    // router.post('/post-survey', homepageController.handlePostSurvey);
    
    router.get("/ ", homepageController.getInfoOrderPage);
    router.post('/set-info-order', homepageController.setInfoOrder);
    
    router.get("/get-order-form", homepageController.getOrderProductPage);
    router.post("/post-order-form", homepageController.setInfoOrder);
    
    router.get("/get-messenger-template", sheetService.getMessengerTemplateData);
    router.get("/get-product/:id", async (req, res, next) => {
        const result = await sheetService.getProductById(req.params.id);
        console.log('----------',result);
        res.json(result);
    });

    return app.use("/",router);
};

module.exports = initWebRoutes;
// module.exports = router;