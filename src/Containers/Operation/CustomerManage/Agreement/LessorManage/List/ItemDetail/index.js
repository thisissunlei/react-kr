import React,{Component} from 'react';
import { connect } from 'react-redux';
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
	Loading

} from 'kr-ui';
import './index.less'

class ItemDetail extends Component{

	constructor(props,context){
		super(props, context);
		let {comeFrom}=this.props;



	}
	onCancel = () =>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	renderCommunity = () =>{
		const {detail} = this.props;
		const {community} = detail;
		if(!detail.community){
			return ;
		}
		var arr = community.map(function(item,index){
			return (
				<span style = {{display: 'inline-block',padding: "3px 10px"}}>{item.name}</span>
			)
		})
		return <div>{arr}</div>;
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
	bankData = () =>{
		let {detail} = this.props;
		if(!this.props.detail.bankAccount){
			return;
		}
		let evenStyle={width:'280px',marginLeft:-10}
		let oddStyle={width:'290px',marginLeft:-10}
		let unifyStyle={};
		let uniStyle = {};
		
		var arr = detail.bankAccount.map(function(item,index){
			return (<div className = 'bank' style = {{display:"inline-block",position:'relative',top:-6}}> 
						<KrField label={index==0?"银行账户:":''} style={{marginLeft:index==0?0:70}} component="labelText" value={item} inline={true} />
				</div>)
		})
		return <li className="everyText"><span className="blueDrop"></span>{arr}</li>;
	}

	render(){
		const {detail} = this.props;
		let evenStyle={width:'280px',marginLeft:-10}
		let oddStyle={width:'290px',marginLeft:-10}
		let unifyStyle={};
		let uniStyle = {};
		return(
		  <div className="m-item-detail" >
		      	<div className="title" >
  					  <div><span className="look-new-icon"></span><label className="title-text">查看详情</label></div>
  					  <div className="customer-close" onClick={this.onCancel}></div>
				    </div>
    				<div style={{height:5}}></div>
    				 <div className="m-LookDetailed" style={{marginTop:8}}>

							<li id = "everyText" className="everyText item-detail-name"><span className="blueDrop"></span><KrField grid={1/2} label="出租方名称:" style={evenStyle} component="labelText" value={detail.corName} inline={true} /></li>

							<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="注册地址:" style={oddStyle} component="labelText" value={detail.corAddress} inline={true} /></li>
							<li className="everyText" style = {{width:'100%'}}><span className="blueDrop"></span><KrField grid={1/2} label="公章:" style={evenStyle} component="labelText" inline={true} /><div><img style = {{width:200,margin:'auto',display:'inherit'}} src = {detail.cachetUrl} /></div></li>
							<li className="everyText" style = {{display:'block',width:"auto"}}><span className="blueDrop"></span><KrField grid={1/2} label="状态:" style={oddStyle} component="labelText" value={detail.enableflag == "ENABLE" ? '启用':'不启用'} inline={true} /></li>
							<li className="everyText" style = {{display:'block',width:'100%'}}><span className="blueDrop"></span><KrField grid={1/2} label="备注:" style={{width:660,paddingLeft:0,paddingLeft:0,marginLeft:-10}} component="labelText" value={detail.corDesc} inline={true} /></li>

							<div className="bottomWire"></div>
							<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="支付宝账户:" style={oddStyle} component="labelText" value={detail.aipayAccount} inline={true} /></li>
							<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="微信账户:" style={evenStyle} component="labelText" value={detail.weixinAccount} inline={true} /></li>
							{this.bankData()}
							<div className="bottomWire"></div>
							<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="绑定社区:" style={oddStyle} component="labelText" value={""} inline={true} />
								{this.renderCommunity()}
							</li>
							
														
					</div>
		    </div>
	     

		);
	}

}
export default ItemDetail;