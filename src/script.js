const { google } = require('googleapis');

const axios = require('axios');




const clientEmail = 'testenvoi@bmlab-405010.iam.gserviceaccount.com';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCGgD7HAH98PqOW\n9/917SeSaN4aEjBEwsfkmeRqhR7K+d97Yq5Pj9NWw+Kj0TwXk5QxlTaCXSmvUFyr\nL6yDyYTUc4IGiAnVD5iICSTbT3itb8eA8QiKcsoI/LdWND60cfg/zNQ22RcnoBib\nXWEp6obszpiVims4lIUWnySsxxoWZXRxtwyxC7v8fGKV+xNdmKuLoMwoZmGPB07H\n+qppBLg6PhyqzHj79xnpZAiqF+8y4+ixL86Z9xaLwerc+yfvNuh5NPiB1nES1xJ6\n2kTjmu2aVilE7Cia1uefQzKf6KwX8sufTkEHlER712OB9tm4EpEokkQ9bHQNTcU3\nLiRFJURFAgMBAAECggEACrFk7EjFmeDX/B9cw6kWSY1FRRDXngvXPP0gG/jX3R62\n7fYHMiOW03HQ0aHHk39D25pHgl86Omoa5/ArGLIbeZFyT6cekv4BrCT/9WCQ0UcO\n9xkSiwE7vzGqOLQAHTPnXtkfsPma3edcNXPbzuuKjQaSumbOBepG12jRD1xn3kpW\nkH10qTicuJUyCrQJIMisQxXx127Wmv/RDwheEp+QI9QDJoswSpBoArqL2r1cdIYy\nwCslms6SdSjnFqjZ7ymEQYitIAxMC0r0nNvFyoSS/v5lAn4emPxBLRHCwlSVG17X\nCtpcx2gw1JlKqqTAaNA2ra3kmf6NTRid2D+b1qG0CQKBgQC81CB76+OKKvROyWGP\nSG46NQP/sp6BR1FJ5W1B6PkO4Wf+qF//1a9SRKs5kDMmKFUUWs/7Q0ATcXgqGmQq\nhtAl3YF0P2v8u6IjYo4G3JdfTNRQ0NMckfHkgGbg+hkaWB1fB1E5cxiMRQke4YWc\nWvzjIfenAcBAPgEqHfwiu1k6jQKBgQC2WLa0Nin0ODNzSJ9F3QpB/C8DM4bxmHRD\nRJQC8/6zqH/jY9PMNdV3U9Hy/eBzs4WdmLKm4xgWdlwRVjDo2DhoBwAx0GE8wOTT\nZHxP/wL9eim8Z1ERSXOXRJk8KM9D7GziP2eVEozUwkp6VVIS68achvAxEf/jMsM6\n9lZMpvfemQKBgBPJ1y2lZs8P+VJYYFT3rjWDYMvnGB1MMASienSxyYf5r0BMvOK+\nrgTdFWSO7A1PpLrhWXJndcuT1Jf09BJQ1ndhYzOfgd2WfENhDKlDbMmb75QYjkcs\nNEFSA3YIP6E3IrzWs3hly2jHw1DtKWddUasr4BwsXs1cshqL0eSB5bPxAoGBALS0\nd+NhpfQLWhmOR6Ehq4+2zhQ7FSkJb3ZWWOQQT0JV4t9Cx9shInoNzAslwzCGIQ0M\nDUfL18wy4YygwPmPhV66SVwUaLifZGWFuJhCXQE79m5qaPFbvDyVU9JFkxl6DHGu\nagVWi9Aw90QCl8J+e6YVJ6VJdDAA127wPpfaA9xJAoGBAJkIs5mwyKR4A85k3mA+\nT8s0B9Ma47CoIWrEcnEIdW6R1oHcLDxf2op8T+azpOeWb3RGdMXdmAYKwtqIZvS+\nzzUAFmKiMJ/yR9mZ/bAUSm3PndJieIPOiZr/kvZXcLBeqxxrrH7PAYqKj2gRkhHz\nga1bgBrtrq00dG0wGNLEU9b3\n-----END PRIVATE KEY-----\n';
// const googleSheetId = '17jWHJmgZoGXe6D1u-9eRZ79B6lY7C1NBrI-HqIp2HG8';
// const googleSheetPageName = 'Copy of confem';
// const stringSimilarity = require('string-similarity');

const auth = new google.auth.JWT(clientEmail, null, privateKey, ['https://www.googleapis.com/auth/spreadsheets']);

const sheets = google.sheets({version: 'v4', auth});

const googleSheetId = '17jWHJmgZoGXe6D1u-9eRZ79B6lY7C1NBrI-HqIp2HG8';  
const googleSheetPageName = 'Copy of confem';
// ...
const RANGE_TO_WATCH = 'H2:H100'; 
const getData = async (sheetPage, range) => {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: googleSheetId,
        range: `${sheetPage}!${range}` 
      });

    //   const sheetsAPI = sheets.spreadsheets.get({
    //     auth: await auth.getClient(),
    //     spreadsheetId: googleSheetId,
    // });
    // const sheetTitle = sheetsAPI.data.properties.title;
      console.log(`Watching for changes on the sheet: ${googleSheetPageName}`);
    //   const sheetTitle = sheetsAPI.data.properties.title;
      const values = response.data.values; // Accessing the values property
      console.log('Received data:', values); // Log the received data.
      
      return values;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

const filterData = (data) => {
  return data.filter(row => row[7] && row[7].toLowerCase() === 'VRAI');
} 

const apiKey = 'rY9vSvF1yiMou0dHnwP9ZFwpvNfZlZaFLz9IvTQH0uiEoDZUs97MQjVym6tV';
const apiUrl = 'https://golivri.ecotrack.dz/api/v1/create/order'; 


const sendApiRequest = async () => {
  try {
    // const dataToSend = rowData.slice(1, -1); 

    const params = {
      api_token: apiKey,
      nom_client: "nom test",
      telephone: "05600224584",
      shhipping_state:"Alger",
      Billing_adresse:"cite alger",
      
code_wilaya: "1",
commune:"Alger",
montant:"5800",
type:""
      // other params
    };

    const response = await axios.post(apiUrl, params);
    return response;

  } catch (err) {
    console.error(err);
  }
}


// Function to fetch Wilaya data
const getWilayaData = async () => {
    try {
      const wilayaApiUrl = 'https://golivri.ecotrack.dz/api/v1/get/wilayas?api_token=rY9vSvF1yiMou0dHnwP9ZFwpvNfZlZaFLz9IvTQH0uiEoDZUs97MQjVym6tV';
      const response = await axios.get(wilayaApiUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Wilaya data:', error.message);
      throw error;
    }
  };


// Function to fetch Wilaya data
const getCommuneData = async () => {
    try {
      const communeApiUrl = 'https://golivri.ecotrack.dz/api/v1/get/communes?api_token=rY9vSvF1yiMou0dHnwP9ZFwpvNfZlZaFLz9IvTQH0uiEoDZUs97MQjVym6tV';
      const response = await axios.get(communeApiUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Commune data:', error.message);
      throw error;
    }
  };

  

const runProcess = async () => {
    try {
      const sheetPage = googleSheetPageName;
      const range = 'A1:H';
//   const range2watch=RANGE_TO_WATCH;
      // Get data from the Google Sheet
      const sheetData = await getData(sheetPage, range);
//   const watch = await watchData(sheetPage,range2watch);
      // Get data from the external Wilaya API
      const wilayaData = await getWilayaData();
        
      const communeData = await getCommuneData();
      // Map Wilaya with addresses
      const mappedData = await mapWilayaWithAddresses(wilayaData, sheetData);
      const mappedData_ = await mapCommuneaWithAddresses(communeData, sheetData);
sendApiRequest();
// console.log(watch);
// watchChanges();
      // Log the mapped data for inspection
      console.log('Mapped Wilaya:', mappedData);
      
      console.log('Mapped Communes:', mappedData_);
  
      // Continue with other steps or operations based on your requirements
    } catch (error) {
      console.error('Error running the process:', error.message);
    }
  };
  
  // Run the process
  runProcess();