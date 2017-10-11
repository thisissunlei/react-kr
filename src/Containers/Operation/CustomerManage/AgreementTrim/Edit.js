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
class EditList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	componentWillMount() {
	}

	onCancel=()=>{
		State.openAgreementList = false;
	}
	onSubmit=(form)=>{
		let {onSubmit}=this.props;
		onSubmit && onSubmit(form);
	}
	onChangeSign=(person)=>{
		console.log('onChangeSign',person)
		if(!person.id){
			return;
		}
		State.getOrderList(person.id)

	 	// if(!person || person.length == 0) {
			// State.haveOrder = false;
	 	// 	return ;
	 	// }
		// State.haveOrder = true;

		// this.fetchCustomer({customerId:person.id});
		// allState.companyName=person.company;
		// allState.listId=person.id;
		// this.orderNameInit(person.id);

    }
    orderListChange=(person)=>{
    	console.log('orderListChange',person)
    	State.getAgreementList(person.value)
    }
    contracttype=(type)=>{
    	let typeName = '';
    	switch (type){
			case 'ENTER' :
				typeName = '入驻协议书'; 
				break;
			case 'ADDRENT' :
				typeName = '增租协议书';
				break;
			case 'RENEW' :
				typeName = '续租协议书'
				break;
			case 'LESSRENT' :
				typeName = '减租协议书'
				break;
			case 'QUITRENT' :
				typeName = '退租协议书'
				break;
			case 'INTENTION' :
				typeName = '承租意向书'
				break;
		}
		return typeName;
    }
    delete=(item)=>{
    	console.log('=====',item)
    }
    edit=(item)=>{
    	console.log('---edit---',item);
    	State.openEdit = true;
    	State.itemDetail = item;
    }


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-agreement-trim-list">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">合同调整-明细</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
				<div className={State.HeightAuto?'auto':'stationList'}  style={{overflow:'initial'}}>
							<Table displayCheckbox={false} style={{margin:"20px 0 0 38px",width:547}}>
								<TableHeader>
									<TableHeaderColumn>字段</TableHeaderColumn>
									<TableHeaderColumn>旧值</TableHeaderColumn>
									<TableHeaderColumn>新值</TableHeaderColumn>
								</TableHeader>
								<TableBody>
										<TableRow>
											<TableRowColumn>
												签署时间

											</TableRowColumn>
											<TableRowColumn >sss</TableRowColumn>
											<TableRowColumn>
												<KrField name="time" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>

									   	<TableRow>
											<TableRowColumn>
											租赁期限起

											</TableRowColumn>
											<TableRowColumn >34</TableRowColumn>
											<TableRowColumn>
												<KrField name="begin" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>

									   	<TableRow>
											<TableRowColumn>
											租赁期限止

											</TableRowColumn>
											<TableRowColumn >erew</TableRowColumn>
											<TableRowColumn>

												<KrField name="end" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
									   	<TableRow >
											<TableRowColumn>
											首付款时间

											</TableRowColumn>
											<TableRowColumn >rr</TableRowColumn>
											<TableRowColumn>
												<KrField name="firsttime" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
									   	<TableRow>
											<TableRowColumn>
											支付方式

											</TableRowColumn>
											<TableRowColumn >rr</TableRowColumn>
											<TableRowColumn>
												<KrField name="payment" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
									   	<TableRow>
											<TableRowColumn>
											押金总额

											</TableRowColumn>
											<TableRowColumn >rr</TableRowColumn>
											<TableRowColumn>
												<KrField name="money" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
									   	<TableRow >
											<TableRowColumn>
											合同状态

											</TableRowColumn>
											<TableRowColumn >rr</TableRowColumn>
											<TableRowColumn>
												<KrField name="status" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
									   	<TableRow >
											<TableRowColumn>
											其他约定内定

											</TableRowColumn>
											<TableRowColumn >rr</TableRowColumn>
											<TableRowColumn>
												<KrField name="other" component="input" style={{width:130}}/>
											</TableRowColumn>
									   	</TableRow>
								</TableBody>
							</Table>
						</div>
				</form> 
			</div>


		);
	}
}
const validate = values => {
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	if(!values.title){
		errors.title = '请输入新闻标题';
	}
	

	return errors
}

export default EditList = reduxForm({
	form: 'EditList',
	validate,
})(EditList);

