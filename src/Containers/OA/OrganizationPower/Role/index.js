import React,{Component} from 'react';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Tooltip,
	Message,
	Section,
} from 'kr-ui';
import AddRole from './AddRole';
import EditRole from './EditRole';
import DeleteRole from './DeleteRole';

export default class Role extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openPostType:false,
			openEditType:false,
			openDelete:false,
			searchParams:{
				page:1,
				pageSize:15
			},
			//删除id
			deleteId:'',
			//编辑detail
			detail:[]     
		}
	}
    

    
	onOperation=(type,itemDetail)=>{
		if(type=='edit'){
			this.getEditData(itemDetail.id);
			this.setState({
			  openEditType:true	
			})
		}else if(type=='delete'){
			this.setState({
			  openDelete:true,	
			  deleteId:itemDetail.id
			})
		}
	}


	//获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('role-watch',{id:id}).then(function(response) {
           Store.dispatch(initialize('EditRole',response));
		   _this.setState({
			   detail:response.allotUser
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}


	//搜索确定
	onSearchSubmit = (params)=>{
       let obj = {
			name: params.content,
            pageSize:15
		  }
			this.setState({
				searchParams:obj	
			})
	}
	
	//新建开关
	openAddPost=()=>{
      this.setState({
		  openPostType:!this.state.openPostType
	  })
	}

	//新建提交
	addPostSubmit=(params)=>{
	   params=Object.assign({},params);
	   var id=[];
	   params.allotUserId.map((item,index)=>{
		  id.push(item.orgId);
	   })
	   params.allotUserId=id;
       var _this=this;
       Http.request('role-add',{},params).then(function(response) {
           _this.setState({
						searchParams:{
							time:+new Date(),
							page:1,
							pageSize:15
						}  
					})
					_this.openAddPost();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
	
	//编辑关闭
	openEditPost=()=>{
       this.setState({
		  openEditType:!this.state.openEditType
	  })
	}

    //编辑提交
	editPostSubmit=(params)=>{
       var _this=this;
	   var id=[];
	   if(params.allotUserId){
		  params.allotUserId.map((item,index)=>{
		    id.push(item.orgId);
	     })  
	   }else{
		 params.allotUser.map((item,index)=>{
		    id.push(item.orgId);
	     })  
	   }
	   params.allotUserId=id;
       Http.request('role-edit',{},params).then(function(response) {
           _this.setState({
						searchParams:{
							time:+new Date(),
							page:_this.state.searchParams.page,
							pageSize:15,
							name:_this.state.searchParams.name?_this.state.searchParams.name:""
						}  
					})
					_this.openEditPost();
        }).catch(function(err) {
          Message.error(err.message);
        });
		
	}


   //删除关闭
   cancelDelete=()=>{
     this.setState({
		 openDelete:!this.state.openDelete
	 })
   }

   //删除提交
   deleteSubmit=()=>{
		 let {deleteId}=this.state;
		 var _this=this;
      Http.request('role-delete',{},{id:deleteId}).then(function(response) {
           _this.setState({
						searchParams:{
							time:+new Date(),
							page:1,
							pageSize:15
						}  
					})
			_this.cancelDelete();
        }).catch(function(err) {
          Message.error(err.message);
        });
   }
   
   //分页
   pageChange=(page)=>{
	   var searchParams={
         page:page
       }
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }

	render(){
        
		let {detail}=this.state;

		return(
      	<div className="oa-or-role">
		    <Section title="角色列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>

				<Col
					style={{float:'left'}}
				>
					<Button
							label="新建"
							type='button'
							onTouchTap={this.openAddPost}
					/>
				</Col>
			        
					<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入角色名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
					</Col>

	        </Row>


            <Table
			        style={{marginTop:8}}
					ajax={true}
					onOperation={this.onOperation}
					displayCheckbox={false}
					ajaxParams={this.state.searchParams}
					ajaxUrlName='role-list'
					ajaxFieldListName="items"
				    onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>角色名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>分配人员</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
						<TableRowColumn name="code" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn name="allotUser" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
						<TableRowColumn name="desc" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn name="operator"></TableRowColumn>
						<TableRowColumn name="time" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}}></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑"  type="operation"  operation="edit"/>
			                <Button label="删除"  type="operation"  operation="delete" />
			            </TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		  </Section>

		  {/*新建*/}
			<Dialog
					title="新增角色"
					onClose={this.openAddPost}
					open={this.state.openPostType}
					contentStyle ={{ width: '685px',height:'auto'}}
				>
			  <AddRole 
			      onSubmit={this.addPostSubmit}
				  onCancel={this.openAddPost}
			  />
			</Dialog>

			{/*编辑*/}
			<Dialog
					title="编辑角色"
					onClose={this.openEditPost}
					open={this.state.openEditType}
					contentStyle ={{ width: '685px',height:'auto'}}
				>
			  <EditRole 
			    onSubmit={this.editPostSubmit}
				onCancel={this.openEditPost}
				detail={detail}
			  />
			</Dialog>

			{/*删除*/}
			<Dialog
				title="提示"
				onClose={this.cancelDelete}
				open={this.state.openDelete}
				contentStyle ={{ width: '446px',height:'236px'}}
			>
			<DeleteRole
				onCancel={this.cancelDelete}
				onSubmit={this.deleteSubmit}  	
			/>
			</Dialog>
        </div>
		);
	}

}
