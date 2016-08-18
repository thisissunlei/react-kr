import fetch from 'node-fetch';

export function loadDemo(companyId){

	return {
		types:['LOAD_DEMO_REQUEST','LOAD_DEMO_SUCCESS','LOAD_DEMO_FAILURE'],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch('http://rong.36kr.com/api/demo').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}









