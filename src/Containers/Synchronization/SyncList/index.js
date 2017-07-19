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
	Button,
	Dialog,
	Tooltip,
	Drawer,
	SearchForms,
	Section,
	KrField,
	CheckPermission
} from 'kr-ui';
import {reduxForm,initialize} from 'redux-form';
import State from './State';
import {DateFormat,Http} from 'kr/Utils';
import NewCreateSystem from './NewCreateSystem';
import EditSystem from './EditSystem';
import Synchro from './Synchro';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			systemList:[],
			mainList:[]
		}
	}

	componentDidMount(){
		this.getMainpartList();
		this.getSystemList();
	}
	getSystemList=()=>{
		let _this = this;
		Http.request('system-select-list',{}).then(function(response) {
			response = response.map((item)=>{
				let obj = item;
				obj.label = item.name;
				obj.value = item.id + '';
				return obj
			})
			_this.setState({
				systemList:response
			})
		}).catch(function(err) {
			Message.error('失败');
		});

	}
	getMainpartList=()=>{
		let _this = this;
		Http.request('main-select-list',{}).then(function(response) {
			response = response.map((item)=>{
				let obj = item;
				obj.label = item.name;
				obj.value = item.id + '';
				return obj
			})
			_this.setState({
				mainList:response
			})
		}).catch(function(err) {
			Message.error('失败');
		});

	}

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=(itemData)=>{
		State.setEditSystem(itemData);
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=(values)=>{
		State.postSync(values);
		console.log('submit',values)
	}
	openSynchro=(item)=>{
		State.editData = item;
		State.openSynchro = true;
	}
	closeSynchro=()=>{
		State.openSynchro = false;
	}
	NewCreateSubmit=(values)=>{
		State.postSync(values);
		console.log('submit',values)
	}
	changeToJournal=(value)=>{
		console.log('change',value)
		location.href = `/#/Synchronization/journal/${value.mainId}/${value.systemId}`;
	}
	changeContent=(person)=>{
		let value = {
			mainId:person.value||''
		}
		State.searchParams = Object.assign({},State.searchParams,value);
	}
	changeSystem=(person)=>{
		let value = {
			systemId:person.value|| ''
		}
		State.searchParams = Object.assign({},State.searchParams,value);
	}
	

	render() {
		console.log('3',this.systemList);
		let {systemList,mainList} = this.state;
		return (
			    <div style={{minHeight:910}}>
					<Title value="系统订阅列表"/>
					<Section title="系统订阅列表"  >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
							<Button label="新建"  onTouchTap={this.openNewCreat} />
							<KrField
								name="mainId"
								type="text"
								component="select"
								label="同步主体：  "
								right={20}
								inline={true}
								options={this.state.mainList}
								style={{width:210,float:'right'}}
								onChange={this.changeContent}
						 	/>
						 	<KrField
								name="systemId"
								type="text"
								component="select"
								label="同步系统：  "
								right={20}
								inline={true}
								options={this.state.systemList}
								style={{width:210,float:'right'}}
								onChange={this.changeSystem}
						 	/>
							
						</form>
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='sync-main-system-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={160}>主体名称</TableHeaderColumn>
		                  <TableHeaderColumn width={160}>主体编码</TableHeaderColumn>
		                  <TableHeaderColumn>订阅系统</TableHeaderColumn>
		                  <TableHeaderColumn>接口地址</TableHeaderColumn>
		                  <TableHeaderColumn>失败数</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步时间</TableHeaderColumn>
		                  <TableHeaderColumn>备注</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="mainName"
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="mainCode"
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="block";
										}
										 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="systemName"></TableRowColumn>
		              		 <TableRowColumn name="interfaceAdd"></TableRowColumn>
		              		 <TableRowColumn name="failures" > </TableRowColumn>
		              		 <TableRowColumn name="syncTime" 
		              		 	component={(value,oldValue)=>{
									 return (<div className='financeDetail-hover'>
									 	{DateFormat(oldValue.syncTime,'yyyy/mm/dd')}

									 	</div>)
								 }}></TableRowColumn>
		              		 <TableRowColumn name="remark"></TableRowColumn>
		              		 <TableRowColumn name="createUser"
								component={(value,oldValue,itemData)=>{
									return(
										<span>
											<Button label="编辑" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem.bind(this,itemData)} />
											<Button label="同步" operateCode="main_news_add" type="operation" onTouchTap={this.openSynchro.bind(this,itemData)} />
											<Button label="日志" operateCode="main_news_add" type="operation" onTouchTap={this.changeToJournal.bind(this,itemData)} />
										</span>
									)	
								}}></TableRowColumn>
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
					</Section>

					<Drawer
			             modal={true}
			             width={750}
			             open={State.createSystem}
			             onClose={this.NewCreateCancle}
			             openSecondary={true}
			           >
			             <NewCreateSystem onSubmit={this.NewCreateSubmit}  onCancel={this.NewCreateCancle} systemList={systemList} mainList={mainList}/>
			        </Drawer>
			        <Drawer
			             modal={true}
			             width={750}
			             open={State.openEditSystem}
			             onClose={this.closeEditSystem}
			             openSecondary={true}
			           >
			             <EditSystem onSubmit={this.editSystemSubmit}  onCancel={this.closeEditSystem} itemData={State.editData} systemList={systemList} mainList={mainList}/>
			        </Drawer>
			        <Drawer
			             modal={true}
			             width={750}
			             open={State.openSynchro}
			             onClose={this.closeSynchro}
			             openSecondary={true}
			           >
			             <Synchro onCancel={this.closeSynchro} itemData={State.editData}/>
			        </Drawer>
				</div>
		);

	}

}

List = reduxForm({
	form: 'List',
	// validate,
})(List);
