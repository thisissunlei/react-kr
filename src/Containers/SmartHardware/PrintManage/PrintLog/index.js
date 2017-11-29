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
								<TableRowColumn name="jobStartTime" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>

								<TableRowColumn name="communityName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								 ></TableRowColumn>
								 <TableRowColumn style={{width:"14%",overflow:"visible"}} name="customerName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								

								<TableRowColumn name="accountNo"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>


								<TableRowColumn name="printerName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								

								
								 <TableRowColumn style={{width:"10%",overflow:"visible"}} name="docName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								
								

								<TableRowColumn name="jobType"
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

								<TableRowColumn name="totalCost"
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
					<Drawer 
			          title="报警描述"
			          open={State.openContent}
			          onClose={this.openContentFun}
			          width={"90%"}
			        >
			          	<WarnContent detail={itemDetail} onCancle={this.openContentFun}/>
			        </Drawer>
				</div>
		);

	}

}
