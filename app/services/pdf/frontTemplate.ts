export const generateFrontTemplate = () => {
  const headTemplate = `
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin-left: -20px;
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
    justify-content: space-evenly;
    align-items: center;
    font-weight: bold;
    padding: 10px;
  }
  .under {
    text-decoration: underline;
  }
  /* Table  */
  .tables-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }
  .table,
  thead {
    border: 1px solid black !important;
  }
  thead {
    background-color: black;
    color: white;
  }
  thead:not(:last-child) > tr > th {
    border-right: 1px solid white;
  }
  .table td {
    font-size: 1em;
    padding: 0;
    border-right: 1px solid black;
    border-top: 1px solid black;
  }
  .table th {
    border-right: 1px solid black;
    padding: 10px;
  }
  .bot-table td {
    padding: 15px;
  }
  .table td:last-child {
    border-right: 0;
  }
  .bot-table,
  .eval-table {
    width: 550px;
  }
  .full {
    align-items: center;
  }
  .eval-table td {
    font-size: 15px;
    height: 25px;
  }

  /* Right box */
  .holder {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    width: 100%;
    height: 100%;
    padding: 20px 20px 10px 0px;
    font-weight: bold;
    margin-left: -60px;
  }
  .foot {
    justify-content: center;
  }
  .footer p {
    margin: 0;
  }
  .main-title {
    letter-spacing: 15px;
    font-size: 280%;
  }
  .center-it {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .img-container {
    margin-top: -20px;
  }
</style>
  `;

  const leftTemplate = `
  <div class="left-box full">
  <div
    style="
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <h2>Basic Skill and Personal Development</h2>
    <div class="mt-2">
      <h3 class="under">Evaluation Code</h3>
      <br />
      <div style="margin-bottom: 8px">
        <span style="margin-right: 30px">E = Excellent</span>
        <span>P = Poor</span>
      </div>
      <div style="margin-bottom: 8px">
        <span style="margin-right: 58px">G = Good</span>
        <span>R = At Risk</span>
      </div>
      <div>
        <span class="m-n3 mr-5">N = Needs Improvement</span>
      </div>
    </div>
  </div>
  <div style="flex-grow: 1">
    <table class="table border eval-table">
      <thead>
        <tr>
          <th scope="col eval" style="width: 300px">Evaluation Areas</th>
          <th scope="col">First Quarter</th>
          <th scope="col">Second Quarter</th>
          <th scope="col">Third Quarter</th>
          <th scope="col">Fourth Quarter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Punctuality</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>National Anthem Participation</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Attendance</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Completing Work on Time</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Follow Rules</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>English Use and Practice</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Listening Skill</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Participation in class</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Handwriting</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Use of Communication Book</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Material Handling</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Coooperation with others</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>School Uniform</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="flex-grow: 1">
    <table class="table border bot-table">
      <thead>
        <tr>
          <th scope="col">Quarter</th>
          <th scope="col">Parents comment</th>
          <th scope="col">Second Quarter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1st</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2nd</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3rd</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `;

  const rightTemplate = (student) => `

  <div class="holder">
  <div class="center-it head">
    <h1 class="main-title">ስትራይቨርስ አካዳሚ</h1>
    <h2 class="main-title" style="font-weight: 900">Strivers Academy</h2>
  </div>
  <div class="center-it img-container">
    <!-- <img src="res/logo.png" /> -->
    <img
      width="250px"
      src="data:image/png;base64,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"
      alt="Logo"
    />
    <br />
    <p class="m-0">Tel: 011 8829390 / 0911685076</p>
    <p class="m-0">Web: www.striversacademy.com</p>
    <p style="font-size: 20px; font-weight: 200">Addis Ababa</p>
  </div>
  <div class="center-it name" style="font-size: 42px; font-weight: 100">
    <p style="text-align: center; text-decoration: underline">
      STUDENT REPORT CARD FOR THE
    </p>
    <p style="text-align: center; text-decoration: underline">
      ACADEMIC YEAR OF 2013 E.C.
    </p>
  </div>

  <div
    class="studet"
    style="
      width: 100%;
      align-items: flex-start;
      display: flex;
      padding-left: 25px;
      flex-direction: column;
      font-size: 200%;
    "
  >
    <p style="font-weight: bold">
      Name of the Student :
      <span class="under" style="display: inline-block">
        ${student.name}</span
      >
    </p>
    <div style="margin-top: 15px">
      <span
        style="
          font-weight: bold;
          display: inline-block;
          margin-right: 20px;
        "
      >
        Age : <span class="under"> ${student.age}</span>
      </span>
      <span style="display: inline-block; font-weight: bold">
        Sex : <span class="under"> ${student.sex}</span>
      </span>
    </div>
    <div style="margin-top: 30px">
      <span style="display: inline-block; font-weight: bold"
        ><span class="under"> ${student.grade}</span>
      </span>
      <span class="under">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <span style="display: inline-block; font-weight: bold">
        TO<span class="under"> _____________</span>
      </span>
    </div>
  </div>

  <div class="center-it foot">
    <p>ጥረታችን በሞራል፣ በመንፈስ፣ በሥነ-ምግባርና በግብረ ገብ የታነጹ ጤናማ ትውልድን ማፍራት ነው፤</p>
    <p>We strive to prepare morally, physically, ethically healthy</p>
    <p>God fearing young generation!</p>
  </div>
</div>
  `;

  const frontReportTemplate = (studentData) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${headTemplate}
    </head>
    <body>
      <div class="main-container full">
        ${leftTemplate}
        ${rightTemplate(studentData)}
      </div>
    </body>
  </html>
  `;

  return frontReportTemplate;
};
