import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';

import Navs from 'kr/Configs/Navs';

//全局store
let State = observable({
	...Navs,
	router:'',
	openSidebar:false,
});


const ForEachMenuItem = function(topItems,router){

	if(topItems.hasOwnProperty('router') && topItems.router === router){
		topItems.isActive = true;
	}else{
		topItems.isActive = false;
	}

	if(typeof topItems === 'object' && topItems.hasOwnProperty('menuItems')){
		topItems.menuItems = topItems.menuItems.map(function(item){
			return ForEachMenuItem(item,router);
		});
	}

	return topItems;
}

State.setRouter = action(function(){
	var hash = window.location.hash;
	var router = hash.split('?').shift().substring(1);
	var navs = this.getNavs();
	var isOk = false;

	navs = navs.map(function(topItem){
		return ForEachMenuItem(topItem,router)
	});

	this.items = navs;
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
