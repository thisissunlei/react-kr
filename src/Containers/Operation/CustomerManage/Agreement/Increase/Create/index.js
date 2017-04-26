import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	submitForm,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';
import {DateFormat,Http} from 'kr/Utils'

import {
	Dialog,
	Section,
	Notify,
	BreadCrumbs,
	Title,
	ListGroupItem,
	ListGroup,
	Button,
	Row,
	Grid
} from 'kr-ui';
import './index.less';
import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';

export default class JoinCreate extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.state = {
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false,
			openLocalStorage:false,
			stationVos:[]
		}
			this.isConfirmSubmiting = false;
		Store.dispatch(reset('increaseCreateForm'));
	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});

		// this.onConfrimSubmit(formValues);
		this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {

		if(this.isConfirmSubmiting){
			return ;
		}
		this.isConfirmSubmiting = true;

		let {
			formValues
		} = this.state;
		let {
			params
		} = this.props;

		if (typeof formValues.stationVos != 'string') {
			formValues.stationVos = JSON.stringify(formValues.stationVos);
		}

		var _this = this;

		Http.request('addOrEditIncreaseContract', {}, formValues).then(function(response) {
			_this.removeLocalStorage();
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			
			location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/increase/" + response.contractId + "/detail";
		}).catch(function(err) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		//this.openConfirmCreateDialog();
	}

	onCancel() {
		this.removeLocalStorage();
		window.history.back();
	}
	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+params.customerId;
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 removeList.map((item)=>{
 			 localStorage.removeItem(item);
 		})
	}

		getlocalSign=()=>{
		let {
			params
		} = this.props;
		let _this = this;
		let sign = false;
		let keyWord = params.orderId+ params.customerId+'ADDRENTcreate';
			 if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')>1){
				_this.setState({
					openLocalStorage:true
				})
				sign = true;
			 }
		if(!sign){
			this.getBasic()
		}
	}


	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {
		this.getlocalSign()
	}
	getBasic=()=>{

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;


			let keyWord = params.orderId+ params.customerId+'ADDRENTcreate';
			initialValues.num = localStorage.getItem(keyWord+'num') || 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			// initialValues.signdate = DateFormat(+new Date(),"yyyy-mm-dd hh:MM:ss");
			// initialValues.firstpaydate = DateFormat(+new Date(),"yyyy-mm-dd hh:MM:ss");

			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;


			initialValues.contractcode = response.contractCode;
			initialValues.setLocalStorageDate = +new Date();
			
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.paymentList = response.payment.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			optionValues.payTypeList = response.payType.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			


			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;
			
			_this.setState({
				initialValues,
				optionValues,
				stationVos:[]
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}

	getLocalStorageSata=()=>{
		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;


			let keyWord = params.orderId+ params.customerId+'ADDRENTcreate';
			initialValues.num = localStorage.getItem(keyWord+'num') || 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			// initialValues.signdate = DateFormat(+new Date(),"yyyy-mm-dd hh:MM:ss");
			// initialValues.firstpaydate = DateFormat(+new Date(),"yyyy-mm-dd hh:MM:ss");

			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;


			initialValues.contractcode = response.contractCode;
			initialValues.setLocalStorageDate = +new Date();
			
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.paymentList = response.payment.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			optionValues.payTypeList = response.payType.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			


			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

			initialValues.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValues.templockday = localStorage.getItem(keyWord+'templockday');
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');
				initialValues.firstpaydate = localStorage.getItem(keyWord+'firstpaydate');
				initialValues.paymodelName = localStorage.getItem(keyWord+'paymodelName');
				initialValues.paytypeName = localStorage.getItem(keyWord+'paytypeName');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.paymentId = parseInt(localStorage.getItem(keyWord+'paymentId'));
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement');
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];
				initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				optionValues.totalrent = parseInt(localStorage.getItem(keyWord+'totalrent'));
				initialValues.totalrent = parseInt(localStorage.getItem(keyWord+'totalrent')) || 0;
				initialValues.totaldeposit = parseInt(localStorage.getItem(keyWord+'totaldeposit')) || 0;
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];
				initialValues.stationVos = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVos = JSON.parse(initialValues.stationVos);
			initialValues.num = 1+parseInt(localStorage.getItem(keyWord+'num'));
			
			_this.setState({
				initialValues,
				optionValues,
				stationVos,
			});

		}).catch(function(err) {
			console.log(err)
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}
	onCancelStorage=()=>{
		this.setState({
			openLocalStorage:false,

		})
		this.getBasic()
		this.removeLocalStorage();	
	}
	getLocalStorage=()=>{
		this.setState({
			openLocalStorage:false,
		})
		this.getLocalStorageSata();
	}



	render() {

		let {
			initialValues,
			optionValues,
			stationVos,
			openLocalStorage,
		} = this.state;

		return (

			<div>
				<Title value="创建增租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','增租协议']}/>
			<Section title="增租协议书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} openLocalStorage={openLocalStorage} params={this.props.params} stationVos={stationVos}/>
			</Section>

			<Dialog
				title="增租协议书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} onClose={this.openConfirmCreateDialog}>
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues}/>
			  </Dialog>
			<Dialog
				title="提示"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={this.state.openLocalStorage} 
				contentStyle={{width:'400px'}}>
					<div>
						<p style={{textAlign:'center',margin:'30px'}}>是否加载未提交的合同数据？</p>
						<Grid>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'40%',textAlign:'right',paddingRight:'5%'}}><Button  label="确定" type="submit"  onTouchTap={this.getLocalStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'40%',textAlign:'left',paddingLeft:'5%'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancelStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</div>

			  </Dialog>
		</div>
		);
	}
}
