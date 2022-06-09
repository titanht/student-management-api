import { htmlToImage } from './imageGenerator';
import { generateBackHtml, generateFrontHtml } from './htmlGenerators';
import { convertImagesToPdf } from './imagesToPdf';
import GradeService from 'app/modules/academic/grade/gradeService';

export const generatePdf = async (gradeId: string, gradeData) => {
  const gradeService = new GradeService();
  const subjects = await gradeService.getGradeSubjects(gradeId);
  // console.log(subjects);
  const MAX_PROMISES = 5;
  let promises: Promise<any>[] = [];
  const imageMap = {};

  // TODO: replace slice
  for (let i = 0; i < gradeData.length; i++) {
    console.log('Gen pdf', i);
    const { marklist, studentData } = gradeData[i];

    promises.push(
      htmlToImage(generateFrontHtml(studentData)).then((imgPath) => {
        imageMap[2 * i] = imgPath;
      })
    );
    promises.push(
      htmlToImage(generateBackHtml(subjects, marklist, studentData.year)).then(
        (imgPath) => {
          imageMap[2 * i + 1] = imgPath;
        }
      )
    );

    if (promises.length >= MAX_PROMISES) {
      console.log('\n');
      await Promise.all(promises);
      promises = [];
    }
  }

  await Promise.all(promises);

  const imageMapKeys = Object.keys(imageMap);
  const images = Array.from(Array(imageMapKeys.length));
  imageMapKeys.forEach((key) => {
    images[key] = imageMap[key];
  });

  const pdfPath = await convertImagesToPdf(images);

  // await removeImages(images);

  return pdfPath;
};
