import React from 'react';
import {reduxForm} from 'redux-form';
import {
	SwitchSlide,
	KrField
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
			  <KrField
					grid={1/2}
					style={{width:262}}
					name="depId"
					letfData={[{label:'nnn'},{label:'gg'},{label:'hhh'},{label:'ns'}]}
					component="switchSlide"
					label="部门"
					control='single'
					requireLabel={true}
				/>
		    </div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin'})(WuShuLin);
