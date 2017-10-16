import React from 'react';
import {reduxForm,initialize,reset} from 'redux-form';
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
	Tooltip,
	Dialog,
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
import Delete from './Delete';

import nothing from './images/nothings.png';
@observer
class CreateNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	componentWillMount() {
	}

	onCancel=()=>{
		State.openAgreementList = false;
		State.contractList = [];
	}
	onSubmit=(form)=>{
		let {onSubmit}=this.props;
		onSubmit && onSubmit(form);
	}
	onChangeSign=(person)=>{
		console.log('onChangeSign',person)
		if(!person.id){
		Store.dispatch(reset('createNewList', {}));
		State.contractList = [];

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
    	if(!person){
    		State.contractList = [];
    		return;
    	}
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
    	State.openDeleteContent = true;
    	console.log('=====',item)
    }
    edit=(item)=>{
    	console.log('---edit---',item);
    	State.editAgreement(item);
    }
    onCloseDialog=()=>{
    	State.openDeleteContent = false;
    }


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-agreement-trim-list">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">合同调整</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
					<CircleStyleTwo num="1" info="选择客户">
						<KrField
							style={{width:260}}
							name="title"
							type="text"
							component="companyName"
							label="客户名称"
							requireLabel={true}
							onChange={this.onChangeSign}
					 	/>
					 	<KrField grid={1/2} label="订单名称" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
								options={toJS(State.orderList)}
								requireLabel={true}
								onChange={this.orderListChange}
						/>
					 	{/*<KrField
							style={{width:260,marginRight:25}}
							name="publishedTime"
							component="date"
							label="订单名称"
							requireLabel={true}
					 	/>*/}
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="合同列表" circle="bottom">
						<div className={State.HeightAuto?'auto':'stationList'}  style={{overflow:'initial'}}>
							<Table displayCheckbox={false} style={{margin:"20px 0 0 38px",width:547}}>
								<TableHeader>
									<TableHeaderColumn>合同ID</TableHeaderColumn>
									<TableHeaderColumn>合同类型</TableHeaderColumn>
									<TableHeaderColumn>起止时间</TableHeaderColumn>
									<TableHeaderColumn>录入人</TableHeaderColumn>
									<TableHeaderColumn>操作</TableHeaderColumn>
								</TableHeader>
								<TableBody>
								{
									State.contractList.length  && State.contractList.map((item,index)=>{
									return (
										<TableRow key={index}>
											<TableRowColumn>
												{item.id}

											</TableRowColumn>
											<TableRowColumn >{this.contracttype(item.contracttype)}</TableRowColumn>
											<TableRowColumn>
												<span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{DateFormat(item.leaseBegindate,'yyyy/m/dd')}-{DateFormat(item.leaseEnddate,'yyyy/mm/dd')}</span>
											</TableRowColumn>
											<TableRowColumn>
												{item.inputUser}
											</TableRowColumn>
											<TableRowColumn>
												<span className="ui-buttons" onTouchTap={this.delete.bind(this,item)}> 删除</span>
												<span className="ui-buttons" onTouchTap={this.edit.bind(this,item)}> 编辑</span>
											</TableRowColumn>
									   	</TableRow>
									);
								})}
								</TableBody>
							</Table>
							{
									!State.contractList.length &&
										<div style={{margin:"20px 0 0 38px",width:547}}>
											<img src={nothing} style={{margin:'10px auto',display:'block'}}/>
											<span  style={{textAlign:'center',display:'block'}}>暂无数据</span>
										</div>
								}
						</div>
						<Grid style={{marginTop:'50px'}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'100%',textAlign:'center'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</CircleStyleTwo>
				</form> 

				<Dialog
						title="删除合同"
						autoScrollBodyContent={true}
						open={State.openDeleteContent}
						onClose={this.onCloseDialog}
						 >
						<Delete />
					  </Dialog>
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

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

