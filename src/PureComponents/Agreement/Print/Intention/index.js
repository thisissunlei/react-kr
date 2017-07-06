import React, {
	Component
} from 'react';

import './index.less';

export default class Intention extends Component {

	constructor(props, context) {
		super(props, context);
	}
	static propTypes = {
		stationVOs: React.PropTypes.object,
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProp){
		
	}
	checkPosition=()=>{
 		let {installmentPlans} = this.props;
 		let pageItem ;
 		let marginTop=0;
 		let pageHeight = 1120;
		let tableTop = document.getElementsByClassName('ui-print-Intention')[0];
		if(!tableTop){
			return;
		}

		let top = tableTop.offsetTop;
		if(top>1089 && top<1157){
			let margin = 1157-top;
			tableTop.style.marginTop = margin +100+ 'px'; 
		}
		let pageReturn = 0 ;
		if(top>1022 && top<1092){
			pageReturn = 1;
			marginTop = pageHeight-top-30 +60;
		}else if(top>967 && top<1022){
			pageReturn =2;
			marginTop = pageHeight-top-100 +60;
		}else if(top>892 && top<967){
			pageReturn = 3;
			marginTop = pageHeight-top-155 +60;
		}else if(top>725 && top<892){
			pageReturn = 4;
			marginTop = pageHeight-top-208+60;
		}

		return {pageReturn:pageReturn,marginTop:marginTop}
		
		
	}
	render() {
		let {
			stationVOs,
			baseInfo
		} = this.props;
		let margin = this.checkPosition() || {pageReturn:0,marginTop:0};
		
		console.log('margin',margin)
		return (

			<div className="ui-print-Intention">
				<p>意向条款</p>
				<p  style={{marginTop:(margin && margin.pageReturn==1)?margin.marginTop:'5'}}>一、甲乙双方同意本意向仅作为双方的意向性法律文件，双方应于本意向书所约定的日期内签订正式的《入驻服务协议》，以明确双方权利、义务。如因乙方原因乙方未在规定时间内签署《入驻服务协议》的，则订金不予退还，如因甲方原因甲方未在规定时间内签署《入驻服务协议》的，应返还乙方订金。
				</p>
				<p  style={{marginTop:(margin && margin.pageReturn==2)?margin.marginTop:'10'}}>二、双方因履行本意向书发生争议，应友好协商解决;协商不成的任一方均有权向甲方所在地有管辖权的人民法院提起诉讼。</p>
				<p  style={{marginTop:(margin && margin.pageReturn==3)?margin.marginTop:'10'}}>三、本意向书自甲乙双方签字、盖章(签章)且乙方交付订金后生效，一式三份，甲方执二份，乙方执一份（签署《入驻服务协议》时乙方向甲方出示），具有同等法律效力。
				</p>
				<div className={`print-text ${stationVOs.length==7?'fixed-height':'auto-height'}`} style={{marginTop:(margin && margin.pageReturn==4)?margin.marginTop:'10'}}>
					<span>四、双方其他约定内容：</span>
					<span style={{lineHeight:'24px',paddingLeft:10,wordBreak:'break-all'}}>{baseInfo.agreement?baseInfo.agreement:(<span style={{paddingLeft:20}}>无</span>)}</span>
					<p className="text-content"></p>
					<span className="border-b one-text"></span>
					<span className="border-b two-text"></span>
					<span className="border-b three-text"></span>
					<span className="border-b four-text"></span>
					<span className="border-b five-text"></span>
				</div>

			</div>



		);
	}

}
