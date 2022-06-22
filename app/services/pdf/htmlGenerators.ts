import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';
import { generateNurseryBackTemplate } from './nurseryBackTemplate';

export const generateFrontHtml = (studentData, skills) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData, skills);
};

export const generateBackHtml = (subjects: any, markList, year) => {
  const sorterMap = subjects;
  // const backReportTemplate = generateBackTemplate({ sorterMap });
  const backReportTemplate = generateNurseryBackTemplate({ sorterMap });

  return backReportTemplate(markList, year);
};
