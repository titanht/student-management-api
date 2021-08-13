import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import AcademicYear from './academicYear';
import AcademicYearService from './academicYearService';
import CAcademicYearVal from './cAcademicYearVal';
import EAcademicYearVal from './eAcademicYearVal';

export default class AcademicYearController extends ApiController<AcademicYear> {
  constructor(protected service = new AcademicYearService()) {
    super(service, {
      createValidator: CAcademicYearVal,
      editValidator: EAcademicYearVal,
    });
  }

  async active() {
    const year = await AcademicYearService.getActive();

    return year;
  }

  async setActive({ request }: HttpContextContract) {
    await this.service.setActive(request.params().yearId);
    return { data: true };
  }
}
