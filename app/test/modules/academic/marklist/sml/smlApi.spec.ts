import Sml from 'app/modules/academic/marklist/sml/sml';
import test from 'japa';
import { SmlFactory } from './smlFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';
import { EvaluationMethodFactory } from '../evaluationMethod/evaluationMethodFactory';
import { GradeStudentFactory } from '../../gradeStudent/gradeStudentFactory';

const apiUrl = '/academic/marklist/smls';
const roles = ['add-sml', 'edit-sml', 'remove-sml', 'view-sml'];

const factory = SmlFactory.merge({
  grade_student_id: 'i',
});

const createSml = async () => {
  const em = await EvaluationMethodFactory.with('evaluationType')
    .with('quarter', 1, (q) => q.with('semester'))
    .with('cst', 1, (cst) =>
      cst
        .with('grade')
        .with('subject')
        .with('academicYear')
        .merge({ teacher_id: 't' })
    )
    .create();
  const gs = await GradeStudentFactory.with('grade')
    .with('student')
    .with('academicYear')
    .create();
  return (
    await SmlFactory.merge({
      evaluation_method_id: em.id,
      grade_student_id: gs.id,
    }).make()
  ).serialize();
};

transact('Sml show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Sml,
    });
  });
});

transact('Sml paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Sml,
    });
  });
});

transact('Sml index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Sml,
    });
  });
});

transact('Sml create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test('validate unique', async () => {
    const sml = await SmlFactory.merge({ ...(await createSml()) }).create();

    await validateApi(
      apiUrl,
      roles,
      {
        evaluation_method_id: 'score already inserted for evaluation method',
      },
      { ...sml.serialize() }
    )();
  });
  test('store', async () => {
    const data = await createSml();

    return createsApi({
      url: apiUrl,
      roles,
      data: {
        ...data,
        finalized: 1,
      },
      model: Sml,
      assertionData: { finalized: false },
    });
  });
  test(
    'validate',
    validateApi(apiUrl, roles, {
      evaluation_method_id: 'required validation failed',
      grade_student_id: 'required validation failed',
      score: 'required validation failed',
      finalized: 'required validation failed',
    })
  );
});

transact('Sml update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        evaluation_method_id: 'exists validation failure',
        grade_student_id: 'exists validation failure',
        score: 'number validation failed',
        finalized: 'boolean validation failed',
      },
      {
        evaluation_method_id: 100,
        grade_student_id: 100,
        score: 'some data',
        finalized: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Sml.findOrFail(itemF.id)).serialize();
    const updateData = await createSml();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Sml,
      item,
      updateData: { ...updateData, finalized: true },
      updateFields: ['score', 'finalized', 'finalize_date'],
      assertionData: { finalized: 1 },
    });
  });
});

transact('Sml delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Sml,
      itemId: items[0].id,
    });
  });
});
