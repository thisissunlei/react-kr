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

import {
	Dialog,
	Section,
	Notify,
	BreadCrumbs,
	Title,

} from 'kr-ui';
import {Http} from 'kr/Utils'


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
			openLocalStorages:false
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('exitCreateForm'));

	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});
		this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {

		if (this.isConfirmSubmiting) {
			return;
		}
		this.isConfirmSubmiting = true;
		let {
			formValues
		} = this.state;
		let {
			params
		} = this.props;
		var _this = this;
		Http.request('addFnaContractWithdrawal', {}, formValues).then(function(response) {
			_this.removeLocalStorage();
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/exit/" + response.contractId + "/detail";

		}).catch(function(err) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		this.openConfirmCreateDialog();
	}

	onCancel() {
		this.removeLocalStorage()
		window.history.back();
	}

	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+params.customerId+'QUITRENTcreate';
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
		let keyWord = params.orderId+ params.customerId+'QUITRENTcreate';
			 if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')>1){
				_this.setState({
					openLocalStorages:true
				})
			 }
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

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;

			let keyWord = params.orderId+ params.customerId+'QUITRENTcreate';
			initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;

			console.log(localStorage.getItem(keyWord+'num'),localStorage.getItem(keyWord+'oldNum'))

			initialValues.setLocalStorageDate = +new Date();

			initialValues.leaseBegindate = new Date;
			initialValues.leaseEnddate = new Date;

			//initialValues.withdrawdate = +new Date();
			//initialValues.signdate = +new Date();

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseAddress = response.customer.customerAddress;


      		initialValues.contractcode = response.contractCode;


			
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'QUITRENT';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
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
				optionValues
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}

	render() {

		let {
			initialValues,
			optionValues,
			openLocalStorages
		} = this.state;

		return (

			<div>

			 <Title value="创建退租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
		<Section title="退租协议书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} openLocalStorage={openLocalStorages} params={this.props.params} removeLocalStorage={this.removeLocalStorage}/>
			</Section>

			<Dialog
				title="退租意向书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} onClose={this.openConfirmCreateDialog}>
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues}/>
			  </Dialog>
		</div>
		);
	}
}