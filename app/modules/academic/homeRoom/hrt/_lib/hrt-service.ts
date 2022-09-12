import { RequestContract } from '@ioc:Adonis/Core/Request';
import Hrt from '../hrt';
import { AssignHrtVal } from './hrt-val';

const HrtService = {
  assign: async (request: RequestContract) => {
    const { grade_id, user_id } = await request.validate(AssignHrtVal);
    console.log('assigned');

    return Hrt.create({
      grade_id,
      user_id,
    });
  },

  findOne: (id: string) => {
    return Hrt.findOrFail(id);
  },

  delete: async (hrtId: string) => {
    const hrt = await HrtService.findOne(hrtId);
    await hrt.delete();
  },
};

export default HrtService;
