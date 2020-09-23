import { FileSystemUtils } from '../src/utils/file-system';
import { existingPaths, nonExistingPaths, existingDirectories, nonExistingDirectories } from './mocks/paths.mock';


describe('File System utilities tests', () => {

  test('paths exists', () => {
    for (const path of existingPaths) {      
      expect(FileSystemUtils.pathExists(path)).toBe(true);
    }
  });
  
  test('paths not exists', () => {
    for (const path of nonExistingPaths) {     
      expect(FileSystemUtils.pathExists(path)).toBe(false);
    }
  });

  test('directories exists', () => {
    for (const dir of existingDirectories) {  
      expect(FileSystemUtils.directoryExists(dir)).toBe(true);
    }
  });

  test('directories not exists', () => {
    for (const dir of nonExistingDirectories) {  
      expect(FileSystemUtils.directoryExists(dir)).toBe(false);
    }
  });
  
});
