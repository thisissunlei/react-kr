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
		this.state = {

			tab: '',
		}

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
	changelable=()=>{
		this.setState({tab:'计划表'})
	}
	changelabels=()=>{
		console.log('active');
		this.setState({tab:'平面图'})
	}



	render(){
		const list = [{a:1},{b:2},{c:3},{d:5}];
		let {tab} = this.state;


		return(
			<div>

				<Title value="haah "/>




					<Section title="demo" description="" >

							<Button label="show"  onTouchTap={this.show}/>

					<Input type="text" maxLength={10} errors={{
							maxLength:'不能操作'
						}}/>
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
						<Tab label="计划表" >
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>

						</Tab>
						<Tab label="平面图1" >

						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>


						</Tab>
						<Tab label="计划表我"  >
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>
							<span style={{display:'block'}}>fdsfsdf</span>

						</Tab>
						<Tab label="平面图"  >

						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>
						  <span style={{display:'block'}}>fdsfsczczxcdf</span>


						</Tab>
					</Tabs>

			</div>

		);

	}

}
