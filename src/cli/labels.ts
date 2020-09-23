export namespace CLILabels {

  export const generateEnglishJsoHelp = `

  Arguments:
    [root_directory], path to your project's root
    [dir_to_save],    path to the directory where you would like to save the output file   default: current directory
    [file_name],      name for your output file (with '.json' suffix)                      default: 'english.json'
  
  Example:
    $ lang-utils gen /path/to/root/dir/ /path/to/dir_to_save/ my_file.json
  `;

  export const generateExcelHelp = `

  Arguments:
    <english_file_path>,    path to your English-English file  (i.e /path/to/lang.en.json)       required
    <other_lang_file_path>, path to your other language file (i.e /path/to/lang.de.json)         required
    [dir_to_save],          path to the directory where you would like to save the output file   default: current directory
    [file_name],            name for your output file (with '.xlsx' suffix)                      default: 'translate.xlsx'
  
  Example:
    $ lang-utils excel /path/to/lang.en.json /path/to/lang.de.json /path/to/dir_to_save/ my_file.xlsx
  `;
  
  export const mergeExcelHelp = `

  Arguments:
    <excel_file_path>, path to the Excel file you've got from the translator                required
    <lang_file_path>,  path to the current language file (i.e /path/to/lang.de.json)        required
    [dir_to_save],     path to the directory where you would like to save the output file   default: current directory
    [file_name],       name for your output file (with '.json' suffix)                      default: 'merged.json'

  Example:
    $ lang-utils merge /path/to/translate.xlsx /path/to/lang.de.json /path/to/dir_to_save/ my_file.json
  `;

  export const excelReportHelp = `

  Arguments:
    <excel_file_path>, path to the Excel file you've got from the translator                required
    <lang_file_path>,  path to the current language file (i.e /path/to/lang.de.json)        required
    [dir_to_save],     path to the directory where you would like to save the output file   default: current directory
    [file_name],       name for your output report file (with '.txt' suffix)                default: 'excel-report.txt'

  Example:
    $ lang-utils report-e /path/to/translate.xlsx /path/to/lang.de.json /path/to/dir_to_save/ my_file.txt
  `;

  export const comparisonReportHelp = `

  Arguments:
    <new_file_path>, path to your new language file (i.e /path/to/new_file.json)          required
    <old_file_path>, path to your old language file (i.e /path/to/lang.de.json)           required
    [dir_to_save],   path to the directory where you would like to save the output file   default: current directory
    [file_name],     name for your output report file (with '.txt' suffix)                default: 'comparison-report.txt'

  Example:
    $ lang-utils report-c /path/to/new_file.json /path/to/lang.de.json /path/to/dir_to_save/ my_file.txt
  `;

  export const generateEnglishJsonDescription = 'Generate English-English .json file for your project';

  export const generateExcelDescription = 'Generate Excel (.xlsx) file for sending to translation';

  export const mergeExcelDescription = 'Merge the excel from the translator into your project';

  export const excelReportDescription = 'Create report file with errors and warnings for the excel from the translator, if there are errors or warnings';

  export const comparisonReportDescription = 'Create comparison report between old language file and new language file';
};