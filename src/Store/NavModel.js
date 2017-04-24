import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
	name: 'dd',
	orderDetail:{},
	operType:"",
	searchParams:{},
	detail:'',
});

module.exports = State;
