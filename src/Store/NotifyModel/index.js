import CustomerTransformModel from './CustomerTransformModel';
import AppointmentVisitModel from './AppointmentVisitModel';
import UrgeMoneyModel from './UrgeMoneyModel';
import InfoListModel from './InfoListModel';

import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
    customerTransform: CustomerTransformModel,
    appointmentVisit: AppointmentVisitModel,
		urgeMoney:UrgeMoneyModel,
		infoList:InfoListModel
});


module.exports = State;
