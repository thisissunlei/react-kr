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
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	SplitLine,
	DotTitle,
	KrField,
	LabelText,
	PaperBack,
	KrDate,
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
export default class JoinPrint extends Component {
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

	render() {

		return (

			<div className="print-section no-print-section" >
			<Agreement.Print.Header baseInfo={State.Baseinfo} orderInfo="入驻服务协议补充协议(延续)"/>
			<Agreement.Print.BaseInfo baseInfo={State.Baseinfo}/>

			<Agreement.Print.Station orderTime={false} stationVOs={State.stationVOs} baseInfo={State.Baseinfo} baseTimeBegin={true} baseType="延续入驻信息如下"/>
			<Agreement.Print.Payment baseInfo={State.Baseinfo} installmentPlans={State.installmentPlans} installmentPlansList={State.installmentPlansList}/>
			<div className="print-text">
				<span>双方其他约定内容：</span>
				<span className="border-b one-text"></span>
				<span className="border-b two-text"></span>
			</div>
			<Agreement.Print.Footer/>

      		</div>

		);
	}
}
