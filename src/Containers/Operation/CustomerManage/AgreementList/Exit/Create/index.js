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
	Notify,
	BreadCrumbs,
	Title,

} from 'kr-ui';


import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import allState from "../../State";

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
			setlocalStorage:'',
			openConfirmCreate: false
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('exitCreateForm'));

	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});

		// this.onConfrimSubmit(formValues);
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
		Store.dispatch(Actions.callAPI('addFnaContractWithdrawal', {}, formValues)).then(function(response) {
			_this.isConfirmSubmiting = false;
			_this.removeLocalStorage();
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openTowAgreement=false;
			allState.openOneAgreement=false;

			// location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/exit/" + response.contractId + "/detail";

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
		this.removeLocalStorage();
		allState.openTowAgreement=false;
		allState.openOneAgreement=false;
		// window.history.back();
	}



	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId+'QUITRENTcreate';
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

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		})).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;

			initialValues.leaseBegindate = new Date;
			initialValues.leaseEnddate = new Date;
			initialValues.agreement = '无';
			initialValues.setLocalStorageDate = +new Date();

			//initialValues.withdrawdate = +new Date();
			//initialValues.signdate = +new Date();

			 initialValues.contractcode = response.contractCode;
			 
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseAddress = response.customer.customerAddress;

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

			//获取localStorage数据
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'QUITRENTcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			if(mainbillId && customerId){
				initialValues.withdrawdate = localStorage.getItem(keyWord+'withdrawdate');
				initialValues.depositamount = parseInt(localStorage.getItem(keyWord+'depositamount')) || 0;
				initialValues.totalreturn = parseInt(localStorage.getItem(keyWord+'totalreturn')) || 0;
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}

			_this.setState({
				initialValues,
				optionValues,
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员2',
				type: 'danger',
			}]);
		});
	}


	componentWillReceiveProps(nextProps) {

		
		if (nextProps.active) {
			this.setState({
				setlocalStorage:nextProps.active
			});

		}
	}

	shouldComponentUpdate(nextProps){
		if (!this.state.setlocalStorage) {
			this.setState({
				setlocalStorage:nextProps.active
			});
		}
		return true;
	}



	render() {

		let {
			initialValues,
			optionValues,
			setlocalStorage,

		} = this.state;
		initialValues.setlocalStorage =setlocalStorage;

		return (

			<div>

			<Title value="创建退租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} />
			</div>

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