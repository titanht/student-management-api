import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import UserAttendance from './userAttendance';
import UserAttendanceService from './userAttendanceService';
import CUserAttendanceVal from './cUserAttendanceVal';
import * as fileUtils from '../../../services/utils/fileUtils';
import Application from '@ioc:Adonis/Core/Application';
import { AttendanceService } from './services/attendanceService';

export default class UserAttendanceController extends ApiController<UserAttendance> {
  constructor(protected service = new UserAttendanceService()) {
    super(service, {
      createValidator: CUserAttendanceVal,
    });
  }

  async store({ request, response }: HttpContextContract) {
    // const file = request.file('attendance_file');
    // await fileUtils.moveFileUpload(file, 'attendance.csv');
    // const data = fs
    //   .readFileSync(path.join(Application.tmpPath('uploads'), 'attendance.csv'))
    //   .toString()
    //   .split('\n')
    //   .slice(1)
    //   .filter((i) => !_.isEmpty(i));
    // const attendanceService = new AttendanceService(data);
    // await attendanceService.create();

    return response.status(200).json({ att: 'new' });
  }
}
