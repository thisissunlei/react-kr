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

	switchEditCustomerList = () =>{
		State.switchEditCustomerList();
	}
	render(){
		let unifyStyle={width:300,marginLeft:-10}
		let detail=State.detail;
		let {editsSwitch}=this.props;

		
		return(
	      <div className="m-LookDetailed">
		    
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="客户来源:" style={unifyStyle} component="labelText" value={detail.sourceName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位数:" style={unifyStyle} component="labelText" value={detail.stationNum+"个"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人姓名:" style={unifyStyle} component="labelText" value={detail.name} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位类型:" style={unifyStyle} component="labelText" value={detail.staiontypeName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人电话:" style={unifyStyle} component="labelText" value={detail.tel} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位价格:" style={unifyStyle} component="labelText" value={detail.staionPrice+"元"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人邮箱:" style={unifyStyle} component="labelText" value={detail.mail} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向入驻社区:" style={unifyStyle} component="labelText" value={detail.intentionCommunityName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人微信:" style={unifyStyle} component="labelText" value={detail.wechat} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="预计入驻时间:" style={unifyStyle} component="labelText" value={detail.inTime} inline={true} /></li>
				<div className="bottomWire"></div>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司名称:" style={unifyStyle} component="labelText" value={detail.company} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="投资轮次:" style={unifyStyle} component="labelText" value={detail.roundName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司规模:" style={unifyStyle} component="labelText" value={detail.teamNum+"人"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="融资金额:" style={unifyStyle} component="labelText" value={detail.amount+"元"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="办公室情况:" style={unifyStyle} component="labelText" value={detail.hasOffice} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目名称:" style={unifyStyle} component="labelText" value={detail.projectName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="所属地区:" style={unifyStyle} component="labelText" value={detail.districtName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目类型:" style={unifyStyle} component="labelText" value={detail.projectCategoryName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="详细地址:" style={unifyStyle} component="labelText" value={detail.detailAddress} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司网址:" style={unifyStyle} component="labelText" value={detail.website} inline={true} /></li>
				<li className="everyText" style={{width:660}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>公司简介:</span>
					<p style={{padding:"0 10px"}}>{detail.companyIntroduce}</p>
				</li>
				<li className="everyText" style={{width:660}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>备注:</span>
					<p style={{padding:"0 10px"}}>{detail.remark}</p>
				</li>
				<div style={{textAlign: "center",marginTop:15}}><Button  label="编辑" type="submit" style={{margin:"auto"}} onTouchTap={this.props.editsSwitch} /></div>
				
				<div className="visitRecord">
						<span className="visitRecordTitle">拜访记录</span>
						<Table
						    style={{marginTop:8}}
			                ajax={true}
			                onOperation={this.onOperation}
				            displayCheckbox={false}
				            ajaxParams={State.searchParams}
				            ajaxUrlName='get-detail-info'
				            ajaxFieldListName="records"
								  >
					            <TableHeader>
					              <TableHeaderColumn>拜访方式</TableHeaderColumn>
					              <TableHeaderColumn>拜访时间</TableHeaderColumn>
					              <TableHeaderColumn>联系人</TableHeaderColumn>
					              <TableHeaderColumn>联系方式</TableHeaderColumn>
					              <TableHeaderColumn>客户分类</TableHeaderColumn>
					              <TableHeaderColumn>沟通情况</TableHeaderColumn>
					              <TableHeaderColumn>是否跟进</TableHeaderColumn>
					              <TableHeaderColumn>原因</TableHeaderColumn>

					          	</TableHeader>

						        <TableBody >
						              <TableRow >
						                <TableRowColumn name="linkTel " ></TableRowColumn>
						                <TableRowColumn name="visitTime " type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
						                <TableRowColumn name="linkName "></TableRowColumn>
						                <TableRowColumn name="linkTel "></TableRowColumn>
						                <TableRowColumn name="levelName "></TableRowColumn>
						                <TableRowColumn name="visitDetail "></TableRowColumn>
						                <TableRowColumn name="isContinue "></TableRowColumn>
						                <TableRowColumn name="reasonName "  ></TableRowColumn>
						                
						               </TableRow>
						        </TableBody>
			           </Table>
			           <div className="isDevelop" onClick={this.isDevelopClick}>
			           		{State.isDevelop&&<span className="recordDevelop">展开</span>}
			           		{!State.isDevelop&&<span className="recordClose">收起</span>}
			           </div>

						
				</div>
				<div style={{textAlign: "center",marginTop:30}}><Button  label="新增拜访记录" type="button" style={{width:120}} /></div>
				
			
	      </div>

		);
	}

}
export default LookDetail;
