import * as ClassNames from './ClassNames';
import * as IsPhoneNumber from './IsPhoneNumber';

import ShallowEqual from './ShallowEqual';
import Http from './Http';
import ReactHtmlParser from './ReactHtmlParser';
import Debug from './Debug';
import MobxForm from './MobxForm';
import  DateFormat from './DateFormat';
import  DateCompareValue from './DateCompareValue';
import Map from './Map';
import  Mouse from './Mouse';
import Baidu from './Baidu';
import PublicFn from './PublicFn';
import clamp from './Clamp';
import Money from './Money';
import ajax from './ajax';
module.exports = {
	...ClassNames,
	...IsPhoneNumber,
	ShallowEqual,
	Http,
	Debug,
	Money,
	Map,
	ReactHtmlParser,
	MobxForm,
	DateCompareValue,
	DateFormat,
	Mouse,
	Baidu,
	...PublicFn,
	clamp,
	ajax

}
