const dotenv = require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const app = express();

// Enable CORS for specific routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://helpful-daily-lemur.ngrok-free.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// Enable global CORS for all routes
app.use(cors());

// Config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// Config web routes
initWebRoutes(app);

// Handle proxy requests
app.use((req, res, next) => {
  // Your logic for deciding whether to proxy the request or handle it locally
  const shouldProxy = true;

  if (shouldProxy) {
    // Proxy the request
    proxy.web(req, res, { target: 'https://www.facebook.com' });
  } else {
    // Handle the request locally
    // Your local logic goes here
    next();
  }
});

// // Error handling for proxy requests
// proxy.on('error', (err, req, res) => {
//   res.writeHead(500, {
//     'Content-Type': 'text/plain'
//   });
//   res.end('Proxy Error');
// });

let port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Messenger bot is running at the port ${port}`);
});
