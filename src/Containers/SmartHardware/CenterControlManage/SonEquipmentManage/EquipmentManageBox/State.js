

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	itemDetail:[],
	realPage : 1,
	openSonEquipmentDetail:false,
	openEditDialog:false,
	openConfirmDelete:false,
	openSearchEquipment:false,
	openOperateLog: false,
	selectedDeleteIds:'',
	makerOptions :[],
	deviceVO:{},
	equipmentSearchParams: {
		        
		        deviceType:'',
		       	localNo:'',
		       	name:'',
		       	parentId:'',
		       	floor:'',
		       	spaceType:'',
		       	communityId:'',
		        page : 1,
		        pageSize: 15,


		      },
	searchEquipmentList :[],
	switch : false,
	loading :false,
	DropItems : [],
	controlLampDialog: false,
	controlAirConditionDialog : false,
	equipmentOperateLogParam:{
		endDate :'',
		startDate : '',
		deviceDefId : '',
		page : 1,
		pageSize : 15
	},
	sonEquipmentTypeOptions : [{label:"灯",value:"LAMP"},
	{label:"雾化膜",value:"ATOMIZATION_MEMBRANE"},
	{label:"空调",value:"AIR_CONDITION"},
	{label:"空气质量仪",value:"AIR_SENSOR"},
	{label:"温湿度计",value:"HUMITURE_SENSOR"},
	{label:"人体感应",value:"BODY_SENSOR"}],
	SpaceType :  [{label:"会议室",value:"MEETING"},
	{label:"大厅",value:"HALL"},
	{label:"独立办公室",value:"OFFICE"}],
	openForceFreshDialog : false,
});


//获取地址栏参数渲染列表
State.refreshList =action(function(param) {

	var paramParantId = {parentId:param};
	var newParam = Object.assign(State.equipmentSearchParams,paramParantId);
	State.equipmentSearchParams = newParam;
	

});



//单个删除
State.deleteEquipmentSingle= action(function() {
	
	
	Http.request('deleteCenterControEquipment',{id:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();	
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});



//编辑
State.editSonEquipment = action(function(values){
	
	Http.request('EditSonEquipment',{},values).then(function(response) {
		
		State.freshPageReturn();
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openEditDialog =false;
		State.freshPageReturn();
		Message.error(err.message);
	});	

})


State.freshPageReturn =  action(function(){
	State.equipmentSearchParams = {
        date:new Date(),
        page : State.realPage,
        pageSize: 15,
        communityId: State.equipmentSearchParams.communityId ||'',
        spaceType : State.equipmentSearchParams.spaceType ||'',
        parentId : State.equipmentSearchParams.parentId ||'',
        deviceType :  State.equipmentSearchParams.deviceType ||'',
        floor :  State.equipmentSearchParams.floor ||'',
        localNo :  State.equipmentSearchParams.localNo ||'',
        name : State.equipmentSearchParams.name ||'',
    }	
})




State.changeSwitchStatusAction = action(function(params){
	Http.request('changeSwitchStatusUrl',{},params).then(function(response) {
		if(params.onOff){
			Message.success("设备连接自动入库");
		}else{
			Message.success("设备连接不自动入库");
		}
		
	}).catch(function(err) {
		Message.error(err.message);
	});
})




//刷新设备上报信息
State.freshEquipmentReporterAction = action(function(){
	var urlParams = {deviceId:State.iitemDetail.deviceId}
	Http.request('freshReporteInfoUrl',urlParams).then(function(response) {
		State.iitemDetail.reported = response.reported;
		Message.success("刷新成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})


State.confirmSynchronizingAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('SynchronizingUrl',{},urlParams).then(function(response) {
		
		Message.success("同步成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})




module.exports = State;


