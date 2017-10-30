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

	componentDidMount() {
		// Store.dispatch(initialize('EditList', State.itemDetail));


	}
	componentWillMount() {
	}

	onCancel=()=>{
		State.openEdit = false;
	}
	onSubmit=(form)=>{

		form.detailId = State.itemDetail.id;
		// form.leaseBeginDate = form.leaseBeginDate || State.itemDetail.leaseBegindate;
		
		
		State.submitEdit(form)
		// console.log('===>',form,search);
		// return;
		// let {onSubmit}=this.props;
		// onSubmit && onSubmit(form);
	}
	chooseStick=(person)=>{
		console.log('-----',person)
	}
  


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-agreement-trim-edit">
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
			   <form onSubmit={handleSubmit(this.onSubmit)} style={{width:650,margin:'0 auto'}}>
				<div >
							<Table displayCheckbox={false}>
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
											<TableRowColumn >{DateFormat(State.itemDetail.signdate,'yyyy/mm/dd')}</TableRowColumn>
											<TableRowColumn>
												<KrField name="signDate" component="date" style={{width:160}}/>
											</TableRowColumn>
									   	</TableRow>

									   	<TableRow>
											<TableRowColumn>
											租赁期限起

											</TableRowColumn>
											<TableRowColumn >{DateFormat(State.itemDetail.leaseBegindate,'yyyy/mm/dd')}</TableRowColumn>
											<TableRowColumn>
												<KrField name="leaseBeginDate" component="date" style={{width:160}}/>
											</TableRowColumn>
									   	</TableRow>
									   	{/*<TableRow >
											<TableRowColumn>
											首付款时间

											</TableRowColumn>
											<TableRowColumn >{DateFormat(State.itemDetail.leaseEnddate,'yyyy/mm/dd')}</TableRowColumn>
											<TableRowColumn>
												<KrField name="firstPayDate" component="date" style={{width:160}}/>
											</TableRowColumn>
									   	</TableRow>*/}
									   	{State.itemDetail.contracttype!='INTENTION' &&  State.itemDetail.contracttype!='LESSRENT'  && <TableRow>
											<TableRowColumn>
											押金总额

											</TableRowColumn>
											<TableRowColumn >{State.itemDetail.totaldeposit}</TableRowColumn>
											<TableRowColumn>
												<KrField name="depTotal" component="input" style={{width:160}} />
											</TableRowColumn>
									   	</TableRow>}
									   	{/*State.itemDetail.contractstate == 'EXECUTE' && <TableRow >
											<TableRowColumn>
											合同状态

											</TableRowColumn>
											<TableRowColumn >已执行</TableRowColumn>
											<TableRowColumn>
												<KrField name="status" grid={1/2} label="未执行" type="radio" value='false' style={{marginTop:6,display:"inline-block",width:160}} onClick={this.chooseStick}/>
											</TableRowColumn>
									   	</TableRow>*/}
									   	{/*State.itemDetail.contractstate != 'EXECUTE'&& <TableRow >
											<TableRowColumn>
											合同状态

											</TableRowColumn>
											<TableRowColumn >未执行</TableRowColumn>
											<TableRowColumn>
												<KrField name="status" grid={1/2} label="未执行" type="radio" value='false' style={{marginTop:6,display:"inline-block",width:160}} onClick={this.chooseStick}/>												
											</TableRowColumn>
									   	</TableRow>*/}
									   	<TableRow style={{height:'100px'}}>
											<TableRowColumn>
											其他约定内定

											</TableRowColumn>
											<TableRowColumn >{State.itemDetail.agreement}</TableRowColumn>
											<TableRowColumn>
												<KrField name="agreement" component="textarea" style={{width:160}}/>
											</TableRowColumn>
									   	</TableRow>
								</TableBody>
							</Table>
						<Grid  style={{marginTop:'50px'}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right'}}><Button  label="提交"  type="submit"  /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
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

