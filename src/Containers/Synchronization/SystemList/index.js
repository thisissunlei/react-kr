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
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
import NewCreateSystem from './NewCreateSystem';
import EditSystem from './EditSystem';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount(){
		console.log('----')
		State.searchParams={
			name:'',
			time:+new Date()
		}
	}

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=(itemData)=>{
		State.openEditSystemFn(itemData);
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=(value)=>{
		State.submitForm(value);
	}

	NewCreateSubmit=(value)=>{
		State.submitForm(value);
	}
	onSearch=(values)=>{
		State.searchParams= {
			title:values.content,
			name:values.content,
			time:+new Date()
		}
	}
	
	onPageChange=(page)=>{
		let value = {
			page:page
		}
		State.searchParams = Object.assign({},State.searchParams,value);
	}

	render() {
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
					<Title value="同步系统列表"/>
					<Section title="同步系统列表"  >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:20,height:45}}>
								<Button label="新建"  onTouchTap={this.openNewCreat} />
							{/*高级查询*/}
							<SearchForms 
									onSubmit={this.onSearch} 
									placeholder="请输入系统名称"  
									style={{marginTop:5,zIndex:10000}} 
							/>
						</form>
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='system-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={100}>系统名称</TableHeaderColumn>
		                  <TableHeaderColumn width={100}>编码</TableHeaderColumn>
		                  <TableHeaderColumn width={100}>IP</TableHeaderColumn>
		                  <TableHeaderColumn>联系人</TableHeaderColumn>
		                  <TableHeaderColumn>电话</TableHeaderColumn>
		                  <TableHeaderColumn width={300}>备注</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="name"
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="code"
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="block";
										}
										 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="ip"
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="linkman"></TableRowColumn>
		              		 <TableRowColumn name="phone"></TableRowColumn>
		              		 <TableRowColumn name="remark"
		              		 component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											{value}
									 	</Tooltip></div>)
								 }} > </TableRowColumn>
		              		 <TableRowColumn  name="createUser"
		              		 	component={(value,oldValue,itemData)=>{
									return (
										<span>
										<Button label="编辑" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem.bind(this,itemData)} />
										</span>
									)		
								}}>
		              		 </TableRowColumn>

		              	</TableRow>
		              </TableBody>
		              {/* <TableFooter></TableFooter>*/}
		            </Table>
					</Section>

					<Drawer
			             modal={true}
			             width={750}
			             open={State.createSystem}
			             onClose={this.NewCreateCancle}
			             openSecondary={true}
			           >
			             <NewCreateSystem onSubmit={this.NewCreateSubmit}  onCancel={this.NewCreateCancle}/>
			        </Drawer>
			        <Drawer
			             modal={true}
			             width={750}
			             open={State.openEditSystem}
			             onClose={this.closeEditSystem}
			             openSecondary={true}
			           >
			             <EditSystem onSubmit={this.editSystemSubmit}  onCancel={this.closeEditSystem} itemData={State.EditSystemData}/>
			        </Drawer>
				</div>
		);

	}

}
