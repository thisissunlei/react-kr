import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';


import Navs from 'kr/Configs/Navs';

//全局store
let State = observable({
	...Navs
});

module.exports = State;
