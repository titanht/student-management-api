import { RequestContract } from '@ioc:Adonis/Core/Request';
import RecurrentPaymentChild from '../recurrentPaymentChild';
import { RecurrentPaymentChildEdit } from './recurrentPaymentChildVal';

const RecurrentPaymentChildService = {
  findOne: async (id: string) => {
    return RecurrentPaymentChild.findByOrFail('id', id);
  },

  edit: async (request: RequestContract) => {
    const { id } = request.params();
    const data = await request.validate(RecurrentPaymentChildEdit);

    const payment = await RecurrentPaymentChildService.findOne(id);
    payment.merge(data);
    await payment.save();

    return payment;
  },
};

export default RecurrentPaymentChildService;
