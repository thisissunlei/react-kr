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
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import './index.less';

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
			stationVos:[],
			openConfirmCreate: false
		}
		Store.dispatch(reset('reduceCreateForm'));
	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});

		// this.onConfrimSubmit();
		this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {

		let {
			formValues
		} = this.state;
		let {
			params
		} = this.props;
		let _this = this;

		Store.dispatch(Actions.callAPI('addOrEditContinueContract', {}, formValues)).then(function(response) {
			_this.removeLocalStorage();
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/renew/" + response.contractId + "/detail";

		}).catch(function(err) {
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
		let keyWord = params.orderId+params.customerId+'RENEWcreate';
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
		let stationVos =[];

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
			
		})).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.setLocalStorageDate = +new Date();

			initialValues.contractcode = response.contractCode;
			


			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'RENEW';
			initialValues.leaseAddress = response.customer.customerAddress;
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

			//获取localStorage数据s
			let keyWord = params.orderId+ params.customerId+'RENEWcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			console.log('--->localStorage',mainbillId,customerId);
			if(mainbillId && customerId){
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];
				initialValues.totaldeposit = localStorage.getItem(keyWord+'totaldeposit');
				initialValues.firstpaydate = localStorage.getItem(keyWord+'firstpaydate');
				initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				optionValues.totalrent = localStorage.getItem(keyWord+'totalrent');
			}
			initialValues.stationVos = localStorage.getItem(keyWord+'stationVos') || '[]';
			stationVos = JSON.parse(initialValues.stationVos);

			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

			_this.setState({
				initialValues,
				optionValues,
				stationVos
			});

		}).catch(function(err) {
			console.log('er',err);
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
			stationVos
		} = this.state;

		return (

			<div>
					<Title value="创建续租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','创建续租协议书']}/>
			<Section title="续租协议书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</Section>

			<Dialog
				title="确定新建"
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
