/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let PDFDocument = require('pdfkit');

let exportMiddleware = require('./export-middleware');
let express = require('express');
let app = express();

let http = require('http');

app.use('/api/:org', exportMiddleware);

app.get('*', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000);


// API
let dataForTable = [
  ['Период', 'Показы', 'Клики', 'CTR', 'Звонки', 'Переходы на сайт', 'Клики в адрес', 'Переходы в соцсети'],
  ['Январь 2014', 1157, 77, '6.66%', 5, 13, '-', '-'],
  ['Февраль 2014', 1890, 189, '2.28%', 17, 16, '-', '-'],
  ['Март 2014', 2289, 56, '1.8%', 190, 82, '-', '-']
];
let dataFromApi = {
  address: '10 Авеню, школа танцев, Новосибирск',
  table: dataForTable
};

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
  res.write(JSON.stringify(dataFromApi));
  res.end();
}).listen(8888);
