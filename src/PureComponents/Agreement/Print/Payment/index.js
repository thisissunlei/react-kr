import React, {
	Component
} from 'react';

import './index.less';

export default class Payment extends Component {

	constructor(props, context) {
		super(props, context);

	}
	getLocalTime = (time) => {
		var now = new Date(time);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "/" + mm + "/" + dd )
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
								<div className="table-left" style={{marginRight:8}}>
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
	method = () => {
		let {
			payModelList,
			payModel
		} = this.props.baseInfo;
		var reg = /转账/g,
			methodObj;
		payModelList && payModelList.map((item, index) => {
			if (payModel == item.id) {
				if (!reg.test(item.dicName)) {
					payModelList.id = item.id;
					payModelList.dicName = item.dicName;
					payModelList.flag = true;
				} else {
					payModelList.flag = false;
					payModelList.id = item.id;
				}
			}
			return payModelList;

		})
	}
	render() {
		let {
			baseInfo,
			installmentPlans
		} = this.props;

		let {
			payType,
			payTypeList,
			payModel,
			payModelList
		} = this.props.baseInfo;


		this.method();


		return (

			<div className="ui-print-payment">
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
						<div className="method-list">
							<span className={payModelList && payModelList.flag && payModel==payModelList.id?"checked":"discheck"}></span>
							<span>其他{payModelList && payModelList.flag && payModel==payModelList.id?`-${payModelList.dicName}`:" "}</span>
						</div>
						<div className="method-list">
							<span className={payModelList && !payModelList.flag && payModel==payModelList.id?"checked":"discheck"}></span>
							<span>转账</span>
						</div>


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
