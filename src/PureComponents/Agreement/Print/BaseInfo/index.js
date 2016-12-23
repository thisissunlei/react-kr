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
 	}

 	static propTypes = {
 		Baseinfo: React.PropTypes.object,
 	}
 	constructor(props, context) {
 		super(props, context);

 	}


 	render() {
 		let {
 			Baseinfo
 		} = this.props;
 		return (

 			<div className="ui-print-baseinfo">
				<div className="baseinfo">基础信息</div>
				<div className="baseinfo-content">
					<div className="infolist">
						<div>服务提供方（甲方）：{Baseinfo.lessorName}</div>
						<div>地址：{Baseinfo.lessorAddress}</div>
						<div>联系人：{Baseinfo.lessorContact}</div>
						<div>联系电话：{Baseinfo.lessorContacttel}</div>
					</div>
					<div className="infolist">
						<div>服务接收方（乙方）：{Baseinfo.leaseName}</div>
						<div>地址：{Baseinfo.lesseAddress}</div>
						<div>联系人：{Baseinfo.leaseContact}</div>
						<div>联系电话：{Baseinfo.leaseContacttel}</div>
					</div>
				</div>
			</div>
 		);
 	}

 }