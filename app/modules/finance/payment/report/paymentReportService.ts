import PaymentReportRepo from './paymentReportRepo';

export default class PaymentReportService {
  protected reportRepo: PaymentReportRepo;

  constructor() {
    this.reportRepo = new PaymentReportRepo();
  }
  async daily() {
    return this.reportRepo.getDailyReport();
  }

  async interval(startDate, endDate) {
    return this.reportRepo.getIntervalReport(startDate, endDate);
  }
}
