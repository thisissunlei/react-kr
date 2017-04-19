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
	Grid,
	Notify,
	BreadCrumbs,
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
			setlocalStorage:''
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
		Store.dispatch(Actions.callAPI('addOrEditEnterContract', {}, formValues)).then(function(response) {
		    _this.removeLocalStorage();

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
		let keyWord = params.orderId+''+params.customerId+'ENTERcreate';
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

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		})).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.agreement = '无';

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

			//获取localStorage数据
			let keyWord = JSON.stringify(params.orderId)+ JSON.stringify(params.customerId)+'ENTERcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			if(mainbillId && customerId){
				initialValues.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValues.templockday = localStorage.getItem(keyWord+'templockday');
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.firstpaydate = localStorage.getItem(keyWord+'firstpaydate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');

				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				initialValues.totaldeposit = localStorage.getItem(keyWord+'totaldeposit') || 0;
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			initialValues.stationVos = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVos = JSON.parse(initialValues.stationVos);

			_this.setState({
				initialValues,
				optionValues,
				stationVos
			});

		}).catch(function(err) {
			console.log('err',err);
			Notify.show([{
				message: '后台出错请联系管理员4',
				type: 'danger',
			}]);
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active && !!nextProps.active) {
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
			stationVos,
			setlocalStorage
		} = this.state;

		initialValues.setlocalStorage = setlocalStorage;


		return (

			<div>

				<Title value="创建入驻协议书_财务管理"/>

			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</div>

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
