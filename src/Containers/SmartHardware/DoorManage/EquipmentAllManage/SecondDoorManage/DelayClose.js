


import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import "./index.less";

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err
} from 'kr-ui';
class DelayClose extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			detail : {}
		}
	}
	

	componentDidMount(){
		this.setState({
			detail : this.props.detail
		})
	}


	onCancel=()=>{
		State.openDelayCloseDialog= !State.openDelayCloseDialog;
	}
  	
	
	onSubmit=(values)=>{

		let {detail} = this.state;
        let _this =this;
		var param = {
			deviceId : detail.deviceId,
			seconds : values.seconds
		}
		Http.request('setDelayCloseTime',{},param).then(function(response) {
			_this.onCancel();
			Message.success("设置延迟锁门成功");
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	render(){
		let {detail} = this.state;
        const { error, handleSubmit, reset} = this.props;
		return(
			<div className="delay-close-form">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<KrField 
						name="seconds" 
						type="text" 
						label="锁门延迟间隔(s)：" 
						requireLabel={true} 
						inline={false}
						style={{width:350,marginTop:15}}
					/>

					<Grid>
						<Row style={{marginTop:15,textAlign:'center'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	var reg  =/^([1-5]?)$/;
	if(!values.seconds){
		errors.seconds = '请填写延迟锁门间隔';
	}else if(!reg.test(values.seconds)){
		errors.seconds = '延迟间隔必须为≥1，≤5的整数';
	}

	return errors;
}
export default DelayClose = reduxForm({
	form: 'DelayClose',
	validate,
})(DelayClose);
