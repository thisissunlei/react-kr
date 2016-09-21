import fetch from 'node-fetch';
import * as Types from './types';

function setNavsCurrentRoute(currentRoute){

	return {
		type:Types.SET_NAVS_CURRENT_ROUTE,
		router:currentRoute
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
	let childRouter = '';

	return function(dispatch){
			dispatch(setNavsCurrentRoute(router));
			dispatch(setNavsCurrentItems(fatherRouter));
			dispatch(setNavsActivity(fatherRouter));
	}

}


