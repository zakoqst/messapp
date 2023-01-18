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
const homepageController =require("../controllers/homepageController")

let router = express.Router();

let initWebRoutes = (app)=> {
    
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", homepageController.getWebhook);
    router.post("/webhook", homepageController.postWebhook);
    router.post("/set-up-profile", homepageController.handleSetupProfile);
        // router.post('/setup', homepageController.handleSetupInfor); //set up the persistent menu & get started button
    router.get("/set-up-profile", homepageController.getSetupProfilePage);
    // router.get('/get-survey', homepageController.handleGetSurveyPage); //webview
    // router.post('/post-survey', homepageController.handlePostSurvey);
    
    router.get("/info-order", homepageController.getInfoOrderPage);
    router.post('/set-info-order', homepageController.setInfoOrder);


    return app.use("/",router);
};

module.exports = initWebRoutes;
// module.exports = router;