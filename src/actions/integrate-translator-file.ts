import * as fs from "fs";
import { TJsonContent, TIntegrateExcelAnswers } from "../models/types";
import { FileSystemUtils } from "../utils/file-system";
import { excelToJson } from "../utils/excel";
import { getFullJsonObject, parseJson } from "../utils/json";
import { integrateExcelFromTranslatorUsage } from "../utils/usage";


export function integrateTranslatorFile(params: TIntegrateExcelAnswers): void {

  let { pathToExcelFile, pathToLangFile, savePath, fileName } = params;

  pathToExcelFile = FileSystemUtils.convertToAbsolutePath(pathToExcelFile);

  pathToLangFile = FileSystemUtils.convertToAbsolutePath(pathToLangFile);

  savePath = savePath ? FileSystemUtils.convertToAbsolutePath(savePath) : process.cwd();

  fileName = fileName || 'merged.json';

  try {
    validateParams(pathToExcelFile, pathToLangFile, savePath, fileName);

    integrateExcelFromTranslator(pathToExcelFile, pathToLangFile, savePath, fileName);
  } catch (error) {
    throw error;
  }
}


function validateParams(pathToExcelFile: string, pathToLangFile: string, savePath: string, fileName: string): void {

  let errors: string = '';

  if (!FileSystemUtils.excelFileExists(pathToExcelFile)) {
    errors += `File '${pathToExcelFile}' does not exists or not a .xlsx file\n`;
  }

  if (!FileSystemUtils.jsonFileExists(pathToLangFile)) {
    errors += `File '${pathToLangFile}' does not exists or not a .json file\n`;
  }

  if (!FileSystemUtils.directoryExists(savePath)) {
    errors += `Path '${savePath}' does not exists or not a directory\n`;
  }

  if (!fileName.endsWith('.json')) {
    errors += `The chosen file name '${fileName}' most has a suffix '.json'\n`;
  }

  if (errors) {
    integrateExcelFromTranslatorUsage(pathToExcelFile, pathToLangFile, savePath, fileName);

    throw new Error(errors);
  }
}


function integrateExcelFromTranslator(pathToExcelFile: string, pathToLangFile: string, savePath: string, fileName: string): void {

  try {
    const baseFileContent: string = fs.readFileSync(pathToLangFile).toString();

    const baseFileObject: TJsonContent = parseJson(baseFileContent, pathToLangFile);

    const newTranslations: object = excelToJson(pathToExcelFile);

    const fullJson: TJsonContent = getFullJsonObject(baseFileObject, newTranslations);

    FileSystemUtils.createJsonFile(fullJson, `${savePath}/${fileName}`);
  } catch (error) {
    throw error;
  }
}
