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
		Store.dispatch(Actions.callAPI('order-delete',{id:this.props.orderId})).then(function(response) {
	         _this.onCancel();
	         Message.success('领取成功');
		}).catch(function(err) {
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