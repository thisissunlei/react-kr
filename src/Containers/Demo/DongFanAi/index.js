import React from 'react';

import {
	KrField,
} from 'kr-ui';
import {
	reduxForm,
	change
} from 'redux-form';
import Header from "../../Header"
import './index.less';

class DongFanAi extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
			
	        
		}
		
	}



	 
	render() {
		
		
		return (
			<div className="ui-header-demo">
				<div className="u-header-sidebar">
					<span className="u-header-sidebar-icon u-header-icon-heng"></span>
				</div>
				<div className="u-header-logo"></div>
				<Header />


			</div>

		);
	}
}
export default reduxForm({
	form: 'dongfanfi'
})(DongFanAi);
