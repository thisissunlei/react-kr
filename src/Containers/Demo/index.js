import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Notify,
	Button,
	KrField,
	Form,
	BreadCrumbs,
	Title,
} from 'kr-ui';
import './index.less'


class CustomerList extends Component {
	static childContextTypes = {
		onSetCommunity: React.PropTypes.func.isRequired,
		communityId: React.PropTypes.string.isRequired,
	}

	
	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: ''
		}

	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));

	}

	

	render() {
		
		return (
			<div>23
			<KrField grid={1/2} label="所属地区" name="districtId"  style={{width:252,marginLeft:15}} component="tree" />
			</div>
		);
	}
}
export default reduxForm({ form: 'CustomerList',enableReinitialize:true,keepDirtyOnReinitialize:true})(CustomerList);
