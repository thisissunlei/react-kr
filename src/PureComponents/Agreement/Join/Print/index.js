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
		let _this = this;

		setTimeout(function() {
			State.cachet = _this.renderImg();
		 	window.print();
		 	window.close();
		 }, 1200)


	}
	renderImg=()=>{
		var printList = document.getElementsByClassName('print-section')[0];
		if(!printList){
			return;
		}
		var printHeight = printList.offsetHeight;
		if(printHeight>1120  &&  !this.init){
			this.init = true;
			this.pages = Math.ceil(printHeight/1120) + 2;
			printList.style.height = Math.ceil(printHeight/1120)*297-4 + 'mm';
		}
		
		let str=[] ;
		let page = this.pages || 3;
		console.log(this.page)
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
	print=()=>{
		window.print()
	}
	render() {
		let style={
			position:'absolute',
			top:1120,
			border:'1px solid red',
			width:'100%',
			height:1
		}
		return (
		<div style={{background:'#fff'}}>
			<div className="print-section no-print-section" style={{minHeight:'293mm'}}>
				<Title value={`${State.baseInfo.leaseName}-入驻办公室/工位附表`}/>
				{State.baseInfo.withCachet && State.cachet.map((item,index)=>{
					return item
				})}
				<Print.Header
					baseInfo={State.baseInfo}
					orderInfo="入驻办公室/工位附表"
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
				

      		</div>
      		
      		<CommonItem baseInfo={State.baseInfo}/>
      	</div>

		);
	}
}
