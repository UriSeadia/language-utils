import { TJsonContent } from "./types";


export const baseEnglishMetadata: TJsonContent["metadata"] = {
  lng: "en",
  name: "English",
  date_modified: undefined
};

export const defaultConfiguration = {
  ignore: [
    /^lib$/, 
    /^node_modules$/, 
    /^dist$/,
    /^build$/
  ],
  checkFiles: [{
    extensionsPattern: /\.tsx?$|\.jsx?$/,
    handler: "js"
  }]
};

export const languagePattern: RegExp = /\@Translation.*?\@End_of_translation/gs;

export const objectPattern: RegExp = /=.*?\{.*\}/s;
