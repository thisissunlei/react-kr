import mobx, {
	observable,
	action,
} from 'mobx';
import {DateFormat} from "kr/Utils";
let State = observable({
	//是否是签约
	isAdd:"add", //add 和 sign
    //参数
	searchParams:{
		cityId :'',
		communityId:'',
		// searchStartDate:DateFormat(new Date() ,"yyyy-mm-dd HH:MM:ss"),
		// searchEndDate:DateFormat(new Date() ,"yyyy-mm-dd HH:MM:ss"),
		searchStartDate:"",
		searchEndDate:"",

	}
	
});
module.exports = State;
