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


export default class Initialize extends Component {
	static defaultProps = {
		Baseinfo: {},
		orderInfo: ''
	}

	static propTypes = {
		Baseinfo: React.PropTypes.object,
		orderInfo: React.PropTypes.string,
	}
	constructor(props, context) {
		super(props, context);

	}


	render() {
		let {
			orderInfo,
			Baseinfo
		} = this.props;
		let qRCode = Baseinfo.qRCode || "key"
		return (

			<div className="ui-print-header">
				<div className="logo-info">
					<div className="print-logo"></div>
					<div  className="print-code">合同编号：{Baseinfo.contractNO}</div>
					<div  className="print-code">
						<span style={{marginRight:38}}>{Baseinfo.cityName}</span>
						<span>{Baseinfo.communityName}</span>
					</div>
				</div>
				<div className="print-title">{orderInfo}</div>
				<div className="print-QRCode">
					<QRCode value={qRCode}  size={109}/>
				</div>	
			</div>
		);
	}

}