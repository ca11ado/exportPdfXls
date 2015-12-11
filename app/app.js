/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let PDFDocument = require('pdfkit');

let fs = require('fs');

let exportMiddleware = require('./export-middleware');
let express = require('express');
let app = express();

let outputMessage = 'Root>>>\n';
let stream;
let createTable = require('./createPdfTable');

app.use('/api/:org', exportMiddleware);

app.get('/pdf', (req, res) => {
  let doc = new PDFDocument({
    layout: 'landscape'
  });
  doc.font('Times-Roman');

  stream = doc.pipe(fs.createWriteStream('./app/export/output.pdf'));

  doc.text('Hello');

  createTable(doc);

  doc.end();

  stream.on('finish', () => {
    res.download('./app/export/output.pdf');
  });
});

app.get('*', (req, res) => {
  outputMessage += 'Get>>>>';
  res.send(outputMessage);

  //clear
  outputMessage = 'Root>>>';
});


app.listen(3000);
