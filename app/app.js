/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let express = require('express');
let app = express();

let outputMessage = 'Root>>>\n';

app.use('/api/:org', exportMiddleware);

app.get('*', (req, res) => {
  outputMessage += 'Get>>>>';
  res.send(outputMessage);

  //clear
  outputMessage = 'Root>>>';
});

app.listen(3000);

function exportMiddleware (req, res, next) {
  outputMessage += 'Test Middleware>>>\n';

  console.log(req.params.org);

  res.set('Content-Type', 'application/pdf');
  res.send('Here is my middleware');
}