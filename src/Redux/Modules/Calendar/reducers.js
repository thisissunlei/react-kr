import * as Types from './types';

export function calendar(state={},action){

	switch(action.type){

		case Types.LOAD_CALENDAR_REQUEST:{

			return state;
		}

		case Types.LOAD_CALENDAR_SUCCESS:{

			return state;
		}

		case Types.LOAD_CALENDAR_FAILURE:{
			return state;
		}

		case Types.SET_NOW_DATE:{

			const {items} = state;
			const nowDate = action.response;

			let nowTrip = [];
			nowTrip = items.filter(function(item){
				console.log(item.createAt);
				return  item.createAt == nowDate;
			});

			return {...state,...{now_date:action.response,now_trip:nowTrip}};
		}

		default:{

			return state;
		}

	}

}



