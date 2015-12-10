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

  switch (req.params.org) {
    case '2gis':
      res.send('Hello, 2gis');
      break;
    default:
      next();
  }
}