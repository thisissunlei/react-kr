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
class LookDetail extends Component{

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

	render(){
		let unifyStyle={width:300,marginLeft:-10}
		
		return(
	      <div className="m-LookDetailed">
		    
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<div className="bottomWire"></div>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
				<li className="everyText" style={{width:660}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>会员卡号:</span>
					<p style={{padding:"0 10px"}}>事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的</p>
				</li>
				<li className="everyText" style={{width:660}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>会员卡号:</span>
					<p style={{padding:"0 10px"}}>事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的事故发生各个地方规定的</p>
				</li>
				<div style={{textAlign: "center",marginTop:15}}><Button  label="编辑" type="submit" style={{margin:"auto"}} /></div>
				
				<div className="visitRecord">
						<span className="visitRecordTitle">拜访记录</span>
						<Table
						    style={{marginTop:8}}
			                ajax={true}
			                onOperation={this.onOperation}
				            displayCheckbox={false}
				            ajaxParams={State.searchParams}
				            ajaxUrlName='shareCustomers'
				            ajaxFieldListName="list"
								  >
					            <TableHeader>
					              <TableHeaderColumn>公司名称</TableHeaderColumn>
					              <TableHeaderColumn>意向城市</TableHeaderColumn>
					              <TableHeaderColumn>意向社区</TableHeaderColumn>
					              <TableHeaderColumn>意向工位数</TableHeaderColumn>
					              <TableHeaderColumn>来源</TableHeaderColumn>
					              <TableHeaderColumn>客户分类</TableHeaderColumn>
					              <TableHeaderColumn>领取人</TableHeaderColumn>
					              <TableHeaderColumn>创建时间</TableHeaderColumn>
					              <TableHeaderColumn>操作</TableHeaderColumn>

					          	</TableHeader>

						        <TableBody >
						              <TableRow >
						                <TableRowColumn name="customerCompany" ></TableRowColumn>
						                <TableRowColumn name="intentionCityName" ></TableRowColumn>
						                <TableRowColumn name="intentionCommunityName"></TableRowColumn>
						                <TableRowColumn name="stationNum"></TableRowColumn>
						                <TableRowColumn name="sourceName"></TableRowColumn>
						                <TableRowColumn name="levelName"></TableRowColumn>
						                <TableRowColumn name="receiveName"></TableRowColumn>
						                <TableRowColumn name="receiveTime" type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
						                <TableRowColumn type="operation">
						                    <Button label="查看"  type="operation"  operation="watch" />
						                 </TableRowColumn>
						               </TableRow>
						        </TableBody>
			           </Table>
			           <div className="isDevelop" onClick={this.isDevelopClick}>
			           		{State.isDevelop&&<span className="recordDevelop">展开</span>}
			           		{!State.isDevelop&&<span className="recordClose">收奇</span>}
			           </div>


				</div>
				<div style={{textAlign: "center",marginTop:30}}><Button  label="新增拜访记录" type="button" style={{width:120}} /></div>
				
			
	      </div>

		);
	}

}
export default LookDetail;
