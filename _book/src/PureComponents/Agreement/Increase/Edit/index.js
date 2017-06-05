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

import './index.less';
import NewCreateForm from './NewCreateForm';
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

		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
		}

		Store.dispatch(reset('increaseCreateForm'));
	}

	onCreateSubmit(formValues) {
		formValues = Object.assign({}, formValues);
		let {
			params
		} = this.props;
		Http.request('addOrEditIncreaseContract', formValues).then(function(response) {
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			this.props.CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			this.props.CommunityAgreementList.openEditAgreement=false;

			//location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/increase/" + response.contractId + "/detail";

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onCancel() {
		let {
			params
		} = this.context;
		this.props.CommunityAgreementList.openEditAgreement=false;
		//window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	componentDidMount() {

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 1,
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

			initialValues.contractcode = response.contractCode;


			if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement = response.agreement;
				}
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';

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


			Http.request('show-checkin-agreement', {
				id: params.id
			}).then(function(response) {


				optionValues.lessorContactName = response.lessorContactName;

				optionValues.contractFileList = response.contractFileList;

				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.contractcode = response.contractcode;
				initialValues.contractVersionType = response.contractVersion;

				initialValues.lessorContactid = response.lessorContactid;
				initialValues.lessorContactName = response.lessorContactName;
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement = response.agreement;
				}
				initialValues.leaseId = response.leaseId;
				initialValues.leaseAddress = response.leaseAddress;
				initialValues.leaseContact = response.leaseContact;
				initialValues.leaseContacttel = response.leaseContacttel;
				initialValues.paytype = response.payType.id;
				initialValues.paymodel = response.payment.id;
				initialValues.stationnum = response.stationnum;
				initialValues.wherefloor = response.wherefloor;
				initialValues.rentaluse = response.rentaluse;
				initialValues.contractmark = response.contractmark || '';
				initialValues.totalrent = response.totalrent;
				initialValues.totaldeposit = response.totaldeposit;
				initialValues.lessorContacttel = response.lessorContacttel;

				//时间
				initialValues.firstpaydate = new Date(response.firstpaydate);
				initialValues.signdate = new Date(response.signdate);
				initialValues.leaseBegindate = new Date(response.leaseBegindate);
				initialValues.leaseEnddate = new Date(response.leaseEnddate);



				//处理stationvos
				stationVos = response.stationVos;

				_this.setState({
					initialValues,
					optionValues,
					stationVos
				});

			}).catch(function(err) {
				Notify.show([{
					message: '后台出错请联系管理员',
					type: 'danger',
				}]);
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
			stationVos
		} = this.state;

		return (

			<div>
			<Title value="编辑增租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','增租协议书']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</div>

		</div>
		);
	}
}
