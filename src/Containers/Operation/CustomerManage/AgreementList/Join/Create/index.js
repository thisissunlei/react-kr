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
import http from 'kr/Redux/Utils/fetch';
import {Http} from "kr/Utils"


import {
	Dialog,
	Notify,
	Title,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import './index.less';
import allState from "../../State";


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
		Store.dispatch(reset('joinCreateForm'));

		this.isConfirmSubmiting = false;
	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		}, function() {
			this.openConfirmCreateDialog();
		});
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
		formValues.stationVos = JSON.stringify(formValues.stationVos);

		var _this = this;
		Http.request('addOrEditEnterContract', {}, formValues).then(function(response) {
		    _this.removeLocalStorages();

			_this.setState({baiscInf:response});

			_this.isConfirmSubmiting = false;

			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openTowAgreement=false;
			allState.openOneAgreement=false;
			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/join/" + response.contractId + "/detail";
			// }, 0);


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
		allState.openTowAgreement=false;
		allState.openOneAgreement=false;
	}

	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId + 'ENTERcreate';
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
		let keyWord = params.orderId+''+params.customerId + 'ENTERcreate';
		let keyWord2 = params.orderId+''+params.customerId + 'INTENTIONcreate';
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }else if(localStorage.key(i).indexOf(keyWord2)!= '-1'){
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

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			// initialValues.agreement = '无';
			initialValues.setLocalStorageDate = +new Date();

			let keyWord = params.orderId+''+ params.customerId+'ENTERcreate';
			initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
			
			if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=1){
				initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
			}

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;

			initialValues.contractcode = response.contractCode;

			initialValues.leaseAddress = response.customer.customerAddress;


			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ENTER';

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
				// stationVos
			},function(){
				_this.getLocalStorageSata();
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员4',
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
			let keyWord = params.orderId+''+ params.customerId+'ENTERcreate';
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
				initialValue.agreement = localStorage.getItem(keyWord+'agreement');
				initialValue.totalrent = localStorage.getItem(keyWord+'totalrent') || 0;
				initialValue.stationnum = localStorage.getItem(keyWord+'stationnum') || 0;
				initialValue.boardroomnum = localStorage.getItem(keyWord+'boardroomnum') || 0;
				initialValue.paytype = parseInt(localStorage.getItem(keyWord+'paytype')) ;
				initialValue.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValue.totaldeposit = localStorage.getItem(keyWord+'totaldeposit') || 0;
				initialValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
				initialValue.firstpaydate = localStorage.getItem(keyWord + 'firstpaydate');
				optionValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				initialValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');

				optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			optionValue = Object.assign({},optionValues,optionValue);
			initialValue = Object.assign({},initialValues,initialValue);


			initialValues.stationVoList = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVos = JSON.parse(initialValues.stationVoList) || [];
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

				<Title value="创建入驻协议书_财务管理"/>

			
			{openLocalStorages && <div style={{marginTop:10}}>
				<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValue} onCancel={this.onCancel} optionValues={optionValue} stationVos={stationVos}/>
			</div>}
			{!openLocalStorages && <div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={[]}/>
			</div>}

			<Dialog
				title="入驻协议书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate}
				onClose={this.openConfirmCreateDialog} >
						<ConfirmFormDetail detail={Object.assign({},this.state.formValues)} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues}/>
			  </Dialog>
			
		</div>
		);
	}
}
