import React, {Component, PropTypes} from 'react';

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
} from 'kr-ui';

 export default class NewCreateForm extends Component{

	constructor(props){
		super(props);
		this.state={
			initailPoint : '承德'
		}
	}
	componentWillMount() {
	}

	componentDidMount(){

	}
	onSubmit=(values)=>{
		console.log("提交values",values);
	}
	render(){
		return ( <div> ddddd </div> );
		}

}
