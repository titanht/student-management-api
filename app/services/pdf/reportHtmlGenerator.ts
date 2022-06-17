import fs from 'fs';
import { generateBackHtml, generateFrontHtml } from './htmlGenerators';
import GradeService from 'app/modules/academic/grade/gradeService';
import { headMainTemplate } from './coreTemplates';

export const generateHtmlReport = async (gradeId: string, gradeData) => {
  const gradeService = new GradeService();
  const subjects = await gradeService.getGradeSubjects(gradeId);
  let htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${headMainTemplate}
    </head>
    <body>
    `;

  // TODO: replace slice
  for (let i = 0; i < gradeData.length; i++) {
    // console.log('Gen pdf', i);
    const { marklist, studentData, skills } = gradeData[i];

    htmlTemplate += generateFrontHtml(studentData, skills);
    htmlTemplate += generateBackHtml(subjects, marklist, studentData.year);
  }

  htmlTemplate += `
      </body>
    </html>
    `;

  const htmlPath = `${__dirname}/index.html`;
  fs.writeFileSync(htmlPath, htmlTemplate);

  return htmlPath;
};
