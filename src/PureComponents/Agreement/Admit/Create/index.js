import React, {
	Component,
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
import {Http} from 'kr/Utils';
import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
	DotTitle,
	Title,
} from 'kr-ui';
import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
// import allState from "../../State";

import {
	observer,
	inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer


export default class JoinCreate extends Component {


		getChildContext() {
	    return {
	        par: this.props.params
	      }
	    }
	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.constructor.childContextTypes = {
			par: React.PropTypes.object.isRequired
	 }

		this.state = {
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false
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
		let keyWord = params.orderId+''+params.customerId + 'INTENTIONcreate';
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
	removeLocalStorages=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId;
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

	onConfrimSubmit() {

				if(this.isConfirmSubmiting){
					return ;
				}
				this.isConfirmSubmiting = true;

		let {
			formValues
		} = this.state;
		let {
			params,
			onSubmit
		} = this.props;
			var _this = this;
		Http.request('addFinaContractIntentletter', '',formValues).then(function(response) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			_this.removeLocalStorages();
			_this.props.CommunityAgreementList.openTowAgreement=false;
			_this.props.CommunityAgreementList.openOneAgreement=false;
			_this.props.CommunityAgreementList.openLocalStorage = false;
			onSubmit && onSubmit()

		}).catch(function(err) {
			console.log(err)
				_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		this.openConfirmCreateDialog();
	}

	onCancel() {
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openTowAgreement=false;
		CommunityAgreementList.openOneAgreement=false;
		CommunityAgreementList.openLocalStorage = false;
		this.removeLocalStorage()
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
		let initialValue = {};
		let optionValue = {fnaCorporationList:[]};


		let keyWord = params.orderId+''+ params.customerId+'INTENTIONcreate';
		let localStorageData = JSON.parse(localStorage.getItem(keyWord)) || {num:1,oldNum:1};


		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;


			initialValues.customerId = params.customerId;

			initialValues.num = localStorageData.num || 1;
			
			if(localStorageData.oldNum && localStorageData.num-localStorageData.oldNum <=1){
				initialValues.oldNum = localStorageData.num;
			}else{
				initialValues.oldNum = 1;
			}





			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress;

			initialValues.contractcode= response.contractCode;

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
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;
			optionValue = Object.assign({},optionValues,JSON.parse(localStorage.getItem(keyWord)));
			initialValue = Object.assign({},initialValues,JSON.parse(localStorage.getItem(keyWord)));
			if(localStorageData.oldNum && localStorageData.num-localStorageData.oldNum <=1){
				initialValue.oldNum = localStorageData.num;
			}else{
				initialValue.oldNum = localStorageData.oldNum;
			}
			_this.setState({
				initialValues,
				optionValues,
				initialValue,
				optionValue,
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员1',
				type: 'danger',
			}]);
		});
	}


	render() {

		let {
			initialValues,
			optionValues,
			initialValue,
			optionValue
		} = this.state;

		let {CommunityAgreementList} = this.props
		return (


			<div >

		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>

			{CommunityAgreementList.openLocalStorage && <div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValue} onCancel={this.onCancel} optionValues={optionValues}/>
			</div>}
			{!CommunityAgreementList.openLocalStorage && <div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues}/>
			</div>}

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
