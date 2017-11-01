import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	printList:[{label:"测试内容9od3",value:78538}],
	pcList:[{label:"测试内容9od3",value:78538}],
	pcName:'',
	printName:'',
	printTemplateId:false,
	formTemplateId:false,
	formId:'',
	mainT:{},
	detailT:[],
	saveAndUse:false


});
//PC模板--选择
State.getTemplateList = action(function(id) {
	var _this = this;
	Http.request('get-form-template-list', {formId:id,type:''}).then(function(response) {
		let options = response.items.map((item)=>{
			let obj = {};
			obj.label = item.name;
			obj.value = item.id;
			return obj;
		});
		_this.pcList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
State.reset = action(function(){
	this.printName = '';
	this.pcName = ''
})
// PC模板--新建提交
State.saveTemplate = action(function(form) {
	var _this = this;
	Http.request('create-form-template', '',form).then(function(response) {
		if(_this.saveAndUse){
			console.log('------>>')
		}
		console.log('getTemplateList',response)
		// _this.pcList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
// PC模板--新建获取数据
State.getCreateTable = action(function(id) {
	var _this = this;
	_this.formId = id;
	Http.request('get-form-template-field', {formId:id}).then(function(response) {
		console.log('============',response)
		let fields = response;

		// let fields = [
		// 	{
		// 		fields:[
		// 			{id:1,isMain:false,name:'1'},
		// 			{id:1,isMain:false,name:'2'}
		// 		],
		// 		id:1,
		// 		isMain:false,
		// 		name:'1001',
		// 		hasEditButton:false,
		// 	},
		// 	{
		// 		fields:[{id:1,isMain:false,name:'1'}],
		// 		id:1,
		// 		isMain:false,
		// 		hasEditButton:false,
		// 		name:'1003'
		// 	},
		// 	{
		// 		fields:[
		// 			{id:1,isMain:false,name:'1'},
		// 			{id:1,isMain:false,name:'11'},
		// 			{id:1,isMain:false,name:'111'}
		// 		],
		// 		id:1,
		// 		isMain:true,
		// 		hasEditButton:false,
		// 		name:'1000'
		// 	},
		// 	{
		// 		fields:[
		// 			{id:1,isMain:false,name:'1'},
		// 			{id:1,isMain:false,name:'11'},
		// 			{id:1,isMain:false,name:'111'}],
		// 		id:1,
		// 		hasEditButton:false,
		// 		isMain:false,
		// 		name:'1004'
		// 	},
		// ];
		var obj = {
			wholeLine:false,
			required:false,
			editable:false,
			display:false,
		};
		fields.map(item=>{
			item.fields.map(value=>{
				value = Object.assign({},value,obj)
			})
		})

		let mainT ;
		let detailT = [];
		fields.map(item=>{
			if(item.isMain){
				mainT = item;
				mainT.mainT = item.fields;
			}else{
				detailT.push(item)
			}
		})
		_this.mainT = mainT;
		_this.detailT = detailT
		console.log('getTemplateFields',mainT,'---',detailT)

		// _this.printList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
// 打印模板--选择
State.getPrintTemplateList = action(function(id) {
	var _this = this;
	Http.request('get-print-template-list', {}).then(function(response) {
		let options = response.items.map((item)=>{
			let obj = {};
			obj.label = item.name;
			obj.value = item.id;
			return obj;
		})
		_this.printList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});


module.exports = State;
