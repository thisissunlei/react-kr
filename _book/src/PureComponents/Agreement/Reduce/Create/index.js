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
import {Http} from 'kr/Utils'
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
        	params: this.props.params
      	}
    }

	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.constructor.childContextTypes = {
	        params: React.PropTypes.object.isRequired
	     }


		this.state = {
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false
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
		Http.request('getFnaContractRentController', formValues).then(function(response) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			this.props.CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			this.props.CommunityAgreementList.openTowAgreement=false;
			this.props.CommunityAgreementList.openOneAgreement=false;

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
		//window.history.back();
		this.props.CommunityAgreementList.openTowAgreement=false;
		this.props.CommunityAgreementList.openOneAgreement=false;
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

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;

			initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseContact = response.customer.customerMember;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;

      		initialValues.contractcode = response.contractCode;

			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'LESSRENT';
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
				optionValues
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员5',
				type: 'danger',
			}]);
		});
	}


	render() {

		let {
			initialValues,
			optionValues
		} = this.state;

		return (

			<div>
			 	<Title value="创建减租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','创建减租协议书']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} params={this.props.params}/>
			</div>

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