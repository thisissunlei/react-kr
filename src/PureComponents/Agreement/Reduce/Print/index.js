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
		this.init = false;
		State.getBasicInfo(params);
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
		if(printHeight>1120 && !this.init){
			this.init = true;
			printList.style.height = Math.ceil(printHeight/1120)*297-4 + 'mm';
		}
		this.pages = Math.ceil(printHeight/1200);
		let str=[] ;
		let page = this.pages || 1;
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
	getLocalTime = (beginDate) => {
		var now = new Date(beginDate);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "年" + mm + "月" + dd + "日")


	}
	renderContent=()=>{

		if(State.baseInfo.hasOwnProperty('agreement')){
			var str = State.baseInfo.agreement;
			if(!!!State.baseInfo.agreement){
				str = '无';
			}
			return (
				<div className="print-text">
					<span>双方其他约定内容：</span>
					<span style={{paddingLeft:20,wordBreak: 'break-all'}}>{str}</span>
					<span className="border-b one-text"></span>
					<span className="border-b two-text"></span>
					<span className="border-b three-text"></span>
					<span className="border-b four-text"></span>
				</div>
			)
		}else{
			return(
				<div className="print-text text-none">
					<span>双方其他约定内容：</span>
					<span style={{paddingLeft:30}}>无</span>
					<span className="border-b one-text"></span>
					<span className="border-b two-text"></span>
					<span className="border-b three-text"></span>
					<span className="border-b four-text"></span>
				</div>
			)
		}
	}
	render() {
		return (
			<div className="g-exit-print" >
				
				<Title value={`${State.baseInfo.leaseName}-入驻办公室/工位补充附表(减少)`}/>
				<div className="print-section no-print-section" style={{minHeight:'293mm'}} >
					{State.baseInfo.withCachet && State.cachet.map((item,index)=>{
					return item
				})}
					<Print.Header
						baseInfo={State.baseInfo}
						orderInfo="入驻办公室/工位补充附表(减少)"
					/>
					<Print.BaseInfo baseInfo={State.baseInfo}/>

					<Print.Station
						orderTime={false}
						stationVOs={State.stationVOs}
						baseType={`双方一致同意，自 ${this.getLocalTime(State.baseInfo.leaseBegindate)}起减少`}
						baseInfo={State.baseInfo}
						reduceTh="减租期限"
						info="减少费用总计"
					/>

					{this.renderContent()}
					<Print.Footer/>

	    </div>
	  </div>

		);
	}
}
