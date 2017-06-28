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
export default class JoinPrint extends React.Component {
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
		console.log('did');
		this.pages = Math.ceil(printHeight/1120) + 1;
		 setTimeout(function() {
		 	window.print();
		 	// window.close();
		 }, 1000)


	}
	renderContent=()=>{
		if(State.baseInfo.hasOwnProperty('agreement')){
			var str = State.baseInfo.agreement;
			if(str.length>45){
				return (
					<div className="print-text">
						<span>双方其他约定内容：</span>
						<span className="content">{str}</span>
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
	renderImg=()=>{
		console.log('===>',this.pages)
		let str=[] ;
		for(var i = 1;i<3;i++){
			let style={
				background:url('http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/app_public_upload/201706/I/172847235_696.png'),
				position:'absolute',
				top:800*(i+1),
				right:0
			};
			console.log(<div style={style}></div>)
			str.push(<div style={style}></div>);
			// return <div style={style}></div>

		}
		console.log('Img======>',str)
		return str;
	}

	render() {
		console.log('render')
		let doms = this.renderImg();
		return (
		<div style={{background:'#fff'}}>
			{doms.map((item,index)=>{
				return item
			})}

			<div className="print-section no-print-section" style={{minHeight:1120}}>
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
				{this.renderContent()}
				<Print.Footer/>

      		</div>
      		<CommonItem />
      	</div>

		);
	}
}
