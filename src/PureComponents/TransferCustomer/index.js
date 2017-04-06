import React, {Component,PropTypes} from "react";
import {Actions,Store} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle,
	Tooltip,
	Message
} from "kr-ui";
import { Http} from "kr/Utils";
import SearchForm from "./SearchForm";
import {
	observer,
	inject
} from 'mobx-react';

@inject("NotifyModel")
@observer

export default class AppointmentVisit extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={

			newStartDate:'',
			newEndDate:'',
			newPage :1,
		}





	}

	//全部标为以读点击事件
	allReadClick = () => {
		let {renovateRedDrop} = this.props;
		let _this = this;
		Http.request('messageAllReade',{msgType:"CUSTOMER_TRANSFER"}).then(function(response) {
			_this.renovateList();
			_this.tabNum();
			renovateRedDrop();
		}).catch(function(err) {

		});
	}

	//起始日期
	onStartChange = (value) =>{


			const {NotifyModel} = this.props;

			const {customerTransform} = NotifyModel;
			const {searchParams} = customerTransform;
		let {newStartDate,newEndDate}=this.state;
        let start=value ||newStartDate;
        let end=newEndDate;
        this.setState({
        		newStartDate : start,
        		newEndDate : end
        	});
        if(!!start && !!end && start>end){
	        Message.error('开始时间不能大于结束时间');
	        return ;
	    }else{

				customerTransform.setSearchParams({
					page: 1,
					pageSize: 15,
					createDateEnd:newEndDate === searchParams.createDateEnd ? end : newEndDate,
					createDateStart:newStartDate === searchParams.createDateStart ? start : newStartDate,
					other:!other,
				});
	    }

	}

	//结束日期
	onEndChange = (value) =>{
		const {NotifyModel} = this.props;

		const {customerTransform} = NotifyModel;
		const {searchParams} = customerTransform;

		let {newStartDate,newEndDate} = this.state;
        let start = newStartDate;
        let end = value || newEndDate;
        this.setState({
        		newStartDate : start,
        		newEndDate : end
        	});
        if( !!start && !!end && start > end){

	        Message.error('开始时间不能大于结束时间');
	        return ;
	    }else{

				customerTransform.setSearchParams({
					page: 1,
					pageSize: 15,
					createDateEnd:newEndDate === searchParams.createDateEnd ? end : newEndDate,
					createDateStart:newStartDate === searchParams.createDateStart ? start : newStartDate,
					other:!searchParams.other,
				});
	    }

	}
	//信息被点击
	columnClick = (value) => {
		if(value.msgStatu == "READ"){
			return;
		}
		let {renovateRedDrop} = this.props;
		let _this=this;
		Http.request("setInfoReaded", {
				id: value.id
		}).then(function(response) {
			console.log(response.page)
			_this.renovateList();
			renovateRedDrop();
			_this.tabNum();
		}).catch(function(err) {
				console.log(err);
		});
	}

	//刷新列表
	renovateList = () =>{
		let _this=this;
		const {NotifyModel} = this.props;

		const {customerTransform} = NotifyModel;
		const {searchParams} = customerTransform;

		customerTransform.setSearchParams({
			page: _this.state.newPage ,
			pageSize: 15,
			createDateEnd:searchParams.createDateEnd || "",
			createDateStart:searchParams.createDateStart || "",
			other:!searchParams.other,
		});


	}


	//客户名称被点击
	customerClick = (data) => {
		let msgExtra = JSON.parse(data.msgExtra)
		let customerName = data.msgContent.split("#")[1]
		data.customerName = customerName;
		const {customerClick} = this.props;
		customerClick && customerClick(data);


	}
	showPage = (data) => {
		this.setState({
			newPage:data.page
		})
	}

	//刷新tab信息条数数据
	tabNum = ()=>{
		let {tabNum} = this.props;
		tabNum && tabNum();
	}
	render(){

		const {NotifyModel} = this.props;

		const {customerTransform} = NotifyModel;


		let _this=this;

		return (
				<div className="transfer-customer" style = {{paddingBottom:48}}>
					<SearchForm
						onStartChange = {this.onStartChange}
						onEndChange = {this.onEndChange}
					/>
					<div className="all-read" ><span onClick={this.allReadClick} style = {{fontSize:14}}>全部标为已读</span></div>
					<Table  style={{marginTop:10}}
						ajax={true}

						onProcessData={
							(state)=>{
								return state;
							}
						}
						displayCheckbox={false}
						ajaxParams={customerTransform.searchParams}
						ajaxFieldListName="items"
						ajaxUrlName='messageRemindCustomerSwitching'
						onLoaded = {this.showPage}

					>
						<TableBody style={{background:"#fff",border:"0px"}}>

							<TableRow style={{background:"#fff",border:"0px"}}>

								<TableRowColumn
									style={{overflow:"visible",textAlign: "center",width:430,lineHeight:"20px",paddingRight:5}}
									name="msgContent"
									component={
										(value,oldValue,itemData) => {
											value = value.split("#");
											let color="#999999";
											let costomerColor="#20568C";
											if(itemData.msgStatu == "UNREAD"){
												color="#333333";
												costomerColor="#499DF1";
											}
											return (
														<div className='appointment-visit-content' style={{color:color}} onClick={this.columnClick.bind(this,itemData)}>
															{itemData.msgStatu == "UNREAD" && <span className="appointment-visit-spot"></span>}
															{value[0]}
															<span className="customer" onClick={_this.customerClick.bind(this,itemData)} style={{color:costomerColor}}>{value[1]}</span>
															{value[2]}
														</div>
													);
										}
									}
								>
								</TableRowColumn>

								<TableRowColumn style={{overflow:"visible",textAlign: "center",}}
									name="createDate"
									component={
										(value,oldValue,itemData) => {
											let color="#999999";
											if(itemData.msgStatu == "UNREAD"){
												color="#333333";
											}
											return (
												<div className="appointment-visit-time-trans" style={{color:color}} onClick={this.columnClick.bind(this,itemData)}> <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
											);
										}
									}
								>
								</TableRowColumn>

								<TableRowColumn style={{overflow:"visible",textAlign: "center"}}
									name="createDate"
									component={

										(value,oldValue,itemData) => {
											let condition="已读"
											let color="#999999";
											if(itemData.msgStatu == "UNREAD"){
												condition="未读"
												color="#499DF1";
											}
											return (
												<div className="appointment-visit-read" style={{color:color,top:13}} onClick={this.columnClick.bind(this,itemData)}>{condition}</div>
											);
										}
									}
								>
								</TableRowColumn>

							 </TableRow>
						</TableBody>

							<TableFooter ></TableFooter>
					</Table>
				</div>
			);
	}


}
