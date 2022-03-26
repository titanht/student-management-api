import test from 'japa';
import supertest from 'supertest';
import Rcq from 'app/modules/academic/marklist/reportCard/rcq/rcq';
import { RcqFactory } from './rcqFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  deleteApi,
  generateEncoded,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
} from 'app/test/testUtils/api';
import { generateMarkData } from '../../../_data/mark';
import { getCount } from 'app/services/utils';
import { expect } from 'chai';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { QuarterFactory } from '../../quarter/quarterFactory';
import { GradeFactory } from '../../../grade/gradeFactory';

const apiUrl = '/academic/marklist/report-card/rcqs';
const roles = [
  'add-rcq',
  'edit-rcq',
  'generate-rcq',
  'remove-rcq',
  'update-rcq-rank',
  'view-rcq',
];

const factory = RcqFactory;

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
    await QuarterFactory.merge({ id: 'q1', semester_id: 'sm1' }).create();
    await GradeFactory.merge({ id: 'g1' }).create();
    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcqFactory.merge({
      grade_student_id: gs.id,
      quarter_id: 'q1',
      rank: null,
    }).create();

    await supertest(BASE_URL)
      .post(`${apiUrl}/update-rank/g1/q1`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    const rc = await Rcq.findOrFail(rcF.id);
    expect(rc.rank).to.equal(1);
  });
});

transact('Rcq generate', () => {
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
  test('/generate', async () => {
    const encoded = await generateEncoded(roles);
    await generateMarkData();
    const gsId = 'gs1';
    const qid = 'q1';

    await supertest(BASE_URL)
      .post(`${apiUrl}/generate/${gsId}/${qid}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    expect(await getCount(Rcq)).to.equal(1);
  });
  test('/generate class', async () => {
    const encoded = await generateEncoded(roles);
    await generateMarkData();

    await supertest(BASE_URL)
      .post(`${apiUrl}/generate/class/g1/q1`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    expect(await getCount(Rcq)).to.equal(2);
  });
});

transact('Rcq show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Rcq,
    });
  });
});

transact('Rcq paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Rcq,
    });
  });
});

transact('Rcq index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Rcq,
    });
  });
});

transact('Rcq delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Rcq,
      itemId: items[0].id,
    });
  });
});
