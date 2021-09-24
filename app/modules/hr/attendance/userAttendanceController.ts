import path from 'path';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import UserAttendance from './userAttendance';
import UserAttendanceService from './userAttendanceService';
import CUserAttendanceVal from './cUserAttendanceVal';
import * as fileUtils from '../../../services/utils/fileUtils';
import Application from '@ioc:Adonis/Core/Application';

export default class UserAttendanceController extends ApiController<UserAttendance> {
  constructor(protected service = new UserAttendanceService()) {
    super(service, {
      createValidator: CUserAttendanceVal,
    });
  }

  async store({ request, response }: HttpContextContract) {
    const file = request.file('attendance_file');
    await fileUtils.moveFileUpload(file, 'attendance.csv');
    await fileUtils.parseCsvContent(
      path.join(Application.tmpPath('uploads'), 'attendance.csv')
    );

    return response.status(200).json({ att: 'new' });
  }
}
