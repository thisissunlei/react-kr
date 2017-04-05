import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Http} from "kr/Utils";
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

} from 'kr-ui';
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
	//全部标为已读
	allReadClick = () =>{
		let {renovateRedDrop} = this.props;
		let _this = this;
		Http.request('messageAllReade',{msgType:"ARREARS_ALERT"}).then(function(response) {
			_this.renovateList();
			_this.tabNum();
			renovateRedDrop();

		}).catch(function(err) {

		});
	}
	//起始日期
	onStartChange = (value) =>{
		const {NotifyModel} = this.props;

		const {urgeMoney} = NotifyModel;
		const {searchParams} = urgeMoney;
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
				urgeMoney.setSearchParams({
					page: 1,
					pageSize: 15,
					endTime:newEndDate === searchParams.endTime ? end : newEndDate,
					startTime:newStartDate === searchParams.startTime ? start : newStartDate,
					communityId : searchParams.communityId || "",
				});
	    }
	}
	//结束日期
	onEndChange = (value) =>{
		const {NotifyModel} = this.props;

		const {urgeMoney} = NotifyModel;
		const {searchParams} = urgeMoney;
		let {newStartDate,newEndDate}=this.state;
    let start=newStartDate;
    let end=value || newEndDate;
    this.setState({
    		newStartDate : start,
    		newEndDate : end
    	});
	    if( !!start && !!end && start > end){

	      Message.error('开始时间不能大于结束时间');
	      return ;
	    }else{
				urgeMoney.setSearchParams({
					page: 1,
					pageSize: 15,
					endTime:newEndDate === searchParams.endTime ? end : newEndDate,
					startTime:newStartDate === searchParams.startTime ? start : newStartDate,
					communityId : searchParams.communityId || "",
				});
	    }
	}
	//选择社区
	communityChange = (value) =>{
		const {NotifyModel} = this.props;

		const {urgeMoney} = NotifyModel;
		const {searchParams} = urgeMoney;
		let data = !value ? {} : value;
		if(!data.id){
			data.id=""
		}

		urgeMoney.setSearchParams({
			page: 1,
			pageSize: 15,
			endTime:searchParams.endTime ||'',
			startTime:searchParams.startTime || '',
			communityId:data.id,
		});
	}
	//信息被点击
	columnClick = (value) => {
		if(value.msgStatu == "READ"){
			return;
		}
		let {renovateRedDrop} = this.props;
		let _this=this;
		Http.request("setInfoReaded", {
				id: value.msgInfoId
		}).then(function(response) {
			_this.renovateList();
			renovateRedDrop();
			_this.tabNum();

		}).catch(function(err) {
				console.log(err);
		});
	}

	//刷新列表
	renovateList = () =>{
		const {NotifyModel} = this.props;

		const {urgeMoney} = NotifyModel;
		const {searchParams} = urgeMoney;
		let _this = this;

		urgeMoney.setSearchParams({
			page: _this.state.newPage ,
			pageSize: 15,
			endTime:searchParams.endTime || "",
			startTime:searchParams.startTime || "",
			communityId:searchParams.communityId,
		});
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
	agreementClick = (data) =>{

		const {agreementClick} = this.props;
		agreementClick && agreementClick(data);
	}
	render(){
		let _this = this;
		const {NotifyModel} = this.props;

		const {urgeMoney} = NotifyModel;
		let detailDemo = [
					  {id:260,customerId:273,orderId:166,type:"11"},
					  {id:260,customerId:273,orderId:166,type:"22"},
					  {id:260,customerId:273,orderId:166,type:"33"}
					 ]

		return (
			<div className="appointment-visit" style = {{paddingBottom:48}}>
					<SearchForm
						communityChange = {this.communityChange}
						onStartChange = {this.onStartChange}
						onEndChange = {this.onEndChange}
					/>
					<div className="all-read" onClick={this.allReadClick}>全部标为已读</div>
					<Table  style={{marginTop:10}}
						ajax={true}
						onProcessData={
							(state)=>{
								return state;
							}
						}
						displayCheckbox={false}
						ajaxParams={urgeMoney.searchParams}
						ajaxFieldListName="items"
						onLoaded = {this.showPage}
						ajaxUrlName='getAlertList'
					>
						<TableBody style={{background:"#fff",border:"0px"}}>

							<TableRow style={{background:"#fff",border:"0px"}}>

								<TableRowColumn
									style={{overflow:"visible",textAlign: "center",width:462,lineHeight:"42px"}}
									name="msgContent"
									component={
										(value,oldValue,itemData) => {
											value = value.split("#");

											let detail = value[1];
											let color="#999999";
											let costomerColor="#20568C";
                      let agreementType = {INTENTION:"承租意向书",ENTER:"入驻协议书",ADDRENT:"增租协议书",LESSRENT:"减租协议书",QUITRENT:"退租协议书",RENEW:"续租协议书"}
                      let comtent = value[2].split("(")[0];
                      let time = value[2].split("(")[1];
											if(itemData.msgStatu == "UNREAD"){
												color="#333333";
												costomerColor="#499DF1";
											}
											console.log(detail,"gggggggg")
											detail = eval(detail);
											let htmlAgreement = detail.map(function(item,index){

												return (<span key = {index} className="customer" onClick = {_this.agreementClick.bind(this,item)} style={{color:costomerColor}}>{agreementType[item.contractType]+","}</span>)
											})
											return (
														<div className='appointment-visit-content' style={{color:color}} onClick={this.columnClick.bind(this,itemData)}>
															{itemData.msgStatu == "UNREAD" && <span className="appointment-visit-spot"></span>}
															{value[0]}
															{htmlAgreement}
															{comtent}
															<div>{"("+time}</div>
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
												<div className="appointment-visit-time-urge" style={{color:color}} onClick={this.columnClick.bind(this,itemData)}> <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
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
												<div className="appointment-visit-read-urge" style={{color:color}} onClick={this.columnClick.bind(this,itemData)}>{condition}</div>
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
