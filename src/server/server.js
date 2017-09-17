var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from '../client/App'
var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
  console.log('Graffiti is listening on 3000');
});
