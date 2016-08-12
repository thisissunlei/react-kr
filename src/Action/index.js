import fetch from 'node-fetch';
import param from 'jquery-param';

/*
export const SET_COMPANYS_FILTER = 'SET_COMPANYS_FILTER';
export const SET_COMPANYS_DATA = 'SET_COMPANYS_DATE';
export const SET_COMPANYS_ERROR = 'SET_COMPANYS_ERROR';
export const SET_COMPANYS_SUCCESS = 'SET_COMPANYS_SUCCESS';
export const SET_COMPANYS_FAILURE = 'SET_COMPANYS_FAILURE';

export const OPEN_SIDEBAR_NAV = 'OPEN_SIDEBAR_NAV';
*/



export function switchSidebarNav(value){

	return{
		type:'SWITCH_SIDEBAR_NAV',
		data:value
	}

}

export function switchBottomNav(value){

	return{
		type:'SWITCH_BOTTOM_NAV',
		data:value
	}

}

export function setCompanysData(companys){

	return {
		type:'SET_COMPANYS_DATA',
		data:companys
	}

}

export function setCompanysStatus(status){

	var obj = {
		type:'SET_COMPANYS_STATUS_LOADING',
		status:'loading'
	};

	switch(status){

	case 'loading':{
		obj.type = 'SET_COMPANYS_STATUS_LOADING'
		obj.status = 'loading';
		break;
	}

	case 'failure':{
		obj.type = 'SET_COMPANYS_STATUS_FAILURE'
		obj.status = 'failure';
		break;
	}

	case 'success':{
		obj.type = 'SET_COMPANYS_STATUS_SUCCESS'
		obj.status = 'success';
		break;
	}

	case 'error':{
		obj.type = 'SET_COMPANYS_STATUS_ERROR'
		obj.status = 'error';
		break;
	}
	default:{
		obj.type = 'SET_COMPANYS_STATUS_LOADING'
		obj.status = 'loading';
	}


	}

	return obj;

}


export function fetchCompanysStatusCount(){

	return dispatch=>{

		fetch('http://rong.36kr.com/api/company').then(function(response){
			return response.json();
		}).then(function(response){
			dispatch(setCompanysData(response.data.page.data));
			dispatch(setCompanysStatus('success'));
		}).catch(function(err){
			dispatch(setCompanysStatus('error'));
		});
	}
}

export function fetchCompanys(request){

	return dispatch =>{

		dispatch(setCompanysStatus('loading'));

		fetch('http://rong.36kr.com/api/company?='+param(request)).then(function(response){
			return response.json();
		}).then(function(response){
			dispatch(setCompanysData(response.data.page.data));
			dispatch(setCompanysStatus('success'));
		}).catch(function(err){
			dispatch(setCompanysStatus('error'));
		});

	}

}


















