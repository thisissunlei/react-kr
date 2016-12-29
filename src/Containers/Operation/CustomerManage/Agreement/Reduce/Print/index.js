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
	getLocalTime = (beginDate) => {
		var now = new Date(beginDate);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "年" + mm + "月" + dd + "日")


	}
	render() {

		return (
			<div className="g-exit-print">
				<div className="print-section no-print-section" >
				<Agreement.Print.Header
					baseInfo={State.baseInfo}
					orderInfo="入驻服务协议"
				/>
				<Agreement.Print.BaseInfo baseInfo={State.baseInfo}/>

				<Agreement.Print.Station
					orderTime={false}
					stationVOs={State.stationVOs} baseType={`双方一致同意，自 ${this.getLocalTime(State.baseInfo.leaseBegindate)}起减少`}
					baseInfo={State.baseInfo}
					reduceTh="减租期限"
					info="减少费用总计"
				/>

				<div className="print-text">
					<span>双方其他约定内容：</span>
					<span className="border-b one-text"></span>
					<span className="border-b two-text"></span>
					<span className="border-b three-text"></span>
					<span className="border-b four-text"></span>
				</div>
				<Agreement.Print.Footer/>

	      		</div>
	      	</div>

		);
	}
}