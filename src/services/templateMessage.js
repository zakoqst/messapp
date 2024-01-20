const { google } = require('googleapis');
// const {GoolgleSpreadsheet} = require('google-spreadsheet');
const fs = require('fs');

// Load credentials from a JSON key file (replace 'path/to/your/credentials.json' with the actual path)
const credentials = require('../../EcommerceApiKey.json');


// Google Sheets params
const SHEET_ID = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';
const SHEET_RANGE = 'Test Catalogue produit!A:I';let sendClothesTemplate = async () => {
    try {
        console.log('Preparing to send clothes template...');

        // Fetch clothing data
        const clothingData = await fetchClothingData();
        console.log('Fetched clothing data:', clothingData);

        // Map clothing data to template elements
        const elements = clothingData.map(item => {
            return {
                "title": item.name,
                "image_url": item.imageUrl,
                "subtitle": `${item.price} DA`,
                "default_action": {
                    "type": "web_url",
                    "url": item.viewUrl,
                    "webview_height_ratio": "tall",
                },
                "buttons": [
                    {
                        "type": "web_url",
                        "url": item.orderUrl,
                        "title": "Order now",
                    },
                    {
                        "type": "postback",
                        "title": "Back to categories",
                        "payload": "BACK_TO_CATEGORIES",
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU",
                    },
                ],
            };
        });

        // Create template
        const template = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements,
                },
            },
        };

        console.log('Clothes template created:', template);
        return template;
    } catch (error) {
        console.error('Error in sendClothesTemplate:', error);
        throw error;
    }
};


// Fetch rows from sheet for clothes
const fetchClothingData = async () => {
    const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Fetch rows from sheet for clothes
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: SHEET_RANGE,
    });

    // Return clothing data
    return response.data.values.map(row => {
        return {
            name: row[0],
            imageUrl: row[1],
            price: row[2],
            viewUrl: row[3],
            orderUrl: row[4],
        };
    });
};















// Call the function
// sendClothesTemplate();


let sendCategoriesTemplate = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    
                    {
                        "title": "Headphones",
                        "image_url": "https://bit.ly/imageHeadphones",
                        "subtitle": "Bose Noise Cancelling Wireless Bluetooth Headphones",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/webHeadphones",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/webHeadphones",
                                "title": "View on Website"
                            },
                            {
                                "type": "postback",
                                "title": "Show Headphones",
                                "payload": "SHOW_HEADPHONES"
                            }
                        ]
                    },
                    {
                        "title": "TV",
                        "image_url": "https://bit.ly/imageTV",
                        "subtitle": "Master of quality & Incredible clarity",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/webTelevision",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/webTelevision",
                                "title": "View on Website"
                            }, {
                                "type": "postback",
                                "title": "Show TVs",
                                "payload": "SHOW_TV"
                            }
                        ]
                    },
                    
                    {
                        "title": "Playstation",
                        "image_url": "https://bit.ly/imagePlaystation",
                        "subtitle": "Incredible games & Endless entertainment",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/webPlaystation",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/webPlaystation",
                                "title": "View on Website"
                            }, {
                                "type": "postback",
                                "title": "Show Playstation",
                                "payload": "SHOW_PLAYSTATION"
                            }
                        ]
                    },
                    {
                        "title": "Clothes",
                        "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Jeans.jpg",
                        "subtitle": "Nice looking clothes!!!",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Jeans.jpg",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/webPlaystation",
                                "title": "View on Website"
                            }, {
                                "type": "postback",
                                "title": "Show Clothes",
                                "payload": "SHOW_CLOTHES"
                            }
                        ]
                    },
                ]
            }
        }
    };
};


// let sendClothesTemplate = () => {
//     return {
//         "attachment": {
//             "type": "template",
//             "payload": {
//                 "template_type": "generic",
//                 "elements": [
//                     {
//                         "title": "Jean-Vert",
//                         "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Jeans.jpg",
//                         "subtitle": "Size: Taille 42\nPrice: 3500 DA",
//                         "default_action": {
//                             "type": "web_url",
//                             "url": "https://bit.ly/viewJeanVert",
//                             "webview_height_ratio": "tall",
//                         },
//                         "buttons": [
//                             {
//                                 "type": "postback",
//                                 "title": "Order now",
//                                 "payload": "ORDER"
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "Back to categories",
//                                 "payload": "BACK_TO_CATEGORIES"
                            // },
                            // {
                            //     "type": "postback",
                            //     "title": "Main menu",
                            //     "payload": "BACK_TO_MAIN_MENU"
                            // }
//                         ]
//                     },
//                     {
//                         "title": "Pull - Noir",
//                         "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Pull.jpg",
//                         "subtitle": "Size: Taille L\nPrice: 2000 DA",
//                         "default_action": {
//                             "type": "web_url",
//                             "url": "https://bit.ly/viewPullNoir",
//                             "webview_height_ratio": "tall",
//                         },
//                         "buttons": [
//                             {
//                                 "type": "postback",
//                                 "title": "Order now",
//                                 "payload": "ORDER"
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "Back to categories",
//                                 "payload": "BACK_TO_CATEGORIES"
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "Main menu",
//                                 "payload": "BACK_TO_MAIN_MENU"
//                             }
//                         ]
//                     },
//                     {
//                         "title": "Vest-Gris",
//                         "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Blazer.jpg",
//                         "subtitle": "Size: Taille L\nPrice: 5000 DA",
//                         "default_action": {
//                             "type": "web_url",
//                             "url": "https://bit.ly/viewVestGris",
//                             "webview_height_ratio": "tall",
//                         },
//                         "buttons": [
//                             {
//                                 "type": "web_url",
//                                 "url": `${process.env.URL_WEB_VIEW_ORDER_2}`,
//                                 "webview_height_ratio": "tall",
//                                 "messenger_extensions": true,  //false: open the webview in new tab
//                                 "title": "Order now"
//                                 // "id": "order-now-button" 
                                
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "Back to categories",
//                                 "payload": "BACK_TO_CATEGORIES"
//                             },
//                             {
//                                 "type": "postback",
//                                 "title": "Main menu",
//                                 "payload": "BACK_TO_MAIN_MENU"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         }
//     };
// }

let sendHeadphonesTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Sony Noise Cancelling Headphones WH1000XM3",
                        "image_url": "https://bit.ly/imageHeadphone1a",
                        "subtitle": "$348.00",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/viewHeadphone1",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/orderHeadphone1",
                                "title": "Order now"
                            },
                            {
                                "type": "postback",
                                "title": "Back to categories",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Jean-Vert",
                        "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Jeans.jpg",
                        "subtitle": "3500 DA",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/viewHeadphone2",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/orderHeadphone2",
                                "title": "Order now"
                            },
                            {
                                "type": "postback",
                                "title": "Back to categories",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Sony Wireless in-Ear Headset",
                        "image_url": "https://bit.ly/imageHeadphone1c",
                        "subtitle": "$38.00",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://bit.ly/viewHeadphone3",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://bit.ly/orderHeadphone3",
                                "title": "Order now"
                            },
                            {
                                "type": "postback",
                                "title": "Back to categories",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    }
                ]
            }
        }
    };
};


let sendLookupOrderTemplate = () =>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"OK. Let's set info about your order, so I won't need to ask for them in the future.",
                "buttons":[
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                        "title": "Set info",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};



let senPassOrderTemplate = () =>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"OK. Let's set info about your order, so I won't need to ask for them in the future.",
                "buttons":[
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER_2}`,
                        "title": "Make Order",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};


let sendSureveyTemplate = () =>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"OK.  future.",
                "buttons":[
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_SURVEY}`,
                        // "url": "https://jisr-messenger-app.onrender.com/info-order",
                        "title": "Data",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

let backToMainMenuTemplate = ()=>{
    return {
        "text": "What can I do to help you today?",
        "quick_replies": [
            {
                "type": "postback",
                "title": "Main menu",
                "payload": "BACK_TO_MAIN_MENU"
            },
 
            {
                "content_type": "text",
                "title": "Lookup Order",
                "payload": "LOOKUP_ORDER",
            },
            {
                "content_type": "text",
                "title": "Talk to an agent",
                "payload": "TALK_AGENT",
            },
        ]
    };
};

let setInfoOrderTemplate = ()=>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"We're checking your order. We will send you a message when the process is complete." +
                    "\nThank you!",
                "buttons":[
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};



let setProductOrderTemplate = ()=>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"set up your order." +
                    "\nThank you!",
                "buttons":[
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};
module.exports = {
    sendCategoriesTemplate: sendCategoriesTemplate,
    sendHeadphonesTemplate: sendHeadphonesTemplate,
    sendLookupOrderTemplate: sendLookupOrderTemplate,
    backToMainMenuTemplate: backToMainMenuTemplate,
    setInfoOrderTemplate: setInfoOrderTemplate,
    sendSureveyTemplate:sendSureveyTemplate,
    sendClothesTemplate:sendClothesTemplate,
    setProductOrderTemplate:setProductOrderTemplate,
    senPassOrderTemplate:senPassOrderTemplate
    // createProductTemplate:createProductTemplate
};
