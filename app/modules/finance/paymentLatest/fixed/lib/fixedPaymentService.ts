import moment from 'moment';
import FixedPayment from '../fixedPayment';

const FixedPaymentService = {
  createFixed: async (data: any) => {
    return FixedPayment.create(data);
  },

  findOne: (id: string) => {
    return FixedPayment.findByOrFail('id', id);
  },

  fetchActive: () => {
    const curDate = moment().format('YYYY-MM-DD');

    return FixedPayment.query()
      .where('effective_date', '<=', curDate)
      .where('end_date', '>=', curDate);
  },

  fixedWithPending: async (id: string) => {
    const fixed = (
      await FixedPayment.query()
        .preload('fixedPendings', (fixedPendingBuilder) => {
          fixedPendingBuilder.preload('student').preload('grade');
        })
        .where('id', id)
        .firstOrFail()
    ).serialize() as FixedPayment;

    fixed.fixedPendings = fixed.fixedPendings.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );

    return fixed;
  },
};

export default FixedPaymentService;
