import * as XLSX from 'xlsx';


const FIRST_TRANSLATION_ROW = 2;


export function excelToJson(path: string): object {

  const workbook: XLSX.WorkBook = XLSX.readFile(path, { cellText: true, sheetStubs: true });

  const sheetName: string = workbook.SheetNames[0];

  const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  const lastRow: number = getNumberOfExcelWorksheetRows(worksheet['!ref']);

  let jsonObject = {};

  for (let row = FIRST_TRANSLATION_ROW; row <= lastRow; row++) {
    const keyCellAddress: string = `A${row.toString()}`;

    const valueCellAddress: string = `B${row.toString()}`;

    const keyCell: XLSX.CellObject = worksheet[keyCellAddress];

    const valueCell: XLSX.CellObject = worksheet[valueCellAddress];

    const desiredKey: string = keyCell ? (keyCell.v.toString()) : undefined;

    const desiredValue: string = valueCell ? (valueCell.v).toString() : undefined;

    if (desiredKey) {
      jsonObject[desiredKey] = desiredValue ? desiredValue : desiredKey;
    } else {
      console.error(`Passing row ${row} - No key in ${keyCellAddress}`);
    }
  }

  return jsonObject;
}


function getNumberOfExcelWorksheetRows(worksheetRef: string): number {

  worksheetRef = worksheetRef.substring(worksheetRef.indexOf(':') + 1);

  if (!worksheetRef) {
    throw new Error('Failed to get worksheet reference');
  }

  let numberOfRows: number = parseInt(worksheetRef);

  while (isNaN(numberOfRows)) {
    worksheetRef = worksheetRef.substring(1);

    numberOfRows = parseInt(worksheetRef);
  }

  return numberOfRows;
}


export function writeExcelToTranslator(data: string[][], fileName: string): void {

  const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  workbook.SheetNames.push('Sheet1');

  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

  workbook.Sheets['Sheet1'] = worksheet;

  XLSX.writeFile(workbook, fileName, { bookType: 'xlsx', type: "string" });
}


export function getExcelLogs(pathToExcel: string): string[] {

  const workbook: XLSX.WorkBook = XLSX.readFile(pathToExcel, { cellText: true, sheetStubs: true });

  let logs: string[] = [];

  const numberOfWorksheets: number = workbook.SheetNames.length;

  if (numberOfWorksheets > 1) {
    logs.push(`Warning: To many worksheets in the workbook: expected one worksheet, got ${numberOfWorksheets} worksheets`);
  } else if (numberOfWorksheets === 0) {
    logs.push(`Error: No worksheets in your workbook!`);
    return;
  }

  const sheetName: string = workbook.SheetNames[0];

  const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  const lastRow: number = getNumberOfExcelWorksheetRows(worksheet['!ref']);

  for (let row = FIRST_TRANSLATION_ROW; row <= lastRow; row++) {
    const keyCellAddress: string = `A${row.toString()}`;

    const valueCellAddress: string = `B${row.toString()}`;

    const keyCell: XLSX.CellObject = worksheet[keyCellAddress];

    const valueCell: XLSX.CellObject = worksheet[valueCellAddress];

    const desiredKey: string = keyCell ? (keyCell.v.toString()) : undefined;

    const desiredValue: string = valueCell ? (valueCell.v).toString() : undefined;

    if (!desiredKey) {
      if (!desiredValue) {
        logs.push(`Warning: Row ${row} is empty`);
      } else {
        logs.push(`Error  : Value '${desiredValue}' at row ${row} has no key!`);
      }
    } else if (!desiredValue) {
      logs.push(`Warning: Key '${desiredKey}' at row ${row} has no value`);
    }
  }

  return logs;
}
