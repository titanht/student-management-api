import Service from 'app/modules/_shared/service';
import Grade from './grade';
import GradeRepo from './gradeRepo';

export default class GradeService extends Service<Grade> {
  constructor() {
    super(new GradeRepo());
  }
}
