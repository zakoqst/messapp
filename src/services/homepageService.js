const dotenv =require("dotenv").config();
// require('dotenv').config();


let handleGetStartedButton = () => {

    return new Promise(async (resolve, reject) => {
                try {
    let response1 = {
                        "text": "Hi zack! Welcome to Jisr Service Zakaria, where you will find what you need."
                    };
                    resolve("done");                
    return response1;
    
    // let response = {
    //     "attachment": {
    //         "type": "template",
    //         "payload": {
    //             "template_type": "generic",
    //             "elements": [
    //                 {
    //                     "title": "Welcome to the HaryPhamDev new Chatbot!",
    //                     "image_url": "https://di-ph.rdtcdn.com/videos/202107/20/391567851/thumbs_10/(m=eaSaaTbWx)(mh=VsxeMAIufJblNkNC)13.jpg",
    //                     // "image_url": `${process.env.IMAGE_GET_STARTED_BUTTON_URL}`,
    //                     "subtitle": "(saving data to google sheet)",
    //                     "default_action": {
    //                         "type": "web_url",
    //                         "url": "https://www.youtube.com/channel/UCHqJxLo7mKam9GKqqwr2wfA",
    //                         "webview_height_ratio": "tall",
    //                     },
    //                     "buttons": [
    //                         {
    //                             "type": "web_url",
    //                             "url": `${process.env.URL_WEB_VIEW_SURVEY}`,
    //                             "webview_height_ratio": "tall",
    //                             "title": "Start survey",
    //                             "messenger_extensions": true //false: open the webview in new tab
    //                         },
    //                         {
    //                             "type": "web_url",
    //                             "url": "https://www.youtube.com/channel/UCHqJxLo7mKam9GKqqwr2wfA",
    //                             "title": "Watch more!"
    //                         },
    //                     ]
    //                 }
    //             ]
    //         }
    //     }
    // };
    
    
 
            } catch (e) {
                reject(e);
            }
        });
    

}

let getButtonMessageTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "https://docs.google.com/spreadsheets/d/1xI6gppm13aAPATpbC1AIx6Ahj_cqIQrEHF25uU1Ye6k/edit?usp=sharing",
                        "title": "View Data 😁"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_SURVEY}`,
                        "webview_height_ratio": "tall",
                        "title": "Try again!",
                        "messenger_extensions": true //false: open the webview in new tab
                    },

                ]
            }
        }
    }

    return response;
}
module.exports = {
    handleGetStartedButton: handleGetStartedButton,
    getButtonMessageTemplate: getButtonMessageTemplate
};
















/* // require("dotenv").config();
// import request from "request";

const dotenv =require("dotenv").config();
const request = require("request");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let handleSetupProfileAPI = () => {
    return new Promise((resolve, reject) => {
        try {
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            let url = `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            // let url = `https://graph.facebook.com/v6.0/me?fields=id,name&access_token=${PAGE_ACCESS_TOKEN}&v=7.0`;
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?psid=${sender_psid}&access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?psid=${sender_psid}&access_token=${PAGE_ACCESS_TOKEN}`
            // console.log(sender_psid);
            let request_body = {
                "get_started": {
                    "payload": "GET_STARTED"
                },

            

                // "psid": sender_psid,
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "Talk to an agent",
                                "payload": "TALK_AGENT"
                            },
                            {
                                "type": "postback",
                                "title": "Restart this conversation",
                                "payload": "RESTART_CONVERSATION"
                            }
                            // {
                            //     "type": "nested",
                            //     "title": "More info",
                            //     "call_to_actions": [
                            //         {
                            //             "type": "web_url",
                            //             "title": "View Facebook Fan Page",
                            //             "url": "https://www.facebook.com/haryphamdev",
                            //             "webview_height_ratio": "full"
                            //         },
                            //         {
                            //             "type": "web_url",
                            //             "title": "View Youtube channel",
                            //             "url": "https://bit.ly/subscribe-haryphamdev",
                            //             "webview_height_ratio": "full"
                            //         },
                            //     ]
                                
                            // }
                        ]
                    }
                ],
                "whitelisted_domains": [
                    "https://jisr-messenger-app.onrender.com/",
                    "https://jisr-messenger-app.onrender.com/info-order",
                    "http://localhost:8080/info-order"
                ]
            
        
                
            };
        

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {         
                if (!err) {
                    // console.log(body)
                    resolve("Done!")
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            // Send the HTTP request to the Messenger Platform
            let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
            console.log(sender_psid)
            request({
                "uri": url,
                "method": "GET",
            }, (err, res, body) => {
                if (!err) {
                    //convert string to json object
                    body = JSON.parse(body);
                    let username = `${body.last_name} ${body.first_name}`;
                    resolve(username);
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };

            let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let markMessageRead = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };

            let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    handleSetupProfileAPI: handleSetupProfileAPI,
    getFacebookUsername: getFacebookUsername,
    markMessageRead: markMessageRead,
    sendTypingOn: sendTypingOn
};
  */