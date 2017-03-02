import React, {
	Component,
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	Menu,
	MenuItem,
	Title,
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Agreement
} from 'kr/PureComponents';

import State from './State';
import './index.less';

@observer
export default class IncreasePrint extends Component {
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
				<Title value={`${State.baseInfo.leaseName}-入驻服务协议补充协议(增加)`}/>
				<Agreement.Print.Header
					baseInfo={State.baseInfo}
					orderInfo="入驻服务协议补充协议(增加)"
				/>
				<Agreement.Print.BaseInfo baseInfo={State.baseInfo}/>
				<Agreement.Print.Station
					orderTime={false}
					stationVOs={State.stationVOs}
					baseType="增加入驻信息如下"
					baseInfo={State.baseInfo}
					baseTimeBegin={true}
				/>
				<Agreement.Print.Payment
					baseInfo={State.baseInfo}
					installmentPlans={State.installmentPlans}
					installmentPlansList={State.installmentPlansList}
				/>
				{this.renderContent()}
				<Agreement.Print.Footer/>

      </div>

		);
	}
}
