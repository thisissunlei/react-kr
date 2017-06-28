import React, {
	 
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	Title,
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
export default class RenewPrint extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		let params = this.context.router.params;

		State.getBasicInfo(params);
	}
	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
		var printList = document.getElementsByClassName('print-section')[0];
		var printHeight = printList.offsetHeight;
		if(printHeight>1120 && printHeight-1120<=5){
			printList.style.height = 1120+'px';
		}else if(printHeight>1125){
			printList.style.height = Math.ceil(printHeight/1120)*1120 + 'px';
		}
		this.pages = Math.ceil(printHeight/1120) + 1;
		setTimeout(function() {
			window.print();
			window.close();
		}, 1000)

	}
	renderImg=()=>{
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
				top:350+(i*1120),
				right:0,
				width:width,
				height:160,
				backgroundPosition:`${position*i}% 0`
			};
			str.push(<div style={style}></div>);

		}
		return str;
	}
	renderContent=()=>{
		if(State.baseInfo.hasOwnProperty('agreement')){
			var str = State.baseInfo.agreement;
			if(str.length>45){
				return (
					<div className="print-text">
						<span>双方其他约定内容：</span>
						<span className="content" style={{paddingLeft:20}}>{str}</span>
					</div>
				)
			}else{
				if(!!!State.baseInfo.agreement){
					str = '无';
				}
				return (
					<div className="print-text text-none">
						<span>双方其他约定内容：</span>
						<span style={{paddingLeft:20}}>{str}</span>
						<span className="border-b one-text"></span>
						<span className="border-b two-text"></span>
					</div>
				)
			}
		}else{
			return(
				<div className="print-text text-none">
					<span>双方其他约定内容：</span>
					<span style={{paddingLeft:20}}>无</span>
					<span className="border-b one-text"></span>
					<span className="border-b two-text"></span>
				</div>
			)
		}
	}

	render() {
		let doms = this.renderImg();

		return (
		<div>
			<div className="print-section no-print-section"  style={{minHeight:1120}}>
				<Title value={`${State.baseInfo.leaseName}-入驻服务协议补充协议(延续)`}/>
				{State.baseInfo.withCachet && doms.map((item,index)=>{
					return item
				})}
				<Print.Header
					 	baseInfo={State.baseInfo}
						orderInfo="入驻服务协议补充协议(延续)"
				/>
				<Print.BaseInfo baseInfo={State.baseInfo}/>

				<Print.Station
						orderTime={false}
						stationVOs={State.stationVOs}
						baseInfo={State.baseInfo}
						baseTimeBegin={true}
						baseType="延续入驻信息如下"
				/>

				<Print.Payment
						baseInfo={State.baseInfo}
						installmentPlans={State.installmentPlans}
						installmentPlansList={State.installmentPlansList}
				/>

				{this.renderContent()}

				<Print.Footer/>
			</div>
			<CommonItem baseInfo={State.baseInfo}/>
    	</div>

		);
	}
}
