import React, {
	Component,
	PropTypes
} from 'react';

import './index.less';



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

import State from './State';

@observer
export default class JoinPrint extends Component {

	constructor(props, context) {
		super(props, context);

		State.getBasicInfo();
	}

	render() {

		return (

			<div>
			{State.name}
      </div>

		);
	}
}