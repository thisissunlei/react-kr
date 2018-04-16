import mobx, {
	observable,
	action,
	extendObservable,
	toJS
} from 'mobx';

import { Http } from "kr/Utils";

import DefaultNavsDic from 'kr/Configs/Navs';

//全局store
let State = observable({
	router: '',
	openSidebar: true,
	openHeaderbar: true,
	userInfo: { nickname: '' },
	menusCode: [],
	sidebarNavs: [],
	items: [],
	isLoadedPermissionNav: false,
	isLoadNavData: false,
	menusData:[],
	resourcdsCode:[],

});


const ForEachMenuItemPermission = function (childItem, parentItem, topItem, menusCode) {
	if (childItem.hasOwnProperty('menuCode') && menusCode.indexOf(childItem.menuCode) !== -1) {
		childItem.isPermission = true;
		parentItem.isPermission = true;
		topItem.isPermission = true;
	} else if (childItem.hasOwnProperty('menuCode') && menusCode.indexOf(childItem.menuCode) == -1) {
		if(childItem.menuCode=='myCard'||childItem.menuCode=='myColleague'){
			childItem.isPermission = true;
			parentItem.isPermission = true;
			topItem.isPermission = true;
		}else{
			childItem.isPermission = false;
		}
	}

	if (typeof childItem === 'object' && childItem.hasOwnProperty('menuItems')) {
		var menuItems = childItem.menuItems;
		for (var i = 0; i < menuItems.length; i++) {
			var item = menuItems[i];
			item = ForEachMenuItemPermission(item, childItem, topItem, menusCode);
			menuItems[i] = item;
			if (item.hasOwnProperty('isPermission') && item.isPermission) {
				childItem.isPermission = true;
				topItem.isPermission = true;
			}
		}
		menuItems = menuItems.filter(function (item) {

			return item.isPermission;
		});
		childItem.menuItems = menuItems;
	}

	return childItem;

}
const ForEachMenuItem = function (childItem, router, topItem) {
	

	if (childItem.hasOwnProperty('router') && childItem.router === router) {
		childItem.isActive = true;
		topItem.isActive = true;
	}else {
		childItem.isActive = false;

	}
	if(childItem.hasOwnProperty('otherRouter')){


		for(let i=0;i<childItem.otherRouter.length;i++){

			var pageRouterContainOtherRouter=(router.indexOf(childItem.otherRouter[i]))!== -1 ?true:false;
			if(childItem.otherRouter[i] === router || pageRouterContainOtherRouter){
				childItem.isActive = true;
				topItem.isActive = true;
				break;
			}
		}
	}
		
		
	
	
	
	


	if (typeof childItem === 'object' && childItem.hasOwnProperty('menuItems')) {
		var menuItems = childItem.menuItems;
		for (var i = 0; i < menuItems.length; i++) {
			var item = menuItems[i];
			item = ForEachMenuItem(item, router, topItem);
			menuItems[i] = item;
			if (item.hasOwnProperty('isActive') && item.isActive) {
				childItem.isActive = true;
				topItem.isActive = true;
			}
		}
		childItem.menuItems = menuItems;
	}

	return childItem;
}

State.setMenusCode = action(function (menusCode) {
	mobx.extendObservable(this, { menusCode })
});

State.getMenusCode = action(function (menusCode) {
	return mobx.toJS(this.menusCode);
});

State.setUserInfo = action(function (userInfo) {
	mobx.extendObservable(this, { userInfo });
});
State.clearSidebar=action(function(userInfo){
	this.sidebarNavs=[];
});

State.loadNavData = action(function () {
	var _this = this;

	if (this.isLoadNavData) {
		return;
	}

	Http.request('newMenuInfo').then(function (response) {
		// var userInfo = response.userInfo;
		// var menusCode = response.menusCode;
		_this.menusCode=response.menusCode;
		_this.menusData=response.resourcesCode;
		_this.setUserInfo(response.userInfo);
		_this.setPermissionNav(response.menusCode);
		// _this.setResourcds(response.resourcds);
		_this.resourcdsCode = response.resourcesCode;
		_this.isLoadNavData = true;

	}).catch(function (err) { });

});

State.setPermissionNav = action(function (menusCode) {

	if (this.isLoadedPermissionNav) {
		return;
	}

	var navs = DefaultNavsDic.items;
	navs = navs.map(function (topItem) {
		return  ForEachMenuItemPermission(topItem, topItem, topItem, menusCode);
	}).filter(function (item) {
		return item.isPermission;
	}).map(function(item){
		var originUrl = '';
		if(item.hasOwnProperty('menuItems') && item.menuItems[0].hasOwnProperty('menuItems')){
			var childItem = item.menuItems[0].menuItems[0];

			if (item.menuCode == "oa" || item.menuCode == "pm_manage" || item.menuCode=="order" ||  item.menuCode=="bill"){
				item.originUrl = childItem.originUrl;
			}else{
				originUrl = '#'+childItem.router;
				item.originUrl = originUrl;
			}

		}

		return item;
	});




	this.items = navs;
	this.isLoadedPermissionNav = true;
	this.setRouter();

});

State.setRouter = action(function () {

	this.loadNavData();
	if (!this.isLoadedPermissionNav) {
		return;
	}

	var hash = window.location.hash;
	var router = hash.split('?').shift().substring(1);
	var topRouter = router.split('/')[1];
	var obj = mobx.toJS(this);
	var navs = obj.items;
	navs = navs.map(function (topItem) {
		var item = ForEachMenuItem(topItem, router, topItem)
		if (item.hasOwnProperty('router') && item.router === topRouter) {
			item.isActive = true;
		}
		
		return item;
	});

	mobx.extendObservable(this, { items: navs });
	this.setSidebarNavs();
});


State.getNavs = action(function () {
	return this.items;
});

State.getSidebarNavs = function () {
	var obj = mobx.toJS(this);
	return obj.sidebarNavs;
}

State.setSidebarNavs = action(function () {

	var obj = mobx.toJS(this);
	var navs = obj.items;
	var topItem = null;
	var menuItems = [];

	var hash = window.location.hash;
	var router = hash.split('?').shift().substring(1);
	
	for (var i = 0; i < navs.length; i++) {
	
		topItem = navs[i];
		if (topItem.isActive) {
			break;
		}
	}

	if (topItem && typeof topItem === 'object' && topItem.hasOwnProperty('menuItems')) {
		menuItems = topItem.menuItems;
	}
	mobx.extendObservable(this, { sidebarNavs: menuItems })
});
State.setResourcds = action(function(menusCode){
	this.resourcdsCode = menusCode;
})

State.toggleSidebar = action(function (value) {
	if (typeof value === 'undefined') {
		this.openSidebar = !this.openSidebar;
		return;
	}
	this.openSidebar = !!value;
});

State.setSidebar=action(function(value){
	this.openSidebar = value;
});

State.getUser= action(function(){
	return mobx.toJS(this.userInfo);
});

//校验操作项是否有权限
State.checkOperate= action(function(resourcesCode){

	var menusData=toJS(State.menusData);
	if(menusData.length>0){
		if(menusData.indexOf(resourcesCode)>-1){
			return true;
		}else {
			return false;
		}
	}
	return false;
});
//校验菜单是否有权限
State.checkMenus= action(function(menusCode){

	var menus=toJS(State.menusCode);
	if(menus.length>0){
		if(menus.indexOf(menusCode)>-1){
			return true;
		}else {
			return false;
		}
	}
	return false;

});
module.exports = State;
