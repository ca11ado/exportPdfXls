'use strict';

function getAsyncData() {

  let result = new Promise((resolve, reject) => {

    //запрос к апи
    let dataForTable = [
      ['Период', 'Показы', 'Клики', 'CTR', 'Звонки', 'Переходы на сайт', 'Клики в адрес', 'Переходы в соцсети'],
      ['Январь 2014', 1157, 77, '6.66%', 5, 13, '-', '-'],
      ['Февраль 2014', 1890, 189, '2.28%', 17, 16, '-', '-'],
      ['Март 2014', 2289, 56, '1.8%', 190, 82, '-', '-']
    ];

    resolve(dataForTable);
  });

  return result;
}

module.exports = getAsyncData;