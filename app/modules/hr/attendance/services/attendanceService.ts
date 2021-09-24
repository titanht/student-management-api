// import  moment from 'moment';
// import AttendanceMapping from '../../attendanceMappings/attendanceMapping';
// import { AttendanceParser } from './attendanceParser';

// module.exports = class AttendanceService {
//   private data: any;

//   constructor(data) {
//     this.data = data;
//   }

//   async create() {
//     const accountSettingMap = await this.accountMapping();
//     const existingAccounts = Object.keys(accountSettingMap);
//     const filteredData: any = [];
//     this.data.forEach((dataItem) => {
//       const parsedLine = dataItem.split(',');
//       const accountId = `${parsedLine[0]}`;
//       const attendanceDate = parsedLine[3];
//       if (existingAccounts.includes(accountId)) {
//         filteredData.push({
//           accountId,
//           attendanceDate,
//         });
//       }
//     });

//     const parser = new AttendanceParser(filteredData, accountSettingMap);
//     const parsedData = parser.parseData();

//     await this.insertData(parsedData, accountSettingMap);
//   }

//   async insertData(parsedData, accountSettingMap) {
//     const promises = [];
//     const accountIds = Object.keys(parsedData);
//     accountIds.forEach((accountId) => {
//       const dates = Object.keys(parsedData[accountId]);
//       dates.forEach((date) => {
//         promises.push(
//           new Promise(async (resolve) => {
//             const { user_id } = accountSettingMap[accountId];
//             const attendance = await UserAttendance.query()
//               .where('user_id', user_id)
//               .where('date', date)
//               .first();

//             if (!attendance) {
//               const momentDate = moment(date, 'YYYY-MM-DD');
//               await UserAttendance.create({
//                 date,
//                 user_id,
//                 day_week: momentDate.weekday(),
//                 week_year: momentDate.week(),
//                 month: momentDate.month(),
//                 ...parsedData[accountId][date],
//               });
//             }

//             resolve();
//           })
//         );
//       });
//     });

//     await Promise.all(promises);
//     // console.log(parsedData, accountSettingMap);
//   }

//   async accountMapping() {
//     const settingMap = await this.attendanceSettingMap();
//     const mappings = (await AttendanceMapping.all()).toJSON();
//     const accountMap = {};
//     mappings.forEach(({ user_id, account_id, attendance_setting_id }) => {
//       accountMap[account_id] = {
//         user_id,
//         ...settingMap[attendance_setting_id],
//       };
//     });

//     return accountMap;
//   }

//   async attendanceSettingMap() {
//     const settings = (await AttendanceSetting.query().fetch()).toJSON();
//     const map = {};
//     settings.forEach((setting) => {
//       map[setting.id] = setting;
//     });

//     return map;
//   }
// };
