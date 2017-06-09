import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
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
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';


export default class Deletedialog extends Component {
	constructor(props, context) {
		super(props, context);


	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onSubmit = () => {
		let {
			onSubmit
		} = this.props;
		onSubmit && onSubmit();
	}


	render() {

		return (
			<div className="g-delete">
				<div className="u-delete-title">
					确定要移除该人员吗？
				</div>	
				<Row style={{marginTop:50,marginBottom:15}}>
				<Col md={12} align="center"> 
					<ButtonGroup>
						<div  className='ui-btn-center'><Button  label="确定" type="button"   onTouchTap={this.onSubmit} height={34} width={90}/></div>
						<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
					</ButtonGroup>
					
				 </Col>
				 </Row>
			</div>
		);
	}

}