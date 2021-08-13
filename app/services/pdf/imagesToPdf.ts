import { v4 } from 'uuid';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

const makePdfDir = () => {
  const pdfDir = path.join(__dirname, 'pdf');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }
};

export const convertImagesToPdf = async (images) => {
  makePdfDir();

  return new Promise((resolve) => {
    // Create a document
    const doc = new PDFDocument({ layout: 'landscape' });
    const fileName = path.join(__dirname, 'pdf', `${v4()}.pdf`);
    const pdfStream = fs.createWriteStream(fileName);

    doc.pipe(pdfStream);

    images.forEach((image, i) => {
      doc.image(image, 0, 0, {
        align: 'center',
        fit: [842, 596],
        valign: 'center',
        //
      });
      if (i < images.length - 1) {
        doc.addPage();
      }
    });

    doc.end();

    pdfStream.on('close', () => {
      resolve(fileName);
    });
  });
};
