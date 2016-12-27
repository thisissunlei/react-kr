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


			<Agreement.Print.Header data={State.data} orderInfo="入驻服务意向书"/>
			<Agreement.Print.BaseInfo Baseinfo={State.Baseinfo}/>

			<Agreement.Print.Station orderTime={true} stationVOs={State.stationVOs} Baseinfo={State.Baseinfo}/>
			<div className="station-after">
				乙方应于_____年___月___日前与甲方签署《入驻服务协议》，该定金可直接冲抵履约保证金或首期服务费
			</div>
			<Agreement.Print.Intention stationVOs={State.stationVOs} Baseinfo={State.Baseinfo}/>

			<Agreement.Print.Footer/>

      		</div>

		);
	}
}
