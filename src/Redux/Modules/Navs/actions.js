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
		response:currentRoute
	}

}

function setNavsCurrentItems(router){
	return {
		type:Types.SET_NAVS_CURRENT_ITEMS,
		response:router
	}
}

export function setCurrentNav(router){

	return function(dispatch){
			dispatch(setNavsCurrentRoute(router));
			dispatch(setNavsCurrentItems(router));
	}

}


