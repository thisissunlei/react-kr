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
import {DateFormat} from 'kr/Utils';
import Create from './Create';
import Edit from './Edit';
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
			page:1,
			pageSize:15,
			name:'',
		}
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
		State.syncMainPart(values);
	}
	NewCreateSubmit=(values)=>{
		State.syncMainPart(values);
	}
	onSearch=(values)=>{
		let value = {
			name:values.content
		}
		State.searchParams = Object.assign({},State.searchParams,value);
	}
	onPageChange=(page)=>{
		let value = {
			page:page,
			pageSize:15
		};
		State.searchParams = Object.assign({},State.searchParams,value);
	}

	render() {
		console.log('main',State.searchParams)
		return (
			    <div  style={{minHeight:'910',backgroundColor:"#fff"}}>
					<Title value="同步主体列表"/>
					<Section title="同步主体列表" >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
							<Button label="新建"  onTouchTap={this.openNewCreat} />
							<SearchForms 
								onSubmit={this.onSearch} 
								placeholder="请输入系统名称"  
								style={{marginTop:5,zIndex:10000}} 
							/>
							
						</form>
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='sync-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={100}>主体名称</TableHeaderColumn>
		                  <TableHeaderColumn width={100}>编码</TableHeaderColumn>
		                  <TableHeaderColumn>失败数</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步时间</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步系统</TableHeaderColumn>
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
									 	<Tooltip offsetTop={5} place='top' >
											{value}
									 	</Tooltip></div>)
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="code"
									component={(value,oldValue)=>{
										 return (<div className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 			</div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="failures" > </TableRowColumn>
		              		 <TableRowColumn name="syncTime"
		              		 	component={(value,oldValue)=>{
		              		 		if(!!!value){
		              		 			return(
											<span className='tableOver' style={{display:"block"}}>-</span>

		              		 			)
		              		 		}else{
									 return (<div className='financeDetail-hover'>
									 	{DateFormat(oldValue.syncTime,'yyyy/mm/dd')}

									 	</div>)
									}
								 }}></TableRowColumn>
		              		 <TableRowColumn name="systemName"
		              		 component={(value,oldValue)=>{
									var TooltipStyle=""
									if(!!!value){
										TooltipStyle="none";
										value='-';
										return(
											<span className='tableOver'>{value}</span>
											)
									}else{
										TooltipStyle="block";

									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver'>{value}</span>
											 	<Tooltip offsetTop={5} place='top' >
													{value}
											 	</Tooltip>
										 	</div>)
									}
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="remark" 
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(!!!value){
										TooltipStyle="none";
										value="-";
										return(
										<span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										)
									}else{
										TooltipStyle="block";
									
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div>
									 	</Tooltip></div>)
									}
								 }}></TableRowColumn>
		              		 <TableRowColumn name="createUser"
								component={(value,oldValue,itemData)=>{
									return(
										<span>
											<Button label="编辑" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem.bind(this,itemData)} />
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
			             <Create onSubmit={this.NewCreateSubmit}  onCancel={this.NewCreateCancle}/>
			        </Drawer>
			        <Drawer
			             modal={true}
			             width={750}
			             open={State.openEditSystem}
			             onClose={this.closeEditSystem}
			             openSecondary={true}
			           >
			             <Edit onSubmit={this.editSystemSubmit}  onCancel={this.closeEditSystem} itemData={State.editData}/>
			        </Drawer>
				</div>
		);

	}

}

List = reduxForm({
	form: 'List',
	// validate,
})(List);
