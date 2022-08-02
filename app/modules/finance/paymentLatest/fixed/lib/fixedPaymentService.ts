import FixedPayment from '../fixedPayment';

const FixedPaymentService = {
  createFixed: async (data: any) => {
    return FixedPayment.create(data);
  },

  findOne: (id: string) => {
    return FixedPayment.findByOrFail('id', id);
  },
};

export default FixedPaymentService;
