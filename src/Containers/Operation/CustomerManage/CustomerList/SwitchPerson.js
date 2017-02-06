import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
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

class SwitchPerson extends Component{
	
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
	onSubmit(params){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(params);
	}

	onChangePerson=(person)=>{
		Store.dispatch(change('switchPerson','receiveId',person.value));
    }
	
	render(){

		let {handleSubmit}=this.props;
		
		return(
				
				<div className='switchP'>
					
                 <form onSubmit={handleSubmit(this.onSubmit)}>
				       
                       <div className='person-switchText'>您即将转移<span>{this.props.customerIds}</span>个客户,操作之后，该客户会转移到对应人员，无法恢复</div>
					   <KrField  left={63} right={72} name="receiveId" style={{marginTop:'12px'}} component="searchLeader" inline={false} label="新负责人" onChange={this.onChangePerson} placeholder='请输入新负责人'/>
					   <Grid style={{marginTop:18}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit"  onTouchTap={this.onSubmit}/></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
								</ButtonGroup>
							</Col>
						</Row>
					   </Grid>

                 </form>
				</div>
					
					
				
			);
	}
	
}
export default reduxForm({form:'switchPerson',enableReinitialize:true,keepDirtyOnReinitialize:true})(SwitchPerson);




