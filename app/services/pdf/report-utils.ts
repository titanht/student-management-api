import {
  DEFAULT_DISPLAY_RULE,
  DisplayRule,
} from 'app/modules/academic/marklist/subject/subject';

export const parseNonRanked = (mark: number, displayRules: DisplayRule) => {
  // console.log({ mark });
  if (mark >= displayRules.A) {
    return 'A';
  } else if (mark >= displayRules.B) {
    return 'B';
  } else if (mark >= displayRules.C) {
    return 'C';
  } else if (mark >= displayRules.D) {
    return 'D';
  } else if (mark > 0) {
    return 'F';
  } else {
    return '-';
  }
};

export const formatMark = (
  mark,
  displayMode,
  display_rules = DEFAULT_DISPLAY_RULE
) => {
  // console.log(subject, subjectRankMap[subject]);
  if (mark === undefined) {
    return '-';
  }

  return displayMode === 'number'
    ? mark.toFixed(1).replace(/\.0+$/, '')
    : parseNonRanked(mark, display_rules);
};
