import { default as ZhangQu } from './ZhangQu';
import React, { Component } from 'react';
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
	Dictionary,
	CommunityList
} from 'kr-ui';


import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Fields,
	change,
} from 'redux-form';


// import './index.less';

import LocationMap from 'kr-ui/Global/LocationMap';

import {
	List,
	ListItem
} from 'material-ui/List';

import {
	hashHistory,
	History
} from 'react-router';


class Demo extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);

		this.state = {
			userNameDefaultValue: '',
			listArr :[{L:600,price:20},{L:300,price:30}],
			priceNow : 20 
		}
	}
	onSubmit=(values)=>{

	}
	onChangeTitle=(showTitle)=>{
		console.log("111")
	}
	onClick=()=>{
		console.log("111");
	}
	componentDidMount() {}
	render() {
		const { error,handleSubmit,pristine,reset,detail} = this.props;
		const {listArr,priceNow}=this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:100}}>
			<div>
				<input type="text" defaultValue="111" name="communityName" onClick={this.onClick} id="thisInputs" placeholder="请输入"/>
				<input type="text" name="communityName" defaultValue="222"   />
				<input type="text" name="communityName" defaultValue="333"     />
				<input type="text" name="communityName" defaultValue="444"    />
			</div>
			</form>		

		);
	}
}
export default Demo = reduxForm({
	form: 'Demo',
})(Demo);
