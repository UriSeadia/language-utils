import rewire from 'rewire';
import { excelToJson } from '../src/utils/excel';

const excelRewire = rewire('../dist/src/utils/excel');
const getNumberOfExcelWorksheetRows = excelRewire.__get__('getNumberOfExcelWorksheetRows');


describe('Excel utilities tests', () => {
  
  test('valid excel', () => {
    const excelAsJson: object = excelToJson(`${__dirname}/excel-files/from-translator.xlsx`);
    expect(excelAsJson['5 minutes']).toBe('sinko munutes');
  })
  
  test('not valid excel', () => {
    const excelAsJson: object = excelToJson(`${__dirname}/excel-files/translations_missing_key.xlsx`);
    expect(excelAsJson['5 minutes']).toBe('sinko munutes');
  })

  test('valid excel worksheet ref', () => {
    expect(getNumberOfExcelWorksheetRows('A1:B5')).toBe(5);
  })
});



// TODO: to be continued

// const x = {
//   A1: { t: 's', v: '5 minutes' },
//   B1: { t: 's', v: 'sinko munutes' },
//   A2: { t: 's', v: '61850-MMS' },
//   B2: { t: 's', v: 'french MMS' },
//   A3: { t: 's', v: 'Add mask' },
//   B3: { t: 's', v: 'french mask' },
//   A4: { t: 's', v: 'Are you sure you want to proceed?' },
//   B4: { t: 's', v: 'maybe' },
//   '!ref': 'A1:B4'
// }