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
	Http.request('get-form-template-data', {wfId:id}).then(function(response) {
		console.log('===getPrintTemplateData====',response);
		if(response.id){
			_this.formData = response;
			_this.pcName = response.formTemplateName +'       '+ DateFormat(response.uFormTempTime,'   yyyy/mm/dd HH:MM:ss');
			_this.printName=response.printTemplateName +'        '+ DateFormat(response.uPrintTempTime,'   yyyy/mm/dd HH:MM:ss');
			Store.dispatch(change('Template','printTempId',response.printTempId));
			Store.dispatch(change('Template','formTempId',response.formTempId));
			Store.dispatch(change('Template','allowPrint',response.allowPrint+''));
		}
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});


module.exports = State;
