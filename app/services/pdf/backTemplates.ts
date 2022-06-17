export const generateBackTemplate = ({ sorterMap }: any) => {
  const parseNonRanked = (mark: number) => {
    // console.log({ mark });
    if (mark >= 90) {
      return 'A';
    } else if (mark >= 80) {
      return 'B';
    } else if (mark >= 70) {
      return 'C';
    } else if (mark >= 60) {
      return 'D';
    } else if (mark > 0) {
      return 'F';
    } else {
      return '-';
    }
  };

  const formatMark = (mark, displayMode) => {
    // console.log(subject, subjectRankMap[subject]);
    if (mark === undefined) {
      return '-';
    }

    return displayMode === 'number'
      ? mark.toFixed(1).replace(/\.0+$/, '')
      : parseNonRanked(mark);
  };

  const generateTableRows = (markListData, year) => {
    const { subjects: subjectMarkList } = markListData;
    // console.log(subjectMarkList);

    const mappedSubjects: string[] = [];

    // Object.keys(subjectMarkList)
    sorterMap.forEach(({ subject, display_mode }) => {
      // console.log(subject);
      mappedSubjects.push(
        `
      <tr>
        <td>${subject}</td>
        <td>${formatMark(subjectMarkList[subject].q1, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject].q2, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject].s1, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject].q3, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject].q4, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject].s2, display_mode)}</td>
        <td>${formatMark(subjectMarkList[subject][year], display_mode)}</td>
      </tr>
    `
      );
    });

    const reportKeys = ['Total', 'Average', 'Absence', 'Conduct', 'Rank'];
    const mappedExtra = reportKeys.map((key) => {
      if (key === 'Conduct') {
        return `
        <tr>
          <td>Conduct</td>
          <td>${markListData.Conduct.q1 || '-'}</td>
          <td>${markListData.Conduct.q2 || '-'}</td>
          <td>-</td>
          <td>${markListData.Conduct.q3 || '-'}</td>
          <td>${markListData.Conduct.q4 || '-'}</td>
          <td>-</td>
          <td>-</td>
        </tr>
      `;
      } else if (key === 'Absence') {
        return `
        <tr>
          <td>${key}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>`;
      } else {
        return `
        <tr>
          <td>${key}</td>
          <td>${formatMark(markListData[key].q1, 'number') || '-'}</td>
          <td>${formatMark(markListData[key].q2, 'number') || '-'}</td>
          <td>${formatMark(markListData[key].s1, 'number') || '-'}</td>
          <td>${formatMark(markListData[key].q3, 'number') || '-'}</td>
          <td>${formatMark(markListData[key].q4, 'number') || '-'}</td>
          <td>${formatMark(markListData[key].s2, 'number') || '-'}</td>
          <td>${formatMark(markListData[key][year], 'number') || '-'}</td>
        </tr>
      `;
      }
    });

    return [...mappedSubjects, ...mappedExtra].join('');
  };

  const leftTemplate = (markList, year) => `
  <div class="back-left-box full">
  <div>
    <table class="table" style="width: 300px">
      <thead>
        <tr>
          <th
            class="theading"
            scope="col"
            style="width: 200px; font-size: 1.1em; padding: 10px 38px"
          >
            Subject
          </th>
          <th class="theading" scope="col">
            1<span class="sup">st</span>
            Quarter
          </th>
          <th class="theading" scope="col">
            2<span class="sup">nd</span>
            Quarter
          </th>
          <th class="theading" scope="col">
            1<span class="sup">st</span>
            Semester
          </th>
          <th class="theading" scope="col">
            3<span class="sup">rd</span>
            Quarter
          </th>
          <th class="theading" scope="col">
            4<span class="sup">th</span>
            Quarter
          </th>
          <th class="theading" scope="col">
            2<span class="sup">nd</span>
            Semester
          </th>
          <th class="theading" scope="col">Yearly Average</th>
        </tr>
      </thead>
      <tbody>
       ${generateTableRows(markList, year)}
      </tbody>
    </table>
  </div>
  <div class="back-signature">
    <div style="text-align: center">
      <p class="m-0">____________________</p>
      <p class="m-0">1<span class="sup">st</span> Quarter</p>
      <p class="m-0">School Head</p>
    </div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="text-align: center">
      <p class="m-0">____________________</p>
      <p class="m-0">2<span class="sup">nd</span> Quarter</p>
      <p class="m-0">School Head</p>
    </div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="text-align: center">
      <p class="m-0">____________________</p>
      <p class="m-0">3<span class="sup">nd</span> Quarter</p>
      <p class="m-0">School Head</p>
    </div>
  </div>
</div>
  `;

  const rightTemplate = `

  <div class="back-right-box full">
  <div class="comment-container">
    <div class="quarter-holder">
      <div class="back-inliner">
        <h3 class="m-0 mt-2">First Quarter:&nbsp;</h3>
        <br />
        <p class="under">Teacher's Comment and Recommendation</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>More effort is needed in______________________________</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Excellent! Keep up the good work</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Help your child to strive for excellence</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>He/She is in danger of failing</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Give consequences at home for the poor behaviour</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Other_______________________________________________</p>
      </div>
    </div>

    <br />
    <div class="quarter-holder">
      <div class="back-inliner">
        <h3 class="m-0 mt-2">Second Quarter:&nbsp;</h3>
        <br />
        <p class="under">Teacher's Comment and Recommendation</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>More effort is needed in______________________________</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Excellent! Keep up the good work</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Help your child to strive for excellence</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>He/She is in danger of failing</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Give consequences at home for the poor behaviour</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Other_______________________________________________</p>
      </div>
    </div>

    <br />
    <div class="quarter-holder">
      <div class="back-inliner">
        <h3 class="m-0 mt-2">Third Quarter:&nbsp;</h3>
        <br />
        <p class="under">Teacher's Comment and Recommendation</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>More effort is needed in______________________________</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Excellent! Keep up the good work</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Help your child to strive for excellence</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>He/She is in danger of failing</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Give consequences at home for the poor behavior</p>
      </div>

      <div class="back-inliner">
        <span class="back-ticker"></span>
        <p>Other_______________________________________________</p>
      </div>
    </div>

    <br />
    <div class="quarter-holder">
      <h3 class="m-0">Fourth Quarter</h3>
      <div class="back-inliner">
        <span class="back-spacer"></span>
        <p class="m-0">
          Teacher's Name__________________Signature________
        </p>
      </div>

      <div class="back-inliner">
        <span class="spacer"></span>
        <p class="m-0">Student's Name__________________Grade________</p>
      </div>
    </div>
  </div>
  <div class="back-footer">
    <div style="border: 1px solid black; padding: 5px">
      <p>School Seal and Principal's</p>
      <p class="m-0">Signature__________________</p>
    </div>
    <div style="width: 100px"></div>
    <div class="back-evaluation">
      <p>Method of back-Evaluation</p>
      <p>100 - 90 A Excellent</p>
      <p>89 - 80&nbsp;&nbsp; B Good</p>
      <p>79 - 70&nbsp;&nbsp; C Needs Improvement</p>
      <p>69 - 60&nbsp;&nbsp; D Poor</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp; &lt; 60&nbsp;&nbsp; F Failing</p>
    </div>
  </div>
</div>
  `;

  const backReportTemplate = (markList, year) => `
    <div class="back-main-container full">
      ${leftTemplate(markList, year)}

      <div style="width: 200px"></div>

      ${rightTemplate}
    </div>

    <div class="pagebreak"></div>
  `;

  return backReportTemplate;
};
