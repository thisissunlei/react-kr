import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
    ArticleList,
    Message
} from 'kr-ui';
import React, { PropTypes } from 'react';

import { observer, inject } from 'mobx-react';
import './index.less';
import {Http,delHtmlTag} from 'kr/Utils';
import {
	templateParse,
	checkMark,
	allElemsRender,
	chaptersMove,
	delEndFutility,
	controlHeight,
	codeParse
} from './publicFun'
export default class PrintOther extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
		
		}
		this.configData = {
			//所有字段
			allData: {},
			//模板数据
			template: ''

		}

	}
	componentDidMount(){
		// this.getData();
		console.log(window.screen.deviceXDPI,"======>");
		this.allRender();
	
	}
	//获取信息
	getData=()=>{
		const id = this.props.params.otherPrintId;
		const _this = this;
		Http.request("get-other-print-formwork", {requestId:id}).then(function (response) {
			_this.getAllData(response.content,id);
		}).catch(function (err) {
			Message.error("请配置打印模板");
			// window.close()
		});
		
	
	}
	getAllData = (content,id) =>{
		const _this = this;
		Http.request("get-other-print-data", { requestId: id }).then(function (response) {
			_this.allRender(content,response);
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	
	allRender = (template,allData) =>{
		this.configData.template = '<p><strong>sdsdfs的发生</strong></p><p>{{ li | name}}的发生{{li|age}}发是防守{li}</p><p><strong>打法发斯蒂芬是否水电费水电费是撒地方水电费水电费是</strong></p>'
		// this.configData.template =  template;
		this.configData.allData = { li: { name: '梨花', age: '88', love: '哈哈',printValue:'什么鬼'}};
		// this.configData.allData = allData;
		var templateData = templateParse(this.configData.template);
		this.print.innerHTML = codeParse(templateData, allData);
		this.print.innerHTML = codeParse(templateData,this.configData.allData);
		
		var detailTr = document.querySelectorAll(".money-detail tr");
		
		this.detailCodeParse(detailTr,this.configData.allData.moneyDetail)
		allElemsRender();
		
		chaptersMove();//章位调整
		delEndFutility();//删除最后无用内容		
		controlHeight(this.print)
		checkMark(this.print);
		setTimeout(function() {
			window.print();
			window.close();
		}, 500);
		
	}
	//明细表解析
	detailCodeParse = (elems, params) =>{
		if(!elems.length){
			return;
		}
		var text = ''+elems[0].innerHTML;
		for (var i = 0; i < params.length; i++) {
			let everyLine = params[i];
			text += `<tr>${this.codeParse(elems[1].innerHTML,params[i])}</tr>`
		}
		document.querySelectorAll(".money-detail tbody")[0].innerHTML = text;
	}

   
	render() {
       
		return (
			<div 
				className="print-other"
				ref={
					(ref)=>{
						this.print = ref;
					}
				}
			>
              
			</div>
		);
	}
}
