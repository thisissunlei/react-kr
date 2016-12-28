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

 export default class Baseinfo extends Component {
 	static defaultProps = {
 		baseInfo: {},
 	}

 	static propTypes = {
 		baseInfo: React.PropTypes.object,
 	}
 	constructor(props, context) {
 		super(props, context);

 	}


 	render() {
 		let {
 			baseInfo
 		} = this.props;
 		return (

 			<div className="ui-print-baseinfo">
				<div className="baseinfo">基础信息</div>
				<div className="baseinfo-content">
					<div className="infolist">
						<div>服务提供方（甲方）：{baseInfo.lessorName}</div>
						<div>地址：{baseInfo.lessorAddress}</div>
						<div>联系人：{baseInfo.lessorContact}</div>
						<div>联系电话：{baseInfo.lessorContacttel}</div>
					</div>
					<div className="infolist">
						<div>服务接收方（乙方）：{baseInfo.leaseName}</div>
						<div>地址：{baseInfo.leaseAddress}</div>
						<div>联系人：{baseInfo.leaseContact}</div>
						<div>联系电话：{baseInfo.leaseContacttel}</div>
					</div>
				</div>
			</div>
 		);
 	}

 }
