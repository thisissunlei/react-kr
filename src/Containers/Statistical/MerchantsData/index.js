import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {Actions,Store} from 'kr/Redux';
import {
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
	Grid,
	Row,
	Col,
	Dialog,
	Tabs,
	Tab,
	Title,
	Message
} from 'kr-ui';


class MerchantsData  extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
				groupList:[

				],
				groupId:'',
				action:0,
		}
	}





	componentDidMount() {

	}

	render(){


		return(
			<div className="g-statistical">
					33333333
			</div>

		);
	}
}
export default MerchantsData;
