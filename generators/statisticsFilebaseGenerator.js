'use strict';

const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const writeToFileService = require('../services/writeToFile.service');

(function buildStatsFilebase () {
    const sourceFile = 'filebase/Hitting Statistics.xlsx';

    const statsObject = convertExcelToJsonService.convert(sourceFile);

    const filebaseVarName = 'stats';
    const statsFilebase = 'filebase/hittingStatisticsFilebase.js';

    writeToFileService.writeToFile(filebaseVarName, statsObject, statsFilebase);
})();
