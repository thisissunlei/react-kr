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
	allElemsRender
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
		this.getData();
		setTimeout(function() {
			
			window.print();
			window.close();
		}, 1200)
	}
	//获取信息
	getData=()=>{
		var allData =  {
		
			m_name:"yihao",
			m_age:18,
			m_sex:"男",
			m_motto:"宠辱不惊，看庭前花开花落；去留无意，望天空云卷云舒。",
		
			d_moneyDetail:[
				{name:"noe1",age:23,sex:"女"},
				{name:"shui2",age:15,sex:"男"},
				{name:"shui3",age:19,sex:"女"},
			],
			d_moneyDetail1:[
				{name:"noe1",age:23,sex:"女"},
				{name:"shui2",age:15,sex:"男"},
				{name:"shui3",age:19,sex:"女"},
			],
			other:'其他'
		};
		const id = this.props.params.otherPrintId;
		const _this = this;
		
		Http.request("get-other-print-formwork", {requestId:id}).then(function (response) {
			// _this.getAllData(response.content,id);
			_this.allRender(response.content, allData);
		}).catch(function (err) {
			Message.error(err.message);
		});
		
	
	}
	getAllData = (content,id) =>{
		const _this = this;
		Http.request("get-other-print-data", { requestId: id }).then(function (response) {
			console.log(response,"PPPPPP")
			_this.allRender(content,{});
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	// //主表解析
	// mianCodeParse = (elems,params) =>{
	// 	console.loh()
	// 	for(let i = 0; i<elems.length;i++){
	// 		let everyLine = elems[i];
				
	// 		everyLine.innerHTML = this.codeParse(everyLine.innerHTML,params)
	// 	}
	// }
	//明细表解析
	allRender = (template,allData) =>{
		this.configData.template =  template;
		this.configData.allData = allData;
		this.print.innerHTML = templateParse(this.configData.template);
		
		var detailTr = document.querySelectorAll(".money-detail tr");
		
		this.detailCodeParse(detailTr,this.configData.allData.moneyDetail)
		allElemsRender();
		checkMark(this.print);
	}
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
	
	//字段替换
	codeParse = (template, data) =>{
		var t, key, reg;
　　　   //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
		for (key in data) {
			reg = new RegExp('{{' + key + '}}', 'ig');
			t = (t || template).replace(reg, data[key]);
		}
		return t;
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
