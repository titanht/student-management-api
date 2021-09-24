import { parseCsvContent } from 'app/services/utils/fileUtils';
import { expect } from 'chai';
import test from 'japa';

const csvData = `AC-No.,No.,Name
28,,Shrek
28,,Fiona

`;

test.group('fileUtils', () => {
  test.only('parses csvData', async () => {
    const parsedData = parseCsvContent(csvData);

    expect(parsedData).to.deep.equal([
      ['28', '', 'Shrek'],
      ['28', '', 'Fiona'],
    ]);
  });
});
