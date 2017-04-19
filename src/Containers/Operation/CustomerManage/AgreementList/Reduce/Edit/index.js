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
import {DateFormat} from 'kr/Utils';
import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
} from 'kr-ui';
import allState from "../../State";

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import './index.less';
export default class JoinCreate extends Component {
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}
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

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			delStationVos:[],
			openConfirmCreate: false
		}

		Store.dispatch(reset('reduceCreateForm'));

	}

	onCreateSubmit(formValues) {

		let {
			params
		} = this.props;
		let _this = this;

		Store.dispatch(Actions.callAPI('getFnaContractRentController', {}, formValues)).then(function(response) {
			_this.removeLocalStorage();
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openEditAgreement=false;
			
			//location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/reduce/" + response.contractId + "/detail";

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		//this.openConfirmCreateDialog();
	}

	onCancel() {
		let {
			params
		} = this.context;
		this.removeLocalStorage();
		allState.openEditAgreement=false;
		//window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}
	removeLocalStorage=()=>{
    let {params} = this.props;
    let keyWord = params.orderId+''+params.customerId+'LESSRENTedit';
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
		let stationVos = [];
		let rentamount = 0;
		let delStationVos = [];

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 1,
		})).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;

			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
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

			Store.dispatch(Actions.callAPI('showFnaContractRentController', {
				id: params.id
			})).then(function(response) {


				 //获取localStorage数据s
                let keyWord = params.orderId+ ''+params.customerId+'LESSRENTedit';
                let mainbillId = localStorage.getItem(keyWord +'mainbillid');
                let customerId = localStorage.getItem(keyWord +'customerId');


				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')||response.lessorContactName;
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'))||response.contractFileList;
				optionValues.leaseEnddate = response.leaseEnddate;
				optionValues.leaseBegindate = response.leaseBegindate;


				initialValues.leaseEnddate = response.leaseEnddate;

				initialValues.id = response.id;
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'))||response.leaseId;
				initialValues.contractcode = response.contractcode;
				initialValues.leaseAddress =localStorage.getItem(keyWord+'leaseAddress')|| response.leaseAddress;
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')||response.lessorContactName;
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact')||response.leaseContact;
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel')||response.leaseContacttel;
        		initialValues.contractVersionType = localStorage.getItem(keyWord+'contractVersionType')||response.contractVersion;
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')||response.lessorContactid;
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark')||response.contractmark;
				// if (response.rentamount) {contractmark
					initialValues.rentamount = localStorage.getItem(keyWord+'rentamount')||response.rentamount|| 0;
				// }
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel')||response.lessorContacttel;
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = localStorage.getItem(keyWord+'agreement')||'无';
				}else{
					initialValues.agreement = localStorage.getItem(keyWord+'agreement')||response.agreement;
				}

				initialValues.signdate = localStorage.getItem(keyWord+'signdate')||DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");


				//处理stationvos
				stationVos = JSON.parse(localStorage.getItem(keyWord+'stationVos'))||response.stationVos;
				delStationVos = JSON.parse(localStorage.getItem(keyWord+'delStationVos'))|| [];

				console.log(stationVos, '---->>>>', response,delStationVos);

				_this.setState({
					initialValues,
					optionValues,
					stationVos,
					delStationVos
				});

			}).catch(function(err) {
				console.log(err);
				Notify.show([{
					message: '后台出错请联系管理员',
					type: 'danger',
				}]);
			});


		}).catch(function(err) {
			console.log(err);
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
			stationVos,
			params,
			delStationVos
		} = this.state;
		return (

			<div>
		 	<BreadCrumbs children={['系统运营','客户管理','入驻协议']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} params={this.props.params} delStationVos={delStationVos}/>
			</div>
		</div>
		);
	}
}