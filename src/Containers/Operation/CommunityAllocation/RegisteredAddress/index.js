import React from 'react';
import {Http} from 'kr/Utils';
import {
	Title,
	Section,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Drawer,
	Dialog,
	Tooltip,
	KrDate,
	Message
} from 'kr-ui';

import './index.less';
import AddReg from './AddReg';
import EditReg from './EditReg';
import DeleteReg from './DeleteReg';
export default class RegisteredAddress extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
            searchParams:{

			},
			openAdd:false,
			openEdit:false,
			openDelete:false
		}

	}
   
    openNewCreat=()=>{
		this.cancelAddReg();
	}

	onOperation=(type,itemDetail)=>{
		if(type=='edit'){
			this.cancelEditReg();
		}else if(type=='delete'){
			this.cancelDelete();
		}
	}
	
	allClose=()=>{
		this.setState({
			openAdd:false,
			openEdit:false
		})
	}

	cancelAddReg=()=>{
		this.setState({
			openAdd:!this.state.openAdd
		})
	}

	cancelEditReg=()=>{
		this.setState({
			openEdit:!this.state.openEdit
		})
	}

	cancelDelete=()=>{
		this.setState({
			openDelete:!this.state.openDelete
		})
	}

	render() {
		return (
			<div className="g-notice" >
			<Title value="注册地址列表"/>
				<Section title="注册地址列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<Button
								label="新建"
								type='button'
								onTouchTap={this.openNewCreat}
							/>
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-notice-page'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange = {this.pageChange}
					  >
				            <TableHeader>
				              <TableHeaderColumn>公告标题</TableHeaderColumn>
				              <TableHeaderColumn>公告类型</TableHeaderColumn>
				              <TableHeaderColumn>社区名称</TableHeaderColumn>
				              <TableHeaderColumn>发布时间</TableHeaderColumn>
				              <TableHeaderColumn>发布人</TableHeaderColumn>
				              <TableHeaderColumn>发布状态</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="title"></TableRowColumn>
					                <TableRowColumn name="typeName"></TableRowColumn>
					                <TableRowColumn name="cmtName" ></TableRowColumn>
					                <TableRowColumn name="publishTime" ></TableRowColumn>
					                <TableRowColumn name="creater" ></TableRowColumn>
					                <TableRowColumn 
					                	name="published" 
										options={[{label:'已发布',value:'1'},{label:'未发布',value:'0'}]}
					                ></TableRowColumn>
									<TableRowColumn type="operation">
										<Button label="编辑"  type="operation"  operation="edit"/>
										<Button label="删除"  type="operation"  operation="delete"/>
									</TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
            		
				</Section>

				{/*新建*/}
				<Drawer
						open={this.state.openAdd}
						width={750}
						openSecondary={true}
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
						onClose={this.allClose}
					>
				<AddReg
					onSubmit={this.addRegSubmit}
					onCancel={this.cancelAddReg}
				/>
				</Drawer>

				{/*编辑*/}
				<Drawer
						open={this.state.openEdit}
						width={750}
						openSecondary={true}
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
						onClose={this.allClose}
					>
				<EditReg
					onSubmit={this.editRegSubmit}
					onCancel={this.cancelEditReg}
				/>
				</Drawer>

				{/*删除*/}
				<Dialog
					title="提示"
					onClose={this.cancelDelete}
					open={this.state.openDelete}
					contentStyle ={{ width: '446px',height:'236px'}}
				>
				<DeleteReg
					onCancel={this.cancelDelete}
					onSubmit={this.deleteSubmit}
				/>
				</Dialog>
			
	           
			</div>
		);
	}
}
