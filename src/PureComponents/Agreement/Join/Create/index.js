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
// import allState from "../../State";
import {
	observer,
	inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer

export default class JoinCreate extends Component {
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
			openConfirmCreate: false
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

			_this.setState({baiscInf:response});

			_this.isConfirmSubmiting = false;

			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			this.props.CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			this.props.CommunityAgreementList.openTowAgreement=false;
			this.props.CommunityAgreementList.openOneAgreement=false;
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

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 0,
		})).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
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

			_this.setState({
				initialValues,
				optionValues,
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员4',
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

				<Title value="创建入驻协议书_财务管理"/>

			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues}/>
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