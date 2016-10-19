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




export default class Income extends Component{

	static PropTypes = {
		type:React.PropTypes.string,
		id:React.PropTypes.number
	}

	constructor(props,context){
		super(props, context);


	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps){

	}

	render(){


		let {params,type} = this.props;


		if(params.type != type){
			return null;
		}

		return(

			 <div>
	            Icome
			</div>		

		);

	}

}







