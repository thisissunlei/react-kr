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

		State.getBasicInfo(params);
	}
	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
		 setTimeout(function() {
		 	window.print();
		 	window.close();
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

	render() {

		return (

			<div className="print-section no-print-section" >
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

		);
	}
}
