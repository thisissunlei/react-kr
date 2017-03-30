import React, {
	Component
} from 'react';

import {
	Actions,
	Store,
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Fields,
	change
} from 'redux-form';


import {
	Section,
	PlanMap,
	Dialog,
	Button,
	Editor,
	KrField
} from 'kr-ui';

class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);
	}

	onSubmit = (values) =>{
		console.log('values',values);
	}

	render() {

		const {handleSubmit} = this.props;

		return (
			 <div>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
				 	<KrField component="editor" label="承租方：" name="htmlnnn" defaultValue="<p><h1>一个两个</h1></p>"/>
					<Button label="click" type="submit" />
				 </form>
		 </div>
		);
	}
}
export default ZhangQu = reduxForm({
	form: 'admitCreateForm',
})(ZhangQu);
