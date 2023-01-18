// const electron = require('electron');
// const { webContents } = require('electron');
const order = require("../public/js/order");


// let webContents = window.webContents;
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
            
            MessengerExtensions.requestCloseBrowser(function success() {
                                // webview closed
                                // windows.close();
                            }, function error(err) {
                                // an error occurred
                                console.log(err);
                            });                // 
            // let webContents = window.webContents;
            // const currentWebview = webContents.getFocusedWebContents();
            // currentWebview.close();
             }
        
            }) 
}
module.exports={
    handleClickButtonFindOrder:handleClickButtonFindOrder

}