import fetch from 'node-fetch';
import * as Types from './types';

export function loadMemo(companyId){

	return {
		types:[Types.LOAD_MEMO_REQUEST,Types.LOAD_MEMO_SUCCESS,Types.LOAD_MEMO_FAILURE],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch('demo').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}

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


