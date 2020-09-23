import * as fs from "fs";
import { TCreateExcelAnswers, TJsonContent } from "../models/types";
import { generateExcelForTranslatorUsage } from "../utils/usage";
import { FileSystemUtils } from "../utils/file-system";
import { parseJson } from "../utils/json";
import { shouldNotTranslate } from "../models/not-to-translate-labels";
import { writeExcelToTranslator } from "../utils/excel";


export function generateExcelFile(params: TCreateExcelAnswers): void {

  let { pathToEnglishFile, pathToOtherLangFile, savePath, fileName } = params;

  pathToEnglishFile = FileSystemUtils.convertToAbsolutePath(pathToEnglishFile);

  pathToOtherLangFile = FileSystemUtils.convertToAbsolutePath(pathToOtherLangFile);

  savePath = savePath ? FileSystemUtils.convertToAbsolutePath(savePath) : process.cwd();

  fileName = fileName || 'translate.xlsx';

  try {
    validateParams(pathToEnglishFile, pathToOtherLangFile, savePath, fileName);

    generateExcelForTranslator(pathToEnglishFile, pathToOtherLangFile, savePath, fileName);
  } catch (error) {
    throw error;
  }
}


function validateParams(pathToEnglishFile: string, pathToOtherLangFile: string, savePath: string, fileName: string): void {

  let errors: string = '';

  if (!FileSystemUtils.jsonFileExists(pathToEnglishFile)) {
    errors += `File '${pathToEnglishFile}' does not exists or not a .json file\n`;
  }

  if (!FileSystemUtils.jsonFileExists(pathToOtherLangFile)) {
    errors += `File '${pathToOtherLangFile}' does not exists or not a .json file\n`;
  }

  if (!FileSystemUtils.directoryExists(savePath)) {
    errors += `Path '${savePath}' does not exists or not a directory\n`;
  }

  if (!fileName.endsWith('.xlsx')) {
    errors += `The chosen file name '${fileName}' most has a suffix '.xlsx'\n`;
  }

  if (errors) {
    generateExcelForTranslatorUsage(pathToEnglishFile, pathToOtherLangFile, savePath, fileName);

    throw new Error(errors);
  }
}


function generateExcelForTranslator(pathToEnglishFile: string, pathToOtherLangFile: string, savePath: string, fileName: string): void {

  try {
    const englishFileContent: string = fs.readFileSync(pathToEnglishFile).toString();

    const otherLanguageFileContent: string = fs.readFileSync(pathToOtherLangFile).toString();

    const englishFile: TJsonContent = parseJson(englishFileContent, pathToEnglishFile);

    const otherLanguageFile: TJsonContent = parseJson(otherLanguageFileContent, pathToOtherLangFile);

    const englishTranslations: TJsonContent["translations"] = englishFile.translations;

    const otherLanguageTranslations: TJsonContent["translations"] = otherLanguageFile.translations;

    const data: string[][] = [["English Terms", "Translations"]];

    let index: number = 1;

    for (const key in englishTranslations) {
      if (!otherLanguageTranslations.hasOwnProperty(key) && !shouldNotTranslate.includes(key)) {
        data[index] = [key];

        index++;
      }
    }

    writeExcelToTranslator(data, `${savePath}/${fileName}`);
  } catch (error) {
    throw error;
  }
}

