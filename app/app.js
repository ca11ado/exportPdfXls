/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let PDFDocument = require('pdfkit');

let exportMiddleware = require('./export-middleware');
let express = require('express');
let app = express();

let statisticaPdf = require('./pdf/statistica');

let outputMessage = 'Root>>>\n';
let stream;

app.use('/api/:org', exportMiddleware);

app.get('/pdf', (req, res) => {

  stream = statisticaPdf(res);

  stream.on('finish', () => {
    res.send();
  });
});

app.get('*', (req, res) => {
  outputMessage += 'Get>>>>';
  res.send(outputMessage);

  //clear
  outputMessage = 'Root>>>';
});


app.listen(3000);
