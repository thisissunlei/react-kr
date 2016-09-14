
import * as Types from './types';

export function common(state = [],action){

	switch(action.type){

		case Types.LOAD_COMMON_REQUEST:{

			return {...state};
		}

		case Types.LOAD_COMMON_SUCCESS:{
			console.log('0000000----success')
			state[action.name] = action.response;
			return {...state};
		}

		case Types.LOAD_COMMON_FAILURE:{
			console.log('0000000----err')
			return {...state};
			//return action.error;
		}

		default:{
			return state;
		}

	}
}















