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

	render() {

		return (

			<div className="print-section">
			<Agreement.Print.Header Baseinfo={State.Baseinfo} orderInfo="入驻服务协议"/>
			<Agreement.Print.BaseInfo Baseinfo={State.Baseinfo}/>
			<Agreement.Print.Station/>
			<Agreement.Print.Payment/>
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