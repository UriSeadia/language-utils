import { FileSystemUtils } from "../utils/file-system";


const jsonFileExists = (input: string) => {

  if (input === "") {
    return "This field is required and should not be empty!";
  }

  const fullPath: string = FileSystemUtils.convertToAbsolutePath(input);

  if (!FileSystemUtils.jsonFileExists(fullPath)) {
    return `Path '${fullPath}' does not exists or not .json file`;
  }

  return true;
}


const excelFileExists = (input: string) => {

  if (input === "") {
    return "This field is required and should not be empty!";
  }

  const fullPath: string = FileSystemUtils.convertToAbsolutePath(input);

  if (!FileSystemUtils.excelFileExists(fullPath)) {
    return `Path '${fullPath}' does not exists or not .xlsx file`;
  }

  return true;
}


const directoryExists = (input: string) => {

  if (input === "") {
    return true;
  }

  const fullPath: string = FileSystemUtils.convertToAbsolutePath(input);

  if (!FileSystemUtils.directoryExists(fullPath)) {
    return `Path '${fullPath}' does not exists or not a directory`;
  }

  return true;
}


const validateJsonSuffix = (input: string) => {

  if (input === "" || input.endsWith('.json')) {
    return true;
  }

  return `'${input}' must have a suffix '.json'`;
}


const validateXlsxSuffix = (input: string) => {

  if (input === "" || input.endsWith('.xlsx')) {
    return true;
  }

  return `'${input}' must have a suffix '.xlsx'`;
}

const validateTxtSuffix = (input: string) => {

  if (input === "" || input.endsWith('.txt')) {
    return true;
  }

  return `'${input}' must have a suffix '.txt'`;
}


export const generateEnglishFileQuestions = [
  {
    type: 'input',
    name: 'projectRootPath',
    message: "Enter the path to your project's root, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'savePath',
    message: "Enter the path to the directory where you would like to save the output file, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'fileName',
    message: "Enter a name for your output file (with '.json' suffix), default: 'english.json'",
    validate: validateJsonSuffix
  }
];


export const generateExcelForTranslatorQuestions = [
  {
    type: 'input',
    name: 'pathToEnglishFile',
    message: "Enter the path to your English-English file (i.e /path/to/lang.en.json)",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'pathToOtherLangFile',
    message: "Enter the path to your other language file (i.e /path/to/lang.de.json)",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'savePath',
    message: "Enter the path to the directory where you would like to save the output file, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'fileName',
    message: "Enter a name for your output file (with '.xlsx' suffix), default: 'translate.xlsx'",
    validate: validateXlsxSuffix
  }
];


export const integrateExcelQuestions = [
  {
    type: 'input',
    name: 'pathToExcelFile',
    message: "Enter the path to the Excel file you've got from the translator",
    validate: excelFileExists
  },
  {
    type: 'input',
    name: 'pathToLangFile',
    message: "Enter the path to the current language file (i.e /path/to/lang.de.json)",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'savePath',
    message: "Enter the path to the directory where you would like to save the output file, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'fileName',
    message: "Enter a name for your output file (with '.json' suffix), default: 'merged.json'",
    validate: validateJsonSuffix
  }
];


export const generateExcelReport = [
  {
    type: 'input',
    name: 'pathToExcelFile',
    message: "Enter the path to the Excel file you've got from the translator",
    validate: excelFileExists
  },
  {
    type: 'input',
    name: 'pathToLangFile',
    message: "Enter the path to the current language file (i.e /path/to/lang.de.json)",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'savePath',
    message: "Enter the path to the directory where you would like to save the output file, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'fileName',
    message: "Enter a name for your output file (with '.txt' suffix), default: 'excel-report.txt'",
    validate: validateTxtSuffix
  },
  {
    type: 'confirm',
    name: 'shouldWrite',
    message: "Do you want to write the results to a file instead of just logging it?"
  }
];


export const compareLanguageFiles = [
  {
    type: 'input',
    name: 'pathToNewFile',
    message: "Enter the path to your new language file (i.e /path/to/new_file.json)",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'pathToOldFile',
    message: "Enter the path to your old language file (i.e /path/to/lang.de.json) ",
    validate: jsonFileExists
  },
  {
    type: 'input',
    name: 'savePath',
    message: "Enter the path to the directory where you would like to save the output file, default: current directory",
    validate: directoryExists
  },
  {
    type: 'input',
    name: 'fileName',
    message: "Enter a name for your output file (with '.txt' suffix), default: 'comparison-report.txt'",
    validate: validateTxtSuffix
  },
  {
    type: 'confirm',
    name: 'shouldWrite',
    message: "Do you want to write the results to a file instead of just logging it?"
  }
];


const actionChoicesMap = {
  'Generate English-English file': 0,
  'Generate excel file for translator': 1,
  'Merge translator excel into current language file': 2,
  'Create report of translator excel': 3,
  'Generate comparison report between old language file and new language file': 4
};


export enum EActions {
  GenerateBaseFile,
  GenerateExcelFile,
  IntegrateFile,
  ExcelReport,
  ComparisonReport
};


export const actionsList = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: Object.keys(actionChoicesMap),
    filter: (val) => actionChoicesMap[val]
  }
];