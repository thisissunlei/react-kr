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
			<div style = {{height:2000,background:"#fff"}}>
			<TabCs
					  isDetail='iconTab'
					  label = "全部数据"
			      >
				  <TabC label='基本信息'> 
					  <h1>344</h1>
				  </TabC> 
				  
				  <TabC label='个人信息'> 
					 <h1>asda</h1>
				  </TabC> 

				  <TabC label='工作信息'> 
					 <h1>3344</h1>
				  </TabC> 
			  </TabCs>
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
