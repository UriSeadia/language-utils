import * as fs from "fs";
import { FileSystemUtils } from '../src/utils/file-system';
import { generateExcelFile } from "../src/actions/generate-excel-file";


describe('Generate Excel file for the translator tests', () => {

  const testFileName = "translate.test.xlsx";

  const defaultFileName = "translate.xlsx";

  const englishFilePath = './test/language-files/few-labels.en.json';

  const germanFilePath = './test/language-files/few-labels.de.json';

  const pathsToEnglishJsonFile = [
    `${process.cwd()}/${defaultFileName}`,
    `${process.cwd()}/${testFileName}`,
    `/tmp/${defaultFileName}`,
    `/tmp/${testFileName}`
  ];

  afterAll(() => {
    for (const path of pathsToEnglishJsonFile) {
      fs.unlink(path, (error) => {
        console.error(error);
      });
    }
  });

  test('generate Excel file for translator with valid parameters', () => {

    const validParams = [
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: undefined, fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: ".", fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: "", fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: "/tmp", fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: "/tmp/", fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: undefined, fileName: testFileName }
    ];

    for (const params of validParams) {
      generateExcelFile(params);

      expect(() => generateExcelFile(params)).not.toThrow();

      const fileFullPath = `${FileSystemUtils.convertToAbsolutePath(params.savePath || ".").toString()}/${params.fileName || defaultFileName}`;

      expect(FileSystemUtils.excelFileExists(fileFullPath)).toBe(true);
    }
  });

  test('generate Excel file for translator with invalid parameters fails', () => {

    const nonValidParams = [
      { pathToEnglishFile: undefined, pathToOtherLangFile: germanFilePath, savePath: undefined, fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: undefined, savePath: undefined, fileName: undefined },
      { pathToEnglishFile: "not-exists", pathToOtherLangFile: germanFilePath, savePath: undefined, fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: "not-exists", savePath: undefined, fileName: undefined },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: "not-exists", fileName: "test.xlsx" },
      { pathToEnglishFile: englishFilePath, pathToOtherLangFile: germanFilePath, savePath: ".", fileName: "test.notxlsx" }
    ];

    for (const params of nonValidParams) {
      expect(() => generateExcelFile(params)).toThrow();
    }
  });
});