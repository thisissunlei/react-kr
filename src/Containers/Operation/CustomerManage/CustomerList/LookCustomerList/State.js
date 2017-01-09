import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';

let State = observable({
		searchParams:{},
		messageBarStyle:{
        background:"red",
        width:"33.33%",
        float:"left",
        textAlign:"center"
    }
});

//action

module.exports = State;
