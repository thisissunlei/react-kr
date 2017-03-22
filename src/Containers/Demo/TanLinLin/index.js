
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

	Editor

} from 'kr-ui';
import './index.less';


export default class TAnLinLin extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true,
			checkedStations:[],

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

			<div>
				<Editor toolbars={[['fullscreen', 'source', 'undo', 'redo', 'bold']]}/>
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
