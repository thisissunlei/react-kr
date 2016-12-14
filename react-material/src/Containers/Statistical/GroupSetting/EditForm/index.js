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

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	render(){

		return(

			<div>
					<Section title="新建分组" description="" >
						//参考http://local.krspace.cn/#/operation/customerManage/agreement/setting/list
						
					</Section>
			</div>
		);


		export default reduxForm({
			form: 'Initialize'
		})(Initialize);
	}

}
