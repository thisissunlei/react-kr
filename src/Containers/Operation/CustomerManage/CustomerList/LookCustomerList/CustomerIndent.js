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
	Tab,
	ButtonGroup

} from 'kr-ui';
import './index.less'

import State from './State';
@observer
class CustomerIndent extends Component{

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
	isDevelopClick = () =>{
		State.switchDevelop();
	}
	
	orderInnerList = () =>{
		let unifyStyle={width:300,marginLeft:-10}
		let detail=State.orderDetail;
		let {editIndentSwitch,DeleteSwitch}=this.props;
		let listArray=detail.map(function(item,index){
			return (
				<div>
				<div className="indentList">
					<div className="orderNumber">{index+1}</div>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="订单名称:" style={unifyStyle} component="labelText" value={item.mainbillname} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="合同总数:" style={unifyStyle} component="labelText" value={item.contractSize} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="工位总数:" style={unifyStyle} component="labelText" value={item.stationnum} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="社区:" style={unifyStyle} component="labelText" value={item.communityName} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="订单总额:" style={unifyStyle} component="labelText" value={item.contractTotalamount} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="入驻时间:" style={unifyStyle} component="labelText" value={item.ucontractEntrydate} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="已回款额:" style={unifyStyle} component="labelText" value={item.contractBackamount} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="离开日期:" style={unifyStyle} component="labelText" value={item.ucontractLeavedate} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="未回款额:" style={unifyStyle} component="labelText" value={item.unBackamount} inline={true} /></li>
					<div style={{marginTop:20,textAlign: "center"}}>
						<span><Button  label="编辑" type="button" cancle={true} onTouchTap={editIndentSwitch}/>
						<span className="interval"></span></span>
						<Button  label="查看" type="button" cancle={true} />
						<span className="interval"></span>
						<Button  label="删除" type="button" cancle={true} onTouchTap={DeleteSwitch} />
					</div>

				</div>
				<div className="bottomWire"></div>
				</div>

				)
		})
		return listArray;
	}


	render(){
		let {newIndentSwitch}=this.props;
		
		
		return(
	    	<div className="m-CustomerIndent">
				<div style={{margin:30}}><Button  label="新建订单" type="button" onTouchTap={newIndentSwitch}/></div>
				{this.orderInnerList()}
	    	</div>
		    
		 		
			

		);
	}

}
export default CustomerIndent;
