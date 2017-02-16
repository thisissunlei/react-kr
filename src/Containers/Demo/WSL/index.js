import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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

} from 'kr-ui';
import './index.less';

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);
	}



	render(){

		return(

			<div>
               123
			</div>
		);
	}

}
