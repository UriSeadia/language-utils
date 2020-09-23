import * as fs from "fs";
import * as path from "path";
import { Store } from "../generate-new-base-file/store";
import { TFileData } from "../models/types";


export namespace FileSystemUtils {

  export function pathExists(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  export function directoryExists(path: string): boolean {
    return pathExists(path) && fs.lstatSync(path).isDirectory();
  }

  export function jsonFileExists(file: string): boolean {
    return pathExists(file) && fs.lstatSync(file).isFile() && file.endsWith('.json');
  }

  export function excelFileExists(file: string): boolean {
    return pathExists(file) && fs.lstatSync(file).isFile() && file.endsWith('.xlsx');
  }

  export function createJsonFile(content: object, filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  }

  export function createMetaData(store: Store): void {
    fs.writeFileSync("meta-data.json", JSON.stringify(store.toJson(), null, 2));
  }

  export function convertToAbsolutePath(_path: string) {
    return path.isAbsolute(_path) ? _path : path.join(process.cwd(), _path);
  }

  /** Retrieve file paths from a given folder and its subfolders */
  export function scanFiles(rootPath: string, ignoreFiles: RegExp[] = []): TFileData[] {

    const filePaths: string[] = getFilePaths(rootPath, ignoreFiles);

    return normalizePaths(rootPath, filePaths);
  };

  function normalizePaths(rootPath: string, filePaths: string[]): TFileData[] {

    return filePaths.map((filePath: string) => {
      const lastSlashIndex: number = filePath.lastIndexOf("/");

      const fileName: string = filePath.substring(lastSlashIndex + 1);

      let path: string = filePath.substring(rootPath.length, lastSlashIndex + 1);

      if (path[0] === "/") {
        path = path.substring(1);
      }

      return { rootPath, fileName, path };
    });
  }

  function getFilePaths(folderPath: string, ignoreFiles: RegExp[]): string[] {

    const entryPaths: string[] = fs.readdirSync(folderPath)
      .filter((entry: string) => !ignoreFiles.some((pattern: RegExp) => pattern.test(entry)))
      .map((entry: string) => path.join(folderPath, entry));

    const filePaths: string[] = entryPaths.filter((entryPath: string) => fs.statSync(entryPath).isFile());

    const dirPaths: string[] = entryPaths.filter((entryPath: string) => !filePaths.includes(entryPath));

    const dirFiles: string[] = dirPaths.reduce((prev: string[], curr: string) => prev.concat(getFilePaths(curr, ignoreFiles)), []);

    return [...filePaths, ...dirFiles];
  }
}