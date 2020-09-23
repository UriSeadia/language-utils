import * as fs from "fs";
import { TConfiguration } from "../models/types";
import { defaultConfiguration } from "../models/common";


export function getRootConfiguration(): TConfiguration {

  const currentDir: string = process.cwd();

  const path: string = `${currentDir}/langconf.js`;

  let config: TConfiguration = {
    ignore: [...defaultConfiguration.ignore],
    checkFiles: [...defaultConfiguration.checkFiles]
  };

  try {
    if (fs.existsSync(path)) {
      const { ignore = [], checkFiles = [] } = require(path);

      config = {
        ignore: [...defaultConfiguration.ignore, ...ignore],
        checkFiles: [...checkFiles, ...defaultConfiguration.checkFiles]
      };
    }

    return config;
  } catch (error) {
    console.error(error.message);
    
    process.exit(2);
  }
}