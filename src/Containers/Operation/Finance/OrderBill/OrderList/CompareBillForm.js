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
		
		
		Store.dispatch(initialize('newCreateForm',detail));

		


	}

	 onSubmit(values){
		var _this = this;
		const {detail} = this.props;
		values.id = detail.id; //get请求

		Store.dispatch(Actions.callAPI('getFinaDataDetailAdd',values)).then(function(response){
			
		}).catch(function(err){
			
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});
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

				<KrField name="id" type="hidden" label="id"/>
                <Row>
					<Col md={2}> <KrField  label="对账期间" type="labelText"/> </Col>
                    <Col md={2}> <KrField  label="起始日期" type="labelText" /> </Col> 
					<Col md={2}> <KrField  component="Date"  name="startDate" type="date"/> </Col>
					<Col md={2}> <KrField  label="结束日期" type="labelText" /> </Col> 
					<Col md={2}> <KrField  component="Date"  name="endDate" type="date"/> </Col>
			     </Row>
				
				
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


export default reduxForm({ form: 'newCreateForm',
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCreateForm);
