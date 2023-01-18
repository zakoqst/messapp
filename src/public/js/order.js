// const supportOrder = require("../src/public/js/supportOrder");

// const { BrowserWindow } = require('electron');
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));


(e)
window.extAsyncInit = function() {
MessengerExtensions.getContext(facebookAppId,
        function success(thread_context){
            // success
            //set psid to input
            console.log(thread_context);
            // document.getElementById('psid').value(thread_context.psid);
            // $("#psid").val(thread_context.psid);
            let userPSID = thread_context.psid;
            document.getElementById("psid").value = userPSID;
            // console.log(thread_context);
           handleClickButtonFindOrder();
            // supportOrder.closeWebview();
            // closeWebview();
        },
        function error(err){
            // error
            console.log(err);
        }
    );
};


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
                MessengerExtensions.requestCloseBrowser(function success() {
                    // webview closed
                    // windows.close();
                }, function error(e) {
                    // an error occurred
                    console.log(e);
                });  
                // closeWebview();
              $.ajax({
                // alert:`${ alert('Email and Order Number are required!')}`,
                url: `${window.location.origin}/set-info-order`,
                method: "POST",
                data: data,
                success: function(data) {
                    console.log(data);
                },
                error: function(error) {
                    console.log(error);
                }
            })
            
                       // 
            // let webContents = window.webContents;
            // const currentWebview = webContents.getFocusedWebContents();
            // currentWebview.close();
             }
        
            }) 
}

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