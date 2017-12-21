import React from 'react';
import { reduxForm } from 'redux-form';
import {
	InputNumber
} from 'kr-ui';
import './index.less';

class WuShuLin extends React.Component {

	constructor(props, context) {
		super(props, context);
	}


	componentDidMount() {

	}


	render() {
	
		return (
			<div>
			   <InputNumber max={5} min={-1}></InputNumber>
			</div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin' })(WuShuLin);
