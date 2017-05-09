import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';

import Navs from 'kr/Configs/Navs';

//全局store
let State = observable({
	...Navs,
	openSidebar:false,
});


State.setCurrentRouter = action(function(){
	var hash = window.location.hash;
});

State.getNavs=action(function(){
	return mobx.toJS(this.items);
});

State.getSidebarNavs=action(function(){
	return mobx.toJS(this.items);
});

State.toggleSidebar=action(function(){
	this.openSidebar = !this.openSidebar;
});

State.getUser=action(function(){
	return {nick:'张屈'}
});






module.exports = State;
