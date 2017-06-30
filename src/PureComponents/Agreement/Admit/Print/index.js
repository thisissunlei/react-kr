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


import Print from 'kr/PureComponents/Agreement/Print';
import {
	Actions,
	Store
} from 'kr/Redux';
import State from './State';
import './index.less';

@observer
export default class AdmitPrint extends React.Component {
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
		setTimeout(function() {
			window.print();
			// window.close();
		}, 1200)
	}
	renderImg=()=>{
		var printList = document.getElementsByClassName('print-section')[0];
		if(!printList){
			return;
		}
		var printHeight = printList.offsetHeight;
		if(printHeight>1100 && printHeight-1100<=5){
			printList.style.height = 1100+'px';
		}else if(printHeight>1105){
			printList.style.height = Math.ceil(printHeight/1100)*1100-35 + 'px';
			// printList.style.height = '2180px'
		}
		this.pages = Math.ceil(printHeight/1100);
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
				top:350+(i*1100),
				right:0,
				width:width,
				height:160,
				backgroundPosition:`${position*i}% 0`
			};
			str.push(<div style={style}></div>);

		}
		return str;
	}


	render() {
		let doms = this.renderImg() || [];
		return (

			<div className="print-section no-print-section">
			{State.baseInfo.withCachet && doms.map((item,index)=>{
				return item
			})}
				<Title value={`${State.baseInfo.leaseName}-入驻服务意向书`}/>
				<Print.Header
					  baseInfo={State.baseInfo}
						orderInfo="入驻服务意向书"
				/>
				<Print.BaseInfo baseInfo={State.baseInfo}  />

				<Print.Station
						orderTime={true}
						stationVOs={State.stationVOs}
						baseType="意向入驻信息"
						baseInfo={State.baseInfo}
						info="定金总计"
						method={true}
				/>

				<div className="station-after">
					乙方应于_____年___月___日前与甲方签署《入驻服务协议》，该定金可直接冲抵履约保证金或首期服务费
				</div>

				<Print.Intention
						stationVOs={State.stationVOs}
						baseInfo={State.baseInfo}
				/>
				

				<Print.Footer />

      </div>

		);
	}
}
