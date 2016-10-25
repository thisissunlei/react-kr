import React, {Component, PropTypes} from 'react';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';


export default  class JoinCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit  = this.onConfrimSubmit.bind(this);

		this.state = {
			stationVos:[],
			initialValues:{},
			optionValues:{},
			formValues:{},
			openConfirmCreate:false
		}
	}

	 onCreateSubmit(formValues){
		 this.setState({
			 formValues
		 });

		 this.onConfrimSubmit();
		// this.openConfirmCreateDialog();
	 }

	 onConfrimSubmit(){
	 	console.log(this.props, this.props.params);

	 	let params = this.props.params;
		let {formValues} = this.state;

		Store.dispatch(Actions.callAPI('updateFinaContractIntentletter',{},formValues)).then(function(){
			Notify.show([{
				message:'创建成功',
				type: 'danger',
			}]);
			location.href = "./#/operation/customerManage/"+params.customerId+"/order/"+params.orderId+"/agreement/admit/"+params.id+"/detail";

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});

		 //this.openConfirmCreateDialog();
	}

	onCancel(){
		window.history.back();
	}

	 openConfirmCreateDialog(){
		 this.setState({
			 openConfirmCreate:!this.state.openConfirmCreate
		 });
	 }

	 componentDidMount(){

		var _this = this;
		const {params} = this.props
		let initialValues = {};
		let optionValues = {};
		 let stationVos = [];

		Store.dispatch(Actions.callAPI('fina-contract-intention',{customerId:params.customerId,mainBillId:params.orderId,communityId:1})).then(function(response){
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid =  params.orderId;

			initialValues.signdate = +new Date((new Date()).getTime() - 24*60*60*1000);

			optionValues.communityAddress = response.customer.communityAddress; 
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）	
			initialValues.contracttype = 'INTENTION';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item,index){
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.paymentList = response.payment.map(function(item,index){
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			optionValues.payTypeList = response.payType.map(function(item,index){
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId =  response.mainbillCommunityId||1;

			   	Store.dispatch(Actions.callAPI('showFinaContractIntentletter',{id:params.id})).then(function(response){

					initialValues.id = response.id;
			   		initialValues.leaseId = response.leaseId;
			   		initialValues.contractcode = response.contractcode;
			   		initialValues.lessorContactid = 112;
			   		initialValues.templockday = response.templockday;
			   		// initialValues.lessorContactid = response.lessorContactid;
			   		initialValues.leaseAddress = response.leaseAddress;
			   		initialValues.lessorContactName = response.lessorContactName;
					initialValues.leaseContact = response.leaseContact;
					initialValues.leaseContacttel = response.leaseContacttel;
					if(response.payType){
						initialValues.paytype = response.payType.id;

					}
					if(response.payment){
						initialValues.paymodel = response.payment.id;

					}
					initialValues.stationnum = response.stationnum;
					initialValues.wherefloor = response.wherefloor;
					initialValues.contractmark = response.contractmark;

					//时间
					initialValues.leaseBegindate = new Date(response.leaseBegindate);
					initialValues.leaseEnddate = new Date(response.leaseEnddate);
					initialValues.stationVos = response.stationVos;
					console.log('时间',initialValues);


					//处理stationvos
					stationVos = response.stationVos;

			   		console.log(stationVos,'---->>>>',response.stationVos);

					_this.setState({
						initialValues,
						optionValues,
						stationVos
					});

				}).catch(function(err){
					console.log(err);
					Notify.show([{
						message:'后台出错请联系管理员',
						type: 'danger',
					}]);
			   	});


		}).catch(function(err){
			Notify.show([{
				message:'后台出错请联系管理员',
				type: 'danger',
			}]);
	   	});

	 }


  render() {

	  let {initialValues,optionValues,stationVos} = this.state;
	  console.log('index', this.state);

    return (

		 <div>
		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			<Section title="编辑承租协议书" description=""> 
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</Section>

			<Dialog
				title="确定新建"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} >
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} />
			  </Dialog>
		</div>
	);
  }
}
