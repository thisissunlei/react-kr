
import React from 'react';
import {

	// Title,
	// Section,
	
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import $ from 'jquery';

import State from './State';
import {
	observer
} from 'mobx-react';
@observer

export default class PaymentRemindTable extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			tebleWidth: 0 ,
			tableHeight: 0
			
		}
	}

	componentWillMount(){

		this.setState({
			tebleWidth: $(window).width()-260,
			tableHeight: $(window).height()-60
		})
		// State.getList();
	}

	componentDidMount(){
		State.items =[
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                }
				                ],leaseBegindate:"测试内容hqy1",leaseEnddate:"测试内容0z0d",payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:"开始日期",installmentEnddate:"结束日期",installmentName:"款项",invoice:false,realBack:54160,remindDate:"催款日期"
					                }
				                ],leaseBegindate:"测试内容hqy1",leaseEnddate:"测试内容0z0d",payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"客户名称测试"
				        }
			        ]

	}

	renderItems=()=>{
		
		let _this =this;
		let Items = State.items.map(function(item,index){
			console.log("item",item);
			return (<div className="table-item" key={index}>
						<div className="customer-name">
							{item.customerName}
						</div>
						<div className="contract-list-box">
							{
								item.contractList.map((item,index)=>{
									return (
										<div key={index} className="contract-detail-box">
											<div className="contract-list">
												<div className="contract-code">{item.contractCode}</div>
												<div className="contract-detail">{item.stationNum}</div>
												<div className="contract-detail">{item.leaseBegindate}</div>
												<div className="contract-detail">{item.leaseEnddate}</div>
												<div className="contract-detail">{item.payCycle}</div>
											</div>
											<div className="remind-detail-box">
												{
													item.installmentList.map((item,index)=>{
														
														return(
															<div key={index} className="remind-detial">
																<div>{item.remindDate}</div>
																<div>{item.installmentName}</div>
																<div>{item.installmentBegindate}</div>
																<div>{item.installmentEnddate}</div>
																<div>{item.installmentAmount}</div>
																<div>{item.realBack}</div>
																<div>{item.balance}</div>
																<div>{!item.invoice?<span>未开发票</span>:null}</div>
																<div>{!item.invoice?<span style={{color:"#319eff",cursor:"pointer"}}>开票</span>:null}</div>
															</div>
														)
													})	
												}
											</div>
										</div>
										

									)
								}) 
							}
						</div>
					</div>)
		})
		return Items;
	}
	

	
	render() {
		let {tebleWidth,tableHeight}= this.state;
		return (
			    <div className="table-index" style={{paddingBottom:20,width:"100%",}}>
			    	<div  style={{width:tebleWidth,height:tableHeight,border:"solid 1px #eee",overflow:"scroll"}} className="table-box">
			    		<div className="table-header">
			    			<div className="table-header-item">客户名称</div>
			    			<div className="table-header-item">合同编号</div>
			    			<div className="table-header-item">工位数量</div>
			    			<div className="table-header-item">起租日期</div>
			    			<div className="table-header-item">到期日期</div>
			    			<div className="table-header-item">付款周期</div>
			    			<div className="table-header-item">催款日期</div>
			    			<div className="table-header-item">款项</div>
			    			<div className="table-header-item">开始日期</div>
			    			<div className="table-header-item">结束日期</div>
			    			<div className="table-header-item">应缴款项</div>
			    			<div className="table-header-item">金额</div>
			    			<div className="table-header-item">差额</div>
			    			<div className="table-header-item">发票</div>
			    			<div className="table-header-item">操作</div>
			    		</div>
			    		<div className="table-items">
			    			<div className="table-item-box">
			    				
		    					{
		    						this.renderItems()
		    					}
			    				
			    			</div>
			    		</div>
			    	</div>
			    	<div className="export">导出</div>
				</div>
		);

	}

}

