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

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=()=>{
		State.openEditSystem = true;
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=()=>{
		console.log('submit')
	}
	

	render() {
		return (
			    <div>
					<Title value="同步系统列表"/>
					<Section title="同步系统列表"  >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
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
		                  ajaxUrlName='get-news-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={160}>系统名称</TableHeaderColumn>
		                  <TableHeaderColumn width={160}>编码</TableHeaderColumn>
		                  <TableHeaderColumn>系统IP/域名</TableHeaderColumn>
		                  <TableHeaderColumn>联系人/电话</TableHeaderColumn>
		                  <TableHeaderColumn>失败数</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步时间</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步主体</TableHeaderColumn>
		                  <TableHeaderColumn>备注</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="title"
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
		              		 		name="newsDesc"
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
		              		 <TableRowColumn name="publishedStatusName"></TableRowColumn>
		              		 <TableRowColumn name="stickStatusName"></TableRowColumn>
		              		 <TableRowColumn name="publishedTime" > </TableRowColumn>
		              		 <TableRowColumn name="orderNum"></TableRowColumn>
		              		 <TableRowColumn name="createUser"></TableRowColumn>
		              		 <TableRowColumn name="createUser"></TableRowColumn>
		              		 <TableRowColumn>
									<Button label="编辑" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem} />
		              		 </TableRowColumn>
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
			             <NewCreateSystem onSubmit={this.NewCreateSubmit}  onCancel={this.NewCreateCancle}/>
			        </Drawer>
			        <Drawer
			             modal={true}
			             width={750}
			             open={State.openEditSystem}
			             onClose={this.closeEditSystem}
			             openSecondary={true}
			           >
			             <EditSystem onSubmit={this.editSystemSubmit}  onCancel={this.closeEditSystem}/>
			        </Drawer>
				</div>
		);

	}

}
