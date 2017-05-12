import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
    Message

} from 'kr-ui';

class DelEquipment extends Component{

		

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		
		
	}
	onSubmit = (values) => {

		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}

	onClose = () => {
		const {onClose} = this.props;
		onClose && onClose();
	}

	
	
	componentWillReceiveProps(nextProps){

	}
	


	render(){
		
		const { error, handleSubmit, pristine, reset} = this.props;
		
		return (

			<form className="m-del-equipment" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div style = {{textAlign:"center",marginTop:25}}>确定要删除吗？</div>
				<Grid style={{marginTop:0,marginRight:0,marginTop:50,marginBottom:10}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit" />
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onClose} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
						
						    
			</form>
		);
	}
}
const validate = values =>{

		const errors = {};

		return errors
	}
export default reduxForm({ form: 'DelEquipment',validate})(DelEquipment);
