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
 		data: []
 	}

 	static propTypes = {
 		data: React.PropTypes.array
 	}
 	constructor(props, context) {
 		super(props, context);

 	}


 	render() {

 		return (

 			<div className="ui-print-baseinfo">
				<div className="baseinfo">基础信息</div>
				<div className="baseinfo-content">
					<div className="infolist">
						<div>服务提供方（甲方）：氪空间（北京）信息技术有限公司</div>
						<div>地址：北京中关村创业大街2号楼3层</div>
						<div>联系人：胡涛</div>
						<div>联系电话：18310933000</div>
					</div>
					<div className="infolist">
						<div>服务提供方（甲方）：氪空间（北京）信息技术有限公司</div>
						<div>地址：北京中关村创业大街2号楼3层</div>
						<div>联系人：胡涛</div>
						<div>联系电话：18310933000</div>
					</div>
				</div>
			</div>
 		);
 	}

 }