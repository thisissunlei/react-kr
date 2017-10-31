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
	formworkId:'',


});
//PC模板--选择
State.getTemplateList = action(function(id) {
	var _this = this;
	Http.request('get-form-template-list', {}).then(function(response) {
		let options = response.items.map((item)=>{
			let obj = {};
			obj.label = item.name;
			obj.value = item.id;
			return obj;
		});
		console.log('getTemplateList',options)
		// _this.pcList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
State.reset = action(function(){
	this.printName = '';
	this.pcName = ''
})
// PC模板--新建提交
// PC模板--新建获取数据
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
		console.log('getTemplateList',options)

		// _this.printList = options;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});


module.exports = State;
