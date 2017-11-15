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

import { observer, inject, } from 'mobx-react';
import './index.less';
import { Http, delHtmlTag, systemJudge} from 'kr/Utils';
import {
	templateParse,
	checkMark,
	allElemsRender,
	chaptersMove,
	delEndFutility,
	controlHeight,
	codeParse,
	
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
		// console.log(js_getDPI(),"--------")
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
		this.configData.template = '<p style="text-align:center;line-height:27px"><strong><span style="font-size:24px;font-family:宋体">房屋租赁合同</span></strong></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">甲方（出租方）：{{m-rent_name}}</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">乙方（承租方）：{{m-admin_name}}</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">本协议由前述双方于{{m-sign_date}}在{{m-city}}区签署。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">依据《中华人民共和国合同法》，经双方协商，签定本合同共同遵守执行：</span></p><p style="line-height:24px;text-indent:2em"><span style="font-size:12px"><span style="font-size:12px;font-family:宋体">一、甲方将</span><span style="font-size:12px;font-family:宋体;text-decoration:none">{{m-address}}（房屋地址），</span><span style="font-size:12px;font-family:宋体">建筑面积为{{m-area}}平方米，租赁给乙方使用。</span></span></p><p style="line-height:24px;text-indent:2em"><span style="font-size:12px"><span style="font-size:12px;font-family:宋体">二、房屋用途：</span><span style="font-size:12px;font-family:宋体;text-decoration:none">办公用房。</span></span></p><p style="line-height:24px;text-indent:2em"><span style="font-size:12px"><span style="font-size:12px;font-family:宋体">三、租赁期限：一年，</span><span style="font-size:12px;font-family:宋体;text-decoration:none">自{{m-start_date}}至{{m-end_date}}</span><span style="font-size:12px;font-family:宋体">；如续租，期满前60日提出续租申请，双方签署续租合同。</span></span></p><p style="line-height:24px;text-indent:2em"><span style="font-size:12px"><span style="font-size:12px;font-family:宋体">四、租金及支付方式：</span><span style="font-size:12px;font-family:宋体;text-decoration:none">租金人民币{{m-money.value}}元（大写：{{m-money}}）</span><span style="font-size:12px;text-indent:2em;font-family:宋体">乙方在合同生效之日起<span style="font-size:14px;text-decoration-line:underline">&nbsp; 七</span>日内一次付清。</span></span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">五、乙方不得私自拆改房屋结构，不得损坏房屋内的设施。非乙方损坏的由甲方负责维修。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">六、在本合同履行期间，乙方或乙方投资的公司使用本租赁地址进行工商注册的，甲方予以协助提供相关材料，乙方对新成立的公司履行本协议而产生的所有债务承担连带责任。协议期满乙方/新注册公司不再承租的，应在期满之日前15日内迁出注册地址。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">七、违约责任</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">1、房屋在租赁期间，乙方不得转租、转借给第三方。如有类似情况发生，甲方经提前五天通知乙方，终止本合同的履行，乙方无条件迁出租赁房屋，同时迁出注册地址。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">2、合同履行期间，乙方应合法经营、照章纳税；乙方如有违反合同、违反法律法规经营的，甲方有权提前解除合同。并要求乙方即使迁出注册地址。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">3、发生以上两种情况，甲方终止/解除合同时，乙方应按照合同总额的100%承担违约金外，还应在合同终止或解除后10日内迁出注册地址，逾期未迁出的，需按300元/日向甲方承担注册地址占用费。给甲方造成其他损失的，甲方有权继续追偿。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">4、双方未在期满前30日内签订续租合同，到期10日后乙方仍未迁出该注册地址的，乙方需按300元/日向甲方承担注册地址占用费。给甲方造成其他损失的，甲方有权继续追偿，并有权向工商行政部门提出将乙方列入异常经营企业名录。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">八、因本合同产生的争议，双方一致同意提交房屋所在地有管辖权的人民法院提起诉讼，对双方均有约束力。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">九、本协议自双方签字并盖章之日起成立并生效。合同一式肆份，甲方执贰份，乙方执贰份，具有同等法律效力。</span></p><p style="line-height:24px;text-indent:2em"><span style="font-family:宋体;font-size:12px">（以下无正文，为签署页）#{includeStart}</span></p><p style="text-indent:24px;line-height:24px"><span style="font-family:宋体;font-size:12px"></span></p><table><tbody><tr class="firstRow"><td width="368" valign="top" style="word-break:break-all"><p dir="ltr" style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">甲方：（盖章）&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">乙方：（盖章）</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr><tr><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">法定代表人：#{img}{{m-legal_host_name}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">法定代表人：{{m-legal_welcome_name}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr><tr><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">联系人：{{m-contract_host_name}}&nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">联系人：{{m-contract_wel_name}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr><tr><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">联系电话：{{m-contract_hose_phone}}&nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">&nbsp;联系电话：{{m-contract_wel_phone}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr><tr><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">联系地址：{{m-contract_host_addr}}&nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">联系地址：{{m-contract_wel_addr}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr><tr><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">日期：</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">年</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">月</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">日&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td><td width="368" valign="top" style="word-break:break-all"><p style="text-indent:2em"><span style="font-family:宋体;font-size:12px;text-indent:24px">日期：</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">年</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">月</span><span style="font-family:宋体;text-indent:24px;text-decoration-line:underline;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:24px">日</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td></tr></tbody></table><p style="line-height:24px;text-indent:0"><span style="font-family:宋体;font-size:12px"><span style="font-family:宋体;font-size:12px;text-indent:24px">#{includeEnd}#{pagination}</span>&nbsp;</span></p><p style="line-height:27px;text-align:center"><strong><span style="font-size:24px;font-family:宋体">《房屋租赁合同》补充协议</span></strong></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px;font-family:宋体">甲方（出租方）： {{m-rent_name}}</span></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px"><span style="font-family:宋体">法定代表人：</span><span style="font-family:宋体">{{m-legal_host_name}}</span></span></p><p style="line-height:27px"><span style="font-family:宋体;font-size:12px">&nbsp;</span></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px"><span style="font-family:宋体">乙方（承租方）：</span><span style="font-family:宋体">{{m-admin_name}}</span></span></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px"><span style="font-family:宋体">法定代表人：</span><span style="font-family:宋体">{{m-legal_welcome_name}}</span></span></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px"><span style="font-family:宋体">法定代表人身份证号：</span><span style="font-family:宋体">{{m-legal_welcome_card}}</span></span></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">联系人：{{m-contract_wel_name}}</span></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">联系方式：{{m-contract_wel_phone}}</span></p><p style="text-indent:24px;line-height:27px"><span style="font-family:宋体;font-size:12px">&nbsp;</span></p><p style="text-indent:32px;line-height:27px"><span style="font-size:12px"><span style="font-family:宋体">甲乙双方于</span><span style="font-family:宋体">{{m-sign_date}}</span><span style="font-family:宋体">在</span><span style="font-family:宋体">{{m-city}}</span><span style="font-family:宋体">区签署了《房屋租赁合同》。现双方一致同意并确认：</span></span></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">1、甲方依照该《房屋租赁合同》约定出租的房屋仅供乙方提供给工商局注册使用。乙方自愿放弃基于《房屋租赁合同》项下的使用该房屋的权利，且无权向甲方要求任何补偿及/或赔偿，但基于甲方将房屋提供给乙方作为注册地址，乙方仍应承担《房屋租赁合同》中的各项义务。</span></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">2、本补充协议有约定的按照本补充协议约定执行，本补充协议为约定的，按照《房屋租赁合同》约定执行。</span></p><p style="text-indent:35px;line-height:27px"><span style="font-size:12px"><span style="font-size:12px;font-family:宋体">3</span><strong><span style="font-size:12px;font-family:宋体">、</span></strong><span style="font-size:12px;font-family:宋体">本补充协议一式一份，原件由甲方留存一份。自双方盖章并由法定代表人签字后生效</span><strong><span style="font-size:12px;font-family:宋体">。</span></strong><strong><span style="font-size:12px;font-family:宋体"></span></strong></span></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">&nbsp;</span></p><p style="line-height:27px"><span style="font-family:宋体;font-size:12px">（以下无正文）</span></p><p style="line-height:27px"><span style="font-family:宋体;font-size:12px">#{includeStart}</span></p><p style="line-height:27px"><span style="font-family:宋体;font-size:12px"></span></p><table><tbody><tr class="firstRow"><td width="368" valign="top" style="word-break:break-all"><span style="font-family:宋体;font-size:12px;text-indent:32px">甲方：（盖章）&nbsp;&nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td><td width="368" valign="top" style="word-break:break-all"><span style="font-family:宋体;font-size:12px;text-indent:32px">乙方：（盖章）</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td></tr><tr><td width="368" valign="top" style="word-break:break-all"><span style="font-size:12px;text-indent:32px;font-family:宋体">法定代表人：</span><span style="font-size:12px;text-indent:32px;font-family:宋体">#{img}{{m-legal_host_name}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td><td width="368" valign="top" style="word-break:break-all"><span style="font-size:12px;text-indent:32px;font-family:宋体">法定代表人：</span><span style="font-size:12px;text-indent:32px;font-family:宋体">{{m-legal_welcome_name}}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td></tr><tr><td width="368" valign="top" style="word-break:break-all"><span style="font-family:宋体;font-size:12px;text-indent:32px">日期：</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">年</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">月</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">日</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td><td width="368" valign="top" style="word-break:break-all"><span style="font-family:宋体;font-size:12px;text-indent:32px">日期：</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">年</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">月</span><span style="font-family:宋体;font-size:12px;text-indent:32px;text-decoration-line:underline">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;font-size:12px;text-indent:32px">日</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td></tr></tbody></table><p style="line-height:27px"><span style="font-family:宋体;font-size:12px">#{includeEnd}#{allEnd}</span><br></p><p style="text-indent:32px;line-height:27px"><span style="font-family:宋体;font-size:12px">&nbsp;</span></p><p><br></p>'
		// this.configData.template =  template;
		this.configData.allData = { li: { name: '梨花', age: '88', love: '哈哈',printValue:'什么鬼'}};
		// this.configData.allData = allData;
		var templateData = templateParse(this.configData.template);
		// this.print.innerHTML = codeParse(templateData, allData);
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
