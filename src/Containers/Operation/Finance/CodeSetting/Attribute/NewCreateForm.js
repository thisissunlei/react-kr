
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
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

	 onSubmit(){
		 const {onSubmit} = this.props;
		 
		 onSubmit && onSubmit();

	 }

	 onCancel(){
		 const {onCancel} = this.props;
		
		 onCancel && onCancel();
		 
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField name="propcode" type="text" label="属性编码" /> 
				<KrField name="propname" type="text" label="属性名称" /> 
				<KrField name="proptype" type="select" label="属性类别" options={[
						{value:'PAYMENT',label:'回款'},
					   {value:'INCOME',label:'收入'},
				]} >
				</KrField>
				<KrField name="ordernum" type="text" label="排序号" /> 
				<KrField name="enableflag" component="group" label="是否启用">
                <KrField name="enableflag" label="是" type="radio" value="1"/>
                <KrField name="enableflag" label="否" type="radio" value="0" />
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


export default reduxForm({ form: 'newCreateForm'})(NewCreateForm);
