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
	Section
} from 'kr-ui';
import AddRole from './AddRole';
import EditRole from './EditRole';
import DeleteRole from './DeleteRole';
import './index.less';

export default class RoleorgaList extends Component{

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
			  openDelete:true
			})		
		}
	}


	//获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('post-type-watch',{id:id}).then(function(response) {
           Store.dispatch(initialize('EditPostType',response));
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

	
	//新建开关
	openAddPost=()=>{
      this.setState({
		  openPostType:!this.state.openPostType
	  })
	}

	//新建提交
	addPostSubmit=(params)=>{
       var _this=this;
       Http.request('post-type-add',{},params).then(function(response) {
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
       Http.request('post-type-edit',{},params).then(function(response) {
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

	//删除页面的开关
	delSwidth = () =>{
	   this.setState({
		  openDelete:!this.state.openDelete
	   })
	}

	//删除按钮确定
	delSubmit = () =>{
		let {deleteId}=this.state;
		var _this=this;
		Http.request('post-list-delete',{id:deleteId}).then(function(response) {
           _this.setState({
			  searchParams:{
				  time:+new Date(),
				  page:1,
				  pageSize:15
			  }  
		   })
		   _this.delSwidth();
        }).catch(function(err) {
          Message.error(err.message);
        });	
	}



	render(){

		return(

      	<div className="m-list-org">

	        <Row style={{marginBottom:20}}>

				<Col
					style={{float:'left'}}
				>
					<Button
							label="添加"
							type='button'
							onTouchTap={this.openAddPost}
					/>
				</Col>
	        </Row>


            <Table
			        style={{marginTop:8}}
					ajax={true}
					onOperation={this.onOperation}
					displayCheckbox={false}
					ajaxParams={this.state.searchParams}
					ajaxUrlName='postTypeList'
					ajaxFieldListName="items"
			>
				<TableHeader className='detail-header'>
					<TableHeaderColumn className='header-row'>角色</TableHeaderColumn>
					<TableHeaderColumn className='header-row'>角色描述</TableHeaderColumn>
					<TableHeaderColumn className='header-row'>机构</TableHeaderColumn>
					<TableHeaderColumn className='header-row'>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody>
					<TableRow className='detail-row'>
						<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name="name"></TableRowColumn>
						<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name="code" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name="updatorName" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑" style={{borderRight:'solid 1px #E1E6EB'}} type="operation"  operation="edit"/>
							<Button label="删除" style={{borderRight:'solid 1px #E1E6EB'}} type="operation"  operation="delete"/>
			            </TableRowColumn>
					</TableRow>
				</TableBody>
           </Table>

		   {/*新建*/}
			<Dialog
				title="添加角色及机构"
				onClose={this.openAddPost}
				open={this.state.openPostType}
				contentStyle ={{ width: '374px',height:'auto'}}
			>
				<AddRole
					onCancel={this.openAddPost}
					onSubmit={this.addPostSubmit}
				/>
			</Dialog>
			{/*编辑*/}
			<Dialog
				title="编辑角色及机构"
				onClose={this.openEditPost}
				open={this.state.openEditType}
				contentStyle ={{ width: '374px',height:'auto'}}
			>
				<EditRole
					onCancel={this.openEditPost}
					onSubmit={this.editPostSubmit}
				/>
			</Dialog>

			{/*删除*/}
				<Dialog
					title="提示"
					onClose={this.delSwidth}
					open={this.state.openDelete}
					contentStyle ={{ width: '446px',height:'236px'}}
					stylesCard={true}
				>
				<DeleteRole
					onCancel={this.delSwidth}
					onSubmit={this.delSubmit}  
				/>
				</Dialog>
        </div>
		);
	}

}
