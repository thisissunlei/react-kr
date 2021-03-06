import React from 'react';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
	reduxForm,
    initialize,
     change
} from 'redux-form';
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
import {
	observer
} from 'mobx-react';

import './index.less';
import AddReg from './AddReg';
import EditReg from './EditReg';
import DeleteReg from './DeleteReg';




export default class RegisteredAddress extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
            searchParams:{
				page:1,
				pageSize:15
			},
			deleteId:'',
			codeList:[],
			openAdd:false,
			openEdit:false,
			openDelete:false,
			communityId:''
		}

	}

	componentDidMount(){
		
	}
   
    openNewCreat=()=>{
		this.cancelAddReg();
	}

	onOperation=(type,itemDetail)=>{
		if(type=='edit'){
			this.cancelEditReg(); 
			this.setState({
				communityId:itemDetail.communityId
			})
			this.getAjaxData(itemDetail.id);
		}else if(type=='delete'){
			this.cancelDelete();
			this.setState({
				deleteId:itemDetail.id
			})
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
	

	getAjaxData=(id)=>{
		var _this=this;
		Http.request('register-address-get',{id:id}).then(function(response) {
			Store.dispatch(initialize('EditReg',response));
			_this.setState({
				codeList:response.codes,
			})	
			}).catch(function(err) {
			Message.error(err.message);
		});
	}

	addRegSubmit=(params)=>{
		var _this=this;
		Http.request('register-address-add',{},params).then(function(response) {
			_this.setState({
				searchParams:Object.assign({},_this.state.searchParams,{time:+new Date()})
			})
			 _this.cancelAddReg();
			}).catch(function(err) {
			Message.error(err.message);
		});
	}
    
	editRegSubmit=(params)=>{
		var _this=this;
		Http.request('register-address-edit',{},params).then(function(response) {
			_this.setState({
				searchParams:Object.assign({},_this.state.searchParams,{time:+new Date()})
			})
			 _this.cancelEditReg();
			}).catch(function(err) {
			Message.error(err.message);
		});
	}

	deleteSubmit=()=>{
		let {deleteId}=this.state;
		var _this=this;
		Http.request('register-address-delete',{id:deleteId}).then(function(response) {
			_this.setState({
				searchParams:Object.assign({},_this.state.searchParams,{time:+new Date()})
			})
			 _this.cancelDelete();
			}).catch(function(err) {
			Message.error(err.message);
		});
	}


	onPageChange=(page)=>{
		var searchParams={
			page:page
		}
		this.setState({
			searchParams:Object.assign({},this.state.searchParams,searchParams)
		})
	 }

     

	render() {
		let {codeList,communityId}=this.state;
		
		var codes=[];
		codeList.map((item,index)=>{
			var list={};
			list.label=item;
			list.checked=false;
			codes.push(list);
		 })
	     

		return (
			<div className="g-notice" >
			<Title value="注册地址-氪空间后台管理系统"/>
				<Section title="注册地址列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<Button
								label="新建"
								type='button'
								onTouchTap={this.openNewCreat}
							/>
					</div>
					<Table
						  style={{marginTop:20}}
		                  ajax={true}
		                  ajaxUrlName='register-address-list'
						  ajaxFieldListName="items"
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
						  onPageChange={this.onPageChange}
						  displayCheckbox={false}
					  >
				            <TableHeader>
				              <TableHeaderColumn>社区名称</TableHeaderColumn>
				              <TableHeaderColumn>数量</TableHeaderColumn>
				              <TableHeaderColumn>状态</TableHeaderColumn>
				              <TableHeaderColumn>编号方式</TableHeaderColumn>
				              <TableHeaderColumn>地址模版</TableHeaderColumn>
				              <TableHeaderColumn>操作人</TableHeaderColumn>
							  <TableHeaderColumn>操作时间</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="communityName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
					                <TableRowColumn name="count" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
					                <TableRowColumn name="statusStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
					                <TableRowColumn name="codeTypeStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
					                <TableRowColumn name="addressTemp" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
					                <TableRowColumn 
									   name="updatorName"
					                ></TableRowColumn>
									<TableRowColumn name="uTime" component={(value,oldValue)=>{
										 return (<KrDate value={value} format="yyyy-mm-dd"/>)
									}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
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
				    ref={
						(ref)=>{
							this.editRef=ref
						}
					}
					onSubmit={this.editRegSubmit}
					onCancel={this.cancelEditReg}
					codeList={codes}
					communityId={communityId}
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
