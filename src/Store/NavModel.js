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



module.exports = State;
