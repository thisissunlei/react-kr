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
import SearchForm from "./SearchForm";

export default class AppointmentVisit extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			searchParams: {
				page: 1,
				pageSize: 15,
				createDateEnd:'',
				createDateStart:'',
				other:false
			},
		}
	}

	//全部标为以读点击事件
	allReadClick = () => {
		let _this = this;
		Store.dispatch(Actions.callAPI('messageAllReade',{msgType:"CUSTOMER_TRANSFER"})).then(function(response) {
			_this.renovateList();
			_this.tabNum();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}

	//起始日期
	onStartChange = (value) =>{
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				createDateEnd:'',
				createDateStart:value,
				other:!this.state.searchParams.other
			}
		})
	}

	//结束日期
	onEndChange = (value) =>{
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				createDateEnd:value,
				createDateStart:this.state.searchParams.createDateStart,
				other:!this.state.searchParams.other
			}
		});
	}
	//信息被点击
	columnClick = (value) => {
		let {renovateRedDrop} = this.props;
		let _this=this;
		Store.dispatch(Actions.callAPI("setInfoReaded", {
				id: value
		})).then(function(response) {
			_this.renovateList();
			renovateRedDrop();
			_this.tabNum();
		}).catch(function(err) {
				console.log(err);
		});
	}

	//刷新列表
	renovateList = () =>{
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				createDateEnd:"",
				createDateStart:"",
				other:!this.state.searchParams.other
			}
		});
	}


	//客户名称被点击
	customerClick = (data) => {
		let customerName = data.msgContent.split("#")[1]
		data.customerName = customerName;
		const {customerClick} = this.props;
		customerClick && customerClick(data);


	}

	//刷新tab信息条数数据
	tabNum = ()=>{
		console.log(">>>>>>>>>>")
		let {tabNum} = this.props;
		tabNum && tabNum();
	}
	render(){
		let {searchParams} = this.state;
		let _this=this;

		return (
				<div className="appointment-visit">
					<SearchForm
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
						ajaxParams={searchParams}
						ajaxFieldListName="items"
						ajaxUrlName='messageRemindCustomerSwitching'
					>
						<TableBody style={{background:"#fff",border:"0px"}}>

							<TableRow style={{background:"#fff",border:"0px"}}>

								<TableRowColumn
									style={{overflow:"visible",textAlign: "center",width:462,lineHeight:"42px"}}
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
														<div className='appointment-visit-content' style={{color:color}} onClick={this.columnClick.bind(this,itemData.id)}>
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
												<div className="appointment-visit-time" style={{color:color}} onClick={this.columnClick.bind(this,itemData.id)}> <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
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
												<div className="appointment-visit-read" style={{color:color}} onClick={this.columnClick.bind(this,itemData.id)}>{condition}</div>
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
