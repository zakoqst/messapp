const { GoogleSpreadsheet } = require('google-spreadsheet');

const generateMessengerTemplate = async () => {
  try {
    const doc = new GoogleSpreadsheet('YOUR_GOOGLE_SHEET_ID');

    // Authenticate using service account credentials
    await doc.useServiceAccountAuth({
        client_email: "bmlab-795@bmlab-405010.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKggAM15IYvwzq\naRh+qSyR8rXYf2C/p+j3epFW/MJLGfnJRhtif03S8IFbXFzQ0shG7U0v6oC03jWr\nHDaur46SOf2wXnQt65YBrzQdZjofMD0q5XubZ+BdGuccwumINKylgF/EjmUm2DQ8\nnHY2K+D7GrYARg9V3iCe5j7n3ZwqpIqbepN1DI+GDI5Jz0OoUZLVobb/nvAvnIES\nbvTWBVOanTblutud7FHkHmr/9Kv4XxMsoE/Hd6T/9wJyPtCTlHxYzOhg+TZIPzPt\nXeQQH5ZsSaRx/6Zq9n4lb4/0m8UqCo/GbttNU8qT1eBEnnzADcGkM6Q+2ta61WxB\nFVp1f1otAgMBAAECggEAAnRHYGB3cI3WL/wUlCpkNCObIRPQHhqAmAk3/DQlfagD\nrzUGjW/KB2mrQ6pvpIc9bqCfHBrNMwPzZg66Oe0+PtbtlGbcpRbTE1Omf8m2oByj\nTSMJV7WPUkmKbf6Nun0a74mJ/5WTM8CQh4CE7TykZh6pgIDY3DtMLWjQb9pvc1PU\nJEj2XKOvPybiS3rPhS3POzbYmCfPcRvy1QSHQo/4yKaWko+VScMmfXaBN3wXN4Ob\n4yUydMcleXuy9b8VTiQdQ9YDM4hQd8ZBO4RRbtJ4n04zh445y4wdyCp0QqwAvjXD\nkfHCKz+WEhk8pwxKVGt8+2EL7v7N2T3HssRzVIxrSQKBgQDwb4g6OWCHIsqo8LLt\nbTwNTSO5P+R0+QazC3uDGBtENVjMfLuT5ck8mU1VXspvFEimIbGWgMmhDT7a1dhD\ndv65suKil0BKV+1yDfPybZ0KL+pugJE48TE2lrkl435ASg/DVgrDuAAUPTdsDGri\nWGCREH4Q+biuNkVOGelx9gGOBQKBgQDXne7BeECoTztOObs9LI3a8H6ykW0YC9U9\nUV7Y7zwPCKR5gtAcA7142gHwKeOqhoLBkaI4rgeeYGmHHWTXp9oKim3ECoDCAkwd\nUrTRcEJsuIVMGaN/MhVuJP9IGjdpkg6xItk3u3B07dj0P6Id16jewFdHB1VLt13v\nuV/uTM6sCQKBgFJhdKS2ehtzUUr3RedR8SyBjMbxXF6z4JbCTWyKevUw7h8Kcd7n\n8b6ArF2e3++VXJsHmmh98hfriOjEMphTEk4gO8UH2/BdFi9pFnevFQqjhkicZqXD\nBmC03fVccCqo9aOxPHj495X3r6Cm1Ix/SX8KzpcUaTHPyIlNGY6BguDdAoGAIsMd\nqSeAFSKhBx2bqGM0g6XeZ1+23Peba4Vg60y2vB3ClqyWbM3VkFRll5jJUcbZ8edO\n5iB4rfoRSW1dwr8XEjf7Nm4TEDRanSema1XT/79IDlrb1zf16Ioidjdz05turvRV\nXPzlRpTKM6bGtlT8rt0HtTXjdI+dn3adlsffUjECgYEAuHVOy6rcFj25cf7qscsr\nxqBUGeDp3StiRtXAOof2d8HrMCYZT2UEht1I9Lkp99W3L3OjvU4lSB/mqKBzdRhV\numOUznGJMqOHDHW9ttEIbl2yFn3MnyDxtfV3Zgm4TlKCZrXh4Ne5CaZFeuY8A/ro\ndienl7aqTMxr5djDx+Y6TTU=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      });
      
    // Load document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[1]; // Assuming the data is in the second sheet

    // Get header values and rows from the sheet
    await sheet.loadHeaderRow();
    const headerValues = sheet.headerValues;
    const rows = await sheet.getRows();

    // Process rows and generate Messenger template
    const elements = rows.map(row => ({
      "title": row[headerValues.indexOf('Title')],
      "image_url": row[headerValues.indexOf('ImageURL')],
      "subtitle": `Size: ${row[headerValues.indexOf('Taille')]}\nPrice: ${row[headerValues.indexOf('Prix')]} DA`,
      "default_action": {
        "type": "web_url",
        "url": row[headerValues.indexOf('DetailsURL')],
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
  } catch (error) {
    console.error('Error generating Messenger template:', error.message);
    return null;
  }
};

module.exports = { generateMessengerTemplate };
