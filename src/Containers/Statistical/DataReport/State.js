import mobx, {
	observable,
	action,
} from 'mobx';
import {DateFormat} from "kr/Utils";
let State = observable({
	//是否是签约
	isAdd:"add", //add 和 sign
    //参数
	cityId :'',
	communityId:'',
	searchStartDate:DateFormat(new Date() ,"yyyy-mm-dd HH:MM:ss"),
	searchEndDate:DateFormat(new Date() ,"yyyy-mm-dd HH:MM:ss"),
	page:1,
	pageSize:10,
	detailCityId:'',
	detailCommunityId:'',
	sourceId:'',
});
module.exports = State;
