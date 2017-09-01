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
var tableData = [{name:'1',time:+new Date()},
			{name:'2',time:+new Date()},
			{name:'3',time:+new Date()},
			{name:'4',time:+new Date()},
			{name:'5',time:+new Date()},
			{name:'6',time:+new Date()},
			{name:'7',time:+new Date()}
		];
class EditTable extends React.Component {


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
				<FdTabel
					name = "tableData"
					isFold = {true}
	 				initFoldNum = "3"
				>
					<FRow name = "name" label = "年龄" />
					<FRow 
						type='date'
						name='time' 
						label='日期' 
						format="yyyy-mm-dd" 
					/>
					
				</FdTabel>

			</form>

		);
	}
}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
