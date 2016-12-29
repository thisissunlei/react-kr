import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import nzh from 'nzh'
import {
	Checkbox,
	DatePicker,
	Form,
	KrField,
	Table,
	Tabs,
	Tab,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	FontIcon,
	SearchForms,
	Title,
	Input,
	CheckboxGroup,
	RadioGroup,
	Message,
	Tooltip,
	KrForm,
	DemoComponent,
	Field,
	FieldControl,
	InputDate,
	SnackTip,
	CircleStyle
} from 'kr-ui';


import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Fields,
	change
} from 'redux-form';


import './index.less';

import LocationMap from 'kr-ui/Global/LocationMap';

import {
	List,
	ListItem
} from 'material-ui/List';

import {
	hashHistory,
	History
} from 'react-router';

export default class Demo extends Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			userNameDefaultValue: ''
		}

	}


	componentDidMount() {}



	render() {
		var nzhcn = nzh.cn;
		console.log(nzhcn.encodeS(100111.09));
		console.log(nzhcn.encodeB(100111.09));
		return (
			<div>
			</div>

		);
	}
}