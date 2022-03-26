import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';

export const generateFrontHtml = (studentData) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData);
};

export const generateBackHtml = (markList, year, subjectRankMap) => {
  const backReportTemplate = generateBackTemplate();
  return backReportTemplate(markList, year, subjectRankMap);
};
