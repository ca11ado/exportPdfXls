'use strict';

let PDFDocument = require('pdfkit');
let createTable = require('./createPdfTable');
let path = require('path');

function statisticaMaket(res, data) {
  let stream;
  let doc = new PDFDocument({
    layout: 'landscape',
    margin: 25
  });
  doc.font(path.join(__dirname, 'fonts/9575.ttf'));
  stream = doc.pipe(res);

  //### HEADER
  let headerXY = {x: doc.x, y: doc.y};
  doc.fontSize(20);
  doc.image(path.join(__dirname, 'img/logo.png'));
  doc.text(data.address, headerXY.x, headerXY.y, {
    align: 'right'
  });
  doc.fontSize(12);

  doc
    .moveDown(5);

  //### TABLE
  const COLUMN_WIDTH = 90;

  let colXposition = new Array(data.table[0].length);
  for (let i=0; i<colXposition.length; i++) {
    colXposition[i] = colXposition[i-1] ? colXposition[i-1] + COLUMN_WIDTH + 10 : 5;
  }
  let colWidth = new Array(data.table[0].length);
  for (let i=0; i<colWidth.length; i++) {
    colWidth[i] = COLUMN_WIDTH;
  }
  createTable(doc, data.table, colXposition, colWidth);

  doc.end();
  return stream;
}

module.exports = statisticaMaket;