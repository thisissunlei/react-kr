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

	constructor(props, context) {
		super(props, context);

		State.getBasicInfo();
	}

	render() {

		return (

			<div>
			<Section title="hdsjf">
			ffffff
			</Section>
			
			{State.name}
      </div>

		);
	}
}