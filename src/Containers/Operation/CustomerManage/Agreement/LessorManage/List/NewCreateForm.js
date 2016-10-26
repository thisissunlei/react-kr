
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		
	}

	 onSubmit(values){
		 var _this = this;
		Store.dispatch(Actions.callAPI('addFnaCorporation',{},values)).then(function(response){
				Notify.show([{
					message:'新建成功！',
					type: 'success',
				}]);
				 const {onSubmit} = _this.props;
				 onSubmit && onSubmit();
 			}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
		

	 }

	 onCancel(){
		 const {onCancel} = this.props;
		
		 onCancel && onCancel();
		 
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField name="corporationName" type="text" label="出租方名称" requireLabel={true}/> 

							<KrField name="enableflag" component="group" label="是否启用" requireLabel={true}>
								<KrField name="enableflag" label="是" component="radio" type="radio" value='1'/>
								<KrField name="enableflag" label="否" component="radio" type="radio" value='0' />
							</KrField>
							
							<KrField name="corporationAddress" component="text" type="text" label="详细地址" requireLabel={true}/> 
							 <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 


							<Grid style={{marginTop:30}}>
								<Row style={{marginTop:30}}>
								<Col md={8}></Col>
								<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={2}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
								</Row>
							</Grid>

				</form>
		);
	}
}


export default reduxForm({ form: 'newCreateForm'})(NewCreateForm);
