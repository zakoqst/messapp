// require("dotenv").config();
// import request from "request";

const dotenv =require("dotenv").config();
const request = require("request");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let handleSetupProfileAPI = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            let url = `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            // let url = `https://graph.facebook.com/v6.0/me?fields=id,name&access_token=${PAGE_ACCESS_TOKEN}&v=7.0`;
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?psid=${sender_psid}&access_token=${PAGE_ACCESS_TOKEN}&v=15.0`
            // let url = `https://graph.facebook.com/v15.0/me/custom_user_settings?psid=${sender_psid}&access_token=${PAGE_ACCESS_TOKEN}`
            console.log(sender_psid);
            let request_body = {
                "إبدأ": {
                    "payload": "GET_STARTED"
                },

            

                "psid": `${sender_psid}`,
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "تحدث مع عميل",
                                "payload": "CARE_HELP"
                            },
                            {
                                "type": "postback",
                                "title": "Outfit suggestions",
                                "payload": "CURATION"
                            },
                            {
                                "type": "web_url",
                                "title": "Shop now",
                                "url": "https://www.originalcoastclothing.com/",
                                "webview_height_ratio": "full"
                            }
                        ]
                    }
                ],
                "whitelisted_domains": [
                    "https://jisr-messenger-app.onrender.com/"
                ]
            
        
                
            };
        

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {         
                if (!err) {
                    console.log(body)
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
 