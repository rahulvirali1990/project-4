const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const aylien = require('aylien_textapi');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

//console.log(`Your API key is ${process.env.API_KEY}`);

var textapi = new aylien ({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});


app.get('/test', function (req, res) {
  console.log(mockAPIResponse);
  res.status(200).send(mockAPIResponse);
});


app.post('/article', function (req, res) {
  // // return res.status(200).json(req.body);
 // // req.body = {text: 'https://www.nytimes.com/2020/01/31/opinion/soros-facebook-zuckerberg.html'}
    textapi.sentiment({
        text: req.body.articleUrl,
        mode: 'document',
        }, function(error, response) {
            if(error) {
                return res.status(400).json(error);
            }
        return res.status(200).json(response);
        });
});


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


module.exports = app;