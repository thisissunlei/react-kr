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
	SnackTip,
	CircleStyle,
	Drawer
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
			userNameDefaultValue: '',
			open:false
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
    
   
   click=()=>{
    this.setState({
		 open:!this.state.open
	 }); 
   }

	render() {
		return (
			<div>
                   <Drawer open={this.state.open} width={200} openSecondary={true}>
                     <div onClick={this.click}>eerer</div>
                   </Drawer>

                   <div onClick={this.click}>wsl</div>

			        <SnackTip style={{'background':'#499df1'}}  open={true} title='123'/>

					<Section title="demo" description="" >
						<form>
						<KrField label="订单名称"  name="nn" component="groupCheckbox" defaultValue={[{label:'haha',checked:false,value:'haha'},{label:'yayay',value:'ss',checked:true}]} />

						</form>
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
