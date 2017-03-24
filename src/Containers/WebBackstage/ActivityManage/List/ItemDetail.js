
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	CheckboxGroup,
} from 'kr-ui';
import './index.less';
import State from './State';
export default class ItemDetail extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
		
	}
	componentDidMount(){
	}
	
	
	render(){
		
		return (

			<div>
				查看活动
		  	</div>
		);
	}
}
