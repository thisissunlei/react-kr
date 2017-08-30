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
	FRow,
	TabelEdit,
	Button
} from 'kr-ui';
var tableData =[
	
	{name:'1liu',age:12,other:'1什么鬼',checked:false},
	{name:'2liu',age:13,other:'2什么鬼',checked:true},
	{name:'3liu',age:14,other:'3什么鬼',checked:false},
	{name:'4liu',age:15,other:'4什么鬼',checked:false},
	{name:'5liu',age:16,other:'5什么鬼',checked:false},
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

    onSubmit=(values)=>{
		const {
			onSubmit
		} = this.props;
		console.log(values,"PPPPPP")
		onSubmit && onSubmit(); 
	}
	componentDidMount() {
		Store.dispatch(change('EditFiled','data',tableData));
	}
	


	render() {


		let {handleSubmit}=this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				
				 <TabelEdit name = "data" />
				 <Button
					label="提交"
					type="submit"
					height={34}
					width={90}
				/>
			</form>

		);
	}
}

export default reduxForm({
	form: 'EditFiled'
})(EditFiled);
