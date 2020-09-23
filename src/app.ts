import { prompt } from "inquirer";
import { TGenerateBaseFileAnswers, TCreateExcelAnswers, TIntegrateExcelAnswers, TGenerateExcelReport, TCompareLanguageFiles } from "./models/types";
import { generateEnglishFileQuestions, actionsList, generateExcelForTranslatorQuestions, EActions, integrateExcelQuestions, generateExcelReport, compareLanguageFiles } from "./models/prompt";
import { generateBaseFile } from "./actions/generate-base-file";
import { generateExcelFile } from "./actions/generate-excel-file";
import { integrateTranslatorFile } from "./actions/integrate-translator-file";
import { createExcelReport } from "./reports-actions/translator-excel";
import { createComparisonReport } from "./reports-actions/compare-lang-json-files";


function main() {

  prompt(actionsList)
    .then((answer) => {

      switch (answer.action) {

        case EActions.GenerateBaseFile:

          prompt(generateEnglishFileQuestions)
            .then((answers: TGenerateBaseFileAnswers) => generateBaseFile(answers))
            .catch((error) => console.error(error.message || error));

          break;

        case EActions.GenerateExcelFile:

          prompt(generateExcelForTranslatorQuestions)
            .then((answers: TCreateExcelAnswers) => generateExcelFile(answers))
            .catch((error) => console.error(error.message || error));

          break;

        case EActions.IntegrateFile:

          prompt(integrateExcelQuestions)
            .then((answers: TIntegrateExcelAnswers) => integrateTranslatorFile(answers))
            .catch((error) => console.error(error.message || error));

          break;

        case EActions.ExcelReport:

          prompt(generateExcelReport)
            .then((answers: TGenerateExcelReport) => createExcelReport(answers))
            .catch((error) => console.error(error.message || error));

          break;

        case EActions.ComparisonReport:

          prompt(compareLanguageFiles)
            .then((answers: TCompareLanguageFiles) => createComparisonReport(answers))
            .catch((error) => console.error(error.message || error));

          break;

        default:
          console.error("Unknown command");

          break;
      }
    })
    .catch((error) => error.isTtyError ? console.error('Prompt could not be rendered in the current environment') : console.error(error));
}


main();


// if (!(process.argv[2] && fs.existsSync(process.argv[2]))) {
//   console.error("First argument must be the full path to english-english json file");
//   return;
// }

// if (!(process.argv[3] && fs.existsSync(process.argv[3]))) {
//   console.error("Second argument must be the full path to another language json file");
//   process.exit(1);
// }
