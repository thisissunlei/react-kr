import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
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


export default  class JoinCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.handleOpen = this.handleOpen.bind(this);
		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			initialValues:{},
			open:false,
			openConfirmCreate:false,
			billList:[
				{
					id:883,
					name:'23432',
					type:1
				},
				{
					id:883,
					name:'23432',
					type:1
				},
			],
			init:{
				customer:{},
				fnaCorporation:[],
				payType:[],
				payment:[]
			}
		}
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
			_this.setState({
				init:response,
				initialValues
			});
		}).catch(function(err){ });

	 }
	 onSubmit(form){
		 console.log("---form",提交);
		 //const {params} = this.props;
		// Store.dispatch(Actions.callAPI('addOrEditEnterContract',{customerId:params.customerId,mainBillId:params.orderId},form)).then(function(response){ }).catch(function(err){ });
	 }

	handleOpen(){
		Actions.showModalDialog('http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId=42&floors=3&goalStationNum=1&goalBoardroomNum=0&selectedObjs=[{type:1,id:883},{type:2,id:2}]',900,800);
		var _this = this;
		window.setReturnValue = function(value){
			_this.setState({
				billList:value.data
			});
		};
	}

	onSubmit(){

	}

	onCancel(){

	}

  render() {

	  let {fnaCorporation,payType,payment,customer,initialValues} = this.state.init;

    return (

		 <div>
		 	<BreadCrumbs children={['系统运营','客户管理','增租协议']}/>
			<Section title="创建增租协议书" description=""> 
					<NewCreateForm onSubmit={this.onSubmit} fnaCorporation={fnaCorporation} paymentList={payment} payTypeList={payType} floorList={customer.floor} billList={this.state.billList} customer={customer} initialValues={initialValues}/>
			</Section>

			<Dialog
				title="确定新建"
				modal={true}
				open={this.state.openConfirmCreate} >
			  </Dialog>

		</div>
	);
  }
}
