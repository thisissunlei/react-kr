import mobx, {
	observable,
	action,
} from 'mobx';
let State = observable({
	//是否是签约
	isAdd:"add", //add 和 sign
    //点击传参
	searchParams:{
       page:1,
	   pageSize:10,
	   cityId:1,
	   communityId:'',
	   sourceId:'',
	   searchStartDate:'',
	   searchEndDate:''
	}
});
module.exports = State;
