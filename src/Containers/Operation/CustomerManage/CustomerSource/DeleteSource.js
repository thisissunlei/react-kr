import React, {
	 
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Row,
	Col,
	Button,
	Notify,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


export default class DelAgreementNotify extends React.Component {



	constructor(props, context) {
		super(props, context);

	}
	

	render() {

		let {
			onSubmit,
			onCancel
		} = this.props;

		return (

			<div>
				<div style={{textAlign:'center',marginTop:50}}>是否删除该客户来源？</div>
				<Row style={{marginTop:50,marginBottom:10}}>
					<Col md={12} align="center">
						<ListGroup>
							<ListGroupItem style={{marginRight:20}}> <Button  label="确定" type="button"  height={34} onTouchTap={onSubmit}/></ListGroupItem>
							<ListGroupItem> <Button  label="取消" type="button" height={32} cancle={true} onTouchTap={onCancel}/></ListGroupItem>
						</ListGroup>
					</Col>
					</Row>

		 </div>);
	}
}