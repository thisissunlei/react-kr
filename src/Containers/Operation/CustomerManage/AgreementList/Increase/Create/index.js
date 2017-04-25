import React from 'react';
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

import {DateFormat,Http} from 'kr/Utils'

import {
	Dialog,
	Notify,
	BreadCrumbs,
	Title,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import allState from "../../State";


import './index.less';
export default class increaseCreate extends React.Component {

	static childContextTypes = {
        params: React.PropTypes.object.isRequired,
     }



		getChildContext() {
	    return {
	        params: this.props.params,
	      }

	    }

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
			openConfirmCreate: false,
			setlocalStorage:this.props.active,
			openLocalStorage:false,
			initialValue:{},
			optionValue:{},
			local:[],
			openLocalStorages:this.props.openLocalStorages
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
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openTowAgreement=false;
			allState.openOneAgreement=false;
			//location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/increase/" + response.contractId + "/detail";
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
		//window.history.back();
		// allState.openTowAgreement=false;
		// allState.openOneAgreement=false;
		allState.openTowAgreement=false;
		allState.openOneAgreement=false;
	}


	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId+'ADDRENTcreate';
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
			params,
			active
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.setLocalStorageDate = +new Date();

			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'ADDRENTcreate';
			initialValues.num = localStorage.getItem(keyWord +'num') || 1;
			if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=1){
				initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
			}

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.signdate = DateFormat(+new Date(),'yyyy-mm-dd hh:MM:ss');
			initialValues.firstpaydate = DateFormat(+new Date(),'yyyy-mm-dd hh:MM:ss');

			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;

			initialValues.contractcode = response.contractCode;


			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';
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


			

			_this.setState({
				initialValues,
				optionValues,
				stationVos,
			},function(){
				_this.getLocalStorageSata();
			});

		}).catch(function(err) {
			console.log(err)
			Notify.show([{
				message: "222",
				type: 'danger',
			}]);
		});
	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.active && this.props.active!= nextProps.active) {
			this.setState({
				setlocalStorage:nextProps.active
			});

		}
		if (this.props.openLocalStorages!= nextProps.openLocalStorages) {
			this.setState({
				openLocalStorages:nextProps.openLocalStorages
			});

		}
	}


	// shouldComponentUpdate(nextProps){
	// 	// if (!this.state.setlocalStorage) {
	// 	// 	this.setState({
	// 	// 		setlocalStorage:nextProps.active
	// 	// 	});
	// 	// }
	// 	return true;
	// }
	getLocalStorageSata=()=>{
		var _this = this;
		const {
			params
		} = this.props;
		let {initialValues} = this.state;
		let {optionValues} = this.state;
		let initialValue ={};
		let optionValue = {};
			//获取localStorage数据
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'ADDRENTcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			if(mainbillId && customerId){
				initialValue.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValue.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValue.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValue.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValue.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValue.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValue.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValue.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');
				initialValue.firstpaydate = localStorage.getItem(keyWord + 'firstpaydate');
				initialValues.paymodelName = localStorage.getItem(keyWord+'paymodelName');
				initialValues.paytypeName = localStorage.getItem(keyWord+'paytypeName');

				initialValue.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				optionValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValue.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				initialValue.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValue.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValue.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValue.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValue.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				initialValue.totaldeposit = localStorage.getItem(keyWord+'totaldeposit') || 0;
				optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			initialValue.stationVos = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVos = JSON.parse(initialValue.stationVos);
			optionValue = Object.assign({},optionValues,optionValue);
			initialValue = Object.assign({},initialValues,initialValue);
			_this.setState({
				initialValue,
				optionValue,
				stationVos
			});

	}




	render() {

		let {
			initialValues,
			optionValues,
			initialValue,
			optionValue,
			stationVos,
			setlocalStorage,
			openLocalStorage,
			openLocalStorages
		} = this.state;

		initialValues.setlocalStorage = setlocalStorage;
		initialValue.setlocalStorage = setlocalStorage;

		return (

			<div>
				<Title value="创建增租协议书_财务管理"/>
		 		<BreadCrumbs children={['系统运营','客户管理','增租协议']}/>
				{!openLocalStorages&&<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={[]}/>
				</div>}
				{openLocalStorages&&<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValue} onCancel={this.onCancel} optionValues={optionValue} stationVos={stationVos}/>
				</div>}

				<Dialog
					title="增租协议书"
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
