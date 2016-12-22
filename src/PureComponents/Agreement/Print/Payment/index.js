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
	Onetable = () => {

		return (
			<div className="table-one-content">
				<div className="table-list">
						<table className="one-line">
							<thead>
								<tr>
									<th>款项</th>
									<th>服务期限</th>
									<th>付款日期</th>
									<th>付款金额</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>履约保证金</td>
									<td>2015/09/10-2016/10/10</td>
									<td>2015/09/10</td>
									<td>1200</td>
								</tr>
							</tbody>
							
						</table>
				</div>
			</div>
		)
	}

	Twotable = () => {
		return (
			<div className="table-two-list">
					<div className="two-line">
						<div className="table-td-content clear">
								<div className="table-left" style={{marginRight:14}}>
									<div className="th clear">
										<div>款项</div>
										<div>服务期限</div>
										<div>付款日期</div>
										<div>付款金额</div>
									</div>
									<div className="left-td">
										<div className="td clear">
											<div>履约保证金</div>
											<div>2015/09/10-2016/10/10</div>
											<div>2015/09/10</div>
											<div>1200</div>
										</div>
									</div>
								</div>
								<div className="table-right">
									<div  className="th clear">
										<div>款项</div>
										<div>服务期限</div>
										<div>付款日期</div>
										<div>付款金额</div>
									</div>
									<div className="right-td">
										<div className="td clear">
											<div>履约保证金</div>
											<div>2015/09/10-2016/10/10</div>
											<div>2015/09/10</div>
											<div>1200</div>
										</div>
									</div>
								</div>
						</div>
					</div>
			</div>


		)
	}
	render() {

		return (

			<div className="ui-payment">
				<div className="payment-title clear">
					<div className="payment-info">付款信息</div>
					<div className="method clear">
						<div className="method-list">
							<span className="checked"></span>
							<span>月度</span>
						</div>
						<div className="method-list">
							<span className="discheck"></span>
							<span>季度</span>
						</div>
						<div className="method-list">
							<span className="discheck"></span>
							<span>半年度</span>
						</div>
						<div className="method-list">
							<span className="discheck"></span>
							<span>年度</span>
						</div>
					</div>
					<div className="pay-method clear">
						<div className="method-list">
							<span className="discheck"></span>
							<span>转账</span>
						</div>
						<div className="method-list">
							<span className="discheck"></span>
							<span>其他－支付宝</span>
						</div>
					</div>
				</div>
				<div className="payment-content">
					<div className="table-content">
						{this.Onetable()}
					</div>
					<div className="reminder">
						注：每期服务期到期之日前15日支付下期服务费
					</div>
				</div>	
			</div>
		);
	}

}