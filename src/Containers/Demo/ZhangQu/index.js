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

import {ReactHtmlParser} from 'kr/Utils';

 export default class Demo extends Component{

	constructor(props){
		super(props);

	}

	componentWillMount() {
	}

	componentDidMount(){

	}

	render(){
		return ( <div>
			dd
			{ReactHtmlParser('&lt;fsdfs<span>你的</span>')}
		</div> );
		}

}
