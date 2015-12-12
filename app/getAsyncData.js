'use strict';

let request = require('request');
let result;

function getAsyncData() {

  result = new Promise((resolve, reject) => {

    //запрос к апи
    request('http://localhost:8888', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          let data = JSON.parse(body);
          resolve(data);
        } catch (e) {
          throw Error(`Parsing error ${e}`);
        }

      } else {
        throw Error(error);
      }
    });
  });

  return result;
}

module.exports = getAsyncData;