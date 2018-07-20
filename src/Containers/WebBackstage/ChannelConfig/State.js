import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	channelConfigListParams:{
        page:1,
        pageSize:10
    },
    channelSelect:[],
	openNewCreate : false,
	openConfirmDelete : false,
	openEditDialog : false,
	page :1,
});
//新增
State.newCreateHouseConfig = action(function(values){
	Http.request('channel-add-list',{},values ).then(function(response) {
		State.channelConfigListParams = {
			page:State.page,
			pageSize:10,
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");
	}).catch(function(err) {
		State.openNewCreate =false;
		Message.error(err.message);
	});	
})
//删除
State.deleteChannelConfig = action(function(values){
	Http.request('channel-delete',{},{id:values} ).then(function(response) {
		State.channelConfigListParams = {
			page:State.page,
			pageSize:10,
			date: new Date()		
		}
		State.openConfirmDelete =false;
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});	
})
//编辑
State.editHouseConfig = action(function(values,cmtId){
	Http.request('house-city-list-edit',{},values ).then(function(response) {
		State.channelConfigListParams = {
			page:State.page,
			pageSize:10,
			date: new Date()		
		}
		State.openEditDialog =false;
		Message.success("编辑成功");
	}).catch(function(err) {
		State.openEditDialog =false;
		Message.error(err.message);
	});	
})

module.exports = State;













