    require('dotenv').config();
const request = require("request");
const homepageService = require("../services/homepageService");
const chatbotService = require("../services/chatbotService");
const templateMessage = require("../services/templateMessage");
const path = require('path');
const { response } = require("express");


const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let getHomePage = (req, res) => {
    let facebookAppId = process.env.FACEBOOK_APP_ID;

    return res.render("homepage.ejs", {
        facebookAppId: facebookAppId
    })
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
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
      
            //check the incoming message from primary app or not; if secondary app, exit
            if (entry.standby) {
                //if user's message is "back" or "exit", return the conversation to the bot
                let webhook_standby = entry.standby[0];
                if (webhook_standby && webhook_standby.message) {
                    if (webhook_standby.message.text === "back" || webhook_standby.message.text === "exit") {
                        // call function to return the conversation to the primary app
                        // chatbotService.passThreadControl(webhook_standby.sender.id, "primary");
                        chatbotService.takeControlConversation(webhook_standby.sender.id);
                    }
                }

                return;
            }

            //     // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                if(webhook_event.postback.payload === 'order-now-button') {
                    handleOrderNowClick(webhook_event);
                    return;
                  }
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};


  
// Handles messages events
let handleMessage = async (sender_psid, received_message) => {
    //check the incoming message is a quick reply?
    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        let payload = received_message.quick_reply.payload;
        if (payload === "CATEGORIES") {
            await chatbotService.sendCategories(sender_psid);

        } else if (payload === "LOOKUP_ORDER") {
            await chatbotService.sendLookupOrder(sender_psid);

        } else if (payload === "PASS_ORDER") {
            await chatbotService.sendpassOrder(sender_psid);

        } else if (payload === "TALK_AGENT") {
            await chatbotService.requestTalkToAgent(sender_psid);
        } else if (payload === "LOOKUP_SURVEY") {
            await chatbotService.requestTalkToAgent(sender_psid);

          }
        
        return;
    }


    let response;

    // Check if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
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
                                "title": "yes",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "no",
                                "payload": "no",
                            },
                            {
                                "type": "postback",
                                "title": "iuo",
                                "payload": "iuo",
                            }
                        ],
                    }]
                }
            }
        }
    }
    callSendAPI(sender_psid, response);


        await chatbotService.sendMessage(sender_psid, response);


    
};

    let callSendAPI = (sender_psid, response) => {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v15.0/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    };


// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "GET_STARTED":
            await chatbotService.sendMessageWelcomeNewUser(sender_psid);
            break;
        case "RESTART_CONVERSATION":
            await chatbotService.sendMessageWelcomeNewUser(sender_psid);
            break;
        case "TALK_AGENT":
            await chatbotService.requestTalkToAgent(sender_psid);
            break;
        case "SHOW_HEADPHONES":
            await chatbotService.showHeadphones(sender_psid);
            break;
        case "SHOW_TV":
            await chatbotService.showTVs(sender_psid);
            break;
        case "SHOW_PLAYSTATION":
            await chatbotService.showPlaystation(sender_psid);
            break;
        case "BACK_TO_CATEGORIES":
            await chatbotService.backToCategories(sender_psid);
            break;
        case "BACK_TO_MAIN_MENU":
            await chatbotService.backToMainMenu(sender_psid);
            break;
        case "SHOW_CLOTHES":
            
            await chatbotService.showClothes(sender_psid);
            break;
        case "no":
            await chatbotService.handlePostback(sender_psid, received_postback);
            break;
        default:
            console.log("run default switch case")

    }
   
};

let handleSetupProfile = async (req, res) => {
    try {
        await homepageService.handleSetupProfileAPI();
        return res.redirect("/");
    } catch (e) {
        console.log(e);
    }
};

let getSetupProfilePage = (req, res) => {
    return res.render("profile.ejs");
};


let getOrderProductPage = (req, res) => {
    // let facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render("productOrder.ejs", {
        // facebookAppId: facebookAppId
    });
};




let setProductOrder = async (req, res) => {
    try {
        let name = req.body.name;
        let psid=req.body.psid;
        let order_number=req.body.order_number;
        let email=req.body.email;
        let product=req.body.product;
        let quantity =req.body.quantity;
        let comments = req.body.comments;

        console.log(name, psid, order_number, email, product,quantity,comments)

     
        let response1 = {
            "text": `---Info about your lookup order---
            \nName: ${req.body.name}
            \nPSID: ${req.body.psid}
            \nproduct: ${product}
            \nEmail address: ${req.body.email}
            \nquantity: ${req.body.quantity}
            \ncomments: ${req.body.comments}
            `
        };
        console.log(response1);
      
        let response2 = templateMessage.setProductOrderTemplate();

        await callSendAPI(psid,{text:response1})
        await callSendAPI(psid,{text:response2})
        await chatbotService.sendMessage(req.body.psid, {text:response1});
        await chatbotService.sendMessage(req.body.psid, response2);

        return res.status(200).json({
            message: "ok"
        });
    } catch (e) {
        // reject(ER);
        console.log(e);
    }
};



let getInfoOrderPage = (req, res) => {
    let facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render("infoOrder.ejs", {
        facebookAppId: facebookAppId
    });
};

let setInfoOrder = async (req, res) => {
    try {
        let customer = req.body.customer;
        let psid=req.body.psid;
        let order_number=req.body.order_number;
        let email=req.body.email;

        console.log(customer,order_number,email);


     
        let response1 = {
            "text": `---Info about your lookup order---
            \nPSID: ${req.body.psid}
            \nCustomer name: ${customer}
            \nEmail address: ${req.body.email}
            \nOrder number: ${req.body.order_number}
            `
        };
        console.log(response1);
      
        let response2 = templateMessage.setInfoOrderTemplate();

        await callSendAPI(psid,{text:response1})
        await callSendAPI(psid,{text:response2})
        await chatbotService.sendMessage(req.body.psid, {text:response1});
        await chatbotService.sendMessage(req.body.psid, response2);

        return res.status(200).json({
            message: "ok"
        });
    } catch (e) {
        // reject(ER);
        console.log(e);
    }
};

module.exports = {
    getHomePage,
    getWebhook,
    postWebhook,
    handleSetupProfile,
    getSetupProfilePage,
    getInfoOrderPage,
    setInfoOrder,
    setProductOrder,
    getOrderProductPage
};