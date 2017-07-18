import React from 'react';
import {reduxForm} from 'redux-form';
import {
	TabsControl,
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
               <TabsControl>
					
				</TabsControl>
		    </div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin'})(WuShuLin);
