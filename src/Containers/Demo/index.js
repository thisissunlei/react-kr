import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

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
	KrForm,
	DemoComponent,
	Field,
	FieldItem,
} from 'kr-ui';

export default class Demo extends Component{

	 static contextTypes = {
	  	router: React.PropTypes.object.isRequired
    }

	constructor(props,context){
		super(props, context);

		this.state = {
			userNameDefaultValue:''
		}

	}

	componentDidMount(){
		/*
		this.setState({
			userNameDefaultValue:'aahahh'
		});
		*/
	}


	render(){
		return(
			<div>

					<Section title="demo" description="" >

						<KrForm name="demoForm" onSubmit={function(values){
									console.log('values',values);
							}} >



									<FieldItem name="dame" label="其它" component="select" requiredValue={true} errors={{requiredValue:'请填写时间'}} options={[{label:'请选择',value:''},{label:'北京',value:'1'}]}/>

								<FieldItem name="de2ame" label="其它" component="date" requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

							<FieldItem name="demn22ame" label="其它:" component="file"  requiredValue={true} errors={{requiredValue:'必填'}}/>

						<FieldItem name="demn3322342ame" type="text" label="其它" component="input"/>

							<FieldItem name="demn33ame" label="其它:" component="labelText" value="你的直接" inline={false}/>

								<FieldItem name="demn3ame" label="其它:" component="group" value="你的直接" inline={false}/>

									<FieldItem name="username" type="text" label="用户名" component="input" defaultValue={this.state.userNameDefaultValue} requiredValue={true} minLength={10} errors={{minLength:'用户名最少为10字符',requiredValue:'用户名为必填项'}}/>
								<FieldItem name="password" type="text" label="密码" component="input"  requiredValue={true} maxLength={20} errors={{maxLength:'最大为20个字符',requiredValue:'要有密码'}}/>

							<Button type="submit" label="ok"/>
						</KrForm>


					</Section>

			</div>

		);

	}

}
