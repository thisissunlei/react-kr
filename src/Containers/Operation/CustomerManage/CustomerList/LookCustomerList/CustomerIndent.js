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
import personal from "../Personal/State";
import signedClient from "../SignedClient/State";

@observer
class CustomerIndent extends Component{

	constructor(props,context){
		super(props, context);
		let {comeFrom}=this.props;


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
	editIndentClick = (id) =>{
		this.props.editIndentSwitch(id);
	}
	
	
	
	orderInnerList = () =>{
		let unifyStyle={width:300,marginLeft:-10}
		let detail=State.orderDetail;
		let {editIndentSwitch,DeleteSwitch,operType}=this.props;
		if(!detail.items){
			return;
		}
		let _this=this;
		let isEdit=true;
		let listArray=detail.items.map(function(item,index){
			if(item.contractSize>0){
				isEdit=false;
			}else{
				isEdit=true;
			}
			return (
				<div>
				<div className="indentList">
					<div className="orderNumber">{index+1}</div>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="订单名称:" style={unifyStyle} component="labelText" value={item.mainbillname} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="合同总数:" style={unifyStyle} component="labelText" value={item.contractSize} defaultValue='0' inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="城市:" style={unifyStyle} component="labelText" value={item.cityStr} defaultValue='0' inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="工位总数:" style={unifyStyle} component="labelText" value={item.stationnum} defaultValue='0' inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="社区:" style={unifyStyle} component="labelText" value={item.communityName} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="订单总额:" style={unifyStyle} component="labelText" value={item.contractTotalamount} defaultValue='0' inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="入驻日期:" style={unifyStyle} component="labelText" value={item.ucontractEntrydate} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="已回款额:" style={unifyStyle} component="labelText" value={item.contractBackamount} defaultValue='0' inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="离开日期:" style={unifyStyle} component="labelText" value={item.ucontractLeavedate} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="未回款额:" style={unifyStyle} component="labelText" value={item.unBackamount} defaultValue='0' inline={true} /></li>
					<div style={{marginTop:20,textAlign: "center"}} className='btnBoxShadow'>
						{isEdit&&<span><Button  label="编辑" type="button" cancle={true} onTouchTap={_this.editIndentClick.bind(this,item.id)}/>
						<span className="interval"></span></span>}
						<Button  label="查看" type="button" cancle={true}>
						  <a className='watchGo' href={`./#/operation/customerManage/${_this.props.listId}/order/${item.id}/detail`} target='_blank'/> 
						</Button>
						<span className="interval"></span>
						{item.deleteBtn && <Button  label="删除" type="button" cancle={true} onTouchTap={()=>{
																			if(operType=="PERSON"){
																			   personal.deleteId=item.id;

																			}
																			if(operType=="SIGN"){
																			   signedClient.deleteId=item.id;
																				
																			}

																			
																			DeleteSwitch();
																		}} />}
					</div>

				</div>
				<div className="bottomWire"></div>
				</div>

				)
		})
        if(listArray.length==0){
         listArray.push(<div style={{textAlign:'center',marginTop:-30}}>
								<div className="ui-nothing">
									<div className="icon" style={{width:88,height:123,margin:'0 auto'}}></div>
									<p className="tip" style={{fontSize:'14px',fontFamily:'MicrosoftYaHei',paddingLeft:20}}>暂时还没有订单呦~</p>
								</div>
						</div>)
        }
		return listArray;
	}


	render(){
		let {newIndentSwitch}=this.props;
		let detail=State.orderDetail;
		
		return(
	    	<div className="m-CustomerIndent">
				{detail.hasOrderRight&&<div style={{marginTop:20,marginBottom:20}}><Button  label="新建订单" type="button" onTouchTap={newIndentSwitch}/></div>}
				{this.orderInnerList()}
	    	</div>
		    
		 		
			

		);
	}

}
export default CustomerIndent;
