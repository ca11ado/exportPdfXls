'use strict';
module.exports = exportMiddleware;

function exportMiddleware (req, res, next) {
  let query = req.query;

  console.log(query);
  switch (req.params.org) {
    case '2gis':
      res.send('Hello, 2gis');
      break;
    default:
      next();
  }
}