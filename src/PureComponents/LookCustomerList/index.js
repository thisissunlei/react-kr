    import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
import './index.less'

import State from './State';
import LookDetailed from "./LookDetailed";
import CustomerIndent from "./CustomerIndent";
import {
	observer,
	inject
} from 'mobx-react';
@inject("CommunityDetailModel")
@observer
class LookCustomerList extends Component{

	constructor(props,context){
		super(props, context);

		State.initComeFrom(props.comeFrom,props.operType)

		if(!props.listId){
			return;
		}
		if(State.listId===props.listId){
			return;
		}
		this.props.CommunityDetailModel.lookListId(props.listId,props.operType);
		State.orderList(props.listId);
		State.initListId(props.listId);
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
		if(!nextProps.listId){
			return;
		}
		if(State.listId===nextProps.listId){
			return;
		}
		State.lookListId(nextProps.listId,this.props.operType);
		State.orderList(nextProps.listId);
		State.initListId(nextProps.listId);
	}

	isHaveTabs = (comeFrom,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch,operType) => {



		if(comeFrom == "Merchant" || comeFrom == "message"){

			return  (<LookDetailed  detail={State.detail} editsSwitch={editsSwitch} IndentSwitch={IndentSwitch} comeFrom={comeFrom}/>)
		}else {

			return (<Tabs className="tabs"
			  inkBarStyle={{background:"#499df1",top:0}}
			>

				<Tab label="客户详情" >

						<LookDetailed  detail={State.detail} editsSwitch={editsSwitch} IndentSwitch={IndentSwitch} />
				</Tab>

				<Tab label="客户订单" >

						<CustomerIndent newIndentSwitch={newIndentSwitch} editIndentSwitch={editIndentSwitch} DeleteSwitch={DeleteSwitch} operType={operType} listId={this.props.listId}/>
				</Tab>
			</Tabs>)

		}
	}

	render(){

		let {comeFrom,data,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch,companyName,operType,listId}=this.props;

		return(
		      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:8}}>
		      	<div className="title" >
					<div><span className="look-new-icon"></span><label className="title-text">{companyName}</label></div>
					<div className="look-close" onClick={this.onCancel}></div>
				</div>
				<div style={{height:5}}></div>
					{this.isHaveTabs(comeFrom,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch,operType)}

		      </div>

		);
	}

}
export default LookCustomerList;
