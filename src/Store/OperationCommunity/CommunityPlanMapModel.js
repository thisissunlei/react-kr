import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
    Message
} from 'kr-ui';

import {Http} from 'kr/Utils';

let State = observable({
		communityName:''
});

module.exports = State;
