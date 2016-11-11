import fetch from 'node-fetch';
import * as Types from './types';



//当前用户有哪些导航权限

export function setUserNavs(){
	return function(dispatch,state){
		console.log('state',state);
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

function setNavsActivity(fatherRouter){
	return {
		type:Types.SET_NAVS_ACTIVITY,
		router:fatherRouter
	}

}

export function setCurrentNav(router){

	let fatherRouter = router.substring(2).split('/').shift();
	let childRouter = router.substring(2).split('/')[1];

	return function(dispatch){

			dispatch(setRouterParent(fatherRouter));
			dispatch(setRouterChild(childRouter));

			dispatch(setNavsCurrentRoute(router.substr(1)));
			dispatch(setNavsCurrentItems(fatherRouter));
			dispatch(setNavsActivity(fatherRouter));
	}

}


