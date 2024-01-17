require("dotenv").config();
import request from "request";

let postWebhook = (req, res) =>{
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

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

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

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

// function handleMessage(sender_psid, received_message) {
//     let response;

//     // Check if the message contains text
//     if (received_message.text) {
//         // Simple text-based logic instead of NLP
//         const messageText = received_message.text.toLowerCase();

//         if (messageText.includes("hello") || messageText.includes("hi")) {
//             response = { "text": "Hi there! How can I help you today?" };
//         } else if (messageText.includes("thank you") || messageText.includes("thanks")) {
//             response = { "text": "You're welcome! Let me know if there's anything else I can do for you." };
//         } else if (messageText.includes("bye")) {
//             response = { "text": "Goodbye! Have a great day!" };
//         } else {
//             // Default response for unhandled messages
//             response = { "text": "I'm not sure how to respond to that. Can you try asking something else?" };
//         }
//     } else if (received_message.attachments) {
//         // Handle message with attachment
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
//         };
//     } 
    
//     // Send the response message
//     callSendAPI(sender_psid, response);    
// }


// Function to handle postback events
function handlePostback(sender_psid, received_postback) {
    let response;
    // let payload = received_postback.payload;
    let payload = received_postback.postback.payload;
   // Set the response based on the postback payload
   if (payload.toLowerCase() === 'yes') {
    response = { "text": "Thanks!" };
    callSendAPI(sender_psid, response);
    console.log("Matched yes");
  } else if (payload.toLowerCase() === 'no') {
    response = { "text": "Oops, try sending another image." };
    callSendAPI(sender_psid, response);  
    console.log("Matched no");
  }

    // Send the message to acknowledge the postback
}

// Function to send response messages via the Send API
function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    request({
        "uri": `https://graph.facebook.com/V7.0/me/messages`,
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}

// Function to extract the first trait of an entity
function firstTrait(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}



//NLP

// Function to handle messages for specific reactions
function handleMessageWithReaction(sender_psid, message) {
    if (message && message.attachments && message.attachments[0].payload) {
        callSendAPI(sender_psid, "Thank you for watching my video !!!");
        callSendAPIWithTemplate(sender_psid);
        return;
    }

    const entitiesArr = ["wit$greetings", "wit$thanks", "wit$bye"];
    let entityChosen = "";
    entitiesArr.forEach((name) => {
        let entity = firstTrait(message.nlp, name);
        if (entity && entity.confidence > 0.8) {
            entityChosen = name;
        }
    });

    switch (entityChosen) {
        case "wit$greetings":
            callSendAPI(sender_psid, 'Hi there! This bot is created by Hary Pham. Watch more videos on HaryPhamDev Channel!');
            break;
        case "wit$thanks":
            callSendAPI(sender_psid, `You're welcome!`);
            break;
        case "wit$bye":
            callSendAPI(sender_psid, 'bye-bye!');
            break;
        default:
            callSendAPI(sender_psid, `The bot is needed more training, try to say "thanks a lot" or "hi" to the bot`);
    }
}

// Function to send a template message
let callSendAPIWithTemplate = (sender_psid) => {
    let body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Want to build sth awesome?",
                            "image_url": "https://www.nexmo.com/wp-content/uploads/2018/10/build-bot-messages-api-768x384.png",
                            "subtitle": "Watch more videos on my youtube channel ^^",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": "https://bit.ly/subscribe-haryphamdev",
                                    "title": "Watch now"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };

    request({
        "uri": `https://graph.facebook.com/V6.0/me/messages`,
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": body
    }, (err, res, body) => {
        if (!err) {
            console.log('Template message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};

