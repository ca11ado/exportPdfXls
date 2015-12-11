/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let PDFDocument = require('pdfkit');
let doc = new PDFDocument();

let exportMiddleware = require('./export-middleware');
let express = require('express');
let app = express();

let outputMessage = 'Root>>>\n';
let stream;

app.use('/api/:org', exportMiddleware);

app.get('/pdf', (req, res) => {
  stream = doc.pipe(res);
  doc.text('Hello');
  doc.end();
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
