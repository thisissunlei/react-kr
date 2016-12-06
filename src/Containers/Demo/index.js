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
		let list = [{a:1},{b:1},{c:3},{s:9},{e:2}]
		return(
			<div>

					<Section title="demo" description="" >
							<span className="icon-basis">fff</span>
							<FontIcon className="icon-basis" color={'#499df1'}/>


							<FontIcon
						      className="icon-basis"
						      style={{marginRight:'20px',color:'#499df1',fontSize:20}}
						    />
						    <ul>
						    	{list.map((item,index)=>{
						    		return (
						    			<li key={index} className='tooltip-li'>
						    				<div>
						    				{index}
							    				<Tooltip place="right">
													<p>12345</p>
													<p>12345</p>
													<p>12345</p>
													<p>12345</p>
													<p>12345</p>
													
												</Tooltip>
						    				</div>

						    			</li>
						    			)
						    	})}
						    </ul>
						    

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
						<form style={{marginBottom:400}}>
							<KrField grid={1/2} label='city' component='city' />

						    </form>


					</Section>
			</div>

		);

	}

}
