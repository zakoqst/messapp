const dotenv = require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// Config web routes
initWebRoutes(app);

// Use the http-proxy-middleware to proxy requests to Facebook SDK
app.use('/plugins/customer_chat', createProxyMiddleware({
  target: 'https://www.facebook.com',
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': true,
  },
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Messenger bot is running at the port ${port}`);
});
