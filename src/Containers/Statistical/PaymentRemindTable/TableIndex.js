
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
import {DateFormat } from 'kr/Utils';
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
		// State.getList();
		State.items =[
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                },
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
				        {
				            contractList:[
				            {
				                contractCode:"合同编号","installmentList":[
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                },
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:false,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            },{
				                contractCode:"合同编号","installmentList":[
					                
					                {
					                    balance:16138,installmentAmount:1,installmentBegindate:1496740685097,installmentEnddate:1496740685097,installmentName:"款项",invoice:true,realBack:54160,remindDate:1496740685097
					                }
				                ],leaseBegindate:1496740685097,leaseEnddate:1496740685097,payCycle:"测试内容0dmc",stationNum:86558
				            }
				            ],"customerName":"氪空间（北京）信息技术有限公司"
				        },
			        ]
		this.setState({
			tebleWidth: $(window).width()-260,
			tableHeight: $(window).height()-215
		})
		
	}

	componentWillReceiveProps(nextProps){
		
		if(!nextProps.sidebarShow){
			this.setState({
				tebleWidth : $(window).width()-80
			})
		}else{
			this.setState({
				tebleWidth: $(window).width()-260
			})
		}
	}

	componentDidMount(){
		
		this.refs.tableLeftTitle.style.height = ($(window).height()-215) +"px";
		// scroll Table表格滚动
		let _this = this;
		$(".table-box").eq(0).scroll(function(){
			
			_this.refs.tableHeader.style.left = -$(this).scrollLeft()+1+"px";
			_this.refs.leftTitleItems.style.marginTop = 41-$(this).scrollTop()+"px";
			
			// 下拉加载更多……
			var scrollTopParams = $(this).scrollTop();
			_this.dropMore(scrollTopParams);
			

		})

	}

	dropMore=(scrollTopParams)=>{
		
		var documentH = $(".table-items").eq(0).height();
		var scrollTop = scrollTopParams;
		var windowH = $(".table-box").eq(0).height()-10;
	
		if(windowH + scrollTop + 20 >= documentH ){

			if(!State.loading && State.searchParams.page < State.totalPages){
				State.searchParams.page++;
				State.getList();
			}
		}
	}

	renderItems=()=>{
		
		let _this =this;
		let Items = State.items.map(function(item,index){

			return (<div className="table-item" key={index}>
						<div className="customer-name">
							<div style={{flex:1,width:250}}>{item.customerName}</div>
						</div>
						<div className="contract-list-box">
							{
								item.contractList.map((item,index)=>{
									return (
										<div key={index} className="contract-detail-box">
											<div className="contract-list">
												<div className="contract-code">{item.contractCode}</div>
												<div className="contract-detail">{item.stationNum}</div>
												<div className="contract-detail">{DateFormat(item.leaseBegindate,"yyyy-mm-dd")}</div>
												<div className="contract-detail">{DateFormat(item.leaseEnddate,"yyyy-mm-dd")}</div>
												<div className="contract-detail">{item.payCycle}</div>
											</div>
											<div className="remind-detail-box">
												{
													item.installmentList.map((item,index)=>{
														
														return(
															<div key={index} className="remind-detial">
																<div>{DateFormat(item.remindDate,"yyyy-mm-dd")}</div>
																<div>{item.installmentName}</div>
																<div>{DateFormat(item.installmentBegindate,"yyyy-mm-dd")}</div>
																<div>{DateFormat(item.installmentEnddate,"yyyy-mm-dd")}</div>
																<div>{item.installmentAmount}</div>
																<div>{item.realBack}</div>
																<div style={{color:"#ff0000"}}>{item.balance}</div>
																
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

	renderLeftTitle=()=>{
		
		let leftTitle = State.items.map((item,index)=>{
			var lengthNum = 0
			for(var i=0;i<item.contractList.length;i++){
				lengthNum = lengthNum+item.contractList[i].installmentList.length
			}
			return(
				<div key={index} style={{height:lengthNum*30,lineHeight:lengthNum*30+"px",borderBottom:"solid 1px #eee",width:"100%",textAlign:"center",background:"#fff",fontSize:14,boxSizing: "border-box"}}>
					{item.customerName}
				</div>
			)
		});
		return leftTitle;
	}



	export=()=>{

		var url = `/api/krspace-finance-web/member/member-list-excel?communityId=${State.searchParams.communityId}&beginDate=${State.searchParams.beginDate}&endDate=${State.searchParams.endDate}&customerName=${State.searchParams.customerName}`
		console.log("url",url);
		// window.location.href = url;
	}
	


	
	render() {
		let {tebleWidth,tableHeight}= this.state;
		return (
			    <div className="table-index" style={{paddingBottom:20,width:"100%",}}>
				    <div className="table-index-box">

				    	<div  className="table-box" style={{width:tebleWidth,height:tableHeight,border:"solid 1px #eee",overflow:"scroll",boxSizing: "border-box"}} >
				    		<div className="table-left-title"  ref="tableLeftTitle">
				    			<div className="table-left-title-header">客户名称</div>
				    			<div className="left-title-items" ref="leftTitleItems" style={{borderRight:"solid 1px #eee",marginTop:41}}>
				    				{
				    					this.renderLeftTitle()
				    				}
				    			</div>
				    		</div>
				    		<div className="table-header" ref="tableHeader">
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
				    			{/*<div className="table-header-item">发票</div>
				    			<div className="table-header-item">操作</div>*/}
				    		</div>
				    		<div className="table-items">
				    			<div className="table-item-box">
				    				
			    					{
			    						this.renderItems()
			    					}
				    				
				    			</div>
				    		</div>
				    	</div>
				    	<div className="export" onClick={this.export}>导出</div>
					</div>

			    </div>
		);

	}

}

