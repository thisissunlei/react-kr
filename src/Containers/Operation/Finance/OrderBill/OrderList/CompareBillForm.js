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
import ConfirmBillDetail from './ConfirmBillDetail';



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

		const detail = this.props.detail;
		
		
		Store.dispatch(initialize('newCreateForm',detail));




		this.state = {  //提交params
			params:{
				startDate:'',
				endDate:'',
				id:detail.id
			}
		}

		


	}
	componentDidMount(){
	}

	 onSubmit(params){  //获取提交时的params

 		
 		 const {detail} = this.props;

  
 		 params.id = detail.id;  

         		  

		 this.setState({  
			params
		});




		
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
		 
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		
        
		return (


			<div>

			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField name="id" type="hidden" label="id"/>
                <Row>
					<KrField  label="对账期间" type="labelText" grid={1/3}/>
                
					<KrField  component="Date"  name="startDate" type="date" grid={1/3}/>
				
					<KrField  component="Date"  name="endDate" type="date" grid={1/3}/>
			     </Row>
				
				
				<Grid style={{marginTop:10}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
					</Row>
				</Grid>
				</form>


				<ConfirmBillDetail  params={this.state.params} onCancel={this.onCancel}/>

			
			</div>

		);

	}
}


export default reduxForm({ form: 'newCreateForm',
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCreateForm);
