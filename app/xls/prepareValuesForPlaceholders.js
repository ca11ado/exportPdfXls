'use strict';

function prepareTableForPlaceholders(table) {
  let result = table.map(tr => {
    return { row: tr };
  });
  return result;
}

module.exports = prepareTableForPlaceholders;