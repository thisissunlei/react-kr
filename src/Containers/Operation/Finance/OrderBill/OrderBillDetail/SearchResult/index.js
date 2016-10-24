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

import Received from './Received';
import Income from './Income';



export default class SearchResult extends Component{

	static PropTypes = {
		detailResult:React.PropTypes.object,
		params:React.PropTypes.object,
		
	}

	constructor(props,context){
		super(props, context);
	}


	componentDidMount() {


	   const {params,detailResult} = this.props;



	}



	render(){
		
		console.log("fgfg",this.props.detailResult);




		return(

			 <div>
			      <Row>
			        <Col md={8}></Col>
                    <Col md={4}></Col>
                  </Row>
                  <Row>
			        <Received params={this.props.params} type="RECEIVED" detailResult={this.props.detailResult} />
                    <Income params={this.props.params} type="INCOME" />
                  </Row>
				   
			</div>		

		);

	}

}







