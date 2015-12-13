'use strict';

let fs = require('fs');
let path = require('path');
let getAsyncData = require('./getAsyncData');
let statisticaPdf = require('./pdf/statistic');
let xlsxTemplate = require('xlsx-template');
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
      fs.readFile(path.join(__dirname, 'xls/templates', 'simple3-template.xlsx'), function(err, data) {
        var t = new xlsxTemplate(data);
        t.substitute("Tables", {
          ages: [
            {name: "John", age: 10},
            {name: "Bill", age: 12}
          ],
          days: ["Monday", "Tuesday", "Wednesday"],
          hours: [
            {name: "Bob", days: [10, 20, 30]},
            {name: "Jim", days: [12, 24, 36]}
          ],
          progress: 100
        });

        var newData = t.generate();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
        res.send(new Buffer(newData, 'binary'));
      });
      break;
    default:
      next();
  }
}

module.exports = exportMiddleware;