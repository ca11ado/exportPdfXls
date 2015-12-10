/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let express = require('express');
let app = express();

let downLoadFlag = false;
let outputMessage = 'Root>>>\n';

app.use('/api', exportMiddleware);

app.get('*', (req, res) => {
  outputMessage += 'Get>>>>';

  res.send(outputMessage);

  //clear
  outputMessage = 'Root>>>';
  downLoadFlag = false;
});

app.listen(3000);

function exportMiddleware (req, res, next) {
  outputMessage += 'Test Middlewawre>>>\n';
  downLoadFlag = true;
  res.send('Here is my middleware');
  //next();
}