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
	templateParse
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
			m_main:{
				name:"yihao",
				age:18,
				sex:"男",
				motto:"宠辱不惊，看庭前花开花落；去留无意，望天空云卷云舒。",
			},
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
		var template = '<p style="white-space: normal; text-align: center; line-height: 27px;"><strong><span style="font-size: 24px; font-family: 宋体;">房屋租赁合同</span></strong></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">甲方（出租方）：【<span style="color: blue;">单击此处输入文字。</span></span>】</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">乙方（承租方）：【<span style="color: blue;">单击此处输入文字。</span></span>】</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">本协议由前述双方于【<span style="color: blue;">单击此处输入文字。</span></span>】年【<span style="color: blue;">单击此处输入文字。</span>】月【<span style="color: blue;">单击此处输入文字。</span>】日在【<span style="color: blue;">单击此处输入文字。</span>】市【<span style="color: blue;">单击此处输入文字。</span>】区签署。</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">依据《中华人民共和国合同法》，经双方协商，签定本合同共同遵守执行：</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">一、甲方将<span style="text-decoration-line: underline;">【<span style="color: blue;">单击此处输入文字。</span></span></span><span style="text-decoration-line: underline;">】（房屋地址），</span>建筑面积为【<span style="text-decoration-line: underline;"><span style="color: blue;">单击此处输入文字。</span></span>】平方米，租赁给乙方使用。</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">二、房屋用途：<span style="text-decoration-line: underline;">办公用房。</span></span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">三、租赁期限：一年，<span style="text-decoration-line: underline;">自【<span style="color: blue;">单击此处输入文字。</span></span></span><span style="text-decoration-line: underline;">】年【<span style="color: blue;">单击此处输入文字。</span>】月【<span style="color: blue;">单击此处输入文字。</span>】日至【<span style="color: blue;">单击此处输入文字。</span>】年【<span style="color: blue;">单击此处输入文字。</span>】月【<span style="color: blue;">单击此处输入文字。</span>】日</span>；如续租，期满前60日提出续租申请，双方签署续租合同。</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">四、租金及支付方式：<span style="text-decoration-line: underline;">租金人民币【<span style="color: blue;">单击此处输入文字。</span></span></span><span style="text-decoration-line: underline;">】元（大写：【<span style="color: blue;">单击此处输入文字。</span>】整）</span>，乙方在合同生效之日起<span style="text-decoration-line: underline;">&nbsp; 七&nbsp;</span>日内一次付清。该费用已包含租金、水、电、采暖费等费用。</p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">五、</span><span style="font-size: 12px; font-family: 宋体;">乙方不得私自拆改房屋结构，不得损坏房屋内的设施。非乙方损坏的由甲方负责维修。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">六、</span><span style="font-size: 12px; font-family: 宋体;">在本合同履行期间，乙方或乙方投资的公司使用本租赁地址进行工商注册的，甲方予以协助提供相关材料，乙方对新成立的公司履行本协议而产生的所有债务承担连带责任。协议期满乙方/新注册公司不再承租的，应在期满之日前15日内迁出注册地址。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">七、</span><span style="font-size: 12px; font-family: 宋体;">违约责任</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">1</span><span style="font-size: 12px; font-family: 宋体;">、房屋在租赁期间，乙方不得转租、转借给第三方。如有类似情况发生，甲方经提前五天通知乙方，终止本合同的履行，乙方无条件迁出租赁房屋，同时迁出注册地址。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">2</span><span style="font-size: 12px; font-family: 宋体;">、合同履行期间，乙方应合法经营、照章纳税；乙方如有违反合同、违反法律法规经营的，甲方有权提前解除合同。并要求乙方即使迁出注册地址。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">3、</span><span style="font-size: 12px; font-family: 宋体;">发生以上两种情况，甲方终止/解除合同时，乙方应按照合同总额的100%承担违约金外，还应在合同终止或解除后10日内迁出注册地址，逾期未迁出的，需按300元/日向甲方承担注册地址占用费。给甲方造成其他损失的，甲方有权继续追偿。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">4</span><span style="font-size: 12px; font-family: 宋体;">、双方未在期满前30日内签订续租合同，到期10后乙方仍未迁出该注册地址的，否则，需按300元/日向甲方承担注册地址占用费。给甲方造成其他损失的，甲方有权继续追偿，并有权向工商行政部门提出将乙方列入异常经营企业名录。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">八、因本合同产生的争议，双方一致同意提交房屋所在地有管辖权的人民法院提起诉讼，对双方均有约束力。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">九、本协议自双方签字盖章之日起成立并生效。合同一式三份，甲方执两份，乙方执一份。具有同等法律效力。</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">&nbsp;</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">&nbsp;</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">甲方：（`img`）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 乙方：（盖章）</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">法定代表人： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法定代表人：</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">联系人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 联系人：</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">联系电话：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;联系电话：</span></p><p style="white-space: normal; text-indent: 24px; line-height: 24px;"><span style="font-size: 12px; font-family: 宋体;">联系地址： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系地址：</span></p><p style="white-space: normal;"><span style="font-size: 12px; font-family: 宋体;">日期：<span style="text-decoration-line: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>年<span style="text-decoration-line: underline;">&nbsp;&nbsp;&nbsp;&nbsp;</span>月<span style="text-decoration-line: underline;">&nbsp;&nbsp;&nbsp;&nbsp;</span>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 日期：<span style="text-decoration-line: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>年<span style="text-decoration-line: underline;">&nbsp;&nbsp;</span></span></p><p><br/></p>';
		var _this = this;
		setTimeout(()=>{
			_this.configData.template =  template;
			_this.configData.allData = allData;
			_this.print.innerHTML = _this.templateParse(_this.configData.template);
			var mainTr = document.querySelectorAll(".main-table tr");
			var detailTr = document.querySelectorAll(".money-detail tr");
			_this.mianCodeParse(mainTr,_this.configData.allData.moneyMain)
			_this.detailCodeParse(detailTr,_this.configData.allData.moneyDetail)
			
		},1000)
	
	}
	//主表解析
	mianCodeParse = (elems,params) =>{
		
		for(let i = 0; i<elems.length;i++){
			let everyLine = elems[i];
				
			everyLine.innerHTML = this.codeParse(everyLine.innerHTML,params)
		}
	}
	//明细表解析
	detailCodeParse = (elems, params) =>{
		var text = ''+elems[0].innerHTML;
		for (var i = 0; i < params.length; i++) {
			let everyLine = params[i];
			text += `<tr>${this.codeParse(elems[1].innerHTML,params[i])}</tr>`
		}
		document.querySelectorAll(".money-detail tbody")[0].innerHTML = text;
	}
	//标记替换
	templateParse = (template) =>{
		var t;
		var imgReg = new RegExp('`img`', 'ig');
		//分页标签
		var pageReg = new RegExp('`pagination`','ig');
		var qrImgReg = new RegExp('`qrCode`','ig'); 
		var includeStart = new RegExp('`includeStart`','ig')
		var includeEnd = new RegExp('`includeEnd`','ig')
		t = template.replace(imgReg, '<span class="print-other-chapter"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
		t = template.replace(pageReg,'<div class = "print-pagination"><div>');
		t = template.replace(qrImgReg,'<span class="print-qr-code"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
		t = template.replace(includeStart,'<div class="print-include-start"></div>');
		t = template.replace(includeEnd,'<div class="print-include-end"></div>');
		return t;
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
