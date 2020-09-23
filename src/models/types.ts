export type TStore = {
  texts: object;
  indexes: Map<string, [[Object]]>;
  groups?: [];
};

export type TCheckFiles = {
  extensionsPattern: RegExp;
  handler: string;
};

export type TConfiguration = {
  ignore: RegExp[];
  checkFiles: TCheckFiles[];
};

export type TGenerateBaseFileAnswers = {
  projectRootPath: string;
  savePath: string;
  fileName: string;
};

export type TCreateExcelAnswers = {
  pathToEnglishFile: string;
  pathToOtherLangFile: string;
  savePath: string;
  fileName: string;
};

export type TIntegrateExcelAnswers = {
  pathToExcelFile: string;
  pathToLangFile: string;
  savePath: string;
  fileName: string;
};

export type TGenerateExcelReport = {
  pathToExcelFile: string;
  pathToLangFile: string;
  savePath: string;
  fileName: string;
  shouldWrite: boolean;
};

export type TCompareLanguageFiles = {
  pathToNewFile: string;
  pathToOldFile: string;
  savePath: string;
  fileName: string;
  shouldWrite: boolean;
};

export type TFileData = {
  rootPath: string;
  path: string;
  fileName: string;
};

export type TJsonContent = {
  metadata: {
    lng: string;
    name: string;
    date_modified: string;
    version?: string;
  };
  translations: object;
};
