
import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	houseConifigListParams:{
        cmtId: '11111',
        page:1,
        pageSize:10
	},
	openNewCreate : false,
	openConfirmDelete : false,
	openEditDialog : false,
	page :1,
});

//新增
State.newCreateHouseConfig = action(function(values){
	Http.request('house-city-list-add',{},values ).then(function(response) {
		State.houseConifigListParams = {
			page:1,
			pageSize:10,
			cmtId : '11111',
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");
	}).catch(function(err) {
		State.openNewCreate =false;
		State.houseConifigListParams = {
			page:State.page,
			pageSize:15,
			cmtId : '11111',
			date: new Date()		
		}
		Message.error(err.message);
	});	
})

//删除
State.deleteHouseConfig = action(function(values,cmtId){
	Http.request('house-city-list-delete',{houseId:values} ).then(function(response) {
		State.houseConifigListParams = {
			page:State.page,
			pageSize:10,
			cmtId:cmtId,
			date: new Date()		
		}
		State.openConfirmDelete =false;
		Message.success("删除成功");

	}).catch(function(err) {
		Message.error(err.message);
	});	

})

//发布
State.pushHouseConfig = action(function(values,cmtId){
	Http.request('house-city-list-push',{houseId:values} ).then(function(response) {
		State.houseConifigListParams = {
			page:1,
			pageSize:10,
			cmtId : cmtId,
			date: new Date()		
		}
		State.openConfirmDelete =false;
		Message.success("发布成功");
	}).catch(function(err) {
		Message.error(err.message);
	});	

})

State.editPrinterConfig = action(function(values){
	Http.request('editPrinterConfig',values ).then(function(response) {
		State.houseConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId : '',
			date: new Date()		
		}
		State.openEditDialog =false;
		Message.success("编辑成功");
	}).catch(function(err) {
		State.openEditDialog =false;
		State.houseConifigListParams = {
			page:State.page,
			pageSize:15,
			communityId: '',
			date: new Date()		
		}
		Message.error(err.message);
	});	
})


State.getPrintPriceNameList=action(function(){
	
	// Http.request('getPrintPriceList',{} ).then(function(response) {
		
		
	// 	var itmesData = response.items;
	// 	var arr =[]
	// 	for(var i=0;i<itmesData.length;i++){
	// 		arr[i] = {
	// 			label : itmesData[i].name,
	// 			value : itmesData[i].id
	// 		}
	// 	}

	// 	State.priceListOptions = arr;

	// }).catch(function(err) {
		
	// 	Message.error(err.message);
	// });	

})




module.exports = State;













