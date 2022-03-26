import supertest from 'supertest';
import Rcs from 'app/modules/academic/marklist/reportCard/rcs/rcs';
import test from 'japa';
import { RcsFactory } from './rcsFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  generateEncoded,
  // createsApi,
  // deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  // updatesApi,
  // validateApi,
} from 'app/test/testUtils/api';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { SemesterFactory } from '../../semester/semesterFactory';
import { GradeFactory } from '../../../grade/gradeFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { expect } from 'chai';
import { generateMarkData } from '../../../_data/mark';
import { getCount } from 'app/services/utils';

const apiUrl = '/academic/marklist/report-card/rcss';
const roles = [
  'add-rcs',
  'edit-rcs',
  'remove-rcs',
  'view-rcs',
  'generate-rcs',
  'update-rcs-rank',
];

const factory = RcsFactory.with('semester').with('gradeStudent', 1, (gs) =>
  gs.with('grade').with('student').with('academicYear')
);

transact('Update Rank', () => {
  test(
    'auth',
    requiresAuth(`${apiUrl}/update-rank/gradeId/qid`, ApiMethod.POST)
  );
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/update-rank/gradeId/qid`, ApiMethod.POST)
  );
  test('/update-rank', async () => {
    const encoded = await generateEncoded(roles);
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    await SemesterFactory.merge({ id: 'sm1' }).create();
    await GradeFactory.merge({ id: 'g1' }).create();

    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcsFactory.merge({
      grade_student_id: gs.id,
      semester_id: 'sm1',
      rank: null,
    }).create();

    await supertest(BASE_URL)
      .post(`${apiUrl}/update-rank/g1/sm1`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    const rc = await Rcs.findOrFail(rcF.id);
    expect(rc.rank).to.equal(1);
  });
});

transact('Rcs generate', () => {
  test('auth', requiresAuth(`${apiUrl}/generate/gsId/qid`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/generate/gsId/qid`, ApiMethod.POST)
  );
  test(
    'auth',
    requiresAuth(`${apiUrl}/generate/class/gsId/qid`, ApiMethod.POST)
  );
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/generate/class/gsId/qid`, ApiMethod.POST)
  );
  test('/generate', async () => {
    const encoded = await generateEncoded(roles);
    await generateMarkData();
    const gsId = 'gs1';
    const sid = 'sem1';

    await supertest(BASE_URL)
      .post(`${apiUrl}/generate/${gsId}/${sid}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    expect(await getCount(Rcs)).to.equal(1);
  });
  test('/generate class', async () => {
    const encoded = await generateEncoded(roles);
    await generateMarkData();
    const gId = 'g1';
    const sid = 'sem1';

    await supertest(BASE_URL)
      .post(`${apiUrl}/generate/class/${gId}/${sid}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    expect(await getCount(Rcs)).to.equal(2);
  });
});

transact('Rcs show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Rcs,
    });
  });
});

transact('Rcs paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Rcs,
    });
  });
});

transact('Rcs index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Rcs,
    });
  });
});
