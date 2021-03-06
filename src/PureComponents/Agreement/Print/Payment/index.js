import React, {
	Component
} from 'react';

import './index.less';

export default class Payment extends Component {

	constructor(props, context) {
		super(props, context);
		this.init = false;

	}
	getLocalTime = (time) => {
		var now = new Date(time);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "/" + mm + "/" + dd )
	}
	componentWillReceiveProps(nextProp){
	}
	componentDidMount(){

	}
	checkPosition=()=>{
 		let {installmentPlans} = this.props;
 		let pageItem =null;
 		let {baseInfo} = this.props;

		let tableTop = document.getElementsByClassName('ui-print-payment')[0];
		let tableBottom = document.getElementsByClassName('reminders')[0];
		this.init = false;
		if(!tableTop){
			return;
		}
		let youhui = 0;
		let top = baseInfo.hasTactics?tableTop.offsetTop+172:tableTop.offsetTop;
		let height = top+tableTop.clientHeight +45;
		let tableBottomHeight = top+tableTop.clientHeight - 35;
		//分期下面内容换页
		if(height>1105 && height<1160){
			console.log('分期下面内容换页=====>',height,1160-height)
			tableTop.style.marginBottom = (1160-height)+'px';
			this.init = true;
		}
		//分期内容换页
		// if(top<1060 && top>720){
		if(top<1040 && top>720){
			console.log('top',top)
			let domHeight = 1120-top-28-27;
			let num = parseInt(domHeight/22.5);
			if(domHeight%22.5>14){
				pageItem = num -1;
			}else{
				pageItem = (num-2>0)?num-2:0;
			}
			console.log('---->',pageItem)
			
		}else if(top<1140 && top>1040){
			let marginTop = 1180-top;
			tableTop.style.marginTop = marginTop+'px';
		}
		if(tableBottomHeight>1050 && tableBottomHeight<1148 && !this.init){
			tableBottom.style.marginTop = (1150-tableBottomHeight)+'px';
			this.init = true
		}
		return pageItem;
		
	}

	Onetable = (installmentPlans) => {
		let num = this.checkPosition();
		let obj = {
			installmentName:'',
			leaseDate:'',
			installmentReminddate:'',
			installmentAmount:''
		}
		if(installmentPlans.length && !!num){
			
			installmentPlans.splice(num,0,obj);
			installmentPlans.splice(num,0,obj);
			this.inits = true;
			
		}
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
											<td>{item.installmentReminddate?this.getLocalTime(item.installmentReminddate):''}</td>
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
		let num = this.checkPosition();
		var plansOne, plansTwo;
		if (installmentPlans.length > 15 ) {
			plansOne = installmentPlans.slice(0, installmentPlans.length/2);
			plansTwo = installmentPlans.slice(installmentPlans.length/2 +1, installmentPlans.length);
		}
		let pageSize = Math.ceil((plansOne.length-num)/48);
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
											let style={};
											if(!!pageSize){
												for(let i = 0;i<pageSize;i++){
													if(i*48+num == index+1){
														style={
															marginBottom:50
														}
													}
												}
											}
											if(num == 0 && index == num ){
												style={
															marginTop:50
														}
											}
											return(
												<div className="td clear" key={index} style={style}>
													<div>{item.installmentName}</div>
													<div>{item.leaseDate}</div>
													<div>{item.installmentReminddate?this.getLocalTime(item.installmentReminddate):''}</div>
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
											let style={};
											if(!!pageSize){
												for(let i = 0;i<pageSize;i++){
													if(i*48+num == index+1){
														style={
															marginBottom:50
														}
													}
												}
											}
											if(num == 0 && index == num ){
												style={
															marginTop:50
														}
											}
											return(
												<div className="td clear" key={index} style={style}>
													<div>{item.installmentName}</div>
													<div>{item.leaseDate}</div>
													<div>{item.installmentReminddate?this.getLocalTime(item.installmentReminddate):''}</div>
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
						{/*installmentPlans && installmentPlans.length > 15 ? this.Twotable(installmentPlans):this.Onetable(installmentPlans)*/}
					</div>
					<div className="reminders">
						注：每期服务期到期之日前15日支付下期服务费
					</div>
				</div>
			</div>
		);
	}

}
