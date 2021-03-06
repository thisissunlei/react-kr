

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	printerConifigListParams:{
		page:1,
		pageSize:15,
		communityId: '',
		
	},
	openNewCreate : false,
	openConfirmDelete : false,
	openEditDialog : false,
	page :1,

});


//新增
State.newCreatePrinterConfig = action(function(values){
	
	Http.request('addPrinterConfig',{},values ).then(function(response) {
		
		State.printerConifigListParams = {
			page:1,
			pageSize:15,
			communityId : '',
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		State.printerConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId: '',
			date: new Date()		
		}
		Message.error(err.message);
	});	

})
State.deletePrinterConfig = action(function(values){
	
	Http.request('deletePrinterConfig',{id:values} ).then(function(response) {
		
		State.printerConifigListParams = {
			page:1,
			pageSize:15,
			communityId : '',
			date: new Date()		
		}
		State.openConfirmDelete =false;
		Message.success("删除成功");

	}).catch(function(err) {
		State.openConfirmDelete =false;
		State.printerConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId: '',
			date: new Date()		
		}
		Message.error(err.message);
	});	

})

State.editPrinterConfig = action(function(values){
	
	Http.request('editPrinterConfig',values ).then(function(response) {
			
		State.printerConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId : '',
			date: new Date()		
		}
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openEditDialog =false;
		State.printerConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId: '',
			date: new Date()		
		}
		Message.error(err.message);
	});	

})


State.getPrintPriceNameList=action(function(){
	
	Http.request('getPrintPriceList',{} ).then(function(response) {
		
		
		var itmesData = response.items;
		var arr =[]
		for(var i=0;i<itmesData.length;i++){
			arr[i] = {
				label : itmesData[i].name,
				value : itmesData[i].id
			}
		}

		State.priceListOptions = arr;

	}).catch(function(err) {
		
		Message.error(err.message);
	});	

})




module.exports = State;













