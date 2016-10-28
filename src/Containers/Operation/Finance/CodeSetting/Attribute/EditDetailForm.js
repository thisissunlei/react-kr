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
	Notify
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
		const detail=props.detail;
		console.log('detail',detail)
		
		Store.dispatch(initialize('newCreateForm',detail));

		


	}

	 onSubmit(values){

	 	values = Object.assign({},values);
		var _this = this;

		Store.dispatch(Actions.callAPI('addFinaFinaflowProperty',{},values)).then(function(response){
				Notify.show([{
					message:'编辑成功！',
					type: 'success',
				}]);
				const {onSubmit} = _this.props;
				onSubmit && onSubmit();
		}).catch(function(err){
			console.log('000e',err);
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
				<KrField name="id" type="hidden" label="id"/>
				<KrField name="propcode" type="text" label="属性编码" requireLabel={true}/> 
				<KrField name="propname" type="text" label="属性名称" requireLabel={true} /> 
				<KrField name="proptype" type="select" label="属性类别" options={[
						{value:'PAYMENT',label:'回款'},
					   {value:'INCOME',label:'收入'},
				]} requireLabel={true} >
				</KrField>
				<KrField name="ordernum" type="text" label="排序号"  requireLabel={true}/> 
				<KrField name="enableflag" component="group" label="是否启用" requireLabel={true}>
                <KrField name="enableflag" label="是" type="radio" value="ENABLE"/>
                <KrField name="enableflag" label="否" type="radio" value="DISENABLE" />
              </KrField> 
				<KrField name="propdesc" component="textarea" label="描述"  /> 

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
					</Row>
				</Grid>
				</form>
			
		);
	}
}

const validate = values =>{

		const errors = {}

		if(!values.propcode){
			errors.propcode = '请填写属性编码';
		}

		if (!values.propname) {
			errors.propname = '请填写属性名称';
		}

		if (!values.proptype) {
			errors.proptype = '请填写属性类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}
		if (!values.enableflag) {
			errors.enableflag = '请先选择是否启用';
		}


		return errors
	}
const selector = formValueSelector('newCreateForm');

NewCreateForm = reduxForm({ form: 'newCreateForm',validate, enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);
export default reduxForm({ form: 'newCreateForm',
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCreateForm);
