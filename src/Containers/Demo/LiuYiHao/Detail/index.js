import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm
} from 'redux-form';
import Section from 'kr-ui/Section';


import DelAgreementNotify from './DelAgreementNotify';

import {
	KrField,
	KrDate,
	Button,
	DotTitle,
	Dialog,
	Title,
	UpLoadList
} from 'kr-ui';


import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Snackbar
} from 'material-ui';

import {
	BreadCrumbs,
	Loading,
	Notify,
	NewCreatForm
} from 'kr-ui';

import Circle from './circle';
import './active.less';

import {
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	IconButton
} from 'material-ui';
import IconMenu from 'material-ui/IconMenu';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';


import {
	List,
	ListItem
} from 'material-ui/List';


import {
	Actions,
	Store
} from 'kr/Redux';
import ReactTooltip from 'react-tooltip'

export default class OrderDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.getAgrementDetailUrl = this.getAgrementDetailUrl.bind(this);
		this.getAgrementEditUrl = this.getAgrementEditUrl.bind(this);
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
		Store.dispatch(Actions.callAPI('delete-enter-contract', {
			contractId: delAgreementId
		})).then(function(response) {
			Notify.show([{
				message: '删除成功!',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();
			}, 100)
		}).catch(function(err) {
			console.log(err.message);
		});


	}

	componentDidMount() {
		const closeAll = this.props.location.query.closeAll;
		if (closeAll) {
			Store.dispatch(Actions.switchSidebarNav(false));
			Store.dispatch(Actions.switchHeaderNav(false));
		}

		var _this = this;

		// Store.dispatch(Actions.callAPI('get-order-detail', {
		// 	mainBillId: this.props.params.orderId
		// })).then(function(response) {
		// 	_this.setState({
		// 		response: response
		// 	});


		// 	setTimeout(function() {
		// 		_this.setState({
		// 			loading: false
		// 		});
		// 	}, 0);

		// }).catch(function(err) {
		// 	Notify.show([{
		// 		message: err.message,
		// 		type: 'danger',
		// 	}]);

		// });
		// Store.dispatch(Actions.switchSidebarNav(false));

	}

	openCreateAgreementDialog() {

		const {
			contractStatusCount
		} = this.state.response;

		if (contractStatusCount.quitRentTotoal) {
			Notify.show([{
				message: '您已经签约了退租合同！',
				type: 'danger',
			}]);

			return;
		}


		this.setState({
			openCreateAgreement: !this.state.openCreateAgreement
		});
	}

	getAgrementEditUrl(customerId, orderId, typeId, agreementId) {

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
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/edit';
	}
	getAgrementDetailUrl(customerId, orderId, typeId, agreementId) {
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
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/detail';
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

	delArgument(id) {


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
			Store.dispatch(Actions.callAPI('edit-order-name', {}, {
				mainbillName: form,
				mainBillId: orderBaseInfo.id
			})).then(function(response) {
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
			Store.dispatch(Actions.callAPI('get-order-station', {
				mainBillId: orderBaseInfo.id
			})).then(function(response) {
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
		console.log('onChange',files);
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
			console.log('dddddddd');
			document.addEventListener('click', this.docClick)
		}
		
	}
	docClick = (event) => {
		event = event || window.event;
		var target = event.target;
		console.log('target',target);
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
		// if (this.state.loading) {
		// 	return (<Loading/>);
		// }
		let fileList = ['入.pdf','入议书.pdf','入驻协议书.pdf','入驻协议书.pdf'];

		return (
			<div>


			<Title value="客户订单详情_财务管理"/>


			<Section title="客户订单详情" description="" hide={!!this.props.location.query.closeAll} bodyPadding={'20px 20px 50px 20px'}>
			
			<div className="content">

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
					<Button  type="link" label="查看" href={this.getAgrementDetailUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} />
					<span className='upload-button'><Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,item.id)}/></span>
					{(item.contracttype != 'QUITRENT' || showMoreOnExit)?<Button  type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,item.id)}/>:''}
					
					<UpLoadList open={[this.state.openMenu,this.state.openId]} onChange={this.onChange} detail={item}>Tooltip</UpLoadList>
					<div style={{visibility:showOpretion}} className="m-operation" >
						{item.contractstate != 'EXECUTE' && item.editFlag && <span style={{display:'block'}}><a  type="link" label="编辑" href={this.getAgrementEditUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} disabled={item.contractstate == 'EXECUTE'}>编辑</a></span> }
						{ item.contracttype !=  'QUITRENT' && <span  style={{display:'block'}} onClick={this.print.bind(this,item)}>打印</span>}

						{item.contracttype == 'ENTER' && item.contractstate != 'EXECUTE' && item.editFlag  && <span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}>删除</a> </span>}
					</div>

					</TableRowColumn>
					</TableRow>
				);
			})}

			</TableBody>
			</Table>
          	</div>
          	
          	
			</Section>


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