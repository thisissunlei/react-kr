import React  from 'react';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { Store } from 'kr/Redux';

import {DateFormat,Http} from 'kr/Utils';

import {
	Dialog,
  Section,
  Notify,
  BreadCrumbs,
  Title,
  Grid,
  Row,
  ListGroup,
  ListGroupItem,
  Button
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import allState from "../../State";
import './index.less';
import {
	observer,
	inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer

export default class JoinCreate extends React.Component {



	constructor(props, context) {
		super(props, context);

		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
			delStationVos:[],
			openConfirmCreate: false
		}

		this.isConfirmSubmiting = false;


	}

	onCreateSubmit(formValues) {

		if (this.isConfirmSubmiting) {
			return;
		}
		let {CommunityAgreementList} = this.props;

		let {
			params,onSubmit
		} = this.props;
		if(formValues.saleList){
			formValues.saleList = JSON.stringify(formValues.saleList);

		}else{
			formValues.saleList = '[]'
		}

		var _this = this;
		// console.log('jin-->',formValues)
		// return;
		Http.request('addOrEditEnterContract', {}, formValues).then(function(response) {
			_this.isConfirmSubmiting = true;
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			onSubmit && onSubmit()

			// CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			CommunityAgreementList.openEditAgreement=false;

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
	}


	onCancel() {
		let {
			params
		} = this.context;
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openEditAgreement=false;
		//window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	componentDidMount() {
		Store.dispatch(reset('joinEditForm'));
		this.getBasicData()
	}

	getBasicData=()=>{

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];
		let delStationVos = [];
		let {CommunityAgreementList} = this.props;


		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 1,
			contractId:CommunityAgreementList.contractId
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.setLocalStorageDate = +new Date();

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


			Http.request('show-checkin-agreement', {
				id: params.id
			}).then(function(response) {
				let keyWord = params.orderId+''+params.customerId+'ENTERedit';

				optionValues.lessorContactName =  response.lessorContactName;
				optionValues.contractFileList =  response.contractFileList;

				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.num = parseInt(localStorage.getItem(keyWord+'num'))|| 1;
				initialValues.oldNum = parseInt(localStorage.getItem(keyWord+'num'))|| 1;
				initialValues.contractcode = response.contractcode;
				initialValues.leaseAddress =response.leaseAddress;
				initialValues.lessorContactid =  response.lessorContactid;
				initialValues.lessorContactName = response.lessorContactName;
				initialValues.lessorContacttel =response.lessorContacttel;
				initialValues.contractVersionType =  response.contractVersion;

				initialValues.leaseContact =  response.leaseContact;
				initialValues.leaseContacttel = response.leaseContacttel;
				initialValues.paytype =  response.payType.id;
				initialValues.paymodel =  response.payment.id;

				initialValues.stationnum = response.stationnum;
				initialValues.boardroomnum = response.boardroomnum;
				initialValues.wherefloor =  response.wherefloor;
				initialValues.rentaluse =  response.rentaluse;
				initialValues.contractmark =  response.contractmark || '';
				initialValues.totalrent =  response.totalrent;
				initialValues.totaldeposit =response.totaldeposit;
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement =  response.agreement;
				}
				//时间
				initialValues.firstpaydate = DateFormat(response.firstpaydate, "yyyy-mm-dd HH:MM:ss");
				initialValues.signdate =  DateFormat(response.signdate, "yyyy-mm-dd HH:MM:ss");
				initialValues.leaseBegindate =  DateFormat(response.leaseBegindate, "yyyy-mm-dd HH:MM:ss");
				initialValues.leaseEnddate = DateFormat(response.leaseEnddate, "yyyy-mm-dd HH:MM:ss");
				initialValues.saleList = response.saleList;
			
				if(response.saleList){
					initialValues.biaodan = response.saleList.map(item=>{
						if(item){
							return item.tacticsType
						}else{
							return ''
						}
					})
				}else{
					initialValues.biaodan=[]
				}

				initialValues.stationVos = response.stationVos;
				initialValues.delStationVos =  [];
				//处理stationvos
				stationVos = initialValues.stationVos;
				delStationVos = initialValues.delStationVos;
				//处理stationvos

				_this.setState({
					initialValues,
					optionValues,
					stationVos,
					delStationVos
				});

			}).catch(function(err) {
				console.log('err',err)
				_this.onCancel()
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});


		}).catch(function(err) {
			console.log('err',err)
			_this.onCancel()
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}




	render() {

		let {
			initialValues,
			optionValues,
			stationVos,
			delStationVos
		} = this.state;
		let {CommunityAgreementList} = this.props;
		optionValues.saleList = CommunityAgreementList.saleList;

		return (

			<div>
			<Title value="编辑入驻协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','入驻协议']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} delStationVos={delStationVos}/>
			</div>
		</div>
		);
	}
}
