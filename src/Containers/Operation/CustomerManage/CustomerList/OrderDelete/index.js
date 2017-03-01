import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Button,
	Section,
	Grid,
	Row,
	Col,
	KrField,
	ButtonGroup,
	Message
} from 'kr-ui';

import './index.less';
import flushData from "../LookCustomerList/State";

import personal from "../Personal/State";
import signedClient from "../SignedClient/State";
export default class OrderDelete extends Component{
	
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          
		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(){
		var _this=this;
		let {operType}=this.props;
		Store.dispatch(Actions.callAPI('order-delete',{id:this.props.orderId})).then(function(response) {
	         flushData.orderList(_this.props.listId);
	         _this.onCancel();
	         Message.success('删除成功');
		}).catch(function(err) {
			 _this.onCancel();
			 Message.error(err.message);
		});	
	}
	
	render(){

		
		
		return(
				
				<div>
					  <p className='m-delete'>确定删除所选订单吗？</p>
					

					   <Grid style={{marginTop:53}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit"  onTouchTap={this.onSubmit}/></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
								</ButtonGroup>
							</Col>
						</Row>
					   </Grid>


				</div>
					
					
				
			);
	}
	
}