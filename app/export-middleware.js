'use strict';

let fs = require('fs');
let path = require('path');
let getAsyncData = require('./getAsyncData');
let statisticaPdf = require('./pdf/createPdfPage');
let xlsxTemplate = require('xlsx-template');
let stream;

let prepareTableForPlaceholders = require('./xls/prepareValuesForPlaceholders');

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
      fs.readFile(path.join(__dirname, 'xls/templates', '2gis-statistic.xlsx'), function(err, data) {
        var t = new xlsxTemplate(data);
        getAsyncData()
          .then( data => {
            t.substitute("Tables", {
              address: data.address,
              table: prepareTableForPlaceholders(data.table)
            });
            var newData = t.generate();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
            res.send(new Buffer(newData, 'binary'));
          })
          .catch( err => {
            console.log(`some error with getting async data ${err}`);
          });
      });
      break;
    default:
      next();
  }
}

module.exports = exportMiddleware;