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
@observer
class LookCustomerList extends Component{

	constructor(props,context){
		super(props, context);
		let {comeFrom}=this.props;
		State.initComeFrom(comeFrom);


	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	isHaveTabs = () => {
		if(State.comeFrom=="Merchants"){

			return  (<LookDetailed  />)
		}else {

			return (<Tabs className="tabs"
			  inkBarStyle={{background:"#499df1",top:0}}
			>
				<Tab label="客户订单" >
					
						<h1>1</h1>
				</Tab>
				<Tab label="客户详情" >
					
						<LookDetailed  />
				</Tab>
			</Tabs>)

		}
	}
	render(){
		
		return(
      <div className="m-lookCustomerList m-newMerchants">
      	<div className="title">
			<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
			<div className="close" onClick={this.onCancel}></div>
		</div>
		<div style={{height:5}}></div>
		{this.isHaveTabs()}
        
        
      </div>

		);
	}

}
export default LookCustomerList;
