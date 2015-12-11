'use strict';

let PDFDocument = require('pdfkit');
let createTable = require('../createPdfTable');
let path = require('path');

let dataForTable = [
  ['Период', 'Показы', 'Клики', 'CTR', 'Звонки', 'Переходы на сайт', 'Клики в адрес', 'Переходы в соцсети'],
  ['Январь 2014', 1157, 77, '6.66%', 5, 13, '-', '-'],
  ['Февраль 2014', 1890, 189, '2.28%', 17, 16, '-', '-'],
  ['Март 2014', 2289, 56, '1.8%', 190, 82, '-', '-']
];

function statisticaMaket(res) {
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
  createTable(doc, dataForTable, colX, colW);



  doc.end();

  return stream;
}

module.exports = statisticaMaket;