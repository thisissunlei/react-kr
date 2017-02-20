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

export default class CommunityList  extends Component{

	constructor(props,context){
		super(props, context);
	}



	render(){

		return(

			<div>
					<Section title="社区列表" description="" >
					  123
					</Section>
			</div>
		);
	}

}
