export const generateBackTemplate = () => {
  const headTemplate = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    .table {
      width: 100%;
      margin-bottom: 1rem;
      color: #212529;
    }

    .table th,
    .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }

    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
    }

    .table tbody + tbody {
      border-top: 2px solid #dee2e6;
    }

    .table-sm th,
    .table-sm td {
      padding: 0.3rem;
    }

    .table-bordered {
      border: 1px solid #dee2e6;
    }

    .table-bordered th,
    .table-bordered td {
      border: 1px solid #dee2e6;
    }

    .table-bordered thead th,
    .table-bordered thead td {
      border-bottom-width: 2px;
    }

    .table-borderless th,
    .table-borderless td,
    .table-borderless thead th,
    .table-borderless tbody + tbody {
      border: 0;
    }

    .table .thead-dark th {
      color: #fff;
      background-color: #343a40;
      border-color: #454d55;
    }

    .table .thead-light th {
      color: #495057;
      background-color: #e9ecef;
      border-color: #dee2e6;
    }

    .table-dark {
      color: #fff;
      background-color: #343a40;
    }

    .table-dark th,
    .table-dark td,
    .table-dark thead th {
      border-color: #454d55;
    }

    .table-dark.table-bordered {
      border: 0;
    }

    .table-dark.table-striped tbody tr:nth-of-type(odd) {
      background-color: rgba(255, 255, 255, 0.05);
    }

    .table-dark.table-hover tbody tr:hover {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.075);
    }

    .table-responsive {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .table-responsive > .table-bordered {
      border: 0;
    }
  </style>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    html,
    body {
      background: #fff;
      width: 100%;
      height: 100%;
      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }
    .full {
      width: 100%;
      height: 100%;
    }
    .main-container {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: row;
      background-color: white;
    }

    /* Left box  */
    .left-box {
      display: flex;
      flex-direction: column;
      /* background-color: crimson; */
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      padding-bottom: 10px;
    }
    /* Table  */
    .table-holder {
      /* padding: 20px 20px 0 20px; */
    }

    .table {
      border: 1px solid black;
    }
    .table td {
      font-size: 1.2em;
      padding: 0;
      border-right: 1px solid black;
    }
    .table th {
      border-right: 1px solid black;
      font-size: 0.8em;
    }
    /* .sup {
font-size: 0.5rem;
display: inline-block;
} */
    .theading {
      text-align: center;
    }
    tbody tr td:not(:first-child) {
      text-align: center;
    }
    tbody tr td:first-child {
      padding-left: 5px;
    }
    td {
      font-weight: bold;
    }
    table tr td:last-child,
    th:last-child {
      border-right: 0;
    }

    /* Signature  */
    .signature {
      margin-bottom: 0px;
      display: flex;
      width: 100%;
      flex-direction: row;
      padding-bottom: 10px;
      padding: 0;
      padding-left: 30px;
    }

    /* Right box */
    .right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* background-color: aqua; */
      font-weight: bold;
      padding: 10px 30px;
    }
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
    .spacer {
      display: inline-block;
      width: 30px;
      height: 10px;
      margin-right: 5px;
    }
    .ticker {
      display: inline-block;
      width: 30px;
      height: 10px;
      margin-right: 5px;
      border: 1px solid black;
    }
    .inliner > * {
      display: inline-block;
    }
    .inliner > p {
      margin: 0;
      font-size: 1.2em;
    }

    .evaluation > p {
      margin: 0;
      font-size: 1.2em;
    }
  </style>
    `;

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
    // else if (mark < 60 && mark > 0) {
    //   return 'F';
    // } else {
    //   return '-';
    // }
  };

  const formatMark = (mark, subject, subjectRankMap) => {
    // console.log(subject, subjectRankMap[subject]);
    if (mark === undefined) {
      return '-';
    } else if (!subjectRankMap[subject]) {
      return parseNonRanked(mark);
    } else {
      return mark.toFixed(2).replace(/\.0+$/, '');
    }
  };

  const generateTableRows = (markListData, year, subjectRankMap) => {
    const { subjects: subjectMarkList } = markListData;
    // console.log(subjectMarkList);

    const mappedSubjects: string[] = [];
    const sorterMap = [
      'Amharic',
      'English',
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
    // Object.keys(subjectMarkList)
    sorterMap.forEach((subject) => {
      // console.log(subject);
      mappedSubjects.push(
        `
      <tr>
        <td>${subject}</td>
        <td>${formatMark(
          subjectMarkList[subject].q1,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject].q2,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject].s1,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject].q3,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject].q4,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject].s2,
          subject,
          subjectRankMap
        )}</td>
        <td>${formatMark(
          subjectMarkList[subject][year],
          subject,
          subjectRankMap
        )}</td>
      </tr>
    `
      );
    });

    const reportKeys = ['Total', 'Average', 'Absence', 'Conduct', 'Rank'];
    const mappedExtra = reportKeys.map((key) => {
      if (key === 'Absence' || key === 'Conduct') {
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
        </tr>
      `;
      } else {
        return `
        <tr>
          <td>${key}</td>
          <td>${markListData[key].q1 || '-'}</td>
          <td>${markListData[key].q2 || '-'}</td>
          <td>${markListData[key].s1 || '-'}</td>
          <td>${markListData[key].q3 || '-'}</td>
          <td>${markListData[key].q4 || '-'}</td>
          <td>${markListData[key].s2 || '-'}</td>
          <td>${markListData[key][year] || '-'}</td>
        </tr>
      `;
      }
    });

    return [...mappedSubjects, ...mappedExtra].join('');
  };

  const leftTemplate = (markList, year, subjectRankMap) => `
  <div class="left-box full">
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
        ${generateTableRows(markList, year, subjectRankMap)}
        </tbody>
      </table>
    </div>
    <div class="signature">
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

  <div class="right-box full">
    <div class="comment-container">
      <div class="quarter-holder">
        <div class="inliner">
          <h3 class="m-0 mt-2">First Quarter:&nbsp;</h3>
          <br />
          <p class="under">Teacher's Comment and Recommendation</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>More effort is needed in______________________________</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Excellent! Keep up the good work</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Help your child to strive for excellence</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>He/She is in danger of failing</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Give consequences at home for the poor behaviour</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Other_______________________________________________</p>
        </div>
      </div>

      <br />
      <div class="quarter-holder">
        <div class="inliner">
          <h3 class="m-0 mt-2">Second Quarter:&nbsp;</h3>
          <br />
          <p class="under">Teacher's Comment and Recommendation</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>More effort is needed in______________________________</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Excellent! Keep up the good work</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Help your child to strive for excellence</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>He/She is in danger of failing</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Give consequences at home for the poor behaviour</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Other_______________________________________________</p>
        </div>
      </div>

      <br />
      <div class="quarter-holder">
        <div class="inliner">
          <h3 class="m-0 mt-2">Third Quarter:&nbsp;</h3>
          <br />
          <p class="under">Teacher's Comment and Recommendation</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>More effort is needed in______________________________</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Excellent! Keep up the good work</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Help your child to strive for excellence</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>He/She is in danger of failing</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Give consequences at home for the poor behaviour</p>
        </div>

        <div class="inliner">
          <span class="ticker"></span>
          <p>Other_______________________________________________</p>
        </div>
      </div>

      <br />
      <div class="quarter-holder">
        <h3 class="m-0">Fourth Quarter</h3>
        <div class="inliner">
          <span class="spacer"></span>
          <p class="m-0">
            Teacher's Name__________________Signature________
          </p>
        </div>

        <div class="inliner">
          <span class="spacer"></span>
          <p class="m-0">Student's Name__________________Grade________</p>
        </div>
      </div>
    </div>
    <div class="footer">

      <div style="border: 1px solid black; padding: 5px">
        <p>School Seal and Principal's</p>
        <p class="m-0">Signature__________________</p>
      </div>
      <div class="evaluation">
        <p>Method of Evaluation</p>
        <p>100 - 90 A Excellent</p>
        <p>89 - 80&nbsp;&nbsp; B Good</p>
        <p>79 - 70&nbsp;&nbsp; C Needs Improvement</p>
        <p>69 - 60&nbsp;&nbsp; D Poor</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp; &lt; 60&nbsp;&nbsp; F Failing</p>
      </div>
    </div>
  </div>
  `;

  const bodyTemplate = (markList, year, subjectRankMap) => `
  <div class="main-container full">
  ${leftTemplate(markList, year, subjectRankMap)}
  ${rightTemplate}
  </div>
  `;

  const backReportTemplate = (markList, year, subjectRankMap: object) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${headTemplate}
    </head>
    <body>
    ${bodyTemplate(markList, year, subjectRankMap)}
    </body>
  </html>
  `;

  return backReportTemplate;
};
