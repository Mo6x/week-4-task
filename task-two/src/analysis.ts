/*
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 *
 */

import fs from 'fs';
import path from 'path';
// eslint-disable-next-line node/no-unpublished-import
import EmailValidator from 'email-validator';
//import { stringify } from 'querystring';
const inputPaths = path.join(__dirname, '../fixtures/inputs/small-sample.csv');
const outputPath = path.join(__dirname, '../fixtures/outputs/sample.json');

async function analyseFiles(inputPaths: string[], outputPath: string) {
  let obj = {};

  inputPaths.map((data) => {
    obj = fs.createReadStream(data);
  });

  let emptyStr = '';

  for await (const line of obj as fs.ReadStream) {
    emptyStr += line;
  }
  console.log(obj);
  console.log(emptyStr);
  const csvLines = emptyStr.trim().split('\n');
  csvLines.shift();

  console.log(csvLines);
  const csvLength = csvLines.length;
  console.log(csvLength);

  const validEmailFormat = csvLines.filter((onlyValidEmail) => {
    console.log(onlyValidEmail);
    return EmailValidator.validate(onlyValidEmail);
  });

  console.log(validEmailFormat.length);
  //  let emailCounts = validEmailFormat.split('@');
  const arrObj: string[] = [];
  for (const validMails of validEmailFormat) {
    console.log(validMails.split('@')[1]);
    arrObj.push(validMails.split('@')[1]);
  }
  console.log(arrObj);
  const uniqueEmail = arrObj.reduce((acc: any, val: any) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  console.log(uniqueEmail);
  const objKeys = Object.keys(uniqueEmail);
  console.log(objKeys);

  const finalObject = {
    validDomains: objKeys,
    totalEmailParsed: csvLength,
    totalValidEmails: validEmailFormat.length,
    categories: uniqueEmail,
  };

  console.log(finalObject);

  const writeStream = fs.createWriteStream(outputPath);

  if (writeStream) {
    return writeStream.write(JSON.stringify(finalObject, null, ' '));
  } else {
    throw 'Error';
  }

  // console.log(writeStream.write(JSON.stringify(finalObject, null,'\n')));
}

analyseFiles([inputPaths], outputPath);

export default analyseFiles;
//{}
