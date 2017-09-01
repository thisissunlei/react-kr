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
		onSubmit && onSubmit(); 
	}
	componentDidMount() {
		Store.dispatch(change('EditFiled','data',tableData));
		Store.dispatch(change('EditFiled','datadetail',tableData));
		
	}
	


	render() {


		let {handleSubmit}=this.props;

		return (
			<form autocomplete="off" onSubmit={handleSubmit(this.onSubmit)} >
				
				 <TabelEdit 
				 	name = "data" 
					toolbar = {true}
					checkbox = {true}
					
				 >
					 <FRow name = "age"  type = "tableEdit"  label = "选项文字" />
					 <FRow name = "name" type = "tableEdit" label = "选项值" />
					 <FRow name = "other" type = "tableEdit" label = "排序号" />
					 <FRow name = "checked" type = "checkBox" label = "是否默认" />
				 </TabelEdit>
				 <Button
					label="提交"
					type="submit"
					height={34}
					width={90}
				/>
				 <TabelEdit 
				 	name = "datadetail" 	
				 >
					 <FRow name = "age"  type = "label"  label = "选项文字" />
					 <FRow name = "name" type = "label" label = "选项值" />
					 <FRow name = "sother" type = "label" label = "排序号" />
					 <FRow name = "checked" type = "checkBox" disabled = "disabled" label = "是否默认" />
				 </TabelEdit>
			</form>

		);
	}
}

export default reduxForm({
	form: 'EditFiled'
})(EditFiled);
