import Route from '@ioc:Adonis/Core/Route';
import cstRoutes from './cst/cstRoutes';
import evaluationMethodRoutes from './evaluationMethod/evaluationMethodRoutes';
import evaluationTypeRoutes from './evaluationType/evaluationTypeRoutes';
import quarterRoutes from './quarter/quarterRoutes';
import reportCardRoutes from './reportCard/reportCardRoutes';
import semesterRoutes from './semester/semesterRoutes';
import smlRoutes from './sml/smlRoutes';
import subjectRoutes from './subject/subjectRoutes';

export default () => {
  Route.group(() => {
    cstRoutes();
    evaluationMethodRoutes();
    evaluationTypeRoutes();
    quarterRoutes();
    reportCardRoutes();
    semesterRoutes();
    smlRoutes();
    subjectRoutes();
  }).prefix('marklist');
};
