import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
import allState from '../State';

@observer
 class OneNewAgreement extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			orderList:[],
		}
	}
	
	componentDidMount(){
	 	 // Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));

	}
	//下一步被点击
	onSubmit = () => {
		
		allState.openTowAgreement=true;
		
	 //    var _this = this;
		// Store.dispatch(Actions.callAPI('contracts-creation', {mainBillId:allState.mainBillId})).then(function(response) {
		// //入驻合同是否可创建	
		// // allState.enter=response.enter;
		// // //增租合同是否可创建
		// // allState.increase=response.increase;

		// // //减租合同是否可创建
		// // allState.reduce=response.reduce;
		// // //续租合同是否可创建
		// // allState.relet=response.relet;
		// // //退组合同是否可创建
		// // allState.returnRent=response.returnRent;

			
		// }).catch(function(err) {
		// 	Message.error(err.message);
		// });
		// Store.dispatch(Actions.switchSidebarNav(false));
	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	 onChangeSign=(person)=>{
		Store.dispatch(change('OneNewAgreement','customerId',person.id));
		this.fetchCustomer({customerId:person.id});
		allState.companyName=person.company;
		allState.listId=person.id;
		this.orderNameInit(person.id)
    }

    fetchCustomer=(customerId)=>{
    	var _this = this;
		Store.dispatch(Actions.callAPI('orders-names', customerId)).then(function(response) {
			let label="",value='';
			let orderList=[];
			for(let i=0;i<response.orderList.length;i++){
			    let order={}; 
				order.value=response.orderList[i].id;
				order.label=response.orderList[i].mainbillname;
				orderList.push(order);
			}
			var noContract = {
				'value': '-1',
				'label': '新建订单'
			}
			orderList.push(noContract);
			_this.setState({
				orderList
			})
		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
    }

    //获取订单名称
	orderNameInit = (value) => {
		var _this=this;
		let data={};
		
		data.customerId=value;

		Store.dispatch(Actions.callAPI('get-customName-orderName',data)).then(function(response) {
			allState.customerName=response.customerName;
			allState.orderCount=response.orderCount;
		}).catch(function(err) {
			 Message.error(err.message);
		});		
	}
	//
    orderListChange = (data) =>{
    	if(data.label=="新建订单"){
    		allState.openNewIndent=true;
    	}else{
          allState.mainBillId=data.value;
          
    	}
    	console.log("33333>",data)
    }
    //下一步被点击
    nextClick = () =>{
    	this.onCancel();
    }

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;
		let {orderList}=this.state;

		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
						<KrField  grid={1/2}  name="companyId" style={{width:262,marginLeft:28}} component='companyName'  label="客户名称" inline={false} onChange={this.onChangeSign} placeholder='请输入社区名称' requireLabel={true}/>


						<KrField grid={1/2} label="订单名称" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
								options={orderList}
								requireLabel={true}
								onChange={this.orderListChange}
						/>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="下一步" type="submit"/></div>
									
										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

								</Col>
							</Row>
						</Grid>
				</form>
		);
	}
}
const validate = values =>{
	const errors = {};
	if(!values.companyId){
		errors.companyId = '客户名称不能为空';
	}
	if(!values.staionTypeId){
		errors.staionTypeId = '订单名称不能为空';
	}
	return errors;
}
export default reduxForm({ form: 'OneNewAgreement',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(OneNewAgreement);
