import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Notify,
	BreadCrumbs,
	Title,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';

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
			initialValue: {},
			optionValue: {},
			formValues: {},
			stationVoList:[],
			openConfirmCreate: false,
			openLocalStorages:false
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('admitCreateForm'));
	}
	componentWillUnmount() {
		Store.dispatch(reset('admitCreateForm'));
	}

	onCreateSubmit(formValues) {

		this.setState({
			formValues
		});
		var _this = this;

		this.openConfirmCreateDialog();
	}
	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+params.customerId+'INTENTIONcreate';
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
		let keyWord = params.orderId+ params.customerId+'INTENTIONcreate';
			 if(localStorage.getItem(keyWord+'num')>2){
				_this.setState({
					openLocalStorages:true
				})
			 }
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
			var _this = this;
		Store.dispatch(Actions.callAPI('addFinaContractIntentletter', {}, formValues)).then(function(response) {
			_this.isConfirmSubmiting = false;
			_this.removeLocalStorage();
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);

			window.setTimeout(function() {
				window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			}, 0);

		}).catch(function(err) {
				_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onCancel() {
		this.removeLocalStorage();

			window.history.back();

	}

	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {
		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		this.getlocalSign();
		
		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		})).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			let keyWord = params.orderId+params.customerId+'INTENTIONcreate';
			initialValues.num  = localStorage.getItem(keyWord+'num') ||1;

			initialValues.setLocalStorageDate = +new Date();
			
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress || null;
			initialValues.contractcode = response.contractCode;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';
			initialValues.agreement = '无';

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
			// optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;
			optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			initialValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')


			_this.setState({
				initialValues,
				optionValues,
				// stationVoList
			},function(){
				this.getLocalStorageSata();
			});

		}).catch(function(err) {
			console.log(err)
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
		let {initialValues,initialValue} = this.state;
		let {optionValues,optionValue} = this.state;
			//获取localStorage数据
			let keyWord = params.orderId+ params.customerId+'INTENTIONcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			if(mainbillId && customerId){
				initialValue.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValue.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValue.templockday = localStorage.getItem(keyWord+'templockday');
				initialValue.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValue.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValue.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValue.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValue.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValue.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				optionValue.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValue.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');

				initialValue.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				initialValue.paymentId = parseInt(localStorage.getItem(keyWord+'paymentId'));
				initialValue.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValue.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValue.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValue.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				initialValue.totalrent = localStorage.getItem(keyWord+'totalrent') || 0;
				initialValue.stationnum = localStorage.getItem(keyWord+'stationnum') || 0;
				initialValue.boardroomnum = localStorage.getItem(keyWord+'boardroomnum') || 0;
				initialValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));

				// optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			initialValue.stationVoList = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVoList = JSON.parse(initialValue.stationVoList) || [];
			optionValue = Object.assign(optionValue,optionValues)
			initialValue =  Object.assign(initialValue,initialValues)

			// Store.dispatch(initialize('admitCreateForm', initialValues));

			_this.setState({
				initialValue,
				optionValue,
				stationVoList
			});
	}
	

	render() {

		let {
			initialValues,
			optionValues,
			initialValue,
			optionValue,
			 stationVoList,
			 openLocalStorages
		} = this.state;
		console.log('index',initialValues,optionValues,openLocalStorages );

		return (


			<div>

				<Title value="创建承租意向书_财务管理"/>

		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			<Section title="承租意向书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} initialValue={initialValue} onCancel={this.onCancel} optionValues={optionValues} optionValue={optionValue} stationVoList={stationVoList} openLocalStorage={openLocalStorages}/>
			</Section>

			<Dialog
				title="承租意向书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={this.state.openConfirmCreate} >
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues} />
			  </Dialog>
		</div>
		);
	}
}
