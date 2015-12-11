'use strict';

function createPdfTable(doc) {
  let table = [
    [ 'column1', 'df sfewf wef sdf jefljwef jsdjkf jewlfj wekjf lsdjkfj weklfj ewjf sj', 'column3'],
    [ 'column1', 'column2', 'column3'],
    [ 'column1', 'column2', 'column3']
  ];

  let columnX = [10, 110, 210];

  doc.text('Hello, here will be the table');

  doc
    .moveDown()
    .moveDown()
    .moveDown();

  table.map((tr) => {
    doc.moveDown();
    tr.map((td, index) => {
      if (index != 0 || index != tr.length) {
        doc.moveUp();
      }
      doc.text(td, columnX[index], doc.y, { width: 80 });
    });
  });

}

module.exports = createPdfTable;