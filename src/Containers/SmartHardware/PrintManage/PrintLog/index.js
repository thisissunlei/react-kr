import React from 'react';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	Dialog,
	Message,
	Tooltip,
	Drawer 
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import WarnSearchForm from './WarnSearchForm';
import WarnContent from './WarnContent';
import './index.less';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			realPage : 1,
			itemDetail:{}
		}
	}

	componentDidMount(){
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}



	seeContent=(param,params)=>{
		this.setState({
			itemDetail : param
		})
		this.openContentFun();
	}

	openContentFun=()=>{
		State.openContent =!State.openContent
	}


	returnPrintType=(type)=>{
		var typeOptions =[
							{value:"PRINT",label:"打印"},
							{value:"SCAN",label:"扫描"},
							{value:"COPY",label:"复印"},
							{value:"FAX",label:"传真接收"},
							{value:"FAX_SEND",label:"传真发送"},
							{value:"UNKNOWN",label:"未知"},
						]
		var typeLable ="";
		for(var i = 0 ;i<typeOptions.length;i++){
			if(typeOptions[i].value==type){
				typeLable = typeOptions[i].label;
			}
		}
		return typeLable;
	}

	returnDouble=(isDouble)=>{
		if(isDouble){
			return "双面"
		}else{
			return "单面"
		}
	}


	returnCollate=(collate)=>{
		if(collate){
			return "分页"
		}else{
			return "不分页"
		}
	}

	render() {
		let {
			list,seleced,itemDetail
		} = this.state;
		
		return (
			    <div className="second-door-warn-table" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="打印记录"/>
					<Section title={`打印记录`} description="" >
						<div>
							<WarnSearchForm/>
						</div>
						<Table
							className="door-warning-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							exportSwitch={false}
							ajaxFieldListName='items'
							ajaxUrlName='printLogUrl'
							ajaxParams={State.printLogParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
							onOperation={this.onOperation}
						>
							<TableHeader>
								<TableHeaderColumn>时间</TableHeaderColumn>
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>客户</TableHeaderColumn>
								<TableHeaderColumn>账号</TableHeaderColumn>
								<TableHeaderColumn>打印机名称</TableHeaderColumn>
								<TableHeaderColumn>文档名称</TableHeaderColumn>
								<TableHeaderColumn>任务类型</TableHeaderColumn>
								<TableHeaderColumn>总价</TableHeaderColumn>
								
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn name="jobStartTime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
									style={{width:"14%"}}
								></TableRowColumn>

								 <TableRowColumn style={{width:"14%",overflow:"visible"}} name="communityName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} ><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								 <TableRowColumn style={{width:"14%",overflow:"visible"}} name="customerName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} ><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>

								 <TableRowColumn style={{width:"9%",overflow:"visible"}} name="accountNo" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle="block"
		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} ><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{itemData.memberName}</Tooltip></div>)
		              			}} ></TableRowColumn>


								 <TableRowColumn style={{width:"10%",overflow:"visible"}} name="printerName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} ><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								


		              			<TableRowColumn style={{width:"14%",overflow:"visible"}} name="docName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle="block"
		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>
		                              	<div className="doc-name-tip">
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">份数：</div><div className="tip-content">{itemData.duplicateCount}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">打印类型：</div><div className="tip-content">{

		                              				this.returnPrintType(itemData.jobType)
		                              			}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">纸张尺寸：</div><div className="tip-content">{itemData.paperSize}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">单/双面：</div><div className="tip-content">{
		                              				
		                              				this.returnDouble(itemData.doubleFace)
		                              			}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">是否分页：</div><div className="tip-content">{
		                              				this.returnCollate(itemData.collated)
		                              			}</div>
		                              		</div>
		                              		
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">总张数：</div><div className="tip-content">{itemData.totalPageCount}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">彩色面数：</div><div className="tip-content">{itemData.colorSurfaceCount}</div>
		                              		</div>
		                              		<div className="doc-name-tip-line">
		                              			<div className="tip-title">黑白面数：</div><div className="tip-content">{itemData.monoSurfaceCount}</div>
		                              		</div>
		                              	</div>
		                              </Tooltip></div>)
		              			}} ></TableRowColumn>
								
								

								<TableRowColumn name="jobType"
								style={{width:"9%"}}

								options = {[
										{value:"PRINT",label:"打印"},
										{value:"SCAN",label:"扫描"},
										{value:"COPY",label:"复印"},
										{value:"FAX",label:"传真接收"},
										{value:"FAX_SEND",label:"传真发送"},
										{value:"UNKNOWN",label:"未知"},
									]}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

								<TableRowColumn name="totalCostYuan"
								
								style={{width:"8%"}}

								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
					
				</div>
		);

	}

}
