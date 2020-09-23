import { TJsonContent } from "../models/types";


export function mergeJsonTranslationsObjects(baseData: TJsonContent, translatorData: object): TJsonContent["translations"] {

  let result: TJsonContent["translations"] = {};

  const baseTranslations: TJsonContent["translations"] = baseData.translations;

  Object.keys({ ...baseTranslations, ...translatorData }).sort().forEach((key: string) => result[key] = translatorData[key] || baseTranslations[key]);

  // for logging a warnings
  // Object.keys(translatorData).forEach((key: string) => {
  //   if (!baseTranslations.hasOwnProperty(key)) {
  //     console.warn(`key '${key}' is not exists in the original json file`);
  //   }
  // });

  return result;
}


export function getJsonMetadataObject(metadata: TJsonContent["metadata"]): TJsonContent["metadata"] {

  return {
    lng: metadata.lng,
    name: metadata.name,
    date_modified: new Date().toDateString()
  };
}


export function getFullJsonObject(baseData: TJsonContent, translatorData: object): TJsonContent {

  let result = {};

  result["metadata"] = getJsonMetadataObject(baseData.metadata);

  result["translations"] = mergeJsonTranslationsObjects(baseData, translatorData);

  return result as TJsonContent;
}


export function parseJson(content: string, filePath?: string): any {

  try {
    return JSON.parse(content);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse ${filePath || 'content'}:\nSyntax exception occured. Not a valid json object!\n${error.message}`);
    } else {
      throw error;
    }
  }
}
