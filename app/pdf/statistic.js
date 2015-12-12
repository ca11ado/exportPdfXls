'use strict';

let PDFDocument = require('pdfkit');
let createTable = require('../createPdfTable');
let path = require('path');

function statisticaMaket(res, data) {
  let stream;
  let doc = new PDFDocument({
    layout: 'landscape',
    margin: 25
  });
  doc.font(path.join(__dirname, 'fonts/9575.ttf'));
  stream = doc.pipe(res);

  //*** HEADER
  let headerXY = {x: doc.x, y: doc.y};
  doc.fontSize(20);
  doc.image(path.join(__dirname, 'img/logo.png'));
  doc.text('10 Авеню, школа танцев, Новосибирск', headerXY.x, headerXY.y, {
    align: 'right'
  });
  doc.fontSize(12);

  //console.log(doc.options.margin);

  doc
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown();

  //*** TABLE
  let colX = [5, 105, 205, 305, 405, 505, 605, 705];
  let colW = new Array(8);
  for (let i=0; i<colW.length; i++) {
    colW[i] = 90;
  }
  createTable(doc, data, colX, colW);



  doc.end();

  return stream;
}

module.exports = statisticaMaket;