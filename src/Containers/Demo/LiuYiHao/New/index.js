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

		console.log(numberToSign(410324199403041456),">>>>>>>")

	}




	componentDidMount() {}

	render() {
		return (
			<div style = {{height:2000}}>
				<KrField
					grid={1}
					style={{width:262,display:'block'}}
					name="area"
					component="selectTree"
					label="职务类型名称"
					requireLabel={true}
				/>
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
