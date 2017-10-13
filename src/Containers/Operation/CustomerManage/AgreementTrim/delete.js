import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {DateFormat} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	CircleStyleTwo,
	ButtonGroup,
	Notify,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Tooltip
} from 'kr-ui';
import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
	toJS
} from 'mobx';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
export default class Delete extends React.Component {

	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	render() {
		
		return (
			<div className="g-agreement-trim-delete">
				<p>确认要删除此合同？</p>
				<Grid style={{marginTop:'50px'}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'100%',textAlign:'center'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
					</Row>
				</Grid>
			</div>


		);
	}
}

 

