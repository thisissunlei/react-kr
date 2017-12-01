

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	itemDetail:[],
	realPage : 1,
	openNewCreate:false,
	openEditDialog:false,
	openConfirmDelete:false,
	detailDialogOpen : false,
	printerManageListParams: {
		        
        communityId:'',
        serialNo :'',
        alias :'',
        readerName : '',
        printerName :'',
		pageSize : '15',
        page : 1,

     },
     responseData : {}
	
});



//单个删除
State.deleteEquipmentSingle= action(function(deleteID) {
	
	Http.request('deletePrinter',{id:deleteID}).then(function(response) {
		
		State.freshPageReturn();	
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});



//新增
State.newCreatePrice = action(function(values){
	
	Http.request('newCreatePriceUrl',{},values ).then(function(response) {
		
		// State.printerManageListParams = {
		// 	page:1,
		// 	pageSize:15,
		// 	date: new Date()		
		// }
		State.openNewCreate =false;
		Message.success("新增成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		// State.equipmentSecondParams = {
		// 	page:1,
		// 	pageSize:15,
		// 	date: new Date()		
		// }
		Message.error(err.message);
	});	

})

//编辑
State.editPrice = action(function(values){
	
	Http.request('editPriceUrl',values).then(function(response) {
		
	
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		
		Message.error(err.message);
	});	

})



//刷新并保持原查询条件
State.freshPageReturn =  action(function(){
	State.printerManageListParams = {
        date:new Date(),
        page : State.realPage,
        pageSize: 15,
        communityId :  State.printerManageListParams.communityId||'' ,
        serialNo :State.printerManageListParams.serialNo||'' ,
        alias :State.printerManageListParams.alias||'' ,
        readerName : State.printerManageListParams.readerName||'' ,
        printerName : State.printerManageListParams.printerName||'' ,
		pageSize : '15',
        page : 1,

    }	
})


State.getPriceConfigList = action(function(){
	Http.request('getPriceConfigListUrl',{}).then(function(response) {
		
		State.responseData = response;

	}).catch(function(err) {
		
		Message.error(err.message);
	});	

})







module.exports = State;






