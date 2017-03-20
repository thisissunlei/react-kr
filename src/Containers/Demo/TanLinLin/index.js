
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
			initailPoint : '承德'
		}
	}
	componentWillMount() {
	}

	componentDidMount(){
		
	}
	render(){
		let {mapStyle} = this.props;
		let {initailPoint} = this.state;
		return (
			<div className="demo-tll">
				
				
						
							
							
			              	<KrField name="newuploadImage" 
								component="map" 
								placeholder="例如：北京市1111"
								style={{width:252,height:36}}
								mapStyle={{width:400,height:400}}
								initailPoint ={initailPoint}
							/>
							
						
					
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
