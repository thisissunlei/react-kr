import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';

import {Http} from "kr/Utils";

import DefaultNavsDic from 'kr/Configs/Navs';

//全局store
let State = observable({
	router:'',
	openSidebar:true,
	openHeaderbar:true,
	userInfo:{nickname:''},
	menusCode:[],
	items:[],
	isLoadedPermissionNav:false,
});


const ForEachMenuItemPermission = function(childItem,topItem,menusCode){

	if(childItem.hasOwnProperty('menuCode') && menusCode.indexOf(childItem.menuCode) !== -1){
		childItem.isPermission = true;
		topItem.isPermission = true;
	}else if(childItem.hasOwnProperty('menuCode') && menusCode.indexOf(childItem.menuCode) == -1){
		childItem.isPermission = false;
	}else{
		childItem.isPermission = true;
	}
	if(typeof childItem === 'object' && childItem.hasOwnProperty('menuItems')){
		var menuItems = childItem.menuItems;
		for(var i = 0;i<menuItems.length;i++){
			var item = menuItems[i];
			item = ForEachMenuItemPermission(item,topItem,menusCode);
			menuItems[i] = item;
			if(item.hasOwnProperty('isPermission') && item.isPermission){
				childItem.isPermission = true;
				topItem.isPermission = true;
			}
		}
		menuItems = menuItems.filter(function(item){
			console.log('item----',item)
			return item.isPermission;
		});
		childItem.menuItems = menuItems;
	}

	return childItem;

}
const ForEachMenuItem = function(childItem,router,topItem){

	if(childItem.hasOwnProperty('router') && childItem.router === router){
		childItem.isActive = true;
		topItem.isActive = true;
	}else{
		childItem.isActive = false;
	}

	if(typeof childItem === 'object' && childItem.hasOwnProperty('menuItems')){
		var menuItems = childItem.menuItems;
		for(var i = 0;i<menuItems.length;i++){
			var item = menuItems[i];
			item = ForEachMenuItem(item,router,topItem);
			menuItems[i] = item;
			if(item.hasOwnProperty('isActive') && item.isActive){
				childItem.isActive = true;
				topItem.isActive = true;
			}
		}
		childItem.menuItems = menuItems;
	}

	return childItem;
}

State.setMenusCode = action(function(menusCode){
	mobx.extendObservable(this,{menusCode})
});

State.getMenusCode = action(function(menusCode){
	return mobx.toJS(this.menusCode);
});

State.setUserInfo = action(function(userInfo){
	mobx.extendObservable(this,{userInfo});
});


State.loadNavData = action(function(){
	var _this = this;

	Http.request('newMenuInfo').then(function(response) {
		var userInfo = response.userInfo;
		var menusCode = response.menusCode;
		_this.setUserInfo(response.userInfo);
		_this.setPermissionNav(response.menusCode);
	}).catch(function(err) { });

});

State.setPermissionNav = action(function(menusCode){
	var navs = DefaultNavsDic.items;
	navs = navs.map(function(topItem){
		return ForEachMenuItemPermission(topItem,topItem,menusCode) ;
	}).filter(function(item){
		return item.isPermission;
	});
	this.items = navs;
	this.isLoadedPermissionNav = true;
	this.setRouter();
});

State.setRouter = action(function(){

	if(!this.isLoadedPermissionNav){
		return ;
	}

	var hash = window.location.hash;
	var router = hash.split('?').shift().substring(1);
	var navs = this.getNavs();
	
	navs = navs.map(function(topItem){
		return ForEachMenuItem(topItem,router,topItem)
	});
	this.items = navs;
});


State.getNavs=action(function(){
	return mobx.toJS(this.items);
});


State.getSidebarNavs=action(function(){

	var navs = this.getNavs();
	var topItem = null;
	var menuItems = [];

	for(var i = 0;i<navs.length;i++){
		topItem = navs[i];
		if(topItem.isActive){
			break ;
		}
	}

	if(topItem && typeof topItem === 'object' && topItem.hasOwnProperty('menuItems')){
		menuItems = topItem.menuItems;
	}
	

	return menuItems;
});

State.toggleSidebar=action(function(value){
	if(typeof value === 'undefined'){
		this.openSidebar = !this.openSidebar;
		return ;
	}
	this.openSidebar = !!value;
});

State.getUser= action(function(){
	return mobx.toJS(this.userInfo);
});


module.exports = State;
