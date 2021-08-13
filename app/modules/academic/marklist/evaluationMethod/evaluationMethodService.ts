import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { allPromises, transactify } from 'app/services/utils';
import EvaluationMethod from './evaluationMethod';
import EvaluationMethodRepo from './evaluationMethodRepo';

export default class EvaluationMethodService extends Service<EvaluationMethod> {
  constructor() {
    super(new EvaluationMethodRepo());
  }

  async create(createData: Partial<EvaluationMethod>, _auth?: AuthContract) {
    const { evaluation_type_ids, quarter_id, cst_id } = createData as any;
    await transactify(async () => {
      await allPromises(evaluation_type_ids, (item) =>
        this.repo.createModel({
          evaluation_type_id: item,
          quarter_id,
          cst_id,
        })
      );
    });

    return {} as EvaluationMethod;
  }
}
