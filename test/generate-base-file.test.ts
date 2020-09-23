import * as fs from "fs";
import { generateBaseFile } from '../src/actions/generate-base-file';
import { englishJsonMock } from './mocks/english-json.mock';
import { FileSystemUtils } from '../src/utils/file-system';
import { parseJson } from "../src/utils/json";


describe('Generate English-English file tests', () => {

  const testFileName = "lang.en.test.json";

  const defaultFileName = "english.json";

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

  const readFile = (path: string) => {

    try {
      return parseJson(fs.readFileSync(FileSystemUtils.convertToAbsolutePath(path)).toString());
    } catch (error) {
      console.log(error.message);
    }
  }


  test('generate english-english file with valid parameters', () => {

    const validParams = [
      { projectRootPath: undefined, savePath: undefined, fileName: undefined },
      { projectRootPath: process.cwd(), savePath: process.cwd(), fileName: undefined },
      { projectRootPath: "", savePath: "", fileName: "" },
      { projectRootPath: ".", savePath: ".", fileName: testFileName },
      { projectRootPath: "../language-utils", savePath: ".", fileName: testFileName },
      { projectRootPath: ".", savePath: "/tmp", fileName: testFileName },
      { projectRootPath: undefined, savePath: "/tmp", fileName: undefined }
    ];

    for (const params of validParams) {
      generateBaseFile(params);

      const generatedFileContentObject = readFile(`${params.savePath || process.cwd()}/${params.fileName || defaultFileName}`);

      expect(generatedFileContentObject.hasOwnProperty('metadata')).toBe(true);

      expect(generatedFileContentObject.hasOwnProperty('translations')).toBe(true);

      expect(generatedFileContentObject.metadata.lng).toBe('en');

      expect(generatedFileContentObject.metadata.name).toBe('English');

      expect(generatedFileContentObject.metadata.hasOwnProperty('date_modified')).toBe(true);

      for (const key in generatedFileContentObject.translations) {
        expect(englishJsonMock.translations.hasOwnProperty(key)).toBe(true);

        expect(englishJsonMock.translations[key]).toEqual(generatedFileContentObject.translations[key]);
      }

      for (const key in englishJsonMock.translations) {
        expect(generatedFileContentObject.translations.hasOwnProperty(key)).toBe(true);

        expect(generatedFileContentObject.translations[key]).toEqual(englishJsonMock.translations[key]);
      }
    }
  });

  test('generate english-english file with invalid parameters fails', () => {

    const nonValidParams = [
      { projectRootPath: "not-exists", savePath: ".", fileName: "test.json" },
      { projectRootPath: ".", savePath: "not-exists", fileName: "test.json" },
      { projectRootPath: ".", savePath: ".", fileName: "test.notjson" }
    ];

    for (const params of nonValidParams) {
      expect(() => generateBaseFile(params)).toThrow();
    }
  });
});