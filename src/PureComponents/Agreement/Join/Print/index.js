import React, {
	 
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	Title,
	Button
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';
import Print from 'kr/PureComponents/Agreement/Print';
import CommonItem from 'kr/PureComponents/Agreement/CommonItem';

import State from './State';
import './index.less';

@observer
export default class JoinPrint extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		let params = this.context.router.params;

		State.getBasicInfo(params);
		this.init = false;
	}
	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
		setTimeout(function() {
		 	window.print();
		 	// window.close();
		 }, 1200)


	}
	// renderContent=()=>{
	// 	if(State.baseInfo.hasOwnProperty('agreement')){
	// 		var str = State.baseInfo.agreement;
	// 		if(str.length>45){
	// 			return (
	// 				<div className="print-text">
	// 					<span>双方其他约定内容：</span>
	// 					<span className="content">{str}</span>
	// 				</div>
	// 			)
	// 		}else{
	// 			if(!!!State.baseInfo.agreement){
	// 				str = '无';
	// 			}
	// 			return (
	// 				<div className="print-text text-none">
	// 					<span>双方其他约定内容：</span>
	// 					<span style={{paddingLeft:20}}>{str}</span>
	// 					<span className="border-b one-text"></span>
	// 					<span className="border-b two-text"></span>
	// 				</div>
	// 			)
	// 		}
	// 	}else{
	// 		return(
	// 			<div className="print-text text-none">
	// 				<span>双方其他约定内容：</span>
	// 				<span style={{paddingLeft:20}}>无</span>
	// 				<span className="border-b one-text"></span>
	// 				<span className="border-b two-text"></span>
	// 			</div>
	// 		)
	// 	}
	// }
	renderImg=()=>{
		var printList = document.getElementsByClassName('print-section')[0];
		if(!printList){
			return;
		}
		var printHeight = printList.offsetHeight;
		if(printHeight>1200 && !this.init){
			this.init = true;
			printList.style.height = Math.ceil(printHeight/1200)*1120 + 'px';
		}
		this.pages = Math.ceil(printHeight/1200) + 1;
		let str=[] ;
		let page = this.pages;
		if(page<=1){
			return;
		}
		let whole = 160;
		let width = Math.ceil(160/page);
		let position = Math.ceil(100/(page-1));
		let cachetUrl = State.baseInfo.cachetUrl;
		for(var i = 0;i<page;i++){
			let style={
				background:`url(${cachetUrl}) 100% 100%`,
				position:'absolute',
				backgroundSize:'cover',
				top:350+(i*1200),
				right:0,
				width:width,
				height:160,
				backgroundPosition:`${position*i}% 0`
			};
			str.push(<div style={style}></div>);

		}
		return str;
	}
	print=()=>{
		window.print()
	}
	render() {
		let doms = this.renderImg();
		return (
		<div style={{background:'#fff'}}>
			{State.baseInfo.withCachet && doms.map((item,index)=>{
				return item
			})}

			<div className="print-section no-print-section" style={{minHeight:'293mm'}}>
				<Title value={`${State.baseInfo.leaseName}-入驻服务协议`}/>
				<Print.Header
					baseInfo={State.baseInfo}
					orderInfo="入驻服务协议"
				/>
				<Print.BaseInfo baseInfo={State.baseInfo}/>

				<Print.Station
					orderTime={false}
					stationVOs={State.stationVOs}
					baseType="入驻信息"
					baseInfo={State.baseInfo}
				/>

				<Print.Payment
					baseInfo={State.baseInfo}
					installmentPlans={State.installmentPlans}

				/>
				{
					(State.baseInfo.agreement && State.baseInfo.agreement.length>45)?(
							<div className="print-text">
								<span>双方其他约定内容：</span>
								<span className="content">{State.baseInfo.agreement}</span>
							</div>
						):(
							<div className="print-text text-none">
								<span>双方其他约定内容：</span>
								<span style={{paddingLeft:20}}>{State.baseInfo.agreement}</span>
								<span className="border-b one-text"></span>
								<span className="border-b two-text"></span>
							</div>
						)
				}
				<Print.Footer/>

      		</div>
      		
      		<CommonItem baseInfo={State.baseInfo}/>
      		<Button onClick={this.print}>打印</Button>
      	</div>

		);
	}
}
