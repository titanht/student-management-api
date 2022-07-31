import FixedPayment from '../fixedPayment';

const FixedPaymentService = {
  createFixed: async (data: any) => {
    return FixedPayment.create(data);
  },
};

export default FixedPaymentService;
