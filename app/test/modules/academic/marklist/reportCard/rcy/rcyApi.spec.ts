import supertest from 'supertest';
import Rcy from 'app/modules/academic/marklist/reportCard/rcy/rcy';
import test from 'japa';
import { RcyFactory } from './rcyFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  // createsApi,
  // deleteApi,
  generateEncoded,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  // updatesApi,
  // validateApi,
} from 'app/test/testUtils/api';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { GradeFactory } from '../../../grade/gradeFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { expect } from 'chai';
import { generateMarkData } from '../../../_data/mark';
import { getCount } from 'app/services/utils';

const apiUrl = '/academic/marklist/report-card/rcys';
const roles = [
  'add-rcy',
  'edit-rcy',
  'remove-rcy',
  'view-rcy',
  'generate-rcy',
  'update-rcy-rank',
];

const factory = RcyFactory.with('academicYear').with('gradeStudent', 1, (gs) =>
  gs.with('grade').with('student').with('academicYear')
);

transact('Update Rank', () => {
  test(
    'auth',
    requiresAuth(`${apiUrl}/update-rank/gradeId/ayId`, ApiMethod.POST)
  );
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/update-rank/gradeId/ayId`, ApiMethod.POST)
  );
  test('/updateRank', async () => {
    const encoded = await generateEncoded(roles);
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    await GradeFactory.merge({ id: 'g1' }).create();
    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcyFactory.merge({
      grade_student_id: gs.id,
      academic_year_id: ay.id,
      rank: null,
    }).create();

    await supertest(BASE_URL)
      .post(`${apiUrl}/update-rank/g1/${ay.id}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    const rc = await Rcy.findOrFail(rcF.id);
    expect(rc.rank).to.equal(1);
  });
});

transact('Rcy generate', () => {
  test('auth', requiresAuth(`${apiUrl}/generate/gsId/qid`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/generate/gsId/qid`, ApiMethod.POST)
  );
  test(
    'auth',
    requiresAuth(`${apiUrl}/generate/class/gId/qid`, ApiMethod.POST)
  );
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/generate/class/gId/qid`, ApiMethod.POST)
  );
  test('/generate class', async () => {
    const encoded = await generateEncoded(roles);
    await generateMarkData();
    const gId = 'g1';
    const ayId = 'ay1';

    await supertest(BASE_URL)
      .post(`${apiUrl}/generate/class/${gId}/${ayId}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    expect(await getCount(Rcy)).to.equal(2);
  });
});

transact('Rcy show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Rcy,
    });
  });
});

transact('Rcy paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Rcy,
    });
  });
});

transact('Rcy index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Rcy,
    });
  });
});
