import mobx, {
	observable,
	action,
} from 'mobx';
import {reduxForm,initialize,reset,change} from 'redux-form';
import {Store} from 'kr/Redux';

import {Http,DateFormat} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	printList:[{label:"测试内容9od3",value:78538}],
	pcList:[{label:"测试内容9od3",value:78538}],
	pcName:'',
	printName:'',
	printTempId:false,
	formTempId:false,
	formId:'',
	mainT:{},
	detailT:[],
	saveAndUse:false,
	open:false,
	formworkId:'',
	wfId:'',
	formData:{},
	openEdit:false,
	editData :{},
	editMainT:{},
	editDetailT:[]


});
State.initialize = action(function(){
	this.pcName = '';
	this.printName = '';
	this.printTempId = false;
	this.formTempId = false;
	this.formId = '';
	this.saveAndUse = false;
	this.open = false;
	this.formworkId = '';
})
//PC模板--选择
State.getTemplateList = action(function(id) {
	var _this = this;
	_this.formId = id;
	Http.request('get-form-template-list', {formId:id,type:''}).then(function(response) {
		let options = response.items.map((item)=>{
			let obj = {};
			obj.label = item.name;
			obj.value = item.id;
			return obj;
		});
		_this.pcList = options;
	}).catch(function(err) {
		Message.error(err.message);
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
			_this.formTempId = false;
			_this.pcName = response.name;
			Store.dispatch(change('Template','formTempId',response.formTemplateId));
		}
		_this.open = false;
		_this.openEdit = false;
		_this.getPrintTemplateList()
		_this.getTemplateList(_this.formId);
	
		console.log('getTemplateList',response)
		// _this.pcList = options;
	}).catch(function(err) {
		Message.error(err.message);
	});

});
// PC模板--新建获取数据
State.getCreateTable = action(function(id) {
	var _this = this;
	_this.formId = id;
	Http.request('get-form-template-field', {formId:id}).then(function(response) {
		console.log('============',response)
		let fields = response;
		var obj = {
			wholeLine:false,
			required:false,
			editable:false,
			display:false,
		};
		fields = fields.map(item=>{
			item.tableId = item.id;
			item.fields = item.fields.map(value=>{
				if(value){
					value.tableId = item.id;
					value.fieldId = value.id;
					value = Object.assign({},value,obj);
					// console.log('=====map',value)
				}
				return value;
				
			})
			return item;
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
		Message.error(err.message);
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
		Message.error(err.message);
	});

});
State.getPrintTemplateData = action(function(id) {
	var _this = this;
	Http.request('get-form-template-data', {id:id}).then(function(response) {
		console.log("========")
		
		if(response.id){
			console.log("oooo", response.printTempId)
		
			_this.formworkId = response.printTempId;
			_this.formData = response;
			_this.pcName = response.formTemplateName?(response.formTemplateName +'       '+ DateFormat(response.uFormTempTime,'   yyyy-mm-dd HH:MM:ss')):'';
			_this.printName= response.printTemplateName?(response.printTemplateName +'        '+ DateFormat(response.uPrintTempTime,'   yyyy-mm-dd HH:MM:ss')):'';
			Store.dispatch(change('Template','printTempId',response.printTempId));
			Store.dispatch(change('Template','formTempId',response.formTempId));
			Store.dispatch(change('Template','allowPrint',response.allowPrint+''));
			Store.dispatch(change('Template','rentField',response.rentField));
		}
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});
// editTemplate
State.editTemplate = action(function(id) {
	var _this = this;
	Http.request('get-form-template-detail-data', {id:id}).then(function(response) {
		console.log("========");
		let data = {};
		data.name = response.name;
		data.comment=response.comment;
		let table = response.tableVOList;
		let mainT = response.tableVOList.filter((item)=>{
			if(item.isMain){
				item.mainT = item.fieldList;
				return item
			}
		});
		let buttonList = [];
		let detailT = response.tableVOList.filter((item)=>{
			if(!item.isMain){
				buttonList.push(item.hasEditButton);
				console.log('detailT.detail',item.fieldList)
				return item
			}
		});
		mainT = mainT[0];
		console.log('====>>>mainT',mainT,mainT.mainT.length)
		console.log('====>>>detailT',detailT)
		data.lineNum = mainT.lineNum;
		_this.openEdit = true;
		// State.editMainT = mainT[0];
		// State.editData = data;
		Store.dispatch(change('editTemplate','name',data.name));
		Store.dispatch(change('editTemplate','comment',data.comment));
		Store.dispatch(change('editTemplate','lineNum',data.lineNum));
		Store.dispatch(change('editTemplate','mainT',mainT.mainT));
		detailT.map((item,index)=>{
			Store.dispatch(change('editTemplate',`fieldList${index}`,item.fieldList));
		})
		buttonList.map((item,index)=>{
			Store.dispatch(change('editTemplate',`hasEditButton${index}`,item));
		})
		_this.editMainT = mainT;
		_this.editDetailT = detailT;
		console.log('===State===',_this.editMainT,_this.editDetailT)

	}).catch(function(err) {
		console.log(err)
		Message.error(err.message);
	});

});

module.exports = State;
