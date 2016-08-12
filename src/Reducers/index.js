import fetch from 'node-fetch';

export function sidebar_nav (state={},action){

	switch(action.type){

		case 'SWITCH_SIDEBAR_NAV':{
			return Object.assign({},state,{switch_value:action.data});
		}

		default:{
			return state;
		}
	}
}

export function bottom_nav (state={},action){

	switch(action.type){

		case 'SWITCH_BOTTOM_NAV':{
			return Object.assign({},state,{...action.data});
		}

		default:{
			return state;
		}
	}
}

export function companys_filter(state = {},action){

	switch(action.type){

		case 'SET_COMPANYS_FILTER_ALL':{

			return state;
		}

	default:{
		return state;
	}
	}

}

export function companys_fetch(state={},action){

	switch(action.type){

	case 'SET_COMPANYS_STATUS_LOADING':{
		return Object.assign({},state,{status:action.status});
	}

	case 'SET_COMPANYS_STATUS_SUCCESS':{
		return Object.assign({},state,{status:action.status});
	}

	case 'SET_COMPANYS_STATUS_ERROR':{
		return Object.assign({},state,{status:action.status});
	}

	case 'SET_COMPANYS_STATUS_FAILURE':{
		return Object.assign({},state,{status:action.status});
	}

	default:{
		return state;
	}

	}

}

export function companys(state = [],action){

	switch(action.type){

	case 'GET_COMPANYS_LOADING':{

		return state;

	}

	case 'SET_COMPANYS_DATA':{
		return action.data;
	}


default:{

	return state;

}

	}
}
