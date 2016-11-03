import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,

	 }

	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentDidMount(){
		let {detail} = this.props;
		detail.enableflag = detail.enableflag.toString();
		Store.dispatch(initialize('newCreateForm',detail));
	}

	 onSubmit(values){

	 	values = Object.assign({},values);
	 	values.enableflag = Boolean(values.enableflag)?1:0;

	 	values = Object.assign({},values);
		var _this = this;

		Store.dispatch(Actions.callAPI('editFnaCorporation',{},values)).then(function(response){
				Notify.show([{
					message:'编辑成功！',
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

		const { error, handleSubmit, pristine, reset,detail} = this.props;


		console.log('detail',detail);

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField name="corporationName" type="text" label="出租方名称" /> 

							<KrField name="enableflag" component="group" label="是否启用">
								<KrField name="enableflag" label="是" component="radio" type="radio" value="true"/>
								<KrField name="enableflag" label="否" component="radio" type="radio" value="false" />
							</KrField>
							
							<KrField name="corporationAddress" component="text" type="text" label="详细地址"/> 
							 <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 


							<Grid style={{marginTop:30}}>
								<Row>
								<Col md={12} align="right">
									<ButtonGroup>
										<Button  label="确定" type="submit" primary={true} />
										<Button  label="取消" type="button"  onTouchTap={this.onCancel} />
									</ButtonGroup>
								</Col>
								</Row>
							</Grid>

				</form>
			
		);
	}
}


export default reduxForm({ form: 'newCreateForm',
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCreateForm);
