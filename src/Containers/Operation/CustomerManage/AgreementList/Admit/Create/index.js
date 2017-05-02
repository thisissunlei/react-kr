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

import {Http} from 'kr/Utils';
import {
	Dialog,
	Notify,
	BreadCrumbs,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import allState from "../../State";


export default class JoinCreate extends React.Component {

      static childContextTypes = {
        par: React.PropTypes.object.isRequired
     }



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

		this.state = {
			initialValues: {},
			optionValues: {},
			formValues: {},
			stationVos:[],
			setlocalStorage:this.props.active,
			openConfirmCreate: false,
			local:[],
			openLocalStorages:this.props.openLocalStorages,
			initialValue:{},
				optionValue:{},
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('admitCreateForm'));
	}


	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});
		var _this = this;

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
		Http.request('addFinaContractIntentletter', {}, formValues).then(function(response) {
			_this.isConfirmSubmiting = false;
		    _this.removeAllLocalStorage();

			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openTowAgreement=false;
			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);
		    allState.openOneAgreement=false;


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
		let keyWord = params.orderId+''+params.customerId+'INTENTIONcreate';
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
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'INTENTIONcreate';


			initialValues.num = localStorage.getItem(keyWord+'num') || 1;
			if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=1){
				initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
			}
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.setLocalStorageDate = +new Date();
			
			initialValues.contractcode= response.contractCode;
			initialValues.agreement = '无';

			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';

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
			},function(){
				_this.getLocalStorageSata();
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员1',
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
		let initialValue = {}
				let optionValue={}
			//获取localStorage数据
			let keyWord = params.orderId+''+ params.customerId+'INTENTIONcreate';
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
				initialValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
				optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
				optionValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				initialValue.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');


				// optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			optionValue = Object.assign({},optionValues,optionValue);
			initialValue = Object.assign({},initialValues,initialValue);


			let stationVos = JSON.parse(localStorage.getItem(keyWord+'stationVos')) || [];
			_this.setState({
				initialValue,
				optionValue,
				stationVos
			});

	}

	// shouldComponentUpdate(nextProps){
	// 	if (!this.state.setlocalStorage) {
	// 		this.setState({
	// 			setlocalStorage:nextProps.active
	// 		});
	// 	}
	// 	return true;
	// }



	render() {

		let {
			initialValues,
			optionValues,
			stationVos,
			setlocalStorage,
			local,
			openLocalStorages,
			initialValue,
				optionValue,
		} = this.state;
		initialValues.setlocalStorage = setlocalStorage;
		initialValue.setlocalStorage = setlocalStorage;

		return (


			<div >

		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			{!allState.hasLocal && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} />
            </div>}
            { allState.hasLocal && !allState.openLocalStorages && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={{}} onCancel={this.onCancel} optionValues={{fnaCorporationList:[]}} stationVos={stationVos}/>
            </div>}
            { allState.hasLocal && (allState.openLocalStorages == 1 ) && <div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={[]}/>
            </div>}
            { allState.hasLocal && (allState.openLocalStorages == 2 )&&<div style={{marginTop:10}}>
                <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValue} onCancel={this.onCancel} optionValues={optionValue} stationVos={stationVos}/>
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
