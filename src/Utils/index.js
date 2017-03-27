import * as DateFormat from './DateFormat';
import * as ClassNames from './ClassNames';
import * as ShallowEqual from './ShallowEqual';
import * as IsPhoneNumber from './IsPhoneNumber';
import Http from './Http';
import * as reduxForm from './reduxForm';

module.exports = {
	...DateFormat,
	...ClassNames,
	...ShallowEqual,
	...IsPhoneNumber,
	Http,
	reduxForm
}
