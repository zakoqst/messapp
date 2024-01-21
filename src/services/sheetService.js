const { google } = require('googleapis');
const keyFile = require('../../EcommerceApiKey.json');

const SPREADSHEET_ID = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';

// Authentication using a service account key file
const auth = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Read data from Google Sheets and generate Messenger template
async function generateMessengerTemplate() {
  try {
    // Log the auth object for inspection
    console.log(auth);

    // Get the authorized client
    const client = await auth.getClient();

    // Make the API request
    const sheetsResponse = await client.request({
      method: 'GET',
      url: 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Test%20Catalogue%20produit!A:F',
    });

    const rows = sheetsResponse.data.values;

    if (rows.length === 0) {
      console.log('No data found.');
      return null;
    }

    const headers = rows[0];
    const products = rows.slice(1).map(row => {
      const product = {};
      headers.forEach((header, index) => {
        product[header] = row[index];
      });
      return product;
    });

    const elements = products.map(product => ({
      "title": product.Title,
      "image_url": product.ImageURL,
      "subtitle": `Size: ${product.Taille}\nPrice: ${product.Prix} DA`,
      "default_action": {
        "type": "web_url",
        "url": product.DetailsURL,
        "webview_height_ratio": "tall",
      },
      "buttons": [
        {
          "type": "web_url",
          "url": `${process.env.URL_WEB_VIEW_ORDER_2}`,
          "webview_height_ratio": "tall",
          "messenger_extensions": true,
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
    }));

    const template = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": elements
        }
      }
    };

    return template;
  } catch (err) {
    console.error('Error reading data from Google Sheets:', err.message);
    return null;
  }
}

module.exports = { generateMessengerTemplate: generateMessengerTemplate };
