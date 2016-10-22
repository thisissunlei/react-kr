import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
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
} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';

import './index.less';

export default class Undefined extends Component{

	static defaultProps = {
		page:1,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {

	}

	onSubmit(values){
		console.log('--values',values);
	}

	render(){

		let initialValues = {
			lessorContacttel:'haa',
			age:1,
		}

		let validations = {
			age:{
				minLength:{
					value:5,
					message:'最小长度'
				},
			},
			lessorContacttel:{
				minLength:{
					value:1,
					message:'最小长度'
				},
				maxLength:{
					value:2,
					message:'最大长度为2'
				}
			}

	   	};

		return(

			<div>
					<Section title="出错了" description="" >

						<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit} validations={validations}>
								<KrField grid={1/2}  name="age" type="text" component="input" label="age" /> 
								<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 
								<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 
								<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 
								<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 
								<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <Button  label="确定" type="submit" primary={true} /> 

						</Form>

					</Section>
			</div>		

		);

	}

}


