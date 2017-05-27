    import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {Http} from "kr/Utils"
import './index.less';
import allState from "../State";

import { Agreement } from 'kr/PureComponents';

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

			content=(<div><span className="content-title">退租协议书详情页</span><Agreement.Exit.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)

		}
		if(allState.argumentType=="ADDRENT"){
			content=(<div><span className="content-title">增租协议书详情页</span><Agreement.Increase.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="ENTER"){
			content=(<div><span className="content-title">入驻协议书详情页</span><Agreement.Join.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="LESSRENT"){
			content=(<div><span className="content-title">减租协议书详情页</span><Agreement.Reduce.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="RENEW"){
			content=(<div><span className="content-title">续租协议书详情页</span><Agreement.Renew.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)
		}
		if(allState.argumentType=="INTENTION"){
			content=(<div><span className="content-title">承租意向书详情页</span><Agreement.Admit.Edit params={{customerId:allState.listId,orderId:allState.mainBillId,id:allState.agreementId}} /></div>)

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
