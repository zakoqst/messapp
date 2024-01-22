// const templateMessage = require("../services/templateMessage");

    function handleOrderNowClick(element) {
        // Get title and subtitle from template element
        const title = element.querySelector('h2').innerText;
        const subtitle = element.querySelector('.subtitle').innerText;
    
        // Split subtitle into size and price
        const subtitleParts = subtitle.split('\n');
        const size = subtitleParts[0];
        const price = subtitleParts[1];
    
        // Populate form fields
        document.getElementById('product').value = title;
        document.getElementById('size').value = size;
        document.getElementById('price').value = price;
    
        // Trigger the form submission manually
        submitOrder();
    }
    function submitOrder() {
        // Collect form data
        const formData = {
            psid: document.getElementById('psid').value,
            email: document.getElementById('email').value,
            nom: document.getElementById('nom').value,
            adresse: document.getElementById('adresse').value,
            numéro_t: document.getElementById('numéro_t').value,
            product: document.getElementById('product').value,
            size: document.getElementById('size').value,
            price: document.getElementById('price').value
        };


        // HTML page


        const recipientTemplate = sendRecipient(formData);
        // Call the function from the external file to generate the sendRecipient template with the collected data
 

        // Assuming there is a function to send the template to the user, replace it with your actual function
        // sendTemplateToUser(recipientTemplate);
        console.log(recipientTemplate);
    }



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
    

// const supportOrder = require("../src/public/js/supportOrder");

// const { BrowserWindow } = require('electron');
// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'Messenger'));



// window.extAsyncInit = function() {
// MessengerExtensions.getContext(facebookAppId,
//         function success(thread_context){
//             // success
//             //set psid to input
//             console.log(thread_context);
//             // document.getElementById('psid').value(thread_context.psid);
//             // $("#psid").val(thread_context.psid);
//             let userPSID = thread_context.psid;
//             document.getElementById("psid").value = userPSID;
//             alert(psid);
//             // console.log(thread_context);
//            handleClickButtonFindOrder();
//             // supportOrder.closeWebview();
//             // closeWebview();
//         },
//         function error(err){
//             // error
//             alert("Messenger Extension Error: " + err);
//             // console.log(err);
//         }
//     );
// };


function validateInputFields() {
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    let email = $("#email");
    let order_number = $("#orderNumber");

    if (!email.val().match(EMAIL_REG)) {
        email.addClass("is-invalid");
        return true;
    } else {
        email.removeClass("is-invalid");
    }

    if (order_number.val() === "") {
        order_number.addClass("is-invalid");
        return true;
    } else {
        order_number.removeClass("is-invalid");
    }

    return false;
}


function handleClickButtonFindOrder() {
    $("#find_order_btn").on("click", function(e) {
        let check = validateInputFields();
            let data={
                    psid: document.getElementById('psid').value,
                    customer : document.getElementById('customer').value,
                    email : document.getElementById('email').value,
                    order_number :document.getElementById('order_number').value
             };
             alert(JSON.stringify(data));
             console.log(data);
             if(!check){
              
                // closeWebview();
              $.ajax({
                // alert:`${ alert('Email and Order Number are required!')}`,
                url: `${window.location.origin}/set-info-order`,
                method: "POST",
                data: data,
                success: function(data) {
                    alert('success response from node js server',data)  ;
                    MessengerExtensions.requestCloseBrowser(function success() {
                        // webview closed
                        // windows.close();
                    }, function error(e) {
                        alert('err submit post webview')
                        // an error occurred
                        console.log('err submit post webview',e);
                    }); 
                 
                },
                error: function(error) {
                    console.log('error response from node js server',error);
                }
            })
            
                       // 
            // let webContents = window.webContents;
            // const currentWebview = webContents.getFocusedWebContents();
            // currentWebview.close();
             }
        
            }) 
}



// Handler for "Order now" button click
function handleOrderNowClick(element) {

    // Get title and subtitle from template element
    const title = element.title; 
    const subtitle = element.subtitle;
  
    // Split subtitle into size and price
    const subtitleParts = subtitle.split('\n');
    const size = subtitleParts[0]; 
    const price = subtitleParts[1];
  
    // Populate form fields
    document.getElementById('product').value = title;
    document.getElementById('size').value = size; 
    document.getElementById('price').value = price;
  
    // Submit form
    document.getElementById('order_form').submit();
  }
  
  // Attach handler to Order now buttons
  const orderButtons = document.querySelectorAll('.template-element button.order-now');
  orderButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleOrderNowClick(button.parentElement); 
    });
  });


// let webContents = window.webContents;
// let window = new BrowserWindow();

// Wait for the window to be ready
// window.webContents.on('did-finish-load', () => {
// // Access the webContents property here
// let webContents = window.webContents;
// });

// function validateInputFields() {
//     const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
//     let email = $("#email");
//     let order_number = $("#orderNumber");

//     if (!email.val().match(EMAIL_REG)) {
//         email.addClass("is-invalid");
//         return true;
//     } else {
//         email.removeClass("is-invalid");
//     }

//     if (order_number.val() === "") {
//         order_number.addClass("is-invalid");
//         return true;
//     } else {
//         order_number.removeClass("is-invalid");
//     }

//     return false;
// }


// function closeWebview() {
// $("#close-btn").on("click", function(e) {
// let check = validateInputFields();
//     let data={
//             psid: document.getElementById('psid').value,
//             customer : document.getElementById('customer').value,
//             email : document.getElementById('email').value,
//             order_number :document.getElementById('order_number').value
//      };

//      alert(JSON.stringify(data));
//      console.log(data);

//      if(!check){

//         const currentWebview = webContents.getFocusedWebContents();
//         currentWebview.close();
               
//      }
//      $.ajax({
//         // alert:`${ alert('Email and Order Number are required!')}`,
//         url: `${window.location.origin}/set-info-order`,
//         method: "POST",
//         data: data,
//         success: function(data) {
//             console.log(data);
//         },
//         error: function(error) {
//             console.log(error);
//         }
//     })

//     }) 
// // alert(data);

// }


// function handleClickButtonFindOrder() {
//     $("#find_order_btn").on("click", function(e) {
//         let check = validateInputFields();
//             let data={
//                     psid: document.getElementById('psid').value,
//                     customer : document.getElementById('customer').value,
//                     email : document.getElementById('email').value,
//                     order_number :document.getElementById('order_number').value
//              };
//              alert(JSON.stringify(data));
//              console.log(data);
//              if(!check){
             
//               $.ajax({
//                 // alert:`${ alert('Email and Order Number are required!')}`,
//                 url: `${window.location.origin}/set-info-order`,
//                 method: "POST",
//                 data: data,
//                 success: function(data) {
//                     console.log(data);
//                 },
//                 error: function(error) {
//                     console.log(error);
//                 }
//             })
//             const currentWebview = webContents.getFocusedWebContents();
//             currentWebview.close();
//              }
        
//             }) 
// }






// (function(d, s, id){

//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'Messenger'));



// window.extAsyncInit = function() {
// MessengerExtensions.getContext(facebookAppId,
//         function success(thread_context){
//             // success
//             //set psid to input
//             console.log(thread_context);
//             $("#psid").val(thread_context.psid);
//             handleClickButtonFindOrder();
//             closeWebview();
//         },
//         function error(err){
//             // error
//             console.log(err);
//         }
//     );
// };

// let window = new BrowserWindow();

// // Wait for the window to be ready
// window.webContents.on('did-finish-load', () => {
// // Access the webContents property here
// let webContents = window.webContents;
// });

// function closeWebview() {
// $("#close-btn").on("click", function(e) {
// let check = false;
//     let data={
//             customer : document.getElementById('customer').value,
//             email : document.getElementById('email').value,
//             order_number :document.getElementById('order_number').value
//      };
//      if(!check){
//       const currentWebview = webContents.getFocusedWebContents();
//       currentWebview.close();
//       $.ajax({
//         // alert:`${ alert('Email and Order Number are required!')}`,
//         url: `${window.location.origin}/set-info-order`,
//         method: "POST",
//         data: data,
//         success: function(data) {
//             console.log(data);
//         },
//         error: function(error) {
//             console.log(error);
//         }
//     })
//      }

//     }) 
// // alert(data);

// }

// function handleClickButtonFindOrder() {
//     $("#btnFindOrder").on("click", function(e) {
//             let check = false;
//             let data={
//                     customer : document.getElementById('customer').value,
//                     email : document.getElementById('email').value,
//                     order_number :document.getElementById('order_number').value
//              };
   

//    console.log(check);

//           // if (!email || !order_number) {
//           //   alert('Email and Order Number are required!');
//           // } else { }
//             if(!check) {
//               const currentWebview = webContents.getFocusedWebContents();
//               currentWebview.close();
              

//               $.ajax({
//                     // alert:`${ alert('Email and Order Number are required!')}`,
//                     url: `${window.location.origin}/set-info-order`,
//                     method: "POST",
//                     data: data,
//                     success: function(data) {
//                         console.log(data);
//                     },
//                     error: function(error) {
//                         console.log(error);
//                     }
//                 })
    
//               }
//             }
//     )}








// // // const { BrowserWindow } = require('electron');
// // const { webContents } = require('electron');
// // //load FB SDK
// // (function(d, s, id){
// //     var js, fjs = d.getElementsByTagName(s)[0];
// //     if (d.getElementById(id)) {return;}
// //     js = d.createElement(s); js.id = id;
// //     js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
// //     fjs.parentNode.insertBefore(js, fjs);
// // }(document, 'script', 'Messenger'));

// // window.extAsyncInit = function() {

// //     // MessengerExtensions.init({
// //     //     appId: 1384946842277306, // Replace with your App ID
// //     //     pageId: 110841505234709, // Replace with your Page ID
// //     //     version: "v3.3",
// //     //     extensions: true,
// //     //   });
// //     // the Messenger Extensions JS SDK is done loading

// //     MessengerExtensions.getContext(facebookAppId,
// //         function success(thread_context){
// //             // success
// //             //set psid to input
// //             $("#psid").val(thread_context.psid);
// //             // handleClickButtonFindOrder();
// //             closeWebview();
// //         },
// //         function error(err){
// //             // error
// //             console.log(err);
// //         }
// //     );
// // };

// // //validate inputs
// // function validateInputFields() {
// //     const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
// //     let email = $("#email");
// //     let orderNumber = $("#orderNumber");

// //     if (!email.val().match(EMAIL_REG)) {
// //         alert('Email and Order Number are required!');
// //         email.addClass("is-invalid");
// //         return true;
// //     } else {
// //         email.removeClass("is-invalid");
// //     }

// //     if (orderNumber.val() === "") {
// //         orderNumber.addClass("is-invalid");
// //         return true;
// //     } else {
// //         orderNumber.removeClass("is-invalid");
// //     }

// //     return false;
// // }




// // // Wait for the window to be ready
// // // window.webContents.on('did-finish-load', () => {
// // //     let window = new BrowserWindow();
// // //     // Access the webContents property here
// // //     let webContents = window.webContents;
// // // });

// //   function closeWebview() {
// //     $("#close-btn").on("click", function(e) {
// //     // const currentWebview = webContents.getFocusedWebContents();
// //     let check = false;
// //             let data={
// //                     customer : document.getElementById('customer').value,
// //                     email : document.getElementById('email').value,
// //                     order_number :document.getElementById('order_number').value
// //              };
// //         if(!check) {
// //             const currentWebview = webContents.getFocusedWebContents();
// //             currentWebview.close();
// //              $.ajax({
// //                 // alert:`${ alert('Email and Order Number are required!')}`,
// //                 url: `${window.location.origin}/set-info-order`,
// //                 method: "POST",
// //                 data: data,
// //                 success: function(data) {
// //                     console.log(data);
// //                 },
// //                 error: function(error) {
// //                     console.log(error);
// //                 }
// //             })
// //         }
// //     });
// //     // alert(data);
      
// //     //   currentWebview.close();

// //   }


// // // function handleClickButtonFindOrder(){
// // //     $("#btnFindOrder").on("click", function(e) {
// // //         let check = validateInputFields();
// // //         let data = {
// // //             psid: $("#psid").val(),
// // //             customerName: $("#customerName").val(),
// // //             email: $("#email").val(),
// // //             orderNumber: $("#orderNumber").val()
// // //         };

// // //         if(!check) {
// // //             //close webview
// // //             MessengerExtensions.requestCloseBrowser(function success() {
// // //                 // webview closed
// // //                 windows.close();
// // //             }, function error(err) {
// // //                 // an error occurred
// // //                 console.log(err);
// // //             });

// // //             //send data to node.js server
// // //             $.ajax({
// // //                 // alert:`${ alert('Email and Order Number are required!')}`,
// // //                 url: `${window.location.origin}/set-info-order`,
// // //                 method: "POST",
// // //                 data: data,
// // //                 success: function(data) {
// // //                     console.log(data);
// // //                 },
// // //                 error: function(error) {
// // //                     console.log(error);
// // //                 }
// // //             })
// // //             // window.close();
// // //         }
// // //     });
// // // }
// module.exports={

//     closeWebview:closeWebview
// }