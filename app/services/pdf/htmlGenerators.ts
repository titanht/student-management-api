import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';

export const generateFrontHtml = (studentData, skills) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData, skills);
};

export const generateBackHtml = (subjects: any, markList, year) => {
  const sorterMap = subjects;
  const backReportTemplate = generateBackTemplate({ sorterMap });

  return backReportTemplate(markList, year);
};
