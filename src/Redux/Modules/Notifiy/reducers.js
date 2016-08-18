export function demo(state = [],action){

	switch(action.type){

	case 'LOAD_DEMO_REQUEST':{
		return {...state};
	}

	case 'LOAD_DEMO_SUCCESS':{
		return {...state,...action.response};
	}

	case 'LOAD_DEMO_ERROR':{
		return action.error;
	}

	default:{
		return state;
	}

	}
}













