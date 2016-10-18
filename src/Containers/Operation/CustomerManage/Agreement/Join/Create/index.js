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
			initialValues:{},
			formValues:{},
			openConfirmCreate:false
		}

	}


	 onCreateSubmit(formValues){

		 this.setState({
			 formValues
		 });

		 this.openConfirmCreateDialog();
	 }

	 onConfrimSubmit(){
		 this.openConfirmCreateDialog();
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
		const {params} = this.props;
		let initialValues = {};

		Store.dispatch(Actions.callAPI('fina-contract-intention',{customerId:params.customerId,mainBillId:params.orderId,communityId:1})).then(function(response){

			initialValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）	
			initialValues.contracttype = 2;
			initialValues.fnaCorporationList = response.fnaCorporation.map(function(item,index){
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			initialValues.paymentList = response.payment.map(function(item,index){
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			initialValues.payTypeList = response.payType.map(function(item,index){
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			initialValues.floorList = response.customer.floor;
			initialValues.customerName = response.customer.customerName;
			initialValues.leaseAddress = response.customer.customerAddress;
			initialValues.communityName = response.customer.communityName;

			_this.setState({
				initialValues
			});
			console.log("0000",initialValues);
		}).catch(function(err){
			console.log('err',err);
			Notify.show([{
				message:'后台出错请联系管理员',
				type: 'danger',
			}]);
	   	});
	 }


  render() {

	  let {initialValues} = this.state;

    return (

		 <div>
		 	<BreadCrumbs children={['系统运营','客户管理','入驻协议']}/>
			<Section title="创建入驻协议书" description=""> 
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel}/>
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
