export function generateEnglishEnglishFileUsage(projectRootPath: string, savePath: string, fileName: string): void {
  console.error(`
  Failed to execute the script!
  please make sure that:
    1. Directory ${projectRootPath} exists
    2. Directory ${savePath} exists
    3. Your output file ${fileName} has a valid json name (ends with '.json')
  `);
}

export function generateExcelForTranslatorUsage(pathToEnglishFile: string, pathToOtherLangFile: string, savePath: string, fileName: string): void {
  console.error(`
  Failed to execute the script!
  please make sure that:
    1. Path ${pathToEnglishFile} exists and it is a valid json file (ends with '.json')
    2. Path ${pathToOtherLangFile} exists and it is a valid json file (ends with '.json')
    3. Directory ${savePath} exists
    4. Your output file ${fileName} has a valid excel name (ends with 'xlsx')
  `);
}

export function integrateExcelFromTranslatorUsage(pathToExcelFile: string, pathToLangFile: string, savePath: string, fileName: string): void {
  console.error(`
  Failed to execute the script!
  please make sure that:
    1. Path ${pathToExcelFile} exists and it is a valid excel file (ends with 'xlsx)
    2. Path ${pathToLangFile} exists and it is a valid json file (ends with '.json')
    3. Directory ${savePath} exists
    4. Your output file ${fileName} has a valid json name (ends with '.json')
  `);
}
