import fetch from 'node-fetch';
import param from 'jquery-param';

import Fetch from 'kr/Redux/Utils/fetch';

export function callAPI(apiName,request,payload){

	return {
		types:['LOAD_COMMON_REQUEST','LOAD_COMMON_SUCCESS','LOAD_COMMON_FAILURE'],
		apiName,
		request,
		payload
	}

}


export function callAjaxAPI(apiName,request,payload){
	return  Fetch.request(apiName,request,payload);
};










