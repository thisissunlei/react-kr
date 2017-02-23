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
				                       
		
		return(
		      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:0,marginLeft:10}}>
		      	<div className="title" >
					<div className="look-close" onClick={this.onCancel}></div>
				</div>
				<span className="content-title">减租协议书详情页</span>

				{/*<Admit params={{customerId:1,orderId:1,contractId:1,id:1}} />*/}
					
				{/*<Exit params={{customerId:1,orderId:1,contractId:1,id:1}} />*/}
				{/*<Increase params={{customerId:1,orderId:1,contractId:1,id:1}} />*/}
				{/*<Join params={{customerId:1,orderId:1,contractId:1,id:1}} />*/}
				{/*<Reduce params={{customerId:1,orderId:1,contractId:1,id:1}} />*/}
				<Renew params={{customerId:1,orderId:1,contractId:1,id:1}} />
			
		        
		      </div>

		);
	}

}
export default EditAgreementList;
