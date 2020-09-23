#!/usr/bin/env ts-node

import { program } from 'commander';
import { generateBaseFile } from '../actions/generate-base-file';
import { generateExcelFile } from '../actions/generate-excel-file';
import { integrateTranslatorFile } from '../actions/integrate-translator-file';
import { createExcelReport } from '../reports-actions/translator-excel';
import { createComparisonReport } from '../reports-actions/compare-lang-json-files';
import { CLILabels } from './labels';


program
  .version('0.1.0')
// .option('-C, --chdir <path>', 'change the working directory')
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook');


program
  .command('generate-english-json [root_directory] [dir_to_save] [file_name]')
  .description(CLILabels.generateEnglishJsonDescription)
  .alias('gen')
  .on('--help', () => console.log(CLILabels.generateEnglishJsoHelp))
  .action((root_directory: string, dir_to_save: string, file_name: string) => {
    try {
      generateBaseFile({ projectRootPath: root_directory, savePath: dir_to_save, fileName: file_name });
    } catch (error) {
      console.error(error.message || error);
    }
  });


program
  .command('generate-excel <english_file_path> <other_lang_file_path> [dir_to_save] [file_name]')
  .description(CLILabels.generateExcelDescription)
  .alias('excel')
  .on('--help', () => console.log(CLILabels.generateExcelHelp))
  .action((english_file_path: string, other_lang_file_path, dir_to_save: string, file_name: string) => {
    try {
      generateExcelFile({ pathToEnglishFile: english_file_path, pathToOtherLangFile: other_lang_file_path, savePath: dir_to_save, fileName: file_name });
    } catch (error) {
      console.error(error.message || error);
    }
  });


program
  .command('merge-excel <excel_file_path> <lang_file_path> [dir_to_save] [file_name]')
  .description(CLILabels.mergeExcelDescription)
  .alias('merge')
  .on('--help', () => console.log(CLILabels.mergeExcelHelp))
  // .option('-r', '--replace-existing', 'replace the current file with the merged file')
  .action((excel_file_path: string, lang_file_path: string, dir_to_save: string, file_name: string) => {
    try {
      integrateTranslatorFile({ pathToExcelFile: excel_file_path, pathToLangFile: lang_file_path, savePath: dir_to_save, fileName: file_name });
    } catch (error) {
      console.error(error.message || error);
    }
  });


program
  .command('translator-excel-report <excel_file_path> <lang_file_path> [dir_to_save] [file_name]')
  .description(CLILabels.excelReportDescription)
  .alias('report-e')
  .option('-w, --write', 'Write the results to a file instead of just logging it')
  .on('--help', () => console.log(CLILabels.excelReportHelp))
  .action((excel_file_path: string, lang_file_path: string, dir_to_save: string, file_name: string, cmdObj: any) => {
    const shouldWriteToFile = !!cmdObj.write;

    try {
      createExcelReport({ pathToExcelFile: excel_file_path, pathToLangFile: lang_file_path, savePath: dir_to_save, fileName: file_name, shouldWrite: shouldWriteToFile });
    } catch (error) {
      console.error(error.message || error);
    }
  });


program
  .command('compare-lang-files <new_file_path> <old_file_path> [dir_to_save] [file_name]')
  .description(CLILabels.comparisonReportDescription)
  .alias('report-c')
  .option('-w, --write', 'Write the results to a file instead of just logging it')
  .on('--help', () => console.log(CLILabels.comparisonReportHelp))
  .action((new_file_path: string, old_file_path, dir_to_save: string, file_name: string, cmdObj: any) => {
    const shouldWriteToFile = !!cmdObj.write;

    try {
      createComparisonReport({ pathToNewFile: new_file_path, pathToOldFile: old_file_path, savePath: dir_to_save, fileName: file_name, shouldWrite: shouldWriteToFile });
    } catch (error) {
      console.error(error.message || error);
    }
  });

program.parse(process.argv);