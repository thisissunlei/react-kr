import * as Types from './types';

export function plan(state = {},action){

	switch(action.type){

	case Types.SET_USER_BASIC_INFO:{
		return {...state,...action.response};
	}


	default:{
		return state;
	}

	}
}

