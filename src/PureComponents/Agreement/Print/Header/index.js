import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';

import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
} from 'kr-ui';
import './index.less';
import QRCode from 'react-qr-code';


export default class Header extends Component {
	static defaultProps = {
		baseInfo: {},
		orderInfo: ''
	}

	static propTypes = {
		baseInfo: React.PropTypes.object,
		orderInfo: React.PropTypes.string,
	}
	constructor(props, context) {
		super(props, context);

	}


	render() {
		let {
			orderInfo,
			baseInfo
		} = this.props;
		let qRCode = baseInfo.qRCode || "key"
		return (

			<div className="ui-print-header">
				<div className="logo-info">
					<div className="print-logo"></div>
					<div  className="print-code print-code-list">合同编号：{baseInfo.contractNO}</div>
					<div  className="print-code">
						<span style={{marginRight:38}}>{baseInfo.cityName}</span>
						<span>{baseInfo.communityName}</span>
					</div>
				</div>
				<div className="print-title">{orderInfo}</div>
				<div className="print-QRCode">
					<QRCode value={qRCode}  size={70}/>
				</div>
			</div>
		);
	}

}