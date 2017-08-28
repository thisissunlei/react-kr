
import React from 'react';

import {
	Http,
	DateFormat,
} from "kr/Utils";
import { observer, inject } from 'mobx-react';
import {
	KrField,
	Table,
	Drawer,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	KrDate,
	Message,
	SliderTree,
	SearchForms
} from 'kr-ui'; 


import Edit from './Edit';
// import Viewdialog from './Viewdialog';
import Create from './Create';
import View from './View';
import State from './State';
import './detail.less';

// @inject("NavModel")
@observer
export default class ProcessSetting extends React.Component {

	constructor(props, context) {
		super(props, context);

	}

	componentDidMount() {
	}

	closeAll=()=>{
		State.closeAll()
	}

	openNewCreate=()=>{
		State.openCreate = true;
	}
	lookClick=(item)=>{
		console.log(item)
		State.showView(item);
	}

  
	render() {
		return (
			<div className="g-process-setting">
				<Section title="公共字典列表" >
				<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
					<Button label="新建" operateCode="main_activity_add" onTouchTap={this.openNewCreate} />
					<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}} className="activity-serach"/>
				</form>
				<div  className='detail-table'>
					<Table
	                    ajax={true}
	                    onOperation={this.onOperation}
	                    displayCheckbox={false}
	                    exportSwitch={false}
	                    ajaxParams={{
							page:1,
							pageSize:10,
						}}
	                    ajaxUrlName='activityList'
	                    ajaxFieldListName="items"
						  >
			            <TableHeader className='detail-header'>
			              <TableHeaderColumn className='header-row'>字典名称</TableHeaderColumn>
			              <TableHeaderColumn className='header-row'>字典编码</TableHeaderColumn>
	                      <TableHeaderColumn className='header-row'>字典类型</TableHeaderColumn>
			              <TableHeaderColumn className='header-row'>字典项</TableHeaderColumn>
						  <TableHeaderColumn className='header-row'>描述</TableHeaderColumn>
						  <TableHeaderColumn className='header-row'>操作人</TableHeaderColumn>
						  <TableHeaderColumn className='header-row'>操作时间</TableHeaderColumn>
						  <TableHeaderColumn className='header-row'>操作</TableHeaderColumn>
			          	</TableHeader>

				        <TableBody >
				              <TableRow className='detail-row'>
				                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='community' component={(value,oldValue)=>{
			 						var maxWidth=6;
			 						if(value.length>maxWidth){
			 						 value = value.substring(0,6)+"...";
			 						}
			 						return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
			 					}} ></TableRowColumn>
	                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='customer' component={(value,oldValue)=>{
			 							var maxWidth=6;
			 							if(value.length>maxWidth){
			 							 value = value.substring(0,6)+"...";
			 							}
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
			 					}}></TableRowColumn>
				                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='customerClass' component={(value,oldValue)=>{
			 							var maxWidth=6;
			 							if(value.length>maxWidth){
			 							 value = value.substring(0,6)+"...";
			 							}
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
			 					}}></TableRowColumn>
			 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='intentStaions' component={(value,oldValue)=>{
			 							var maxWidth=6;
			 							if(value.length>maxWidth){
			 							 value = value.substring(0,6)+"...";
			 							}
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
			 					}}></TableRowColumn>
			 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='source' component={(value,oldValue)=>{
			 							var maxWidth=6;
			 							if(value.length>maxWidth){
			 							 value = value.substring(0,6)+"...";
			 							}
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
			 					}}></TableRowColumn>
			 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contact' component={(value,oldValue)=>{
			 							var maxWidth=6;
			 							if(value.length>maxWidth){
			 							 value = value.substring(0,6)+"...";
			 							}
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
			 					}}></TableRowColumn>
			 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='phone' component={(value,oldValue)=>{
			 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
			 					}}></TableRowColumn>
			 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='phone' component={(value,oldValue,itemData)=>{
			 							return (
					                    <Button label="查看"  type='operation'  onClick={this.lookClick.bind(this,itemData)}/>
			 							)
			 					}}>
			 					</TableRowColumn>
				               </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	            </Table>
				</div>
				<Drawer open={State.openCreate} 
					width={700} openSecondary={true} 
					onClose={this.closeAll}
					containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
					<Create />
				</Drawer>
				<Drawer open={State.openView} 
					width={700} openSecondary={true} 
					onClose={this.closeAll}
					containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
					<View />
				</Drawer>
				<Drawer open={State.openEdit} 
					width={700} openSecondary={true} 
					onClose={this.closeAll}
					containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
					<Edit />
				</Drawer>
				</Section>
			</div>
		);
	}
}
