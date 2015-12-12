'use strict';

function createPdfTable(doc, table, columnX, columnWidth) {
  if (!table) throw new Error('No table');
  if (!columnX || !Array.isArray(columnX) || table[0].length != columnX.length) throw Error('No or wrong data for x positions of columns'); //todo придумать дефолтный автомат
  if (!columnWidth || !Array.isArray(columnWidth) || table[0].length != columnWidth.length) throw Error('No or wrong data for width of columns'); //todo придумать дефолтный автомат

  doc.lineGap(10);


  doc.fillColor('black', 1);
  table.map((tr, ind) => {
    let rectY = doc.y;
    doc.moveDown();
    tr.map((td, index) => {
      if (index != 0 || index != tr.length) {
        doc.moveUp();
      }
      doc.text(td, columnX[index], doc.y, { width: columnWidth[index] });
    });

    // rectangle

    if (ind == 0) {
      doc.rect(5, rectY, doc.page.width - 10, doc.y - rectY).fillOpacity(0.1).fillAndStroke();

      doc.fillColor('black', 1);
    } else {
      doc.rect(5, rectY, doc.page.width - 10, doc.y - rectY).stroke();
    }

  });

  doc.lineGap(0);

}

module.exports = createPdfTable;