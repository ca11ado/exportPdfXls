/**
 * Created by a.khimtsov on 10.12.15.
 */
'use strict';
require('babel-register');

let express = require('express');
let app = express();

let ouputMessage = 'Root>>>\n';

app.use('/api', (req, res, next) => {
  ouputMessage += 'Test Middlewawre>>>\n';
  next();
});

app.get('*', (req, res) => {
  ouputMessage += 'Get>>>>';
  res.send(ouputMessage);
  ouputMessage = 'Root>>>';
});

app.listen(3000);