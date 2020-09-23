import { TGenerateBaseFileAnswers, TConfiguration, TJsonContent, TFileData } from "../models/types";
import { FileSystemUtils } from "../utils/file-system";
import { generateEnglishEnglishFileUsage } from "../utils/usage";
import { Store } from "../generate-new-base-file/store";
import { Handler } from "../generate-new-base-file/handler";
import { getRootConfiguration } from "../generate-new-base-file/get-root-configuration";
import { getJsonMetadataObject } from "../utils/json";
import { baseEnglishMetadata } from "../models/common";


export function generateBaseFile(params: TGenerateBaseFileAnswers): void {

  let { projectRootPath, savePath, fileName } = params;

  projectRootPath = projectRootPath ? FileSystemUtils.convertToAbsolutePath(projectRootPath) : process.cwd();

  savePath = savePath ? FileSystemUtils.convertToAbsolutePath(savePath) : process.cwd();

  fileName = fileName || 'english.json';

  try {
    validateParams(projectRootPath, savePath, fileName);

    generateEnglishEnglishFile(projectRootPath, savePath, fileName);
  } catch (error) {
    throw error;
  }
}


function validateParams(projectRootPath: string, savePath: string, fileName: string): void {

  let errors: string = '';

  if (!FileSystemUtils.directoryExists(projectRootPath)) {
    errors += `Path '${projectRootPath}' does not exists or not a directory\n`;
  }

  if (!FileSystemUtils.directoryExists(savePath)) {
    errors += `Path '${savePath}' does not exists or not a directory\n`;
  }

  if (!fileName.endsWith('.json')) {
    errors += `The chosen file name '${fileName}' most has a suffix '.json'\n`;
  }

  if (errors) {
    generateEnglishEnglishFileUsage(projectRootPath, savePath, fileName);

    throw new Error(errors);
  }
}


function generateEnglishEnglishFile(projectRootPath: string, savePath: string, fileName: string = "lang.en.json"): void {

  try {
    const configuration: TConfiguration = getRootConfiguration();

    const store: Store = new Store();

    const handler: Handler = new Handler(configuration.checkFiles);

    const files: TFileData[] = FileSystemUtils.scanFiles(projectRootPath, configuration.ignore);

    files.forEach((file: TFileData) => handler.run(file, store));

    const metadata: TJsonContent["metadata"] = getJsonMetadataObject(baseEnglishMetadata);

    const translations = {};

    Object.keys(store.texts).sort().forEach((key) => translations[key] = store.texts[key]);

    const fullJsonContent: TJsonContent = { metadata, translations };

    FileSystemUtils.createJsonFile(fullJsonContent, `${savePath}/${fileName}`);

    // createMetaData(store);
  } catch (error) {
    throw error;
  }
}