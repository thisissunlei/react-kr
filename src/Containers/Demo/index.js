import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {
	Checkbox,
	DatePicker,
	Form,
	KrField,
	Table,
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
	DemoComponent,
	Tabs,
	Tab
} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';

import { hashHistory ,History} from 'react-router';

export default class Demo extends Component{

	 static contextTypes = {
	  	router: React.PropTypes.object.isRequired
    }

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);

		console.log('---',this.context.router);

	}

	onSubmit(value){
		console.log('----',value)
		// window.location.hash = 'demo';
		// //this.context.router.replace(location.href);;
	 //    history.replace(location)
		//hashHistory.refresh();
	}


	show = ()=>{

		console.log('click');


		Message.show('hahah');
	}



	render(){
		const list = [{a:1},{b:2},{c:3},{d:5}];


		return(
			<div>

				<Title value="haah "/>




					<Section title="demo" description="" >

							<Button label="show"  onTouchTap={this.show}/>

					<Input type="text" maxLength={10} disabled={true}/>
						<CheckboxGroup name="demo" options={[{
							label:'是',
							value:'yes'
						},
						{
							label:'否',
							value:'no'
						}
					]}
					/>


					<DemoComponent/>

					
					</Section>

					<Tabs className="tabs">
						<Tab label="01">
							<span>1234dsaasd</span>
							<Button label="show"  onTouchTap={this.show}/>
						</Tab>
						<Tab label="02">
							<span>dsr3242aasd</span>
							<DemoComponent/>
						</Tab>
						<Tab label="03">
							<span>1234dsaasd</span>
							<Button label="show"  onTouchTap={this.show}/>
							<div>
								<span>dsr3242aasd</span>
								<DemoComponent/>
							</div>
						</Tab>
						<Tab label="04">
							<span>dsr3242czcxzcaasd</span>
							<DemoComponent/>
						</Tab>
					</Tabs>
			</div>

		);

	}

}
