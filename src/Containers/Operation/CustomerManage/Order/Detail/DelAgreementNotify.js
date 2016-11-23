import React, {Component, PropTypes} from 'react';

import {Actions,Store} from 'kr/Redux';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	DotTitle,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


export default class DelAgreementNotify  extends Component{



	constructor(props,context){
		super(props, context);

	}

	render(){

		let {onSubmit,onCancel} = this.props;

	  return (

		  <div>
				是否删除该入驻协议书合同？


				<Row style={{marginTop:30}}>
					<Col md={12} align="center">
						<ListGroup>
							<ListGroupItem> <Button  label="确定" type="button"  onTouchTap={onSubmit}/></ListGroupItem>
							<ListGroupItem> <Button  label="取消" type="button" cancle={true} onTouchTap={onCancel}/></ListGroupItem>
						</ListGroup>
					</Col>
					</Row>

		 </div>);
	}
}
