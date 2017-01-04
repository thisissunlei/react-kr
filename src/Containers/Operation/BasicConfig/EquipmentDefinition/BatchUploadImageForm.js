
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	UploadImage
} from 'kr-ui';
class BatchUploadImageForm extends Component{
	constructor(props,context){
		super(props,context);
		// this.state={
		// 	locationOpen:false
		// }
	}
	render(){
		return(
			<div style={{padding:'35px 0 0 35px'}}>
				<UploadImage/>
			</div>
		);
	}
}
// const validate = values=>{
// 	const errors={};
// 	if(!values.communityName){
// 		errors.communityName = '社区名称为必填项';
// 	}
// 	if(!values.floor){
// 		errors.floor = '楼层为必填项';
// 	}
// 	if(!values.showTitle){
// 		errors.showTitle = '展示标题为必填项';
// 	}
// 	return errors;
// }
export default BatchUploadImageForm = reduxForm({
	form: 'BatchUploadImageForm',
	// validate,
})(BatchUploadImageForm);