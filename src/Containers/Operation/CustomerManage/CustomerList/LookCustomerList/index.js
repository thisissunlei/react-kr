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
import './index.less'

import State from './State';
import LookDetailed from "./LookDetailed";
import CustomerIndent from "./CustomerIndent";
@observer
class LookCustomerList extends Component{

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

		if(!nextProps.listId){
			return;
		}
		if(State.listId===nextProps.listId){
			return;
		}
		State.lookListId(nextProps.listId);
		State.orderList(nextProps.listId);
		State.initListId(nextProps.listId);
	}

	isHaveTabs = (comeFrom,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch) => {
		

		
		if(comeFrom=="Merchant"){

			return  (<LookDetailed  detail={State.detail} editsSwitch={editsSwitch} IndentSwitch={IndentSwitch}/>)
		}else {

			return (<Tabs className="tabs"
			  inkBarStyle={{background:"#499df1",top:0}}
			>
				<Tab label="客户订单" >
					
						<CustomerIndent newIndentSwitch={newIndentSwitch} editIndentSwitch={editIndentSwitch} DeleteSwitch={DeleteSwitch}/>
				</Tab>
				<Tab label="客户详情" >
					
						<LookDetailed  detail={State.detail} editsSwitch={editsSwitch} IndentSwitch={IndentSwitch} />
				</Tab>
			</Tabs>)

		}
	}

	render(){
		let {comeFrom,data,dataReady,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch}=this.props;
				                 

      
		
		return(
		      <div className="m-lookCustomerList m-newMerchants">
		      	<div className="title">
					<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
					<div className="close" onClick={this.onCancel}></div>
				</div>
				<div style={{height:5}}></div>
				{this.isHaveTabs(comeFrom,editsSwitch,IndentSwitch,newIndentSwitch,editIndentSwitch,DeleteSwitch)}
		        
		      </div>

		);
	}

}
export default LookCustomerList;
