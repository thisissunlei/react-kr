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
	openSidebar:true,
	openHeaderbar:true,
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
	
	navs = navs.map(function(topItem){
		return ForEachMenuItem(topItem,router,topItem)
	});

	this.items = navs;
});



State.getNavs=action(function(){
	return this.items;
});


State.getSidebarNavs=action(function(){

	var navs = this.getNavs();
	var activeItem = {};
	var topItem = null;
	var menuItems = [];

	for(var i = 0;i<navs.length;i++){
		topItem = navs[i];
		if(topItem.isActive){
			activeItem = topItem;
			break ;
		}
	}

	if(topItem.hasOwnProperty('menuItems')){
		menuItems = topItem.menuItems;
	}

	this.sidebarNavs=menuItems;
	return menuItems;
});

State.toggleSidebar=action(function(value){
	if(typeof value === 'undefined'){
		this.openSidebar = !this.openSidebar;
		return ;
	}
	this.openSidebar = !!value;
});

State.getUser=action(function(){
	return {nick:'张屈'}
});






module.exports = State;
