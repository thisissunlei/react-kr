import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
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
import { Http } from "kr/Utils";
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
		Http.request('messageAllReade',{msgType:"ORDER_VISIT"}).then(function(response) {
			_this.renovateList();
			_this.tabNum();
			renovateRedDrop();
		}).catch(function(err) {

		});
	}
	//起始日期
	onStartChange = (value) =>{
		const {NotifyModel} = this.props;

		const {appointmentVisit} = NotifyModel;
		const{searchParams} = appointmentVisit;


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
				appointmentVisit.setSearchParams({
					page: 1,
					pageSize: 15,
					createDateEnd:newEndDate === searchParams.createDateEnd ? end : newEndDate,
					createDateStart:newStartDate === searchParams.createDateStart ? start : newStartDate,
					msgCommunity : searchParams.msgCommunity || "",
				});
	    }
	}
	//结束日期
	onEndChange = (value) =>{

		const {NotifyModel} = this.props;

		const {appointmentVisit} = NotifyModel;
		const{searchParams} = appointmentVisit;


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
				appointmentVisit.setSearchParams({
					page: 1,
					pageSize: 15,
					createDateEnd:newEndDate === searchParams.createDateEnd ? end : newEndDate,
					createDateStart:newStartDate === searchParams.createDateStart ? start : newStartDate,
					msgCommunity : searchParams.msgCommunity || "",
				});
	    }
	}
	//选择社区
	communityChange = (value) =>{
		const {NotifyModel} = this.props;

		const {appointmentVisit} = NotifyModel;
		const{searchParams} = appointmentVisit;

		let data = !value ? {} : value;
		if(!data.id){
			data.id=""
		}
		appointmentVisit.setSearchParams({
			page: 1,
			pageSize: 15,
			createDateEnd:searchParams.createDateEnd || '',
			createDateStart:searchParams.createDateStart || '',
			msgCommunity:data.id,
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
				id: value.id
		}).then(function(response) {
			_this.renovateList();
			renovateRedDrop();
			_this.tabNum();

		}).catch(function(err) {
				console.log(err);
		});
	}

	//刷新列表
	renovateList = (page) =>{
		const {NotifyModel} = this.props;

		const {appointmentVisit} = NotifyModel;
		const{searchParams} = appointmentVisit;
		let _this = this;
		appointmentVisit.setSearchParams({
			page: _this.state.newPage ,
			pageSize: 15,
			createDateEnd:searchParams.createDateEnd || "",
			createDateStart:searchParams.createDateStart || "",
			msgCommunity:searchParams.msgCommunity || "",
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

	render(){
		let {searchParams} = this.state;
		const {NotifyModel} = this.props;
		const {appointmentVisit} = NotifyModel;

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
						ajaxParams={appointmentVisit.searchParams}
						ajaxFieldListName="items"
						onLoaded = {this.showPage}
						ajaxUrlName='messageAppointmentVisit'
					>
						<TableBody style={{background:"#fff",border:"0px"}}>

							<TableRow style={{background:"#fff",border:"0px"}}>

								<TableRowColumn
									style={{overflow:"visible",textAlign: "center",width:462,lineHeight:"42px"}}
									name="msgContent"
									component={
										(value,oldValue,itemData) => {
											let color="#999999";
											if(itemData.msgStatu == "UNREAD"){
												color="#333333";
											}
											return (
														<div className='appointment-visit-content' style={{color:color}} onClick={this.columnClick.bind(this,itemData)}>
															{itemData.msgStatu == "UNREAD" &&<span className="appointment-visit-spot"></span>}
															{value}
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
												<div className="appointment-visit-time" style={{color:color}} onClick={this.columnClick.bind(this,itemData)}> <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
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
												<div className="appointment-visit-read" style={{color:color}} onClick={this.columnClick.bind(this,itemData)}>{condition}</div>
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
