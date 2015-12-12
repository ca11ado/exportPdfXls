'use strict';

let getAsyncData = require('./getAsyncData');
let statisticaPdf = require('./pdf/statistic');
let stream;

function exportMiddleware (req, res, next) {
  let query = req.query;
  let param = req.params.org;

  switch(query.type) {
    case 'pdf':
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
      break;
    case 'xls':
      res.send('xls');
      break;
    default:
      next();
  }
}

module.exports = exportMiddleware;