const { GoogleSpreadsheet } = require('google-spreadsheet');
const keyFile = require('../../EcommerceApiKey.json');

const SPREADSHEET_ID = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';

// Authentication using a service account key file
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
doc.useServiceAccountAuth(keyFile);

// Read data from Google Sheets and generate Messenger template
async function generateMessengerTemplate() {
  try {
    // Load the document
    await doc.loadInfo();

    // Access the specific sheet
    const sheet = doc.sheetsByTitle['Test Catalogue produit'];

    // Get the rows
    const rows = await sheet.getRows();

    if (rows.length === 0) {
      console.log('No data found.');
      return null;
    }

    const products = rows.map(row => ({
      Title: row.Title,
      ImageURL: row.ImageURL,
      Taille: row.Taille,
      Prix: row.Prix,
      DetailsURL: row.DetailsURL,
    }));

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
