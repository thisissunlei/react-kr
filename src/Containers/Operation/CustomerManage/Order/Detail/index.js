import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';



import Section from 'kr-ui/Section';
import DelAgreementNotify from './DelAgreementNotify';
import {
	KrField,
	KrDate,
	Button,
	DotTitle,
	Dialog,
	Title,
	Drawer,
	UpLoadList,
	Grid,
	Row,
	Col,
	BreadCrumbs,
	Loading,
	Notify,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Message
} from 'kr-ui';
import EditAgreementList from "./EditAgreementList";

import {
	Snackbar,
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	Paper,
	IconButton,
	IconMenu,
	List,
	ListItem
} from 'material-ui';
import Circle from './circle';
import './active.less';
import {Http} from 'kr/Utils';
import ReactTooltip from 'react-tooltip'

import {Agreement} from 'kr/PureComponents';
import TwoNewAgreement from "./TwoNewAgreement";
import $ from 'jquery';
import allState from "./State";
import {
	observer,
	inject
} from 'mobx-react';


class NewCreatForm extends React.Component {
	static PropTypes = {
		contractStatusCount: React.PropTypes.object,
		params: React.PropTypes.object,

	}
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let {
			contractStatusCount,
			params
		} = this.props;

		return (
			<Grid style={{paddingBottom:20}}>
				<Row>
				<Col md={4} align="center">
					{
					contractStatusCount.enterTotoal>0?<span className="createButton disabled">承租意向书</span>:<a className="createButton" href={"./#/operation/customerManage/"+params.customerId+"/order/"+this.props.params.orderId+"/agreement/admit/create"}>承租意向书</a>
					}
				</Col>
				<Col md={4} align="center">
				  {
					contractStatusCount.enterTotoal>0 ?<span className="createButton disabled">入驻协议书</span>:<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/join/create"}>入驻协议书</a>
				  }
				</Col>
				<Col md={4} align="center">
				{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/increase/create"}>增租协议书</a>:<span className="createButton disabled">增租协议书</span>}

				</Col>
				</Row>

				<Row style={{marginTop:10}}>
				<Col md={4} align="center" >
				  	{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/renew/create"}>续租协议书</a>:<span className="createButton disabled">续租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/reduce/create"} >减租协议书</a>:<span className="createButton disabled">减租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/exit/create"} >退租协议书</a>:<span className="createButton disabled">退租协议书</span>}

				</Col>
				</Row>

				</Grid>



		)
	}

}


class StaionInfo extends React.Component{
	static PropTypes = {
		detail: React.PropTypes.object,

	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			isClassName: ''
		}
	}
	close = () => {
		this.setState({
			isClassName: 'leave'
		}, function() {
			const {
				onClose
			} = this.props;
			onClose && onClose()

		})



	}
	render() {
		var _this = this;
		let {
			detail,
			className,
			isShow
		} = this.props;
		let {
			isClassName
		} = this.state;
		var Name = isShow ? 'actives' : isClassName


		return (
			<div className={`${className} ${Name}`}>
				<div className="close-btn" onTouchTap={this.close} ></div>
				<div className="showHeader"><span className="icon"></span><span className="title">工位编号 :</span></div>
				<div className="info-con">
					{detail && detail.map((item,index)=>{
						return(
							<div className="infoList" key={index}>
								<div className="h-title"><span className="circle"></span>{item.detailName}</div>
								<div className="listCon">
									{item.stationIds.length>0 ?item.stationIds.map((v,i)=>{
										return(
											<div className="list" key={i}>工位编号：{v}</div>
										)
									}):<div className="list" >该客户的所有工位已退租</div>}

								</div>
							</div>

						)



					})}


				</div>
				<div className="close-btn-n" onTouchTap={this.close}>关闭</div>
			</div>

		)



	}


}


@inject("CommunityAgreementList")
@observer

export default class OrderDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.renderTableItem = this.renderTableItem.bind(this);
		this.getAgrementType = this.getAgrementType.bind(this);


		this.confirmDelAgreement = this.confirmDelAgreement.bind(this);
		this.openDelAgreementDialog = this.openDelAgreementDialog.bind(this);


		this.state = {
			open: false,
			loading: true,
			delAgreementId: 0,
			openCreateAgreement: false,
			openDelAgreement: false,
			isShow: false,
			View: false,
			openMenu:false,
			openId:0,
			opretionId:0,
			opretionOpen:false,
			response: {
				orderBaseInfo: {},
				installment: {},
				earnest: {},
				contractList: [],
				antecedent: [],
			},
			staionsList: []
		}

	}

	openDelAgreementDialog() {
		this.setState({
			openDelAgreement: !this.state.openDelAgreement
		});
	}

	setDelAgreementId(delAgreementId) {
		this.setState({
			delAgreementId,
		}, function() {
			this.openDelAgreementDialog();
		});

	}

	confirmDelAgreement() {

		this.openDelAgreementDialog(0);

		let {
			delAgreementId
		} = this.state;
		Http.request('delete-enter-contract', {
			contractId: delAgreementId
		}).then(function(response) {
			Notify.show([{
				message: '删除成功!',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();
			}, 100)
		}).catch(function(err) {
		});


	}

	getLocalStorageDate=()=>{
		let date = [];
		let delList = [];
		let now = +new Date();
		let clearDate = 60*60*1000*1;
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf('setLocalStorageDate')!='-1'){
			 	let time = now - parseInt(localStorage.getItem(itemName));
				if((time/clearDate)>1){
					//10小时
					date.push(itemName.replace('setLocalStorageDate',''));
				}
			 }
		 }
		 date.map((item)=>{
		 	for (var i = 0; i < localStorage.length; i++) {
				if(localStorage.key(i).indexOf(item)!='-1'){
					delList.push(localStorage.key(i));
				}
			}
		 })
		 delList.map((item)=>{
		 	localStorage.removeItem(item);
		 })
		 
	}

	componentDidMount() {
		allState.listId=this.props.params.customerId;
		allState.mainBillId = this.props.params.orderId;
		const closeAll = this.props.location.query.closeAll;
		if (closeAll) {
			Store.dispatch(Actions.switchSidebarNav(false));
			Store.dispatch(Actions.switchHeaderNav(false));
		}
		this.getLocalStorageDate()

		var _this = this;

		Http.request('get-order-detail', {
			mainBillId: this.props.params.orderId
		}).then(function(response) {
			_this.setState({
				response: response
			});


			setTimeout(function() {
				_this.setState({
					loading: false
				});
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
		Store.dispatch(Actions.switchSidebarNav(false));

	}
	submitAgreement=()=>{

		var _this = this;

		Http.request('get-order-detail', {
			mainBillId: this.props.params.orderId
		}).then(function(response) {
			_this.setState({
				response: response
			});


			setTimeout(function() {
				_this.setState({
					loading: false
				});
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
	}
	closeTwoAgreement=()=>{
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openTowAgreement = false;
		CommunityAgreementList.openLocalStorage = false;
	}

	openCreateAgreementDialog() {
		var _this = this;
	    let {CommunityAgreementList} = this.props;

		Http.request('contracts-creation', {mainBillId:allState.mainBillId}).then(function(response) {
		//承租意向
		allState.admit=response.intention;
		//入驻合同是否可创建

		// allState.enter=true;
		allState.enter=response.enter;
		//增租合同是否可创建
		allState.increase=response.increase;
		//减租合同是否可创建
		allState.reduce=response.reduce;
		// allState.reduce=true;
		//续租合同是否可创建
		allState.relet=response.relet;

		//allState.relet=true;
		//退组合同是否可创建
		allState.returnRent=response.returnRent;
        if(!allState.enter&&!allState.increase&&!allState.reduce&&!allState.relet&&!allState.returnRent){
        	if(response.quitRentAll>0){
        		Message.error('该订单已签订退租，无法继续签订合同');
        		return ;
        	}
        	Message.error('没有合同可以创建');
        	return ;
        }
        CommunityAgreementList.openTowAgreement=true;
		}).catch(function(err) {
			console.log(err)
			Message.error(err.message);
		});
	}

	getAgrementEditUrl(customerId, orderId, typeId, agreementId) {
		let {CommunityAgreementList} = this.props; 
		CommunityAgreementList.openEditAgreement = true;
		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		typeArray.map((value) => {
			if (typeId === value.label) {
				typeValue = value.value;
			}
		});
		allState.editParams(customerId, orderId, typeId, agreementId)
	}
	closeEditAgreement=()=>{
		let {CommunityAgreementList} = this.props; 
		CommunityAgreementList.openEditAgreement = false;
	}

	getAgrementDetailUrl(customerId, orderId, typeId, agreementId) {
		allState.openAgreementDetail= true;
		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		switch(typeId){
			case ('INTENTION'):
				typeValue = <Agreement.Admit.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			case ('ENTER'):
				typeValue = <Agreement.Join.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			case ('LESSRENT'):
				typeValue = <Agreement.Reduce.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			case ('RENEW'):
				typeValue = <Agreement.Renew.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			case ('QUITRENT'):
				typeValue = <Agreement.Exit.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			case ('ADDRENT'):
				typeValue = <Agreement.Increase.Detail
						params={{id:agreementId,customerId:customerId,orderId:orderId}}
			            onCancel={this.closeAgreementDetail}
					/>
				break;
			default:
				break;
		}
		allState.detailValue = typeValue;
		
		// return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/detail';
	}
	closeAgreementDetail=()=>{
		allState.openAgreementDetail = false;
	}

	getAgrementType(type) {
		var typeList = [{
			name: 'INTENTION',
			value: '意向书'
		}, {
			name: 'ENTER',
			value: '入驻协议'
		}, {
			name: 'ADDRENT',
			value: '增租协议'
		}, {
			name: 'LESSRENT',
			value: '减租协议'
		}, {
			name: 'QUITRENT',
			value: '退租协议'
		}, {
			name: 'RENEW',
			value: '续租协议'
		}];
		let name = ''
		typeList.map(function(value) {
			if (value.name === type) {
				name = value.value;
			}
		});
		return (
			<TableRowColumn>{name}</TableRowColumn>
		)
	}


	renderTableItem(item) {
		var _this = this;
		if (item) {

			return (
				<Row>
				<Col md={3} align="left" className="ContractName"><Circle type={item.payStatus}></Circle>款项：{item.installmentName}</Col>
				<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate value={item.installmentReminddate}/></Col>
				<Col md={3} align="left" className="ContractName">计划付款金额：{item.installmentAmount}</Col>
				{item.installmentBackamount > 0?<Col md={3} align="left"className="ContractName">实际付款金额：{item.installmentBackamount}</Col>:<Col md={3} align="left"  className="ContractName">实际付款金额：<span style={{color:'red'}}>{item.installmentBackamount}</span></Col>}
				</Row>
			)
		}

		return null;


	}
	uploadFile(id){
		console.log('=====')
		let fileId = this.state.openId;
		if(fileId == id){
			this.setState({
				openMenu:!this.state.openMenu,
				openId:id,
				opretionOpen:false
			})
		}else{
			this.setState({
				openMenu:true,
				openId:id,
				opretionOpen:false
			})
		}
	}

	change = (form) => {
		const {
			orderBaseInfo
		} = this.state.response;
		if (orderBaseInfo.mainbillname === form) {
			return;
		}
		if (form && orderBaseInfo.id) {
			Http.request('edit-order-name', {}, {
				mainbillName: form,
				mainBillId: orderBaseInfo.id
			}).then(function(response) {
				Notify.show([{
					message: '修改成功!',
					type: 'success',
				}]);
			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		} else {
			Notify.show([{
				message: '订单名称不能为空',
				type: 'danger',
			}]);
		}


	}
	onClose = () => {

		this.setState({
			isShow: !this.state.isShow
		})
	}

	onView = () => {
		var _this = this;
		const {
			orderBaseInfo,
		} = this.state.response;
		let {
			isShow,
			View
		} = this.state
		if (!isShow) {
			Http.request('get-order-station', {
				mainBillId: orderBaseInfo.id
			}).then(function(response) {
				_this.setState({
					staionsList: response
				})


			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		}

		this.onClose();
	}
	onChange=(files)=>{
	}
	showMoreOpretion(id){
		let {opretionId,opretionOpen} = this.state;
		if(opretionId == id){
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:!this.state.opretionOpen
			})
		}else{
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:true
			})
		}
		if(!opretionOpen){
			document.addEventListener('click', this.docClick)
		}

	}
	docClick = (event) => {
		event = event || window.event;
		var target = event.target;
		if(target.className == 'icon-more'){
			return ;
		}
		this.setState({
			openMenu:false,
			opretionOpen:false
		})
		document.removeEventListener('click', this.docClick)

	}
	print(item){
		var typeList = [{
			name: 'INTENTION',
			value: 'admit'
		}, {
			name: 'ENTER',
			value: 'join'
		}, {
			name: 'ADDRENT',
			value: 'increase'
		}, {
			name: 'LESSRENT',
			value: 'reduce'
		}, {
			name: 'QUITRENT',
			value: 'exit'
		}, {
			name: 'RENEW',
			value: 'renew'
		}];
		let name = ''
		typeList.map(function(value) {
			if (value.name === item.contracttype) {
				name = value.value;
			}
		});
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/${name}/${item.id}/print`
		var newWindow = window.open(url);

	}

	render() {

		const {
			orderBaseInfo,
			earnest,
			contractList,
			installmentPlan,
			contractStatusCount,

		} = this.state.response;
		let {
			isShow
		} = this.state
		if (this.state.loading) {
			return (<Loading/>);
		}
		let fileList = ['入.pdf','入议书.pdf','入驻协议书.pdf','入驻协议书.pdf'];
		return (
			<div>


			<Title value="客户订单详情_财务管理"/>

			<BreadCrumbs children={['系统运营','财务管理']} hide={!!this.props.location.query.closeAll}/>

			<Section title="客户订单详情" description="" hide={!!this.props.location.query.closeAll} bodyPadding={'20px 20px 50px 20px'}>

			<div className="content">
						{/*<StaionInfo onClose={this.onClose}  detail={this.state.staionsList} className='showCon' isShow={isShow} id={orderBaseInfo.id}/>*/}
			<Button label="新建合同"  onTouchTap={this.openCreateAgreementDialog} style={{width:160,height:40,fontSize:'18px !important'}}/>
						<span className="border-top" style={{marginTop:'20px !important'}}></span>
			<DotTitle title='合同列表' style={{marginTop:40,marginBottom:30}}/>

			<Table className="orders" pageSize={contractList.length} displayCheckbox={false} >
			<TableHeader>
			<TableHeaderColumn>合同类型</TableHeaderColumn>
			<TableHeaderColumn>租金金额</TableHeaderColumn>
			<TableHeaderColumn>工位个数</TableHeaderColumn>
			<TableHeaderColumn>会议室个数</TableHeaderColumn>
			<TableHeaderColumn>起始日期</TableHeaderColumn>
			<TableHeaderColumn>终止日期</TableHeaderColumn>
			<TableHeaderColumn>工位/会议室均价(月)</TableHeaderColumn>
			<TableHeaderColumn>销售员</TableHeaderColumn>
			<TableHeaderColumn>录入人</TableHeaderColumn>
			<TableHeaderColumn>操作</TableHeaderColumn>
			</TableHeader>
			<TableBody>

			{contractList.map((item,index)=>{

				let {opretionOpen,opretionId} = this.state;
				let showMoreOnExit = false;
				let showPrint = (item.contracttype == 'QUITRENT')?'hidden':'visible';
				let showOpretion = (item.id == opretionId && opretionOpen)?'visible':'hidden';
				if(item.contracttype == 'QUITRENT' && item.contractstate != 'EXECUTE' && item.editFlag ){
					showMoreOnExit = true;
				}
				return (
					<TableRow key={index}>
					{this.getAgrementType(item.contracttype)}
					<TableRowColumn>{item.totalrent}</TableRowColumn>
					<TableRowColumn>{item.stationnum}</TableRowColumn>
					<TableRowColumn>{item.boardroomnum}</TableRowColumn>
					<TableRowColumn><KrDate value={item.leaseBegindate}/></TableRowColumn>
					<TableRowColumn><KrDate value={item.leaseEnddate}/></TableRowColumn>
					<TableRowColumn>{item.staionOrMeetingPrice}</TableRowColumn>
					<TableRowColumn>{item.saler}</TableRowColumn>
					<TableRowColumn>{item.inputUser}</TableRowColumn>
					<TableRowColumn>
					<span className='upload-button'><Button  type="link" href="javascript:void(0)" label="查看" onTouchTap={this.getAgrementDetailUrl.bind(this,item.customerid,this.props.params.orderId,item.contracttype,item.id)} /></span>
					<span className='upload-button'><Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,item.id)}/></span>
					{(item.contracttype != 'QUITRENT' || showMoreOnExit)?<Button  type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,item.id)}/>:''}

					<UpLoadList open={[this.state.openMenu,this.state.openId]} onChange={this.onChange} detail={item}>Tooltip</UpLoadList>
					<div style={{visibility:showOpretion}} className="m-operation" >
						{item.contractstate != 'EXECUTE' &&
						 item.editFlag && 
						 <span style={{display:'block'}}><a  type="link" label="编辑" onTouchTap={this.getAgrementEditUrl.bind(this,item.customerid,this.props.params.orderId,item.contracttype,item.id)} disabled={item.contractstate == 'EXECUTE'}>编辑</a></span> }
						

						{
						 item.contracttype !=  'QUITRENT' &&
						 <span  style={{display:'block'}} onClick={this.print.bind(this,item)}>打印</span>}

						{item.contracttype == 'ENTER' && 
						item.contractstate != 'EXECUTE' && item.editFlag  && <span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}>删除</a> </span>}
					</div>

						{/*
							{item.contractstate != 'EXECUTE' && item.editFlag  && <Button  type="link" label="删除" onTouchTap={this.delArgument.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }
						*/}


					</TableRowColumn>
					</TableRow>
				);
			})}

			</TableBody>
			</Table>

			<DotTitle title='分期计划' style={{marginTop:40,marginBottom:30}}/>

			<div className='ui-remark'>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top over-circle'></span><span className='remark-green-text'>已完成</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top section-circle'></span><span className='remark-green-text'>付部分款</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top no-pay'></span><span className='remark-green-text'>未付款</span></div>
			</div>

			<div className="planList">
				<div className="headerList">
					<div className="type">类型</div>
					<div className="fund">款项</div>
					<div className="Begindate">分期开始时间</div>
					<div className="Enddate">分期结束时间</div>
					<div className="planMoney">计划付款金额</div>
					<div className="actualMoney">实际付款金额</div>
					<div className="status">状态</div>
				</div>
				{installmentPlan && installmentPlan.map((item,index)=>{
					return(
						<div className="contentList"  key={index}>
							<div className="type">
								<div className="typeCon">
									<div className="p">{item.detailName}{item.detailStart}至{item.detailEnd}</div>
								</div>

							</div>
							<div className="conlist">
							{item.installment && item.installment.map((items,indexs)=>{
								return(
										<div className="list" key={indexs}>
											<div className="fund">{items.installmentName}</div>
											<div className="Begindate"><KrDate value={items.installmentBegindate}/></div>
											<div className="Enddate"><KrDate value={items.installmentEnddate}/></div>
											<div className="planMoney">{items.installmentAmount}</div>
											<div className="actualMoney">{items.installmentBackamount}</div>
											<div className="status">
												<Circle type={items.payStatus}></Circle>
											</div>
										</div>
								)

							})}
							</div>

						</div>


					)


				})}



			</div>

            <DotTitle title='订单描述' style={{marginTop:24}}/>
			<div className="orderList">
			<Grid style={{marginTop:40}} >
				<Row>
				<Col md={4}><KrField label="社区名称"component="labelText" value={orderBaseInfo.communityName} defaultValue="无" alignRight={true} tooltip={orderBaseInfo.communityName}/></Col>
				<Col md={4}><KrField label="客户名称" component="labelText" value={orderBaseInfo.customerName} alignRight={true} tooltip={orderBaseInfo.customerName}/></Col>
				<Col md={4}><KrField label="订单名称" oldText={orderBaseInfo.mainbillname} component="editLabelText" tooltip={orderBaseInfo.mainbillname}  alignRight={true} save={this.change}  /></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="当前工位数" component="labelText" value={orderBaseInfo.stationnum} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="订单编号"  component="labelText" value={orderBaseInfo.mainbillcode} defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="起始日期" component="labelText" value={orderBaseInfo.contractEntrydate} type="date" defaultValue="无" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="结束日期" component="labelText" value={orderBaseInfo.contractLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="撤场日期" component="labelText" value={orderBaseInfo.actualLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="订单总额" component="labelText" value={orderBaseInfo.contractTotalamount} defaultValue="0" alignRight={true}/></Col>
				</Row>

				<Row>
				<Col  md={4} ><KrField label="回款总额" component="labelText" value={orderBaseInfo.contractBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="未回款额" component="labelText" value={orderBaseInfo.unBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="工位回款" component="labelText" value={orderBaseInfo.paidrent} defaultValue="0" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="实收押金" component="labelText" value={orderBaseInfo.realdeposit} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="实收定金" component="labelText" value={orderBaseInfo.realdownpayment} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="其他回款" component="labelText" value={orderBaseInfo.refundamount} defaultValue="0" alignRight={true}/></Col>
				</Row>
				{/*				<Row>
								<Col  md={4} ><div className="staion">工位编号</div><div className="view"  onTouchTap={this.onView} >点击查看</div></Col>
								<Col  md={4} ><div className="staion"></div><div className="view"></div></Col>
								<Col  md={4} ><div className="staion"></div><div className="view"></div></Col>
								</Row>
				*/}
			</Grid>

            </div>


			<span className="border-bottom" style={{marginTop:60}}></span>

          	</div>


			</Section>

			{/*新建合同的第二页*/}
		    <Drawer
    			open={this.props.CommunityAgreementList.openTowAgreement}
    			width={750}
    			openSecondary={true}
    			onClose={this.closeTwoAgreement}
    			className='m-finance-drawer'
    			containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			>

			 	<TwoNewAgreement onCancel={this.closeTwoAgreement} onSubmit={this.submitAgreement}/>
		    </Drawer>

			{/*查看*/}
		    <Drawer
    			open={allState.openAgreementDetail}
    			width={750}
    			openSecondary={true}
    			onClose={this.closeAgreementDetail}
    			className='m-finance-drawer'
    			containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			>

			 	{allState.detailValue}
		    </Drawer>

			{/*编辑合同*/}
		    <Drawer
	        	open={this.props.CommunityAgreementList.openEditAgreement}
	        	width={750}
	        	onClose={this.closeEditAgreement}
	        	openSecondary={true}
	        	className='m-finance-drawer'
	        	containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			>


			   	<EditAgreementList onCancel={this.closeEditAgreement} onSubmit={this.submitAgreement}/>
		    </Drawer>

		    


			<Dialog
			title="新建合同"
			modal={true}
			onClose={this.openCreateAgreementDialog}
			open={this.state.openCreateAgreement}
			contentStyle={{width:687}}>
				<NewCreatForm contractStatusCount={contractStatusCount} params={this.props.params}/>
			</Dialog>


			<Dialog
			title="删除合同"
			modal={true}
			onClose={this.openDelAgreementDialog}
			open={this.state.openDelAgreement}
			contentStyle={{width:445,height:236}}>
				<DelAgreementNotify onSubmit={this.confirmDelAgreement} onCancel={this.openDelAgreementDialog.bind(this,0)}/>
			</Dialog>
			</div>

			

		);
	}
}
