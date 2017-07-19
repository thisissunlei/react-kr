import React from 'react';
import {reduxForm} from 'redux-form';
import {
	TabC,
	TabCs
} from 'kr-ui';
import './index.less';
class WuShuLin extends React.Component {

	constructor(props, context) {
		super(props, context);

    }



	componentDidMount() {

	}





	render() {

		let initStyle={
			color:'#4990E2',
			background:'#EEF2F5',
			border: '1px solid #E1E6EB',
			borderRadius: '4px 4px 0 0'
		}
        
		let activeStyle={
			color:'#666666',
			background:'#fff',
			border: '1px solid #E1E6EB',
			borderRadius: '4px 4px 0 0'
		}

		return (
			<div>
               <TabCs
			   	initStyle={initStyle} 
				activeStyle={activeStyle}
			   >
				  <TabC label='基本信息'> 
					  1
				  </TabC> 
				  
				  <TabC label='个人信息'> 
					  <div>23</div>
				  </TabC> 

				  <TabC label='工作信息'> 
					  <div>45</div>
				  </TabC> 
			  </TabCs>
		    </div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin'})(WuShuLin);
