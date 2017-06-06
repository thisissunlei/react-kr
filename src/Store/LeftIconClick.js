import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
	showSideNav : true
});

//列表数据请求
State.leftIconClickFun=action(function(){
	
	State.showSideNav = !State.showSideNav;
})

module.exports = State;
