/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let http = require('http');
let exportMiddleware = require('./export-middleware');
let express = require('express');

let config = {
  exportPort: 3000,
  apiPort: 8888,
  middlewareBaseUrl: '/api/:org'
};




//### Middleware for export
let app = express();

app.use(config.middlewareBaseUrl, exportMiddleware);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(config.exportPort);


//### Data API
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
}).listen(config.apiPort);
