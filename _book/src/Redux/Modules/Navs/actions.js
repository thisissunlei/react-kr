import fetch from 'node-fetch';
import * as Types from './types';


export function navActive(menuCode){
	return function(dispatch,getState){
		var state = getState();
		var permissionNavs = state.navs.items;

	permissionNavs.forEach(function(item,index){
			item.active = false;
			if(item.hasOwnProperty('menuItems') && Object.prototype.toString.call(item.menuItems) === '[object Array]'  && item.menuItems.length){
					item.menuItems.forEach(function(child,key){
						if(child.hasOwnProperty('menuItems') && Object.prototype.toString.call(child.menuItems) === '[object Array]'  && child.menuItems.length){
						   child.menuItems.forEach(function(children,i){
								children.active = false;
								if(children.menuCode == menuCode){
									children.active = true;
								}else{
									children.active = false;
								}
							});
						}

				});
			}
		});

		dispatch({
			type:Types.SET_USER_NAVS,
			response:permissionNavs
		});
}
}

//当前用户有哪些导航权限

export function setUserNavs(navcodes){
	return function(dispatch,getState){
		var state = getState();
		var items = state.navs.items;
		var codeKeys = Object.keys(navcodes);
		var permissionNavs = [];


		items.forEach(function(item,index){
			if(item.hasOwnProperty('menuCode') && codeKeys.indexOf(item.menuCode) !==-1 ){
				permissionNavs.push(item);
			}
		});

		permissionNavs.forEach(function(item,index){
			var itemPermissionKeys = navcodes[item.menuCode];
			var childNavs = [];

			item.permission = true;

			if(item.hasOwnProperty('menuItems') && item.menuItems.length){
				item.menuItems.forEach(function(child,key){
					if(child.hasOwnProperty('menuCode') && itemPermissionKeys.indexOf(child.menuCode) !== -1){

						if(child.hasOwnProperty('menuItems') && child.menuItems.length){
							var childrenNavs = [];
							child.menuItems.forEach(function(children,i){
								if(children.hasOwnProperty('menuCode') && itemPermissionKeys.indexOf(children.menuCode) !== -1){
									children.permission = true;
									childrenNavs.push(children);
								}
							});

							child.permission = true;
							child.menuItems = childrenNavs;
						}

						childNavs.push(child);
					}
				});
				item.menuItems = childNavs;
			}
		});


		dispatch({
			type:Types.SET_USER_NAVS,
			response:permissionNavs
		});
	}
}

function setNavsCurrentRoute(currentRoute){

	return {
		type:Types.SET_NAVS_CURRENT_ROUTER,
		router:currentRoute
	}

}

function setRouterParent(parentRouter){
	return {
		type:Types.SET_NAVS_CURRENT_PARENT_ROUTER,
		router:parentRouter
	}
}




function setRouterChild(childRouter){
	return {
		type:Types.SET_NAVS_CURRENT_CHILD_ROUTER,
		router:childRouter
	}
}

function setNavsCurrentItems(fatherRouter){
	return {
		type:Types.SET_NAVS_CURRENT_ITEMS,
		router:fatherRouter
	}
}

function setNavsActivity(fatherRouter,childRouter){
	return {
		type:Types.SET_NAVS_ACTIVITY,
		router:fatherRouter,
		childRouter:childRouter
	}

}

export function setCurrentNav(router){

	router = router.split('?').shift();
	let fatherRouter = router.substring(2).split('/').shift();
	let childRouter = router.substring(2).split('/')[1];

	return function(dispatch){

			dispatch(setRouterParent(fatherRouter));
			dispatch(setRouterChild(childRouter));

			dispatch(setNavsCurrentRoute(router.substr(1)));
			dispatch(setNavsCurrentItems(fatherRouter));
			dispatch(setNavsActivity(fatherRouter,router.substr(1)));
	}

}