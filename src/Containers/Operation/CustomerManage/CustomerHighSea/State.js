import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
	   searchParams:{
			page:1,
			pageSize:15
		},
		openImport:false,
		openLoading:false,
		openTip:false,
		percentage:0,
		statusCode:'',
		statusMessage:'',
		refreshState:0
});
State.searchParamsData=action(function(params){
	params = Object.assign({}, this.searchParams, params);
	params.time = +new Date();
	this.searchParams=params;
})
//导入
State.openImportFun=action(function(){
	this.openImport=!this.openImport;
})
//提示
State.openSureTip=action(function(){
	this.openTip=!this.openTip;
})
//进度条显示隐藏
State.openProgressLoading=action(function(){
	this.openLoading=!this.openLoading;
})
//导入结果调用
State.importContent=action(function(ids,status){
	   if(!ids){
			 ids='';
		 }
	    var _this = this;
		Http.request('highSeaDataGet',{batchId:ids}).then(function(response) {
		  _this.percentage=response.percent;
		  _this.statusCode=1;
		}).catch(function(err) {
          _this.statusCode=err.code;
					_this.percentage=err.data.percent;
          _this.statusMessage=err.message;
					 if(status){
						 if(_this.statusCode==-2||_this.statusCode==-3){
	 						 _this.openSureTip();
	 					 }
						 if(_this.statusCode==-1){
	 						 _this.openImportFun();
	 					 }
			 }
		});
})

module.exports = State;
