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
    layout: 'landscape'
  });
  doc.font(path.join(__dirname, 'fonts/9575.ttf'));


  stream = doc.pipe(res);

  doc.text('Hello')
    .moveDown()
    .moveDown()
    .moveDown();

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