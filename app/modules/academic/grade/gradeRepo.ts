import { Repo } from 'app/modules/_shared/repo';
import Grade from './grade';

export default class GradeRepo extends Repo<Grade> {
  constructor() {
    super(Grade);
  }
}
