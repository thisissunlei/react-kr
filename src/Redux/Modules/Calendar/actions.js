import * as Types from './types';


import fetch from 'node-fetch';
import param from 'jquery-param';

export function loadCalendar(){

	return {
		types:[Types.LOAD_CALENDAR_REQUEST,Types.LOAD_CALENDAR_SUCCESS,Types.LOAD_CALENDAR_FAILURE],
		shouldCallAPI:(state)=>!state.calendar.length,
		callAPI:()=>fetch('http://rong.36kr.com/api/company').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}

export function setNowDate(nowDate){
	return {
		type:Types.SET_NOW_DATE,
		response:nowDate
	}
}











