import * as fs from "fs";
import { createComparisonReport } from "../src/reports-actions/compare-lang-json-files";
import { createExcelReport } from "../src/reports-actions/translator-excel";


describe('Reports test', () => {

  const newFilePath = `${process.cwd()}/test/language-files/few-labels.en.json`;
  const oldFilePath = `${process.cwd()}/test/language-files/few-labels.de.json`;
  const comparisonSaveDir = process.cwd();
  const comparisonFileName = 'comparison-report.txt';

  const excelPath = `${process.cwd()}/test/excel-files/translations-with-errors.xlsx`;
  const englishLangPath = `${process.cwd()}/test/language-files/lang.en.json`;
  const excelSaveDir = process.cwd();
  const excelFileName = 'excel-report.txt';

  afterAll(() => {

    fs.unlink(`${comparisonSaveDir}/${comparisonFileName}`, (error) => {
      console.error(error);
    });

    fs.unlink(`${excelSaveDir}/${excelFileName}`, (error) => {
      console.error(error);
    });
  });


  test('generate log files', () => {
    createComparisonReport({ pathToNewFile: newFilePath, pathToOldFile: oldFilePath, savePath: comparisonSaveDir, fileName: comparisonFileName, shouldWrite: true });
  });

  test('generate excel log file', () => {
    createExcelReport({ pathToExcelFile: excelPath, pathToLangFile: englishLangPath, savePath: excelSaveDir, fileName: excelFileName, shouldWrite: true });
  });
});