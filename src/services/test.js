const { google } = require('googleapis');

const clientEmail = 'bmlab-795@bmlab-405010.iam.gserviceaccount.com';
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKggAM15IYvwzq
aRh+qSyR8rXYf2C/p+j3epFW/MJLGfnJRhtif03S8IFbXFzQ0shG7U0v6oC03jWr
HDaur46SOf2wXnQt65YBrzQdZjofMD0q5XubZ+BdGuccwumINKylgF/EjmUm2DQ8
nHY2K+D7GrYARg9V3iCe5j7n3ZwqpIqbepN1DI+GDI5Jz0OoUZLVobb/nvAvnIES
bvTWBVOanTblutud7FHkHmr/9Kv4XxMsoE/Hd6T/9wJyPtCTlHxYzOhg+TZIPzPt
XeQQH5ZsSaRx/6Zq9n4lb4/0m8UqCo/GbttNU8qT1eBEnnzADcGkM6Q+2ta61WxB
FVp1f1otAgMBAAECggEAAnRHYGB3cI3WL/wUlCpkNCObIRPQHhqAmAk3/DQlfagD
rzUGjW/KB2mrQ6pvpIc9bqCfHBrNMwPzZg66Oe0+PtbtlGbcpRbTE1Omf8m2oByj
TSMJV7WPUkmKbf6Nun0a74mJ/5WTM8CQh4CE7TykZh6pgIDY3DtMLWjQb9pvc1PU
JEj2XKOvPybiS3rPhS3POzbYmCfPcRvy1QSHQo/4yKaWko+VScMmfXaBN3wXN4Ob
4yUydMcleXuy9b8VTiQdQ9YDM4hQd8ZBO4RRbtJ4n04zh445y4wdyCp0QqwAvjXD
kfHCKz+WEhk8pwxKVGt8+2EL7v7N2T3HssRzVIxrSQKBgQDwb4g6OWCHIsqo8LLt
bTwNTSO5P+R0+QazC3uDGBtENVjMfLuT5ck8mU1VXspvFEimIbGWgMmhDT7a1dhD
dv65suKil0BKV+1yDfPybZ0KL+pugJE48TE2lrkl435ASg/DVgrDuAAUPTdsDGri
WGCREH4Q+biuNkVOGelx9gGOBQKBgQDXne7BeECoTztOObs9LI3a8H6ykW0YC9U9
UV7Y7zwPCKR5gtAcA7142gHwKeOqhoLBkaI4rgeeYGmHHWTXp9oKim3ECoDCAkwd
UrTRcEJsuIVMGaN/MhVuJP9IGjdpkg6xItk3u3B07dj0P6Id16jewFdHB1VLt13v
uV/uTM6sCQKBgFJhdKS2ehtzUUr3RedR8SyBjMbxXF6z4JbCTWyKevUw7h8Kcd7n
8b6ArF2e3++VXJsHmmh98hfriOjEMphTEk4gO8UH2/BdFi9pFnevFQqjhkicZqXD
BmC03fVccCqo9aOxPHj495X3r6Cm1Ix/SX8KzpcUaTHPyIlNGY6BguDdAoGAIsMd
qSeAFSKhBx2bqGM0g6XeZ1+23Peba4Vg60y2vB3ClqyWbM3VkFRll5jJUcbZ8edO
5iB4rfoRSW1dwr8XEjf7Nm4TEDRanSema1XT/79IDlrb1zf16Ioidjdz05turvRV
XPzlRpTKM6bGtlT8rt0HtTXjdI+dn3adlsffUjECgYEAuHVOy6rcFj25cf7qscsr
xqBUGeDp3StiRtXAOof2d8HrMCYZT2UEht1I9Lkp99W3L3OjvU4lSB/mqKBzdRhV
umOUznGJMqOHDHW9ttEIbl2yFn3MnyDxtfV3Zgm4TlKCZrXh4Ne5CaZFeuY8A/ro
dienl7aqTMxr5djDx+Y6TTU=
-----END PRIVATE KEY-----`;

const googleSheetId = '1CIpG37NsKjCMdUuyHWMMOd6migG8JxJoFL9yafeVRKc';
const googleSheetPage = 'Test Catalogue produit';

// Authenticate the service account
const auth = new google.auth.JWT(
  clientEmail,
  null,
  privateKey.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

const readSheet = async () => {
  try {
    const sheets = await google.sheets({ version: 'v4', auth });
    // const sheets =  google.sheets({ version: 'v4', auth });
  
    // Use sheets.spreadsheets.get to load the document properties
    const response = await sheets.spreadsheets.values.get({
        auth: auth,
      spreadsheetId: googleSheetId,
      range: `${googleSheetPage}!A2:F`
    });

    // Assuming the data is in the second sheet
    const sheet = response.data.values;

    // Process rows using map
    const processedData = sheet.map((row) => {
        return {
          id: row[0],
          nomProduit: row[1],
          categorieProduit: row[2],
          couleurProduit: row[3],
          tailleProduit: row[4],
          prixProduit: row[5],
        };
      });
  
      console.log(processedData);
//     const rows = sheet.map((value)=>value.formattedValue);
// console.log(rows);
    // Get header values and rows from the sheet
    // const headerValues = sheet.data[0].rowData[0].values.map((value) => value.formattedValue);
    // const rows = sheet.data[0][0];

    // // google sheet instance
    // // const sheetInstance = await google.sheets({ version: 'v4', auth });
    // // read data in the range in a sheet
    // const infoObjectFromSheet = await sheets.spreadsheets.values.get({
    //   auth: auth,
    //   spreadsheetId: googleSheetId,
    //   range: `${googleSheetPage}!A:F`
    // });

    // const valuesFromSheet = infoObjectFromSheet.data.values;
    // console.log(rows);
  } catch (err) {
    console.log("readSheet func() error", err);
  }
};

readSheet(); // Call readSheet function
