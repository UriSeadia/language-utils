import * as fs from "fs";
import { TJsonContent, TCompareLanguageFiles } from "../models/types";
import { FileSystemUtils } from "../utils/file-system";
import { parseJson } from "../utils/json";


export function createComparisonReport(params: TCompareLanguageFiles): void {
  let { pathToNewFile, pathToOldFile, savePath, fileName, shouldWrite } = params;

  pathToNewFile = FileSystemUtils.convertToAbsolutePath(pathToNewFile);

  pathToOldFile = FileSystemUtils.convertToAbsolutePath(pathToOldFile);

  savePath = savePath ? FileSystemUtils.convertToAbsolutePath(savePath) : process.cwd();

  fileName = fileName || 'comparison-report.txt';

  try {
    validateParams(pathToNewFile, pathToOldFile, savePath, fileName);

    writeComparisonReport(pathToNewFile, pathToOldFile, savePath, fileName, shouldWrite);
  } catch (error) {
    throw error;
  }
}


function validateParams(newFilePath: string, oldFilePath: string, savePath: string, fileName: string): void {

  let errors: string = '';

  if (!FileSystemUtils.jsonFileExists(newFilePath)) {
    errors += `File '${newFilePath}' does not exists or not a .json file\n`;
  }

  if (!FileSystemUtils.jsonFileExists(oldFilePath)) {
    errors += `File '${oldFilePath}' does not exists or not a .json file\n`;
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


function writeComparisonReport(newFilePath: string, oldFilePath: string, savePath: string, fileName: string, shouldWriteToFile: boolean = false): void {

  try {
    const newFileContent: string = fs.readFileSync(newFilePath).toString();

    const oldFileFileContent: string = fs.readFileSync(oldFilePath).toString();

    const newFile: TJsonContent = parseJson(newFileContent, newFilePath);

    const oldFile: TJsonContent = parseJson(oldFileFileContent, oldFilePath);

    const newFileTranslations: TJsonContent["translations"] = newFile.translations;

    const oldFileTranslations: TJsonContent["translations"] = oldFile.translations;

    if (!shouldWriteToFile) {
      for (const key in newFileTranslations) {
        if (!oldFileTranslations.hasOwnProperty(key)) {
          console.log(`Info   : New label: '${key}'`);
        } else if (newFileTranslations[key] !== oldFileTranslations[key]) {
          console.warn(`Warning: Value changed for key '${key}' - before: '${oldFileTranslations[key]}', changed to: '${newFileTranslations[key]}'`);
        }
      }
  
      for (const key in oldFileTranslations) {
        if (!newFileTranslations.hasOwnProperty(key)) {
          console.warn(`Warning: Key '${key}' was removed and does not exists anymore in the new language file`);
        }
      }

      return;
    }

    const writeStream: fs.WriteStream = fs.createWriteStream(`${savePath}/${fileName}`, { flags: 'a' });

    const now = new Date().toDateString();

    for (const key in newFileTranslations) {
      if (!oldFileTranslations.hasOwnProperty(key)) {
        writeStream.write(`${now} - Info   : New label: '${key}'\n`);
      } else if (newFileTranslations[key] !== oldFileTranslations[key]) {
        writeStream.write(`${now} - Warning: Value changed for key '${key}' - before: '${oldFileTranslations[key]}', changed to: '${newFileTranslations[key]}'\n`);
      }
    }

    for (const key in oldFileTranslations) {
      if (!newFileTranslations.hasOwnProperty(key)) {
        writeStream.write(`${now} - Warning: Key '${key}' was removed and does not exists anymore in the new language file\n`);
      }
    }

    writeStream.end('');
  } catch (error) {
    throw error;
  }
}
