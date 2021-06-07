'use strict';

import excelToJson from 'convert-excel-to-json';

function convertExcelToJson(sourceFile) {
    return excelToJson({
        sourceFile: sourceFile,
        header: {
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
}

export default convertExcelToJson;