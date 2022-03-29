import paymentNotStagedRule from 'app/modules/finance/payment/stagePayment/paymentNotStagedRule';
import monthNotPaidRule from 'app/modules/finance/payment/fee/monthFeeNotPaidRule';
import notRegisteredRule from 'app/modules/finance/payment/registration/notRegisteredRule';
import notSummerPaidRule from 'app/modules/finance/payment/summer/notSummerPaidRule';
import monthTutorialNotPaidRule from 'app/modules/finance/payment/tutorial/monthTutorialNotPaidRule';
import uniqueCompound from 'app/modules/_shared/validation/uniqueCompound';
import notRegisteredPaymentRule from 'app/modules/finance/paymentNew/registrationPayment/notRegisteredPaymentRule';

uniqueCompound();
notRegisteredRule();
monthNotPaidRule();
monthTutorialNotPaidRule();
notSummerPaidRule();
paymentNotStagedRule();
notRegisteredPaymentRule();
