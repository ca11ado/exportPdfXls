'use strict';

let PDFDocument = require('pdfkit');
let createTable = require('../createPdfTable');

function statisticaMaket(res) {
  let stream;
  let doc = new PDFDocument({
    layout: 'landscape'
  });
  doc.font('Times-Roman');

  stream = doc.pipe(res);

  doc.text('Hello');

  createTable(doc);

  doc.end();

  return stream;
}

module.exports = statisticaMaket;