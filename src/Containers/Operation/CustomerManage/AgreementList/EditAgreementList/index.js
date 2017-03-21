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
	Drawer,
	Tabs,
	Tab

} from 'kr-ui';
import './index.less';
import Admit from "../Admit/Edit";
import Exit from "../Exit/Edit";
import Increase from "../Increase/Edit";
import Join from "../Join/Edit";
import Reduce from "../Reduce/Edit";
import Renew from "../Renew/Edit";
import allState from "../State";

@observer
class EditAgreementList extends Component{

	constructor(props,context){
		super(props, context);

	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	

	componentWillReceiveProps(nextProps){
		
	}
	render(){
		var content="";
		if(allState.argumentType=="QUITRENT"){

			content=(<div><span className="content-title">退租协议书详情页</span><Exit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="ADDRENT"){
			content=(<div><span className="content-title">增租协议书详情页</span><Increase params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="ENTER"){
			content=(<div><span className="content-title">入驻协议书详情页</span><Join params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="LESSRENT"){
			content=(<div><span className="content-title">减租协议书详情页</span><Reduce params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="RENEW"){
			content=(<div><span className="content-title">续租协议书详情页</span><Renew params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="INTENTION"){
			content=(<div><span className="content-title">承租意向书详情页</span><Admit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)

		}                       
		
		return(
		      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:0,marginLeft:10}}>
		      	<div className="title" >
					<div className="look-close" onClick={this.onCancel}></div>
				</div>
				{content}
		      </div>

		);
	}

}
export default EditAgreementList;
