import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
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
		percentage:''
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
//进度条显示隐藏
State.openProgressLoading=action(function(){
	this.openLoading=!this.openLoading;
})
//导入结果调用
State.importContent=action(function(ids){
	    var _this = this;
		Store.dispatch(Actions.callAPI('highSeaDataReday',{batchId:ids})).then(function(response) {
		  _this.percentage=response;  
		}).catch(function(err) {
			Message.error(err.message);
		});
})

module.exports = State;
