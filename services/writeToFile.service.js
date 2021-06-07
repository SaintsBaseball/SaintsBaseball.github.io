'use strict';

import { writeFile } from 'fs';

function generateFileString(filebase, jsonString) {
    const declarationString = `const ${filebase} = `;
    let jsFileString = declarationString + jsonString + ';';
    const exportString = `\n\nexport default ${filebase};`;
    jsFileString += exportString;
    return jsFileString;
}

function writeToFile(filebaseVarName, jsonObject, fileToWriteTo) {
    const jsonString = JSON.stringify(jsonObject);
    const jsFileString = generateFileString(filebaseVarName, jsonString);

    writeFile(fileToWriteTo, jsFileString, 'utf8', function (err) {
        if (err) {
            console.log('There was an error: ', err);
        }
    });
}

export default writeToFile;