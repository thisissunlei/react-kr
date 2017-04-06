import React, {
	Component
} from 'react';


import {
	Section,
	Dialog,
	KrField,
} from 'kr-ui';

import {reduxForm,Field} from 'kr/Utils/ReduxForm';

class DemoComponent extends React.Component {
		constructor(props){
			super(props);
		}
		onChange = (event)=>{

			const {input} = this.props;
			var value = event.target.value;

			input.onChange && input.onChange(value);
		}

		render(){
			const {input,meta} = this.props;
			return (
				<div>
					<input name={input.name} value={input.value}  onChange={this.onChange} onBlur={input.onBlur}/>
					{meta.touched && meta.error}
				</div>
			)
		}

	}

	class ZhangQu extends Component {

		constructor(props, context) {
			super(props, context);

		}

		onSubmit = (values)=>{
				console.log(values);
		}

		render() {

				const {handleSubmit} = this.props;
			return (
				<div>

					<form onSubmit={handleSubmit(this.onSubmit)} >


						<button type="submit" >submit</button>

					</form>

				</div>

			);
		}
	}

	const validate = values => {
		const errors = {}
		if (!values.username) {
			errors.username = '用户名称必须填写'
		}

		if (!values.email) {
			errors.email = 'Required'
		}
		return errors
	}


	export default reduxForm ({form:'demoFormddd',validate})(ZhangQu);
