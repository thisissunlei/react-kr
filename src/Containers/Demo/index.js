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
	SnackTip

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


 class Demo extends Component{

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			userNameDefaultValue: ''
		}

	}

	componentDidMount() {
		/*
		this.setState({
			userNameDefaultValue:'aahahh'
		});
		*/
	}



	show = () => {

		console.log('click');


		Message.show('hahaha 爱的范德萨发几块了');
	}

	ll = (values) => {
		console.log(values, "???");
	}

	list = (value) => {
		console.log('city', value);
	}
	onSubmit=(value)=>{
		console.log('demo',value);
	}




	render(){
		let list = [
			{label:'选择公司1',value:1},
			{label:'选择公司2',value:2},
			{label:'选择公司3',value:3},
			{label:'选择公司4',value:4},
			{label:'选择公司5',value:5},
		]
		return(

			<div>

					<Section title="demo" description="" >
						<KrField oldText={"123"} label="订单名称"  type="text" component="input" disabled={true} />
					</Section>
			</div>

		);
	}
}

Demo = reduxForm({
	form: 'admitCreateForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Demo);

export default connect()(Demo);
