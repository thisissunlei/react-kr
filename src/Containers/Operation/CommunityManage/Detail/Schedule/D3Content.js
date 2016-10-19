import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

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
	Dialog,
	BreadCrumbs
} from 'kr-ui';


export default  class D3Content extends Component {

	 static PropTypes = {
		 params:React.PropTypes.object,
	 }

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){

	}

  render() {

    return (
		<div className="d3-content">显示数据</div>
	);
  }
}








