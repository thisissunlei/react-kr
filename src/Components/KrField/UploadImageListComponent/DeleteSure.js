import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';
import './index.less';


export default class DeleteSure extends Component{
	
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
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
				
				<div className='list-delete'>
					<p className='sureIncome'>确定删除该图片吗？</p>
					

					  <div style={{paddingLeft:'100px'}}>
									<div  className='ui-btn-center' style={{display:'inline-block',marginRight:'30px'}}><Button  label="确定"  onTouchTap={this.onSubmit}/></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
								
                     </div>

				</div>
					
					
				
			);
	}
	
}