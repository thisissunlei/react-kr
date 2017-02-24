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
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	 onChangeSign=(person)=>{
		Store.dispatch(change('OneNewAgreement','communityId',person.id));
		// console.log(person,">>>>>>>>");
		this.fetchCustomer({customerId:person.id});
    }
    fetchCustomer=(customerId)=>{
    	var _this = this;
		Store.dispatch(Actions.callAPI('orders-names', customerId)).then(function(response) {
			let label="",value='';
			let orderList=[];
			let order={}; 
			for(let i=0;i<response.orderList.length;i++){
				order.value=response.orderList[i].id;
				order.label=response.orderList[i].mainbillname;
				orderList.push(order)
			}
			console.log(response.orderList,"???????")
			orderList.push({label:"新建订单",value:""});
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


	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;
		let {orderList}=this.state;

		return (

			<form className="m-newMerchants" style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
						<KrField  grid={1/2}  name="companyId" style={{width:262,marginLeft:28}} component='companyName'  label="客户名称" inline={false} onChange={this.onChangeSign} placeholder='请输入社区名称' requireLabel={true}/>


						<KrField grid={1/2} label="订单名称" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
								options={orderList}
								requireLabel={true}
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
	return errors;
}
export default reduxForm({ form: 'OneNewAgreement',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(OneNewAgreement);
