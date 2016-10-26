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


import BusinessIncome from './BusinessIncome';
import LivePaymentIncome from './LivePaymentIncome';
import Other from './Other';
import StationIncome from './StationIncome';
import Basic from './Basic';




export default class Income extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
		detailResult:React.PropTypes.object,
		mainId:React.PropTypes.number,
	}

	constructor(props,context){
		super(props, context);

		
	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps){

	}

	render(){

		let {params,type,detailResult} = this.props;

		if(params.type != type){
			return  null;
		}
        
        console.log("oooo",params);


		return(

			 <div>
			   <BusinessIncome type="yingyewaishouru" params={this.props.params} />
			   <LivePaymentIncome  type="shenghuoxiaofeishouru" params={this.props.params} />
			   <Other type="qitashouru" params={this.props.params}/>
			   <StationIncome type="gonweishouru" params={this.props.params}/>
               <Basic type="basic" params={this.props.params}/>
			</div>		

		);

	}

}







