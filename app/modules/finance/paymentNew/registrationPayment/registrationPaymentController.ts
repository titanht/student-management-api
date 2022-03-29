import ApiController from 'app/modules/_shared/apiController';
import RegistrationPayment from './registrationPayment';
import RegistrationPaymentService from './registrationPaymentService';
import CRegistrationPaymentVal from './cRegistrationPaymentVal';
import ERegistrationPaymentVal from './eRegistrationPaymentVal';

export default class RegistrationPaymentController extends ApiController<RegistrationPayment> {
  constructor(protected service = new RegistrationPaymentService()) {
    super(service, {
      createValidator: CRegistrationPaymentVal,
      editValidator: ERegistrationPaymentVal,
    });
  }
}
