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
			orderInfo
		} = this.props;
		return (

			<div className="ui-print-header">
				<div className="logo-info">
					<div className="print-logo"></div>
					<div  className="print-code">合同编号：2017001010</div>
					<div  className="print-code">
						<span style={{marginRight:38}}>北京</span>
						<span>创业大街社区</span>
					</div>
				</div>
				<div className="print-title">{orderInfo}</div>
				<div className="print-QRCode">
					
				</div>	
			</div>
		);
	}

}