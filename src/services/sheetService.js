const { google } = require('googleapis');

const clientEmail = 'bmlab-795@bmlab-405010.iam.gserviceaccount.com';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKggAM15IYvwzq\naRh+qSyR8rXYf2C/p+j3epFW/MJLGfnJRhtif03S8IFbXFzQ0shG7U0v6oC03jWr\nHDaur46SOf2wXnQt65YBrzQdZjofMD0q5XubZ+BdGuccwumINKylgF/EjmUm2DQ8\nnHY2K+D7GrYARg9V3iCe5j7n3ZwqpIqbepN1DI+GDI5Jz0OoUZLVobb/nvAvnIES\nbvTWBVOanTblutud7FHkHmr/9Kv4XxMsoE/Hd6T/9wJyPtCTlHxYzOhg+TZIPzPt\nXeQQH5ZsSaRx/6Zq9n4lb4/0m8UqCo/GbttNU8qT1eBEnnzADcGkM6Q+2ta61WxB\nFVp1f1otAgMBAAECggEAAnRHYGB3cI3WL/wUlCpkNCObIRPQHhqAmAk3/DQlfagD\nrzUGjW/KB2mrQ6pvpIc9bqCfHBrNMwPzZg66Oe0+PtbtlGbcpRbTE1Omf8m2oByj\nTSMJV7WPUkmKbf6Nun0a74mJ/5WTM8CQh4CE7TykZh6pgIDY3DtMLWjQb9pvc1PU\nJEj2XKOvPybiS3rPhS3POzbYmCfPcRvy1QSHQo/4yKaWko+VScMmfXaBN3wXN4Ob\n4yUydMcleXuy9b8VTiQdQ9YDM4hQd8ZBO4RRbtJ4n04zh445y4wdyCp0QqwAvjXD\nkfHCKz+WEhk8pwxKVGt8+2EL7v7N2T3HssRzVIxrSQKBgQDwb4g6OWCHIsqo8LLt\nbTwNTSO5P+R0+QazC3uDGBtENVjMfLuT5ck8mU1VXspvFEimIbGWgMmhDT7a1dhD\ndv65suKil0BKV+1yDfPybZ0KL+pugJE48TE2lrkl435ASg/DVgrDuAAUPTdsDGri\nWGCREH4Q+biuNkVOGelx9gGOBQKBgQDXne7BeECoTztOObs9LI3a8H6ykW0YC9U9\nUV7Y7zwPCKR5gtAcA7142gHwKeOqhoLBkaI4rgeeYGmHHWTXp9oKim3ECoDCAkwd\nUrTRcEJsuIVMGaN/MhVuJP9IGjdpkg6xItk3u3B07dj0P6Id16jewFdHB1VLt13v\nuV/uTM6sCQKBgFJhdKS2ehtzUUr3RedR8SyBjMbxXF6z4JbCTWyKevUw7h8Kcd7n\n8b6ArF2e3++VXJsHmmh98hfriOjEMphTEk4gO8UH2/BdFi9pFnevFQqjhkicZqXD\nBmC03fVccCqo9aOxPHj495X3r6Cm1Ix/SX8KzpcUaTHPyIlNGY6BguDdAoGAIsMd\nqSeAFSKhBx2bqGM0g6XeZ1+23Peba4Vg60y2vB3ClqyWbM3VkFRll5jJUcbZ8edO\n5iB4rfoRSW1dwr8XEjf7Nm4TEDRanSema1XT/79IDlrb1zf16Ioidjdz05turvRV\nXPzlRpTKM6bGtlT8rt0HtTXjdI+dn3adlsffUjECgYEAuHVOy6rcFj25cf7qscsr\nxqBUGeDp3StiRtXAOof2d8HrMCYZT2UEht1I9Lkp99W3L3OjvU4lSB/mqKBzdRhV\numOUznGJMqOHDHW9ttEIbl2yFn3MnyDxtfV3Zgm4TlKCZrXh4Ne5CaZFeuY8A/ro\ndienl7aqTMxr5djDx+Y6TTU=\n-----END PRIVATE KEY-----\n';
const googleSheetId = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';
const googleSheetPage = 'Test Catalogue produit';

// Authenticate the service account
const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
);

// Create a Google Sheets instance

const generateMessengerTemplate = async () => {
    try {
        const sheets = google.sheets({ version: 'v4', auth });

        // Use sheets.spreadsheets.get to load the document properties
        const response = await sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: googleSheetId,
            range: `${googleSheetPage}!A2:I`
        });

        // Assuming the data is in the second sheet
        const sheet = response.data.values;
        // console.log(sheet);
        // Get header values and rows from the sheet
        // const headerValues = sheet.data[0].rowData[0].values.map((value) => value.formattedValue);
        // const rows = sheet.data[0].rowData.slice(1);

        // Process rows and generate Messenger template
        const elements = sheet.map((row) => {
            // Check if row.values exists before accessing properties
            if (row.values) {
                // console.log(row[1]);
                return {
                    title: row[1],
                    image_url: row[7],
                    subtitle: `Size: ${row[4]}\nPrice: ${row[5]} DA`,
                    default_action: {
                        type: 'web_url',
                        url: row[7],
                        webview_height_ratio: 'tall'
                    },
                    buttons: [
                        {
                            type: 'web_url',
                            url: `https://messenger-app-7fl9.onrender.com/get-order-form`,
                            webview_height_ratio: 'tall',
                            messenger_extensions: true,
                            title: 'Order now'
                           
                        },
                        {
                            type: 'postback',
                            title: 'Back to categories',
                            payload: 'BACK_TO_CATEGORIES'
                        },
                        {
                            type: 'postback',
                            title: 'Main menu',
                            payload: 'BACK_TO_MAIN_MENU'
                        },
                    ],
                };
            } else {
                // Handle the case when row.values is undefined
                console.error('Error: Row values are undefined.');
                return null;
            }
        });
        // console.log(elements)
        const template = {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements // Remove null elements
                },
            },
        };
        console.log(JSON.stringify(template, null, 2))
        return template;
    } catch (error) {
        console.error('Error generating Messenger template:', error.message);
        return null;
    }
};


generateMessengerTemplate();
module.exports = { generateMessengerTemplate };
