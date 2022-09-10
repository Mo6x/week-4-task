/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import csv from 'csvtojson';
// eslint-disable-next-line node/no-unpublished-import
import * as EmailValidator from 'email-validator';
import * as emailDomainValidator from 'email-domain-validator';
import fs from 'fs';
async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  interface Obj {
    [Emails: string]: string;
  }
  type validDomain = {
    isValidDomain: boolean;
    errorMessage: [];
    isvalidEmailList: [];
  }[];
  let arrOfJsonObj;
  for (const elem of inputPath) {
    arrOfJsonObj = fs.createReadStream(elem);
  }
  // arrOfJsonObj
  let newCsvFiles = '';
  for await (const elem of arrOfJsonObj as fs.ReadStream) {
    newCsvFiles += elem;
  }
  const jsonObjArr = newCsvFiles.trim().split('\n');
  jsonObjArr.shift();
  jsonObjArr;
  // let arrOfJsonObj: Obj[] = [];
  // for (const elem of inputPath) {
  //   arrOfJsonObj = await csv().fromFile(elem);
  // }

  const validEmailFormats = jsonObjArr.filter((value: string) =>
    EmailValidator.validate(value),
  );
  // validEmailFormats;
  const arrOfPromises = [];
  for (const val of validEmailFormats) {
    arrOfPromises.push(emailDomainValidator.validate(val));
  }
  // arrOfPromises;
  const resultOfPromises: validDomain = (await Promise.all(
    arrOfPromises,
  )) as validDomain;
  // resultOfPromises;
  const arrOfValidEmailDomain: string[] = [];
  for (const value in validEmailFormats) {
    if (resultOfPromises[value].isValidDomain) {
      arrOfValidEmailDomain.push(validEmailFormats[value]);
    }
  }
  // arrOfValidEmailDomain
  const emailKeyAdd: string[] = ['Emails'].concat(arrOfValidEmailDomain);
  // emailKeyAdd
  const newLineAdd = emailKeyAdd.join('\n');
  // newLineAdd
  const validMails = fs.createWriteStream(outputFile);
  return validMails.write(newLineAdd, 'utf-8');
}
// console.log(
//   validateEmailAddresses(['./fixtures/inputs/small-sample.csv'], ' '),
// );
export default validateEmailAddresses;
