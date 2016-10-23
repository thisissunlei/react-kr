import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';


class DismantlingForm  extends Component{


	


	

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);

		
		
	}

	componentDidMount(){
		//const {detail}= this.props;
		
	}



	onSubmit(form){
		const {onSubmit} = this.props;

		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;

	
	return (

		<form onSubmit={handleSubmit(this.onSubmit)}> 
			<div style={{textAlign:"center",marginBottom:'20px'}}>XX公司合同到期时间为2017.9.1</div>
			<KrField name="sdf"component="select" grid={1} label="实际的撤场时间为" value=""/>
			<Grid>
				<Row style={{marginTop:30}}>
				<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} /> </Col>
				<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
			</Grid>
		</form>
								
								
		 );
	}
}

export default reduxForm({form:'DismantlingForm'})(DismantlingForm);

