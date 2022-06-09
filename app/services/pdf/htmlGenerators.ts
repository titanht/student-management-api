import { generateBackTemplate } from './backTemplates';
import { generateFrontTemplate } from './frontTemplate';

export const generateFrontHtml = (studentData) => {
  const frontReportTemplate = generateFrontTemplate();
  return frontReportTemplate(studentData);
};

export const generateBackHtml = (markList, year, subjectRankMap) => {
  const sorterMap = [
    'English',
    'Amharic',
    'Spoken',
    'Maths (Amharic)',
    'Maths (English)',
    'GSA',
    'GSE',
    'Art/Music',
    'HPE',
    'Integrated',
    'Social',
    'Civics',
    'Biology',
    'Chemistry',
    'Physics',
    'Geography',
    'History',
    'ICT-1',
    'ICT-2',
    'Aesthetics',
  ];
  const backReportTemplate = generateBackTemplate({ sorterMap });

  return backReportTemplate(markList, year, subjectRankMap);
};
