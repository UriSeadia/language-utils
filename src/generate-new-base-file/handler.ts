import * as fs from "fs";
import { TCheckFiles } from "../models/types";
import { Store } from "./store";
import { languagePattern, objectPattern } from "../models/common";


export class Handler {

  JSHandler = "js";
  fileHandlerMap = { [this.JSHandler]: this.extractAndParseJSFile.bind(this) };
  checkFiles: TCheckFiles[];


  constructor(checkFiles: TCheckFiles[]) {
    this.checkFiles = checkFiles;
  }


  get(fileName: string) {
    for (const { extensionsPattern, handler } of this.checkFiles) {
      if (extensionsPattern.test(fileName)) {
        return this.fileHandlerMap[handler];
      }
    }
  }


  run({ fileName, path = "", rootPath = "" }, store: Store): void {
    const handler = this.get(fileName);

    if (!handler) {
      return;
    }

    if (rootPath && rootPath[rootPath.length - 1] !== "/") {
      rootPath += "/";
    }

    // console.log(`Parse ${rootPath + path + fileName}`);
    const fileText = fs.readFileSync(rootPath + path + fileName).toString();

    handler({ fileName, fileText, path }, store);
  }


  parseContent({ content, fileName, section }) {

    const matchingResults: any[] = content.match(objectPattern);

    if (matchingResults !== null) {
      try {
        const languageObject: object = eval("let w " + matchingResults + "; w");
        return Object.values(languageObject);
      } catch (error) {
        console.error(`
          Failed to parse translation object
          File: ${fileName}
          Content: ${content}
          Error ${error}
        `);
      }
    }
  }


  extractAndParseJSFile({ fileName, fileText, path = "" }, store: Store) {
    const contentsFile = fileText.match(languagePattern);

    if (contentsFile != null) {
      let i = 0;

      while (contentsFile[i]) {
        const section = i + 1;
        const texts = this.parseContent({
          content: contentsFile[i],
          fileName,
          section
        });

        if (texts) {
          store.insertTexts({ texts, fileName, section, path });
        }

        i++;
      }
    }
  }
}
