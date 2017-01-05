import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

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
	CircleStyle,
	SearchForm,
	SnackTip,
	Dictionary
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
var data="123";

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


	componentDidMount(){
		console.log(this.refs.m,"======")

	}
	mOver=(event)=>{
		console.log(event,"++++++++",data)
	}


	render() {
		return (
			<div>
				<h1 ref="m" onMouseOver={this.mOver}>1</h1>
				<h1 ref="m">2</h1>
				<h1 ref="m">3</h1>
				<h1 ref="m">4</h1>
			</div>

		);
	}
}
