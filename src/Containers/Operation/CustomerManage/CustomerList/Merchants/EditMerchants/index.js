import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
	Drawer

} from 'kr-ui';
import State from './State';
@observer
class EditMerchants extends Component{

	constructor(props,context){
		super(props, context);

	}
	render(){
		return(
			<div>
          <h1>222222</h1>
    			<h2>{State.name}</h2>
			</div>
		);
	}

}
export default EditMerchants;
