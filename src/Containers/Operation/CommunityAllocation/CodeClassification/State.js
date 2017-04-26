import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {reduxForm} from 'redux-form';
import {
    Message
} from 'kr-ui';
let State = observable({
		searchParams:{
			page:1,
			pageSize:15,
			//pid
			pid:0,
			noOrName:''
		},
	//新建代码
    openCode:false,
	//修改代码
	openCodeEdit:false,
    //父类名称
	parentName:'根目录',
	//编辑数据获取
	editData:'',
	//上一级
	lastFlag:false,
});
//新建代码开关
State.addCodeOpen = action(function(params) {
	this.openCode=!this.openCode;
});
//编辑代码开关
State.editCodeOpen = action(function(params) {
	this.openCodeEdit=!this.openCodeEdit;
});
//新建代码提交
State.addCodeSubmit = action(function(params) {
	var _this=this;
	Http.request('codeCategoryEdit',{},params).then(function(response) {
	 _this.openCode=false;
	 _this.openCodeEdit=false;
   _this.searchParams={
		 page:1,
		 pageSize:15,
		 time:+new Date(),
		 pid:_this.searchParams.pid
	 }
	}).catch(function(err) {
    Message.error(err.message);
	});
});

module.exports = State;
