import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	DateFormat
} from 'kr/Utils';
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
	Tooltip,
	ButtonGroup,
	KrDate,
	Loading,
	CheckPermission


} from 'kr-ui';
import './index.less'
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

@inject("CommunityDetailModel","NavModel")
@observer
class LookDetailed extends Component{

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

		State.recordDevelopChange();
	}

	switchEditCustomerList = () =>{
		State.switchEditCustomerList();
	}
	everyTd=(value)=>{
		var show=false;
		if(!value){
			return;
		}
		if(value.length==0){
			show=false;

		}else{
			show=true;
		}
		return (<Tooltip className="tooltipTextStyle" style={{padding:10, maxWidth:224,}} offsetTop={5} place='top'><div style={{width:160,minHeight:20,wordWrap:"break-word",padding:"10px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div></Tooltip>)
	}

	visitRecordList = () =>{
		if(!this.props.CommunityDetailModel.detail.records){
			return;
		}

		let tr=[];

		let records=this.props.CommunityDetailModel.detail.records;
		let len=records.length;
		if(State.recordDevelop&&records.length>State.visitLen){
			len=State.visitLen;
		}



		for(let i=0;i<len;i++){


			let tds=[];
			let everyTr=records[i];
			let text=everyTr.isContinue;
			if(text=="YES"){
				text="是";
			}else{
				text="否";
			}
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.visitTypeName}</span>{this.everyTd(everyTr.visitTypeName)}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{DateFormat(everyTr.visitTime,"yyyy-mm-dd")}</span>{this.everyTd(DateFormat(everyTr.visitTime,"yyyy-mm-dd"))}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.linkName}</span>{this.everyTd(everyTr.linkName)}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.linkTel}</span>{this.everyTd(everyTr.linkTel)}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.levelName}</span>{this.everyTd(everyTr.levelName)}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.visitDetail}</span>{this.everyTd(everyTr.visitDetail)}</div>);
			tds.push(<div className="div-td"><span className="tableOver">{text}</span></div>);
			tds.push(<div className="div-td"><span className="tableOver">{everyTr.reasonName}</span>{this.everyTd(everyTr.reasonName)}</div>);

			tr.push(<div className="tr-content">{tds}</div>);
		}

			return (
				<div className="tableDiv">
						<div className="tr-title">
							<span>拜访方式</span>
							<span>拜访时间</span>
							<span>联系人</span>
							<span>联系方式</span>
							<span>客户分类</span>
							<span>沟通情况</span>
							<span>是否跟进</span>
							<span>原因</span>
						</div>
						{tr}

					</div>)
	}
	componentDidMount() {
		let {checkOperate} = this.props.NavModel;
		if(checkOperate("oper_csr_edit_include_source")||checkOperate("oper_csr_edit")){
			this.props.CommunityDetailModel.isEditCustomer = true;
		}
	}

	render(){
		let {loading} = this.props.CommunityDetailModel;
		if(loading){
			return (<Loading/>);
		}

		let evenStyle={width:'280px',marginLeft:-10}
		let oddStyle={width:'290px',marginLeft:-10}
		let unifyStyle={};
		let uniStyle={};
		let detail=this.props.CommunityDetailModel.isEditCustomer;
		let isDeadline=false;
		let {editsSwitch,IndentSwitch,comeFrom}=this.props;
		let presentShow = this.props.CommunityDetailModel.presentShow;
		let recordDevelop=State.recordDevelop;
		let hasOffice=detail.hasOffice;
		let hasOffice1='';
		if(!hasOffice){
			hasOffice1 = '';
		}else if(hasOffice=="YES"){
			hasOffice1="是 ";
			isDeadline=true;
		}else{
			hasOffice1="否";
			isDeadline=false;
		}

		if(isDeadline){
          unifyStyle=oddStyle;
          uniStyle=evenStyle;
		}else{
          unifyStyle=evenStyle;
          uniStyle=oddStyle;
		}





		let tooltipTextStyle={maxWidth:"224px",whiteSpace:"normal",wordWrap:"break-word",height:"auto",lineHeight:"22px",overflow:"hidden"};
		return(
	      <div className="m-LookDetailed" style={{marginTop:8}}>

				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="客户来源:" style={oddStyle} component="labelText" value={detail.sourceName} inline={true} /></li>
				{presentShow && <li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="介绍人姓名:" style={evenStyle} component="labelText" value={detail.recommendName} inline={true} /></li>}
				{presentShow && <li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="介绍人电话:" style={oddStyle} component="labelText" value={detail.recommendTel} inline={true} /></li>}

				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位数:" style={evenStyle} component="labelText" value={(!detail.stationNum)?'':detail.stationNum+"个"} inline={true}/></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人姓名:" style={oddStyle} component="labelText" value={detail.name} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位类型:" style={evenStyle} component="labelText" value={detail.staionTypeName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人电话:" style={oddStyle} component="labelText" value={detail.tel} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位价格:" style={evenStyle} component="labelText" value={(!detail.staionPrice)?'':detail.staionPrice+"元"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人邮箱:" style={oddStyle} component="labelText" value={detail.mail} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向入驻社区:" style={evenStyle} component="labelText" value={detail.intentionCommunityName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人微信:" style={oddStyle} component="labelText" value={detail.wechat} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="预计入驻时间:" style={evenStyle} component="labelText" value={!detail.inTime?'':<KrDate style={{marginTop:5}} value={detail.inTime} format="yyyy-mm-dd"/>} inline={true} /></li>

				<div className="bottomWire"></div>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司名称:" style={oddStyle} component="labelText" value={detail.company} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="融资轮次:" style={evenStyle} component="labelText" value={detail.roundName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司规模:" style={oddStyle} component="labelText" value={(!detail.teamNum)?'':detail.teamNum+"人"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="融资金额:" style={evenStyle} component="labelText" value={(!detail.amount)?'':detail.amount+"元"} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="办公室情况:" style={oddStyle} component="labelText" value={hasOffice1} inline={true} /></li>
				{isDeadline&&<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="到期时间:" style={evenStyle} component="labelText" value={DateFormat(detail.deadline,"yyyy-mm-dd")} inline={true} /></li>}
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目名称:" style={unifyStyle} component="labelText" value={detail.projectName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="所属地区:" style={uniStyle} component="labelText" value={detail.distinctName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目类型:" style={unifyStyle} component="labelText" value={detail.projectCategoryName} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="详细地址:" style={uniStyle} component="labelText" value={detail.detailAddress} inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司网址:" style={unifyStyle} component="labelText" value={detail.website} inline={true} /></li>
				<li className="everyText" style={{width:660,marginTop:7,paddingLeft:0}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>公司简介:</span>
					<p style={{padding:"0 10px 0 15px",color:"#666666"}}>{detail.companyIntroduce}</p>
				</li>
				<li className="everyText" style={{width:660,paddingLeft:0}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>备注:</span>
					<p style={{padding:"0 10px 0 15px",color:'#666'}}>{detail.remark}</p>
				</li>
				{detail.showEdit && comeFrom !="message" && <div style={{textAlign: "center",marginTop:15}}><Button className='d-editBtn' label="编辑" type="submit" style={{margin:"auto",minWidth:'80px',height:'30px'}} onTouchTap={editsSwitch} /></div>}
				<span className="visitRecordTitle">拜访记录</span>
				<div className="visitRecord">


			           {this.visitRecordList()}
			           <div className="isDevelop" onClick={this.isDevelopClick}>
			           		{State.isDevelop&&<span className="recordDevelop" >展开</span>}
			           		{!State.isDevelop&&<span className="recordClose" >收起</span>}
			           </div>


				</div>
				
				{comeFrom != "message" && <div className='look-addVisitBtn' style={{textAlign: "center",marginTop:30}}><Button operateCode="oper_csr_edit"  label="新增拜访记录" type="button" style={{width:120}} onTouchTap={IndentSwitch} /></div>}
				


	      </div>

		);
	}

}
export default LookDetailed;