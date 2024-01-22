const sheetService = require("./sheetService");



let sendCategoriesTemplate = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    
                    {
                        "title": "p",
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

let sendClothesTemplate = async () => {
    return await sheetService.generateMessengerTemplate();


   
    // return {
    //     "attachment": {
    //         "type": "template",
    //         "payload": {
    //             "template_type": "generic",
    //             "elements": [
    //                 {
    //                     "title": "Jean-Vert",
    //                     "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Jeans.jpg",
    //                     "subtitle": "Size: Taille 42\nPrice: 3500 DA",
    //                     "default_action": {
    //                         "type": "web_url",
    //                         "url": "https://bit.ly/viewJeanVert",
    //                         "webview_height_ratio": "tall",
    //                     },
    //                     "buttons": [
    //                         {
    //                             "type": "postback",
    //                             "title": "Order now",
    //                             "payload": "ORDER"
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Back to categories",
    //                             "payload": "BACK_TO_CATEGORIES"
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Main menu",
    //                             "payload": "BACK_TO_MAIN_MENU"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "title": "Pull - Noir",
    //                     "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Pull.jpg",
    //                     "subtitle": "Size: Taille L\nPrice: 2000 DA",
    //                     "default_action": {
    //                         "type": "web_url",
    //                         "url": "https://bit.ly/viewPullNoir",
    //                         "webview_height_ratio": "tall",
    //                     },
    //                     "buttons": [
    //                         {
    //                             "type": "postback",
    //                             "title": "Order now",
    //                             "payload": "ORDER"
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Back to categories",
    //                             "payload": "BACK_TO_CATEGORIES"
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Main menu",
    //                             "payload": "BACK_TO_MAIN_MENU"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "title": "Vest-Gris",
    //                     "image_url": "https://raw.githubusercontent.com/zakoqst/messapp/master/src/public/assets/productimages/Blazer.jpg",
    //                     "subtitle": "Size: Taille L\nPrice: 5000 DA",
    //                     "default_action": {
    //                         "type": "web_url",
    //                         "url": "https://bit.ly/viewVestGris",
    //                         "webview_height_ratio": "tall",
    //                     },
    //                     "buttons": [
    //                         {
    //                             "type": "web_url",
    //                             "url": `${process.env.URL_WEB_VIEW_ORDER_2}?product=Vest-Gris&size=L&price=5000`,
    //                             "webview_height_ratio": "tall",
    //                             "messenger_extensions": true,  //false: open the webview in new tab
    //                             "title": "Order now",
                                
                                
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Back to categories",
    //                             "payload": "BACK_TO_CATEGORIES"
    //                         },
    //                         {
    //                             "type": "postback",
    //                             "title": "Main menu",
    //                             "payload": "BACK_TO_MAIN_MENU"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     }
    // };
}

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

// console.log(sendHeadphonesTemplate);

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

function sendRecipient(formData) {
    // Use the formData object to construct the sendRecipient template
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": 'receipt',
                "recipient_name": formData.nom, // Replace with actual recipient name
                "order_number": '123456', // Replace with actual order number
                "currency": 'DA',
                "payment_method": 'Visa 1234', // Replace with actual payment method
                "timestamp": Date.now(),
                "elements": [
                    {
                        // Use formData to populate the elements array
                        "title": formData.product,
                        "subtitle": `Size: ${formData.size}\nPrice: ${formData.price} DA`,
                        // Add other necessary fields based on your data structure
                    }
                ],
                "address": {
                    // Use formData to populate address fields
                    "street_1": formData.adresse,
                    "city": 'RéGHAIA',
                    "postal_code": '12345',
                    "state": 'ALG',
                    "country": 'ALG',
                },
                "summary": {
                    // Replace with actual total cost calculation
                    "subtotal": parseFloat(formData.price),
                    "shipping_cost": 5,
                    "total_tax": 5,
                    "total_cost": parseFloat(formData.price) + 10,
                },
                "adjustments": [
                    {
                        "name": 'Discount',
                        "amount": 5,
                    },
                ],
            },
        },
    };
}

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
    senPassOrderTemplate:senPassOrderTemplate,
    sendRecipient:sendRecipient

    // createProductTemplate:createProductTemplate
};
