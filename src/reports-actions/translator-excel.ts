import * as fs from "fs";
import { TJsonContent, TGenerateExcelReport } from "../models/types";
import { FileSystemUtils } from "../utils/file-system";
import { parseJson } from "../utils/json";
import { getExcelLogs } from "../utils/excel";


export function createExcelReport(params: TGenerateExcelReport): void {

  let { pathToExcelFile, pathToLangFile, savePath, fileName, shouldWrite } = params;

  pathToExcelFile = FileSystemUtils.convertToAbsolutePath(pathToExcelFile);

  pathToLangFile = FileSystemUtils.convertToAbsolutePath(pathToLangFile);

  savePath = savePath ? FileSystemUtils.convertToAbsolutePath(savePath) : process.cwd();

  fileName = fileName || 'excel-report.txt';

  try {
    validateParams(pathToExcelFile, pathToLangFile, savePath, fileName);

    writeExcelReport(pathToExcelFile, pathToLangFile, savePath, fileName, shouldWrite);
  } catch (error) {
    throw error;
  }
}


function validateParams(excelPath: string, englishLangPath: string, savePath: string, fileName: string): void {

  let errors: string = '';

  if (!FileSystemUtils.excelFileExists(excelPath)) {
    errors += `File '${excelPath}' does not exists or not a .xlsx file\n`;
  }

  if (!FileSystemUtils.jsonFileExists(englishLangPath)) {
    errors += `File '${englishLangPath}' does not exists or not a .json file\n`;
  }

  if (!FileSystemUtils.directoryExists(savePath)) {
    errors += `Path '${savePath}' does not exists or not a directory\n`;
  }

  if (!fileName.endsWith('.txt')) {
    errors += `The chosen file name '${fileName}' most has a suffix '.txt'\n`;
  }

  if (errors) {
    // generateExcelForTranslatorUsage(pathToEnglishFile, pathToOtherLangFile, savePath, fileName);

    throw new Error(errors);
  }
}


function writeExcelReport(excelPath: string, englishLangPath: string, savePath: string, fileName: string, shouldWriteToFile: boolean = false): void {

  try {
    let logs: string[] = getExcelLogs(excelPath);

    // const englishLangPathContent: string = fs.readFileSync(englishLangPath).toString();
    // const englishFile: TJsonContent = parseJson(englishLangPathContent, englishLangPath);
    // const englishFileTranslations: TJsonContent["translations"] = englishFile.translations;

    if (!logs.length) {
      console.log(`
      Congratelutions! No error or warnings found in the excel!
      You can merge this excel safely into your project.
      `);

      return;
    }

    if (!shouldWriteToFile) {
      for (const log of logs) {
        console.log(log);
      }

      return;
    }

    const writeStream: fs.WriteStream = fs.createWriteStream(`${savePath}/${fileName}`, { flags: 'a' });
    const now = new Date().toDateString();

    for (const log of logs) {
      writeStream.write(`${now} - ${log}\n`);
    }

    writeStream.end('');
  } catch (error) {
    throw error;
  }
}