import paymentNotStagedRule from 'app/modules/finance/payment/stagePayment/paymentNotStagedRule';
import monthNotPaidRule from 'app/modules/finance/payment/fee/monthFeeNotPaidRule';
import notRegisteredRule from 'app/modules/finance/payment/registration/notRegisteredRule';
import notSummerPaidRule from 'app/modules/finance/payment/summer/notSummerPaidRule';
import monthTutorialNotPaidRule from 'app/modules/finance/payment/tutorial/monthTutorialNotPaidRule';
import uniqueCompound from 'app/modules/_shared/validation/uniqueCompound';
import notRegisteredPaymentRule from 'app/modules/finance/paymentNew/registrationPayment/notRegisteredPaymentRule';
import gt from 'app/modules/_shared/validation/gt';
import total100Rule from 'app/modules/academic/marklist/evaluationMethod/total100Rule';

// Global
gt();
uniqueCompound();

// Academic
total100Rule();

// Payment
notRegisteredRule();
monthNotPaidRule();
monthTutorialNotPaidRule();
notSummerPaidRule();
paymentNotStagedRule();
notRegisteredPaymentRule();
