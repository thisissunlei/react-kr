import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
	Table,
 	TableBody,
	TableHeader,
	TableHeaderColumn, 
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
 	ListItem,
	LabelText,
} from 'kr-ui';


import Earnest from './Earnest';
import BusinessIncome from './BusinessIncome';
import Other from './Other';
import Basic from './Basic';
import Station from './Station';




export default class Received extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.state = {
			activity:false,
		}
	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps){

	}

	render(){

		let {params,type} = this.props;

		if(params.type != type){
			return  null;
		}


		return(

			 <div>

			   <Earnest type="dinjin" params={this.props.params} />
			   <BusinessIncome  type="yingshouhuikuan" params={this.props.params} />
			   <Other type="qitahuikuan" params={this.props.params}/>
			   <Basic type="basic" params={this.props.params} />
			   <Station type="gonweihuikuan" params={this.props.params} />

			</div>		

		);

	}

}







