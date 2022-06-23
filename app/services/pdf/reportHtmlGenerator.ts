import fs from 'fs';
import { generateBackHtml, generateFrontHtml } from './htmlGenerators';
import GradeService from 'app/modules/academic/grade/gradeService';
import { headMainTemplate } from './coreTemplates';
import nurseryTemplate from './nurseryTemplate';
import Grade from 'app/modules/academic/grade/grade';
import { SubjectReportTemplate } from 'app/modules/academic/marklist/subject/subject';

export const generateHtmlReport = async (gradeId: string, gradeData) => {
  const gradeService = new GradeService();
  const grade = (await gradeService.findOne(gradeId)) as Grade;
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
    // console.log('Gen pdf', gradeData[i]);
    const { marklist, studentData, skills } = gradeData[i];

    if (grade.report_card_template === SubjectReportTemplate.Nursery) {
      htmlTemplate += nurseryTemplate({
        studentData,
        marklist,
        skills,
        subjects,
      });
    } else {
      htmlTemplate += generateFrontHtml(studentData, skills, studentData.year);
      htmlTemplate += generateBackHtml(subjects, marklist, studentData.year);
    }
  }

  htmlTemplate += `
      </body>
    </html>
    `;

  const htmlPath = `${__dirname}/index.html`;
  fs.writeFileSync(htmlPath, htmlTemplate);

  return htmlPath;
};
