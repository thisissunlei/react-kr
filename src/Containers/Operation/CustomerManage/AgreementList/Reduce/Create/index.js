import React from 'react';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { Store } from 'kr/Redux';

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
export default class JoinCreate extends React.Component {

	static childContextTypes = {
        params: React.PropTypes.object.isRequired
     }

	getChildContext() {
    	return {
        	params: this.props.params
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
			openLocalStorages:this.props.openLocalStorages
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('reduceCreateForm'));
	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});


		// setTimeout(function(){
		// 	_this.onConfrimSubmit();
		// },500);
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
		var _this = this;
		Http.request('getFnaContractRentController', {}, formValues).then(function(response) {
			_this.isConfirmSubmiting = false;
		    _this.removeAllLocalStorage()
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openTowAgreement=false;
			allState.openOneAgreement=false;

			// location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/reduce/" + response.contractId + "/detail";
		}).catch(function(err) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onCancel() {
		this.removeLocalStorage()
		//window.history.back();
		allState.openTowAgreement=false;
		allState.openOneAgreement=false;
	}

	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId+'LESSRENTcreate';
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

	removeAllLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId;
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 allState.hasLocal= false;
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
		let stationVos= [];

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
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'LESSRENTcreate';
			initialValues.num = localStorage.getItem(keyWord +'num') ||1;
			if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=1){
				initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
			}

			initialValues.signdate = DateFormat(+new Date((new Date()).getTime() - 24 * 60 * 60 * 1000),'yyyy-mm-dd hh:MM:ss');
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseContact = response.customer.customerMember;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;

      		initialValues.contractcode = response.contractCode;
      		initialValues.agreement = '无';

			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'LESSRENT';
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

			//获取localStorage数据
			

			_this.setState({
				initialValues,
				optionValues,
				stationVos,
			},function(){
				_this.getLocalStorageSata();
			});


		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员5',
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
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'LESSRENTcreate';
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
				initialValue.totalrent = localStorage.getItem(keyWord+'totalrent');

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
			 	<Title value="创建减租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','创建减租协议书']}/>
			{!allState.hasLocal && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={[]} params={this.props.params}/>
            </div>}
            { allState.hasLocal && !allState.openLocalStorages && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={{}} onCancel={this.onCancel} optionValues={{fnaCorporationList:[]}} stationVos={stationVos} params={this.props.params}/>
            </div>}
            { allState.hasLocal && (allState.openLocalStorages == 1 ) && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={[]} params={this.props.params}/>
            </div>}
            { allState.hasLocal && (allState.openLocalStorages == 2 )&&<div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValue} onCancel={this.onCancel} optionValues={optionValue} stationVos={stationVos} params={this.props.params}/>
            </div>}

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
