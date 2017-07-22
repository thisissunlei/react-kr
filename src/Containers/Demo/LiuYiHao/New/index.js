import React from 'react';
import {
	KrField
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
				<KrField
					grid={1/2}
					style={{width:262}}
					name="depId"
					component="selectTree"
					label="部门"
					requireLabel={true}
				/>
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
