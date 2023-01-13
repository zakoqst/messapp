const dotenv =require("dotenv").config();
// require("dotenv").config();
const request =require("request");
// import request from "request";
const homepageService = require("../services/homepageService")
// import homepageService_1 from "../services/homepageService";
// import homepageService from "../services/homepageService";
const { GoogleSpreadsheet } = require('google-spreadsheet');

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getWebhook = (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

};

// Handles messages events
let handleMessage = (sender_psid, received_message) => {
    let response;

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    // Send the response message
    callSendAPI(sender_psid, response);
};


let handlePostback= async (sender_psid, received_postback)=> {
    let response;
    
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    switch (payload) {
        case "GET_STARTED":
            await homepageService.handleGetStartedButton();;
            break;
        case "RESTART_CONVERSATION":
            awaithomepageService.handleGetStartedButton();;
            break;
        // case "TALK_AGENT":
        //     await chatbotService.requestTalkToAgent(sender_psid);
        //     break;
        // case "SHOW_HEADPHONES":
        //     await chatbotService.showHeadphones(sender_psid);
        //     break;
        // case "SHOW_TV":
        //     await chatbotService.showTVs(sender_psid);
        //     break;
        // case "SHOW_PLAYSTATION":
        //     await chatbotService.showPlaystation(sender_psid);
        //     break;
        // case "BACK_TO_CATEGORIES":
        //     await chatbotService.backToCategories(sender_psid);
        //     break;
        // case "BACK_TO_MAIN_MENU":
        //     await chatbotService.backToMainMenu(sender_psid);
        //     break;
        default:
            console.log("run default switch case")
    

    }



  };








// Handles messaging_postbacks events
// let handlePostback = async (sender_psid, received_postback) => {
//     let response;

//     // Get the payload for the postback
//     let payload = received_postback.payload;
//     // switch (payload) {
//     //     case "GET_STARTED":
//     //         await homepageService.handleGetStartedButton(); 
//     //         break;
//     //     case "RESTART_CONVERSATION":
//     //         await homepageService.handleGetStartedButton();
//     //         break;
//     //     default:
//     //         console.log("run default switch case")
//     //     };
//     // Set the response based on the postback payload
//     if (payload === 'yes') {
//         response = { "text": "Thanks!" }
//     } else if (payload === 'no') {
//         response = { "text": "Oops, try sending another image." }
//     } else if (payload === 'GET_STARTED') {
//         // response = {"text": "Hello zack"}
//         response= homepageService.handleGetStartedButton();
//         console.log(response);
         
//     } else if (payload === 'RESTART_CONVERSATION') {
//         response = homepageService.handleGetStartedButton();
//     }
//     // Send the message to acknowledge the postback
//     callSendAPI(sender_psid, response);

// }
// Sends response messages via the Send API
// let callSendAPI = (sender_psid, response) => {
//     // Construct the message body
//     let request_body = {
//         "recipient": {
//             "id": sender_psid
//         },
//         "message": response
//     };

//     // Send the HTTP request to the Messenger Platform
//     request({
//         "uri": "https://graph.facebook.com/v6.0/me/messages",
//         "qs": { "access_token": PAGE_ACCESS_TOKEN },
//         "method": "POST",
//         "json": request_body
//     }, (err, res, body) => {
//         if (!err) {
//             console.log('message sent!')
//         } else {
//             console.error("Unable to send message:" + err);
//             console.log('check error send messages 1111111111111')
//             console.log(res)
//             console.log('check error send messages 22222222222')
//         }
//     });
// };

let handleSetupInfor = async (req, res) => {
    //call the facebook api
    // Send the HTTP request to the Messenger Platform
    let request_body = {
        "get_started": {
            "payload": "GET_STARTED"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "web_url",
                        "title": "My youtube channel",
                        "url": "https://www.youtube.com/channel/UCHqJxLo7mKam9GKqqwr2wfA",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Source code this chatbot",
                        "url": "https://www.github.com/haryphamdev",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "postback",
                        "title": "Restart the converstaion",
                        "payload": "RESTART_CONVERSATION"
                    },
                ]
            }
        ],
        "whitelisted_domains": [
            "https://jisr-messenger-app.onrender.com", //link to your Heroku app
        ]
    };
    return new Promise((resolve, reject) => {
        try {
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, response, body) => {
                console.log('-------------------------------------------------------')
                console.log('Logs setup persistent menu & get started button: ', response)
                console.log('-------------------------------------------------------')
                if (!err) {
                    return res.send('Setup done!')
                } else {
                    return res.send('Something wrongs with setup, please check logs...')
                }
            });
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetSurveyPage = (req, res) => {
    const facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render('survey.ejs', {
        facebookAppId: facebookAppId
    });
}

let handlePostSurvey = async (req, res) => {
    let psid = req.body.psid;
    let name = req.body.name;
    let country = req.body.country;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let note = req.body.note;

    await writeDataToGoogleSheet(name, country, email, phonenumber, note);

    //send a text message
    await callSendAPI(psid, { text: `Done!\nYour information 's recorded!` });


    //send a button template message
    let response = homepageService.getButtonMessageTemplate();
    await callSendAPI(psid, response);

    return res.status(200).json({
        message: 'ok'
    })
}

let writeDataToGoogleSheet = async (name, country, email, phonenumber, note) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Initialize the sheet - doc ID is the long id in the sheets URL
            const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

            // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
            await doc.useServiceAccountAuth({
                client_email: JSON.parse(`"${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}"`),
                private_key: JSON.parse(`"${process.env.GOOGLE_PRIVATE_KEY}"`),
            });
            await doc.loadInfo(); // loads document properties and worksheets

            const sheet = doc.sheetsByIndex[0];
            const rows = await sheet.getRows();

            let id = rows.length + 1;

            await sheet.addRow(
                {
                    'No': id,
                    'Name': name,
                    'Country': country,
                    'Email': email,
                    'Phone number': phonenumber,
                    'Message': note
                }
            );

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getHomepage: getHomepage,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
    handleSetupInfor: handleSetupInfor,
    handleGetSurveyPage: handleGetSurveyPage,
    handlePostSurvey: handlePostSurvey,
    writeDataToGoogleSheet: writeDataToGoogleSheet
};








// // const { config } = require("dotenv");
// const dotenv =require("dotenv").config();
// const request = require("request");
// const homepageService = require("../services/homepageService");
// const chatbotService = require("../services/chatbotService");
// const templateMessage = require("../services/templateMessage");
// // require("dotenv").config();
// // import homepageService from "../services/homepageService";
// // import chatbotService from "../services/chatbotService";
// // import templateMessage from "../services/templateMessage";

// const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
// console.log(MY_VERIFY_TOKEN)

// let getHomePage = (req, res) => {
    
//     return res.render("homepage.ejs")
        
    
// };

// let getWebhook = (req, res) => {
//     // Your verify token. Should be a random string.
//     let VERIFY_TOKEN = MY_VERIFY_TOKEN;
    
    
//     // Parse the query params
//     let mode = req.query['hub.mode'];
//     let token = req.query['hub.verify_token'];
//     let challenge = req.query['hub.challenge'];
    
//     // Checks if a token and mode is in the query string of the request
//     if (mode && token) {
//         console.log(mode);
//         // Checks the mode and token sent is correct
//         if (mode === 'subscribe' && token ===VERIFY_TOKEN) {

//             // Responds with the challenge token from the request
//             console.log('WEBHOOK_VERIFIED');
//             res.status(200).send(challenge);

//         } else {
//             // Responds with '403 Forbidden' if verify tokens do not match
//             res.sendStatus(403);
//         }
//     }
    
// };

// let postWebhook = (req, res) => {
//     let body = req.body;

//     // Checks this is an event from a page subscription
//     if (body.object === 'page') {
//         // Iterates over each entry - there may be multiple if batched
//         body.entry.forEach(function (entry) {
//             //check the incoming message from primary app or not; if secondary app, exit
//             if (entry.standby) {
//                 //if user's message is "back" or "exit", return the conversation to the bot
//                 let webhook_standby = entry.standby[0];
//                 if (webhook_standby && webhook_standby.message) {
//                     if (webhook_standby.message.text === "back" || webhook_standby.message.text === "exit") {
//                         // call function to return the conversation to the primary app
//                         // chatbotService.passThreadControl(webhook_standby.sender.id, "primary");
//                         chatbotService.takeControlConversation(webhook_standby.sender.id);
//                     }
//                 }

//                 return;
//             }

//             //     // Gets the body of the webhook event
//             let webhook_event = entry.messaging[0];
//             console.log(webhook_event);

//             // Get the sender PSID
//             let sender_psid = webhook_event.sender.id;

//             // Check if the event is a message or postback and
//             // pass the event to the appropriate handler function
//             if (webhook_event.message) {
//                 handleMessage(sender_psid, webhook_event.message);
//             } else if (webhook_event.postback) {
//                 handlePostback(sender_psid, webhook_event.postback);
//             }
//         });

//         // Returns a '200 OK' response to all requests
//         res.status(200).send('EVENT_RECEIVED');
//     } else {
//         // Returns a '404 Not Found' if event is not from a page subscription
//         res.sendStatus(404);
//     }
// };

// let handleMessage = async (sender_psid, received_message) => {
//     //check the incoming message is a quick reply?
//     if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
//         let payload = received_message.quick_reply.payload;
//         if (payload === "CATEGORIES") {
//             await chatbotService.sendCategories(sender_psid);

//         } else if (payload === "LOOKUP_ORDER") {
//             await chatbotService.sendLookupOrder(sender_psid);

//         } else if (payload === "TALK_AGENT") {
//             await chatbotService.requestTalkToAgent(sender_psid);
//         }

//         return;
//     }


//     let response;

//     // Check if the message contains text
//     if (received_message.text) {
//         // Create the payload for a basic text message
//         response = {
//             "text": `You sent the message: "${received_message.text}". Now send me an image!`
//         }
//     } else if (received_message.attachments) {
//         // Get the URL of the message attachment
//         let attachment_url = received_message.attachments[0].payload.url;
//         response = {
//             "attachment": {
//                 "type": "template",
//                 "payload": {
//                     "template_type": "generic",
//                     "elements": [{
//                         "title": "Is this the right picture?",
//                         "subtitle": "Tap a button to answer.",
//                         "image_url": attachment_url,
//                         "buttons": [
//                             {
//                                 "type": "postback",
//                                 "title": "Yes!",
//                                 "payload": "yes",
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "No!",
//                                 "payload": "no",
//                             }
//                         ],
//                     }]
//                 }
//             }
//         }
//     }

//     // Sends the response message
//     await chatbotService.sendMessage(sender_psid, response);
// };

// let handlePostback= async (sender_psid, received_postback)=> {
//     let response;
    
//     // Get the payload for the postback
//     let payload = received_postback.payload;
  
//     // Set the response based on the postback payload
//     switch (payload) {
//         case "GET_STARTED":
//             await chatbotService.sendMessageWelcomeNewUser(sender_psid);
//             break;
//         case "RESTART_CONVERSATION":
//             await chatbotService.sendMessageWelcomeNewUser(sender_psid);
//             break;
//         case "TALK_AGENT":
//             await chatbotService.requestTalkToAgent(sender_psid);
//             break;
//         case "SHOW_HEADPHONES":
//             await chatbotService.showHeadphones(sender_psid);
//             break;
//         case "SHOW_TV":
//             await chatbotService.showTVs(sender_psid);
//             break;
//         case "SHOW_PLAYSTATION":
//             await chatbotService.showPlaystation(sender_psid);
//             break;
//         case "BACK_TO_CATEGORIES":
//             await chatbotService.backToCategories(sender_psid);
//             break;
//         case "BACK_TO_MAIN_MENU":
//             await chatbotService.backToMainMenu(sender_psid);
//             break;
//         default:
//             console.log("run default switch case")
    

//     }

//     // switch (payload) {
//     //     case "GET_STARTED":
//     //     case "RESTART_CONVERSATION":
//     //         await chatbotService.sendMessageWelcomeNewUser(sender_psid);
//     //         break;
//     //     default:
//     //         console.log("run default switch case")

//     // }

//     // callSendAPI(sender_psid,response);

//   };

// // let callSendAPI=async(sender_psid, response) => {

// //     await homepageService.markMessageRead(sender_psid);
// //     await homepageService.sendTypingOn(sender_psid);

// //         // Construct the message body
// //     let request_body = {
// //         "recipient": {
// //             "id": sender_psid
// //         },
// //         "message": response
// //     }

// //     // Send the HTTP request to the Messenger Platform
// //     request({
// //         "uri": "https://graph.facebook.com/v6.0/me/messages",
// //         "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
// //         "method": "POST",
// //         "json": request_body
// //         }, (err, res, body) => {
// //         if (!err) {
// //             console.log('message sent!')
// //         } else {
// //             console.error("Unable to send message:" + err);
// //         }
// //     }); 
// // }



// let handleSetupProfile = async(req,res)=>{
//     try {
//        await homepageService.handleSetupProfileAPI();
//         return res.redirect("/");
//     } catch (e) {
//         console.log(e);
//     }
// };

// let getSetupProfilePage = (req, res) => {
//     return res.render("profile.ejs");
// };

// let getInfoOrderPage = (req, res) => {
//     let facebookAppId = process.env.FACEBOOK_APP_ID;
//     return res.render("infoOrder.ejs", {
//         facebookAppId: facebookAppId
//     });
// };

// // let handlePostInfoOrderPage = (req, res) => {
// //     console.log('data form webview');
// //     console.log('psid :', req.body.psid);
// //     console.log('customerName :', req.body.customerName);
    


// // }
// let setInfoOrder = async (req, res) => {
//     try {
//         let customerName = "5";
//         if (req.body.customerName === "") {
//             customerName = "Empty";
//         } else customerName = req.body.customerName;

//         // I demo response with sample text
//         // you can check database for customer order's status

//         let response1 = {
//             "text": `---Info about your lookup order---
//             \nCustomer name: ${customerName}
//             \nEmail address: ${req.body.email}
//             \nOrder number: ${req.body.orderNumber}
//             `
//         };

//         let response2 = templateMessage.setInfoOrderTemplate();

//         await chatbotService.sendMessage(req.body.psid, response1);
//         await chatbotService.sendMessage(req.body.psid, response2);
        
//         return res.status(200).json({
//             message: "ok"
//         });
        
//     } catch (e) {
//         console.log(e);
//     }
// };
// module.exports = {
//     getHomePage: getHomePage,
//     getWebhook: getWebhook,
//     postWebhook: postWebhook,
//     handleSetupProfile: handleSetupProfile,
//     getSetupProfilePage: getSetupProfilePage,
//     getInfoOrderPage: getInfoOrderPage,
//     setInfoOrder: setInfoOrder,
//     // handlePostInfoOrderPage: handlePostInfoOrderPage

// };



