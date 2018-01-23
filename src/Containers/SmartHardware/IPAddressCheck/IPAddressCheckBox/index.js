

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	FieldArray,
	change
} from 'redux-form';
import {
	Message,Dialog,Button,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,Drawer,Grid,Row,
	ListGroup,ListGroupItem,SearchForms,FontIcon,
	Dropdown,
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

import EquipmentSearchForm from './EquipmentSearchForm';


@inject("NavModel")
@observer


export default class IPAddressCheckBox  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			fatherPage : '',
			deviceTypeOptions :[{label:"门禁",value:"DOOR"},{label:"智能网关面板",value:"GATEWAY_PANEL"}],
			searchParams : {},
			ajaxUrl : ''
		}
	}


	componentDidMount() {
		
	}

	componentWillMount(){
		var paramId =this.getUrlParam();
	}


	getUrlParam=()=>{
		var hashStr = window.location.hash;
		var hashArr = hashStr.split("/");
		this.setState({
			fatherPage : hashArr[3]
		})
	}

	returnCenterControl=()=>{
		window.location.href = `./#/smarthardware/centercontrolmanage/equipmentmanage`;
	}

	returnDoorManage=()=>{
		window.location.href = `./#/smarthardware/doorManage/equipmentmanage`;
	}

	getRepeatIpListProps = (params,urlParams)=>{
		
		this.setState({
			ajaxUrl : urlParams,
		},function(){
			if(urlParams=="checkRepeatIpAddress"){
				this.setState({
					
					searchParams : {communityId : params.communityId,
									data:new Date()
								},
					
				})
			}else{
				var newParam = Object.assign({},params,{data:new Date()});
				this.setState({
					searchParams : newParam,
				})
			}
		})
		
	}

	


	render(){
		let {deviceTypeOptions,fatherPage,searchParams,ajaxUrl} = this.state;
		let connectedOptions = [{label:"已连接",value:true},{label:"未连接",value:false}]
		return(
			<div className="son-equipment-manage">
				<div style={{float:"left",marginTop:"-55px",width:"100%"}}>
					<span>
						{
							fatherPage == "centercontrol"?
								<span style={{marginRight:10,cursor:"pointer",color:"rgb(73, 157, 241)"}} onClick={this.returnCenterControl}>网关管理</span>
							:<span style={{marginRight:10,cursor:"pointer",color:"rgb(73, 157, 241)"}} onClick={this.returnDoorManage}>门禁管理</span>
							
						}
						<span style={{marginRight:10}}>&gt;</span>
						<span style={{marginRight:10}}>中控子设备管理</span>
					</span>
					
				</div>
				
				<div>
					<EquipmentSearchForm getRepeatIpListProps={this.getRepeatIpListProps}/>
				</div>
				
				<div>
					{
						ajaxUrl ? <Table

						ajax={true}
			            onProcessData={(state)=>{
			              return state;
			             }}
			            exportSwitch={false}
			            ajaxFieldListName='items'
			            ajaxUrlName={ajaxUrl}
			            ajaxParams={searchParams}
			            onPageChange={this.onPageChangeFun}
						displayCheckbox={false}
			          >
			            <TableHeader>
							<TableHeaderColumn>类型</TableHeaderColumn>
							<TableHeaderColumn>序列号</TableHeaderColumn>
			              	<TableHeaderColumn>屏幕展示标题</TableHeaderColumn>
							<TableHeaderColumn>屏幕展示编号</TableHeaderColumn>
			              	{/* <TableHeaderColumn>社区</TableHeaderColumn> */}
							<TableHeaderColumn>IP</TableHeaderColumn>
				            <TableHeaderColumn>是否连接</TableHeaderColumn>
			            	<TableHeaderColumn>最后一次连接时间</TableHeaderColumn>
			          	</TableHeader>
						 
								<TableBody >
									<TableRow>
									<TableRowColumn name="type" 
										options = {deviceTypeOptions}
										style={{width:"6%"}}
										component={(value,oldValue)=>{
										if(value==""){
											value="-"
										}
										return (<span>{value}</span>)}}
									></TableRowColumn>
										
										
										<TableRowColumn name="serialNo"
											style={{width:"20%"}}
											component={(value,oldValue,itemData)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
													<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
												)
											}} 
										>
										</TableRowColumn>
										
										<TableRowColumn name="name" 
											style={{width:"12%"}}
											component={(value,oldValue)=>{
											if(value==""){
												value="-"
											}
											return (<span>{value}</span>)}}
										></TableRowColumn>


										<TableRowColumn name="code" 
											style={{width:"12%"}}
											component={(value,oldValue)=>{
											if(value==""){
												value="-"
											}
											return (<span>{value}</span>)}}
										></TableRowColumn>

										<TableRowColumn name="ip"
											style={{width:"7%"}}
											component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"
													value ='-'
												}else{
													TooltipStyle="inline-block";
												}
												return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
													<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
												)
											}} 
										>
										</TableRowColumn>
										<TableRowColumn name="connected"
											style={{width:"8%"}}

											component={(value,oldValue)=>{
												var spanColor = "";

												if(value  == "true"){
													value="已连接";
												}else{
													value="未连接";
													spanColor = "#ff6868";
												}
												return (<span style={{color:spanColor}}>{value}</span>)}}
										>
										</TableRowColumn>
										<TableRowColumn 
											style={{width:"16%"}}
											name="connectTime" 
											type="date" 
											format="yyyy-mm-dd HH:MM:ss" 
										>
										</TableRowColumn>
									</TableRow>
							</TableBody>
						  
			          	
			        </Table>:
					<div style={{display:"block",width:"100%",borderTop:"solid 1px #eee",textAlign:"center",padding:"200px 0"}}>
						<img src={require('./images/nothings.png')}/>
						<p style={{textAlign:"center",marginTop:10}}>暂时没有数据</p>
					</div>
					}
					
					
			       
				</div>
				
			</div>
		);
	}
}


