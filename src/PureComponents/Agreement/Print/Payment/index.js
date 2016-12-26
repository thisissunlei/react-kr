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
	getLocalTime = (time) => {
		return new Date(parseInt(time)).toLocaleString().substr(0, 10);
	}


	Onetable = (installmentPlans) => {

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
							{
								installmentPlans.map((item,index)=>{
									return(
										<tr key={index}>
											<td>{item.installmentName}</td>
											<td>{item.leaseDate}</td>
											<td>{this.getLocalTime(item.installmentReminddate)}</td>
											<td>{item.installmentAmount}</td>
										</tr>
										)
								}) 
							}
								
							</tbody>
							
						</table>
				</div>
			</div>
		)
	}

	Twotable = (installmentPlans) => {
		var plansOne, plansTwo;
		if (installmentPlans.length > 15) {
			plansOne = installmentPlans.slice(0, 15);
			plansTwo = installmentPlans.slice(15, installmentPlans.length);
		}
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
										{plansOne.map((item,index)=>{
											return(
												<div className="td clear" key={index}>
													<div>{item.installmentName}</div>
													<div>{item.leaseDate}</div>
													<div>{this.getLocalTime(item.installmentReminddate)}</div>
													<div>{item.installmentAmount}</div>
												</div>
											)
										})}
										
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
										{plansTwo.map((item,index)=>{
											return(
												<div className="td clear" key={index}>
													<div>{item.installmentName}</div>
													<div>{item.leaseDate}</div>
													<div>{this.getLocalTime(item.installmentReminddate)}</div>
													<div>{item.installmentAmount}</div>
												</div>
											)
										})}
									</div>
								</div>
						</div>
					</div>
			</div>


		)
	}
	render() {
		let {
			installmentPlans,
			Baseinfo
		} = this.props;
		let {
			payType,
			payModelList,
			payTypeList,
			payModel
		} = this.props.Baseinfo;
		var len = installmentPlans.length;
		return (

			<div className="ui-payment">
				<div className="payment-title clear">
					<div className="payment-info">付款信息</div>
					<div className="method clear">
						{
							payTypeList && payTypeList.map((item,index)=>{
								return(
									<div className="method-list" key={index}>
										<span className={payType==item.id?"checked":"discheck"}></span>
										<span>{item.dicName}</span>
									</div>
								)
							})
						}
					</div>
					<div className="pay-method clear">
						{
							payModelList && payModelList.map((item,index)=>{
								return(
									<div className="method-list" key={index}>
										<span className={payModel==item.id?"checked":"discheck"}></span>
										<span>{item.dicName}</span>
									</div>
								)
							})
						}
						
					</div>
				</div>
				<div className="payment-content">
					<div className="table-content">
						{installmentPlans && installmentPlans.length > 15 ? this.Twotable(installmentPlans):this.Onetable(installmentPlans)}
					</div>
					<div className="reminders">
						注：每期服务期到期之日前15日支付下期服务费
					</div>
				</div>	
			</div>
		);
	}

}