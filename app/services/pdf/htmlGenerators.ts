import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';

export const generateFrontHtml = (studentData, skills, year) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData, skills, year);
};

export const generateBackHtml = (subjects: any, markList, year) => {
  const sorterMap = subjects;
  const backReportTemplate = generateBackTemplate({ sorterMap });

  return backReportTemplate(markList, year);
};
