import fetch from 'node-fetch';
import param from 'jquery-param';

export function callAPI(apiName,request,payload){

	return {
		types:['LOAD_COMMON_REQUEST','LOAD_COMMON_SUCCESS','LOAD_COMMON_FAILURE'],
		apiName,
		request,
		payload
	}

}










