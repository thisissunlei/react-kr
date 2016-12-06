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
	Tooltip,
	KrForm,
	DemoComponent,
	Field,
	FieldControl,
} from 'kr-ui';

import {
	FlatButton,
} from 'material-ui';
import './index.less';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';

import { hashHistory ,History} from 'react-router';

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

									<FieldControl name="de" label="其它" component="searchPersonel" requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

									<FieldControl name="dame" label="其它" component="select" requiredValue={true} errors={{requiredValue:'请填写时间'}} options={[{label:'请选择',value:''},{label:'北京',value:'1'}]}/>

								<FieldControl name="de2ame" label="其它" component="date" requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

							<FieldControl name="demn22ame" label="其它:" component="file"  requiredValue={true} errors={{requiredValue:'必填'}}/>

						<FieldControl name="demn3322342ame" type="text" label="其它" component="input"/>

							<FontIcon
						      className="icon-basis"
						      style={{marginRight:'20px',color:'#499df1',fontSize:20}}
						    />
					
						 <FlatButton icon={<FontIcon className={'icon-basis'} />} style={{color:'#499df1',height:36,width:100}} />
						<div className="tooltip" >
							<Tooltip place="top">
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
							</Tooltip>
						</div>
						<div className="tooltip" style={{marginTop:40}}>
							<Tooltip place="bottom"  backgroundColor="#fff" ShadowColor="#499df1" boxShadow="0 0 3px #499df1">
								<p>12345</p>
								<p>12345</p>
								<p>12345</p>
								<a href="https://www.baidu.com" target="_blank">baidu1</a>
							</Tooltip>
						</div>
							<FieldControl name="demn33ame" label="其它:" component="labelText" value="你的直接" inline={false}/>

								<FieldControl name="demn3ame" label="其它:" component="group" value="你的直接" inline={false}/>
									<FieldControl name="username" type="text" label="用户名" component="input" defaultValue={this.state.userNameDefaultValue} requiredValue={true} minLength={10} errors={{minLength:'用户名最少为10字符',requiredValue:'用户名为必填项'}}/>
								<FieldControl name="password" type="text" label="密码" component="input"  requiredValue={true} maxLength={20} errors={{maxLength:'最大为20个字符',requiredValue:'要有密码'}}/>

							<Button type="submit" label="ok"/>
						</KrForm>


					</Section>
			</div>

		);

	}

}
