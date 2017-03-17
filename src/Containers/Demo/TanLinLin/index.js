
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';

 class NewCreateForm extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}

	render(){
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}];
		let partakeMan =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}]
		return (
			<div className="new-create-activity">
				
				
						<div className="activity-detail-info">
							
							
			              	<KrField name="newuploadImage" 
								component="map" 
								placeholder="例如：北京市"
								style={{width:252,height:36}}
							/>
							
							
						</div>
					
		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}
	
	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }


	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
