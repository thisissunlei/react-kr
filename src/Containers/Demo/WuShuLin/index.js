import React from 'react';
import {reduxForm} from 'redux-form';
import {
	SwitchSlide
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
              <SwitchSlide 
			   leftData={['nnn','gg','hhh','ns']}
			   control='single'
			  />
		    </div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin'})(WuShuLin);
