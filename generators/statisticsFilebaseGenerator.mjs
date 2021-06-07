'use strict';

import convertExcelToJson from '../services/convertExcelToJson.service.mjs';
import writeToFile from '../services/writeToFile.service.mjs';

(function buildStatsFilebase () {
    const sourceFile = 'filebase/Hitting Statistics.xlsx';

    const statsObject = convertExcelToJson(sourceFile);

    const filebaseVarName = 'stats';
    const statsFilebase = 'filebase/hittingStatisticsFilebase.js';

    writeToFile(filebaseVarName, statsObject, statsFilebase);
})();
