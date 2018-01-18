

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
	Message,
	Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';
import State from './State';

import {
	observer,
	inject
} from 'mobx-react';
@observer



class EquipmentDataForm extends React.Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			searchParams:{
				edate :'',
				sdata : ''
			},
		}
	}
	componentDidMount(){
		let {mainInfo} = this.props;
		State.equipmentOperateLogParam ={
			endDate :'',
			startDate : '',
			deviceDefId : this.detail.id,
			page : 1,
			pageSize : 15
		}
	}
	onSubmit=(values)=>{
		if(values.sdate && values.edate){
			var start=Date.parse(DateFormat(values.sdate,"yyyy-mm-dd hh:MM:ss"));
			var end=Date.parse(DateFormat(values.edate,"yyyy-mm-dd hh:MM:ss"));
			if(start>end){
				Message.error("结束时间不能小于开始时间");
				return ;
			}
		}

		State.equipmentOperateLogParam ={
			endDate :values.edate ||'',
			startDate : values.sdate ||'',
			deviceDefId : State.equipmentOperateLogParam.deviceDefId || '',
			page : 1,
			pageSize : 15,
			date : new Date()

		}
	}


	onStartChange=(sdate)=>{
		let {searchParams}=this.state;
		let start=Date.parse(DateFormat(sdate,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.edate){
			var end=Date.parse(DateFormat(searchParams.edate,"yyyy-mm-dd hh:MM:ss"))
		}
		if(searchParams.edate&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}

		Store.dispatch(change('EquipmentDataForm','sdate',sdate));
		searchParams = Object.assign({}, searchParams, {sdate});

		this.setState({
			searchParams
		});

	}
	onEndChange=(edate)=>{
		let {searchParams}=this.state;
		
		let end=Date.parse(DateFormat(edate,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.sdate){
			var start=Date.parse(DateFormat(searchParams.sdate,"yyyy-mm-dd hh:MM:ss"));
		}
		if(searchParams.sdate&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}
		Store.dispatch(change('EquipmentDataForm','edate',edate));			 
		searchParams = Object.assign({}, searchParams, {edate});
		this.setState({
			searchParams
		});
	}

	renderTitle=()=>{
		let deviceType = this.detail.deviceType;
		for(var i = 0;i<State.sonEquipmentTypeOptions.length;i++){
			if(deviceType == State.sonEquipmentTypeOptions[i].value){
				return State.sonEquipmentTypeOptions[i].label
			}
		}		

	}

	closeDialog=()=>{
		State.openOperateLog = false;
	}

	

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let deviceType = this.detail.deviceType;
		return (
			<div className="equipment-operate-log">
				<div className="title-close">
					<span style={{float:"left",fontSize:16,marginLeft:10}}>
					{
						this.renderTitle()+"数据查看"
					}
					</span>
					<span style={{float:"right"}} onClick={this.closeDialog}><img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/></span>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} className="search-form-second-door">
					<ListGroup>
						<ListGroupItem>
							<KrField label="开始时间：" name="sdate" component="date" inline={true} style={{width:244,marginTop:-3}} onChange={this.onStartChange} placeholder="日期"/>
						</ListGroupItem>

						<ListGroupItem>
							<KrField label="至：" name="edate" component="date" inline={true} style={{width:200,marginTop:-3}} onChange={this.onEndChange}  placeholder="日期"/>
						</ListGroupItem>
						<ListGroupItem>
							<Button  label="搜索" type="submit"/>
						</ListGroupItem>
					</ListGroup>
				</form>
				<Table
			            className="equipment-operate-log-table"
			            ajax={true}
			            onProcessData={(state)=>{
			              return state;
			             }}
			            onOperation={this.onOperation}
			            exportSwitch={false}
			            ajaxFieldListName='items'
			            ajaxUrlName='getEquipmentOperateLog'
			            ajaxParams={State.equipmentOperateLogParam}
			            displayCheckbox={true}
						onSelect={this.onSelcet}
						displayCheckbox={false}
			          >
			            <TableHeader>
							
							<TableHeaderColumn>时间</TableHeaderColumn>
				            {(deviceType=="LAMP"||deviceType=="ATOMIZATION_MEMBRANE"||deviceType=="AIR_CONDITION") &&<TableHeaderColumn>开关状态</TableHeaderColumn>}
				            {deviceType=="AIR_CONDITION" &&<TableHeaderColumn>模式</TableHeaderColumn>}
				            {deviceType=="AIR_CONDITION" &&<TableHeaderColumn>风速</TableHeaderColumn>}
				            {deviceType=="AIR_CONDITION" &&<TableHeaderColumn>温度</TableHeaderColumn>}
				            {deviceType=="HUMITURE_SENSOR" &&<TableHeaderColumn>温度</TableHeaderColumn>}
				            {deviceType=="HUMITURE_SENSOR" &&<TableHeaderColumn>湿度</TableHeaderColumn>}
							{deviceType=="BODY_SENSOR"  &&<TableHeaderColumn>是否有人</TableHeaderColumn>}
						    {deviceType=="AIR_SENSOR" &&<TableHeaderColumn>PM2.5数据</TableHeaderColumn>}
				            {deviceType=="AIR_SENSOR" &&<TableHeaderColumn>PM10数据</TableHeaderColumn>}
				            {deviceType=="AIR_SENSOR" &&<TableHeaderColumn>PM2510数据</TableHeaderColumn>}
						 	
					  	</TableHeader>
			          	<TableBody >
				            <TableRow>
								
								<TableRowColumn 
									name="time" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
									style={{width:"25%"}}
								>
								</TableRowColumn>

								{(deviceType=="LAMP"||deviceType=="ATOMIZATION_MEMBRANE"||deviceType=="AIR_CONDITION") &&<TableRowColumn name="switchOpen" 
									component={(value,oldValue,itemData)=>{
										if(itemData.extra.on){
											value = "开启"
										}else{
											value ="关闭"
										}
								
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="AIR_CONDITION" &&<TableRowColumn name="mode" 
									component={(value,oldValue,itemData)=>{
									if(!itemData.extra.mode){
										value="无数据"
									}else{
										if(itemData.extra.mode=="HEATING"){
											value = "制热"
										}else if(itemData.extra.mode=="COOLING"){
											value ="制冷"
										}
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="AIR_CONDITION" &&<TableRowColumn name="speed" 
									component={(value,oldValue,itemData)=>{
									if(!itemData.extra.speed){
										value="无数据"
									}else{
										if(itemData.extra.speed=="HIGH"){
											value = "高速"
										}else if(itemData.extra.speed=="LOW"){
											value ="低速"
										}else if(itemData.extra.speed=="MEDIUM"){
											value ="中速"
										}
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="AIR_CONDITION" &&<TableRowColumn name="temprature" 
									component={(value,oldValue,itemData)=>{
									if(!itemData.extra.temp){
										value="无数据"
									}else{
										value=itemData.extra.temp+"℃"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="HUMITURE_SENSOR" &&<TableRowColumn name="temprature" 
									component={(value,oldValue,itemData)=>{
									if(itemData.extra.celsius==""){
										value="无"
									}else{
										value=itemData.extra.celsius+"℃"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="HUMITURE_SENSOR" &&<TableRowColumn name="switchOpen" 
									component={(value,oldValue,itemData)=>{
									if(itemData.extra.humidity==""){
										value="无"
									}else{
										value=itemData.extra.humidity+"%"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="BODY_SENSOR" &&<TableRowColumn name="hasBody" 
									component={(value,oldValue,itemData)=>{
									if(!itemData.extra){
										value="无数据"
									}else{
										value=itemData.extra.hasBody?"有人":"无人"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}

								{deviceType=="AIR_SENSOR" &&<TableRowColumn name="pm25" 
									component={(value,oldValue,itemData)=>{
									if(itemData.extra.pm25==""){
										value="无数据"
									}else{
										value=itemData.extra.pm25
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}

								{deviceType=="AIR_SENSOR" &&<TableRowColumn name="pm10" 
									component={(value,oldValue,itemData)=>{
									if(itemData.extra.pm10==""){
										value="无数据"
									}else{
										value=itemData.extra.pm10
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								{deviceType=="AIR_SENSOR" &&<TableRowColumn name="pm2510" 
									component={(value,oldValue,itemData)=>{
									
									if(itemData.extra.pm2510==""){
										value="无数据"
									}else{
										value=itemData.extra.pm2510
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>}
								
							
				            </TableRow>
			          </TableBody>
			          <TableFooter></TableFooter>
			        </Table>
			</div>
		);
	}
}
export default EquipmentDataForm = reduxForm({
	form: 'EquipmentDataForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EquipmentDataForm);
