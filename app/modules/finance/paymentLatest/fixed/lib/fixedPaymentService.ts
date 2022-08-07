import FixedPayment from '../fixedPayment';

const FixedPaymentService = {
  createFixed: async (data: any) => {
    return FixedPayment.create(data);
  },

  editFixed: async (id: string, data: any) => {
    const payment = await FixedPaymentService.findOne(id);
    payment.merge(data);
    await payment.save();

    return payment;
  },

  findOne: (id: string) => {
    return FixedPayment.findByOrFail('id', id);
  },

  fetchActive: () => {
    return FixedPayment.query().where('archived', false);
  },

  fetchArchived: () => {
    return FixedPayment.query().where('archived', true);
  },

  fixedWithPending: async (id: string) => {
    const fixed = (
      await FixedPayment.query()
        .preload('fixedPendings', (fixedPendingBuilder) => {
          fixedPendingBuilder
            .preload('student', (studentBuilder) => {
              studentBuilder.select('id', 'first_name', 'father_name');
            })
            .preload('grade', (gradeBuilder) => {
              gradeBuilder.select('id', 'name');
            })
            .select('id', 'discount_amount', 'student_id', 'grade_id');
        })
        .where('id', id)
        .firstOrFail()
    ).serialize() as FixedPayment;

    fixed.fixedPendings = fixed.fixedPendings.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );

    return fixed;
  },

  delete: async (id: string) => {
    const payment = await FixedPaymentService.findOne(id);
    await payment.delete();
  },
};

export default FixedPaymentService;
