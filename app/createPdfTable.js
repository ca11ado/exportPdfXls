'use strict';

function createPdfTable(doc, table, columnX, columnWidth) {
  table = table || [
    [ 'column1', 'df sfewf wef sdf jefljwef jsdjkf jewlfj wekjf lsdjkfj weklfj ewjf sj', 'column3'],
    [ 'column1', 'column2', 'column3'],
    [ 'column1', 'column2', 'column3']
  ];

  if (!columnX || !Array.isArray(columnX) || table[0].length != columnX.length) throw Error('No or wrong data for x positions of columns'); //todo придумать дефолтный автомат
  if (!columnWidth || !Array.isArray(columnWidth) || table[0].length != columnWidth.length) throw Error('No or wrong data for width of columns'); //todo придумать дефолтный автомат

  doc.lineGap(10);

  table.map((tr) => {
    doc.moveDown();
    tr.map((td, index) => {
      if (index != 0 || index != tr.length) {
        doc.moveUp();
      }
      doc.text(td, columnX[index], doc.y, { width: columnWidth[index] });
    });

    // rectangle
    //doc.rect().stroke(); //todo rectangle for row
  });

  doc.lineGap(0);

}

module.exports = createPdfTable;