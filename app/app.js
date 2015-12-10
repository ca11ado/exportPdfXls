/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let express = require('express');
let app = express();

let outputMessage = 'Root>>>\n';

app.use('/api', exportMiddleware);

app.get('*', (req, res) => {
  outputMessage += 'Get>>>>';
  //res.set('Content-Type', 'application/pdf');
  //res.type('application/pdf');
  res.send(outputMessage);

  //clear
  outputMessage = 'Root>>>';
});

app.listen(3000);

function exportMiddleware (req, res, next) {
  outputMessage += 'Test Middleware>>>\n';
  console.log(Object.keys(res));
  console.log(Object.keys(res._headers));
  res.set('Content-Type', 'application/pdf');
  res.set('My-Test', 't0s');
  console.log(Object.keys(res._headers));
  res.send('Here is my middleware');
}