const { google } = require('googleapis');
const keyFile = require('../../EcommerceApiKey.json');

const SPREADSHEET_ID = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';

// Authentication using a service account key file
const auth = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

let generateMessengerTemplate = async () => {
  try {
    // Verify authentication
    console.log(auth);

    // Create sheets instance
    const sheetsInstance = google.sheets({ version: 'v4', auth });

    // Read data from Google Sheets
    const sheetsResponse = await sheetsInstance.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Test Catalogue produit!A:F',
    });

    const rows = sheetsResponse.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return null;
    }

    // Logging the retrieved data
    console.log('Retrieved data from Sheets:', rows);

    const headers = rows[0];
    const products = rows.slice(1).map(row => {
      const product = {};
      headers.forEach((header, index) => {
        product[header] = row[index];
      });
      return product;
    });

    // Logging the parsed products array
    console.log('Parsed products:', products);

    // Generate Messenger template
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
    }));

    // Validate the template structure
    if (!elements || elements.length === 0) {
      console.error('Invalid template structure.');
      return null;
    }

    const template = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": elements,
        },
      },
    };

    return template;
  } catch (err) {
    console.error('Error reading data from Google Sheets:', err.message);
    return null;
  }
};

module.exports = { generateMessengerTemplate: generateMessengerTemplate };
