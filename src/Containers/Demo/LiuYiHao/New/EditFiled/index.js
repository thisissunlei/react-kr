import React from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

import {
	KrField,
	FdTabel,
	FContent,
	FRow
} from 'kr-ui';
var tableData = [
	{name:'1liu',age:12,other:'1什么鬼'},
	{name:'2liu',age:13,other:'2什么鬼'},
	{name:'3liu',age:14,other:'3什么鬼'},
	{name:'4liu',age:15,other:'4什么鬼'},
	{name:'5liu',age:16,other:'5什么鬼'},
	]
class EditFiled extends React.Component {


	constructor(props) {
		super(props);
	}

	 onCancel=()=>{
		 const {
			onCancel
		} = this.props;
		onCancel && onCancel(); 
	 }

    onSubmit=()=>{
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(); 
	}
	componentDidMount() {
		Store.dispatch(change('EditTable','tableData',tableData));
	}
	


	render() {


		let {handleSubmit}=this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				
				 <KrField name="value" component="table" >
				     <KrField name="name" editType = "tableEdit" component="editLabelText" />
                 </KrField>
			</form>

		);
	}
}

export default reduxForm({
	form: 'EditFiled'
})(EditFiled);
