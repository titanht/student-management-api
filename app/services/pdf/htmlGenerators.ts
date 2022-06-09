import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';

export const generateFrontHtml = (studentData) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData);
};

export const generateBackHtml = (subjects: any, markList, year) => {
  const sorterMap = subjects;
  const backReportTemplate = generateBackTemplate({ sorterMap });

  return backReportTemplate(markList, year);
};
