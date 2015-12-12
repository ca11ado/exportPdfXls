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

let statisticaPdf = require('./pdf/statistic');
let getAsyncData = require('./getAsyncData');

let stream;

app.use('/api/:org', exportMiddleware);

app.get('/pdf', (req, res) => {

  getAsyncData()
    .then( data => {
      stream = statisticaPdf(res, data);
      stream.on('finish', () => {
        res.send();
      });
    })
    .catch( err => {
      console.log(`some error with getting async data ${err}`);
    });
});


app.get('*', (req, res) => {
  res.send('Get >>>>');
});

app.listen(3000);


// API
let dataForTable = [
  ['Период', 'Показы', 'Клики', 'CTR', 'Звонки', 'Переходы на сайт', 'Клики в адрес', 'Переходы в соцсети'],
  ['Январь 2014', 1157, 77, '6.66%', 5, 13, '-', '-'],
  ['Февраль 2014', 1890, 189, '2.28%', 17, 16, '-', '-'],
  ['Март 2014', 2289, 56, '1.8%', 190, 82, '-', '-']
];
let dataForApi = {
  address: '10 Авеню, школа танцев, Новосибирск',
  table: dataForTable
};

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
  response.write(JSON.stringify(dataForApi));
  response.end();
}).listen(8888);
