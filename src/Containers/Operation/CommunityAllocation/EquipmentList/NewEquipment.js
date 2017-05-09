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


class NewEquipment extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onClose:React.PropTypes.func,
	}

	constructor(props){
		super(props);


	}
	onSubmit = (values) => {

		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
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

			<form className="m-new-equipment" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div style = {{textAlign:"center"}}>
					<KrField grid={1/1} label="设备名称:" name="name" type="text" style={{width:316,marginLeft:-44,}} placeholder='设备名称' inline={true}/>
				</div>
				<Grid style={{marginTop:0,marginRight:0,marginTop:30,marginBottom:10}}>
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
		let name = values.name;
		
		if(!name){
			errors.name="设备名称不能为空！"
		}
		if(name && name.length>=50){
			errors.name="设备名称最长为50字符！"
		}


		return errors
	}
export default reduxForm({ form: 'NewEquipment',validate})(NewEquipment);
