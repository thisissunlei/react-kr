import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {DateFormat,Http} from 'kr/Utils';
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
	onDelete=()=>{
		let delAgreement = State.itemDetail;
		console.log('delete',delAgreement,delAgreement.contracttype)

		if(delAgreement.contracttype == 'RENEW'){
			//续租
			Http.request('delete-renew-contract', {
				contractId: delAgreement.id
			}).then(function(response) {
				 Message.success('删除成功');
				State.deleteAgreement();

			}).catch(function(err) {
	            Message.error(err.message);
			});
		}else if(delAgreement.contracttype == 'ADDRENT'){
			// 增租
			Http.request('delete-increase-contract', {
				contractId: delAgreement.id
			}).then(function(response) {
				 Message.success('删除成功');
				State.deleteAgreement();

			}).catch(function(err) {
	            Message.error(err.message);
			});
		}else if(delAgreement.contracttype == 'LESSRENT'){
			// 减租
			Http.request('delete-reduce-contract', {
				contractId: delAgreement.id
			}).then(function(response) {
				 Message.success('删除成功');
				 State.deleteAgreement();
			}).catch(function(err) {
	            Message.error(err.message);
			});
		}else{
			Http.request('delete-enter-contract', {
				contractId: delAgreement.id
			}).then(function(response) {
				 Message.success('删除成功');
				 State.deleteAgreement();
			}).catch(function(err) {
	            Message.error(err.message);
			});
		}
		
		console.log('onDelete')
	}
	onCancel=()=>{
		State.openDeleteContent = false;
		console.log('onCancel')
	}
	render() {
		
		return (
			<div className="g-agreement-trim-delete" >
				<div style={{color:'#000',fontSize:'16px',textAlign:'center',marginTop:50}}>确认要删除此合同？</div>
				<Grid style={{marginTop:'50px'}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'166',textAlign:'right',marginRight:30}}><Button  label="确定"  type="button"  onTouchTap={this.onDelete} /></ListGroupItem>
							<ListGroupItem style={{width:'136',textAlign:'left'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
					</Row>
				</Grid>
			</div>


		);
	}
}

 

