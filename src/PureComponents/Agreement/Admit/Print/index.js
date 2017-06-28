import React, {
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	Title,
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
		}, 1000)
	}

	render() {

		return (

			<div className="print-section no-print-section">
				<Title value={`${State.baseInfo.leaseName}-入驻服务意向书`}/>
				<Print.Header
					  baseInfo={State.baseInfo}
						orderInfo="入驻服务意向书"
				/>
				<Print.BaseInfo baseInfo={State.baseInfo} />

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
