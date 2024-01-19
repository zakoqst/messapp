const dotenv =require("dotenv").config();
const request = require("request");
const homepageService = require("../services/homepageService");
const templateMessage = require("../services/templateMessage");
// import request from "request";
// import homepageService from "./homepageService";
// import templateMessage from "./templateMessage";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

let sendMessageWelcomeNewUser = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await homepageService.getFacebookUsername(sender_psid);
            //send text message
            let response1 = {
                "text": `Hi ${username}! Welcome to Tech Shop Haryphamdev, where you will find what you need.`
            };

            //send an image
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://bit.ly/imageWelcome"
                    }
                }
            };

            let response3 = {
                "text": "At any time, use the menu below to navigate through the features."
            };

            //send a quick reply
            let response4 = {
                "text": "What can I do to help you today?",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "Categories",
                        "payload": "CATEGORIES",
                    },
                    {
                        "content_type": "text",
                        "title": "Lookup Order",
                        "payload": "LOOKUP_ORDER",
                    },
                    {
                        "content_type": "text",
                        "title": "Create Order",
                        "payload": "PASS_ORDER",
                    },
                    {
                        "content_type": "text",
                        "title": "Talk to an agent",
                        "payload": "TALK_AGENT",
                    },
                    {
                        "content_type": "text",
                        "title": "Lookup Survey",
                        "payload": "LOOKUP_SURVEY",
                    },
                ]
            };

            // await sendMessage(sender_psid, response1);
            // await sendMessage(sender_psid, response2);
            // await sendMessage(sender_psid, response3);
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Handles messaging_postbacks events
let handlePostback = (senderPsid, receivedPostback) => {
    return new Promise(async (resolve, reject) => {
      let response;
  
      // Get the payload for the postback
      let payload = receivedPostback.payload;
      console.log(payload);
  
      // Set the response based on the postback payload
      if (payload === 'fa') {
        response = { 'text': 'bla!' };
      } else if (payload === 'no') {
        response = { 'text': 'Oops, try sending another image.' };
      }
  
      // Send the message to acknowledge the postback
      await callSendAPI(senderPsid, response);
  
      // Resolve the promise to indicate successful execution
      resolve();
    });
  };
  

// Sends response messages via the Send API
let callSendAPI = (senderPsid, response) => {
    return new Promise((resolve, reject) => {
      // The page access token we have generated in your app settings
      const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  
      // Construct the message body
      let requestBody = {
        'recipient': {
          'id': senderPsid
        },
        'message': response
      };
  
      // Send the HTTP request to the Messenger Platform
      request({
        'uri': 'https://graph.facebook.com/v2.6/me/messages',
        'qs': { 'access_token': PAGE_ACCESS_TOKEN },
        'method': 'POST',
        'json': requestBody
      }, (err, _res, _body) => {
        if (!err) {
          console.log('Message sent!');
          resolve(); // Resolve the promise on success
        } else {
          console.error('Unable to send message:' + err);
          reject(err); // Reject the promise on error
        }
      });
    });
  };
  
let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            await homepageService.markMessageRead(sender_psid);
            await homepageService.sendTypingOn(sender_psid);
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
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let requestTalkToAgent = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a text message
            let response1 = {
                "text": "Ok. Someone real will be with you in a few minutes ^^"
            };

            await sendMessage(sender_psid, response1);

            //change this conversation to page inbox
            let app = "page_inbox"
            await passThreadControl(sender_psid, app);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let passThreadControl = (sender_psid, app) => {
    return new Promise((resolve, reject) => {
        try {
            let target_app_id = "";
            let metadata = "";

            if(app === "page_inbox"){
                target_app_id = SECONDARY_RECEIVER_ID;
                metadata = "Pass thread control to inbox chat";
            }
            if(app === "primary"){
                target_app_id = PRIMARY_RECEIVER_ID;
                metadata = "Pass thread control to the bot, primary app";
            }
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "target_app_id": target_app_id,
                "metadata": metadata
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v7.0/me/pass_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(body)
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendCategories = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response = templateMessage.sendCategoriesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendpassOrder = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.senPassOrderTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendLookupOrder = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendLookupOrderTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};


let showClothes = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendClothesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let showHeadphones = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendHeadphonesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let showTVs = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let showPlaystation = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let backToCategories = (sender_psid) => {
    sendCategories(sender_psid)
};


let backToMainMenu = (sender_psid) => {

    sendMessageWelcomeNewUser(sender_psid)
};



let takeControlConversation = (sender_psid) =>{
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "metadata": "Pass this conversation from page inbox to the bot - primary app"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v7.0/me/take_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, async (err, res, body) => {
                if (!err) {
                    //send messages
                    await sendMessage(sender_psid, {"text": "The super bot came back !!!"});
                    await backToMainMenu(sender_psid);
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendMessage: sendMessage,
    sendMessageWelcomeNewUser: sendMessageWelcomeNewUser,
    sendCategories: sendCategories,
    sendLookupOrder: sendLookupOrder,
    requestTalkToAgent: requestTalkToAgent,
    showHeadphones: showHeadphones,
    showTVs: showTVs,
    showPlaystation: showPlaystation,
    backToCategories: backToCategories,
    backToMainMenu: backToMainMenu,
    passThreadControl: passThreadControl,
    takeControlConversation: takeControlConversation,
    handlePostback:handlePostback,
    showClothes:showClothes,
    sendpassOrder:sendpassOrder
    
    // sendProductTemplate:sendProductTemplate
};