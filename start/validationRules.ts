import monthNotPaidRule from 'app/modules/finance/payment/fee/monthFeeNotPaidRule';
import notRegisteredRule from 'app/modules/finance/payment/registration/notRegisteredRule';
import monthTutorialNotPaidRule from 'app/modules/finance/payment/tutorial/monthTutorialNotPaidRule';
import uniqueCompound from 'app/modules/_shared/validation/uniqueCompound';

uniqueCompound();
notRegisteredRule();
monthNotPaidRule();
monthTutorialNotPaidRule();
