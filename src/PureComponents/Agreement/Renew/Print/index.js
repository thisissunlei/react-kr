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
		this.init = false;
	}
	componentDidMount() {
		let _this = this;
		Store.dispatch(Actions.switchSidebarNav(false));
		setTimeout(function() {
			_this.renderImg()
			window.print();
			window.close();
		}, 1000)

	}
	renderImg=()=>{
		var printList = document.getElementsByClassName('print-section')[0];
		if(!printList){
			return;
		}
		var printHeight = printList.offsetHeight;
		if(printHeight>1205 && !this.init){
			this.init = true;
			printList.style.height = Math.ceil(printHeight/1200)*297-4 + 'mm';
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
				top:350+(i*1120),
				right:0,
				width:width,
				height:160,
				backgroundPosition:`${position*i}% 0`
			};
			str.push(<div style={style}></div>);

		}
		State.cachet = str;
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
		let style={
			position:'absolute',
			top:1100,
			border:'1px solid red',
			width:'100%',
			height:1
		}
		return (
		<div>
			<div className="print-section no-print-section"  style={{minHeight:'293mm'}}>
				<Title value={`${State.baseInfo.leaseName}-入驻办公室/工位补充附表(延续)`}/>
				{State.baseInfo.withCachet && State.cachet.map((item,index)=>{
					return item
				})}
				<Print.Header
					 	baseInfo={State.baseInfo}
						orderInfo="入驻办公室/工位补充附表(延续)"
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

			</div>
			<CommonItem baseInfo={State.baseInfo}/>
    	</div>

		);
	}
}
