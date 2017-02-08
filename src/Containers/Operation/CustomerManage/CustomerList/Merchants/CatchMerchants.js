import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	Button,
	Section,
	Grid,
	Row,
	Col,
	KrField,
	ButtonGroup,
} from 'kr-ui';

export default class CatchMerchants extends Component{
	
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
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	
	render(){

		
		
		return(
				
				<div>
					  <p className='mer-catch'>是否领取选中的<span>{this.props.customerIds}</span>个客户到个人客户列表中？</p>
					

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