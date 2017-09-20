import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  Message
} from 'kr-ui';
import './index.less'

export default class NodeFormwork extends Component{

	constructor(props){
		super(props);
		this.state={
			showSection:false
		}

	}
	
	
	render(){
		
		return (

			<div className="node-formwork">node-formwork</div>
		);
	}
}

