import React, {
	Component,
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	Menu,
	MenuItem,
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	SplitLine,
	DotTitle,
	KrField,
	LabelText,
	PaperBack,
	KrDate,
	Title,
} from 'kr-ui';

import {
	Agreement
} from 'kr/PureComponents';

import State from './State';
import './index.less';

@observer
export default class JoinPrint extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		let params = this.context.router.params;

		State.getBasicInfo(params);
	}

	render() {

		return (

			<div className="print-section">
			
			<Agreement.Print.Header data={State.data}/>
			<Agreement.Print.BaseInfo/>
			<Agreement.Print.Station/>
			
			<Agreement.Print.Footer/>
			
      		</div>

		);
	}
}