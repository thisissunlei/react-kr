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


const ForEachMenuItem = function(childItem,router,topItem){

	if(childItem.hasOwnProperty('router') && childItem.router === router){
		childItem.isActive = true;
		topItem.isActive = true;
		return childItem;
	}else{
		childItem.isActive = false;
	}

	if(typeof childItem === 'object' && childItem.hasOwnProperty('menuItems')){
		var menuItems = childItem.menuItems;
		for(var i = 0;i<menuItems.length;i++){
			var item = menuItems[i];
			item = ForEachMenuItem(item,router,topItem);
			menuItems[i] = item;
			if(item.isActive){
				childItem.isActive = true;
				topItem.isActive = true;
				break;
			}
		}
		childItem.menuItems = menuItems;
	}

	return childItem;
}

State.setRouter = action(function(){
	var hash = window.location.hash;
	var router = hash.split('?').shift().substring(1);
	var navs = this.getNavs();
	var isOk = false;

	var callback = function() {

	}

	navs = navs.map(function(topItem){
		return ForEachMenuItem(topItem,router,topItem)
	});

	console.log('--->>',navs);

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
