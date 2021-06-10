'use strict';

import convertExcelToJson from '../services/convertExcelToJson.service.mjs';
import writeToFile from '../services/writeToFile.service.mjs';

buildHittingStatsFilebase();
buildPitchingStatsFilebase();

function buildStatsFilebase(sourceFileDatabase, filebaseVariableName, filebaseName) {
    const statsObject = convertExcelToJson(sourceFileDatabase);
    writeToFile(filebaseVariableName, statsObject, filebaseName);
}

function buildHittingStatsFilebase() {
    const sourceFile = 'filebase/Hitting Statistics.xlsx';
    const filebaseVarName = 'hittingStatistics';
    const statsFilebase = 'filebase/hittingStatisticsFilebase.js';

    buildStatsFilebase(sourceFile, filebaseVarName, statsFilebase);
}

function buildPitchingStatsFilebase() {
    const sourceFile = 'filebase/Pitching Statistics.xlsx';
    const filebaseVarName = 'pitchingStatistics';
    const statsFilebase = 'filebase/pitchingStatisticsFilebase.js';

    buildStatsFilebase(sourceFile, filebaseVarName, statsFilebase);
}