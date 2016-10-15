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


 class SearchForm extends Component{

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

				<KrField name="corporationName" type="text" label="出租方名称" /> 

				<KrField name="corporationAddress" component="text" type="text" label="详细地址"/> 
				<KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 

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


export default reduxForm({ form: 'searchForm'})(SearchForm);
