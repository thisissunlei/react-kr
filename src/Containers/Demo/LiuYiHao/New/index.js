import React from 'react';
import {
	KrField,
    TabCs,
    TabC
} from 'kr-ui';
import {
	numberToSign
} from 'kr/Utils'
import {reduxForm} from 'redux-form';
class New extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state = {
            
		}
	}




	componentDidMount() {}

	render() {

		return (

			<div style = {{height:2000}}>
			
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
