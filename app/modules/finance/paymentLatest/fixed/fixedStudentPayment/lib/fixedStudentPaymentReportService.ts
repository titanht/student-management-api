import FixedStudentPayment from '../fixedStudentPayment';

const FixedStudentPaymentReport = {
  report: async (startDate: string, endDate: string) => {
    const payments = await FixedStudentPayment.query()
      .where('created_at', '>=', `${startDate} 00:00:00`)
      .where('created_at', '<=', `${endDate} 23:59:59`);

    const amountTotal = payments
      .map((i) => i.amount)
      .reduce((a, b) => a + b, 0);
    const penaltyTotal = payments
      .map((i) => i.penalty)
      .reduce((a, b) => a + b, 0);

    return {
      amountTotal,
      penaltyTotal,
      count: payments.length,
    };
  },
};

export default FixedStudentPaymentReport;
