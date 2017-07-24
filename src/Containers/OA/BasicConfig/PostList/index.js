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
	Drawer,
	Tooltip,
	Message,
	Section,
	CheckPermission
} from 'kr-ui';
import AddPostList from './AddPostList';
import EditPostList from './EditPostList';
import Delete from './Delete';
export default class PostList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {},
			other:"",
			//数据准备下拉
			jobTypes:[],
			//删除id
			deleteId:'',
			subCompany:[],
			editDetail:{},
			
		}
		this.allConfig = {
			openNew : false,
			openEdit : false,
			openDel : false,
		}

		
	}
   

   componentWillMount(){
	  this.dataReady();
	}
	//分部选择
	dataReady=()=>{
		var _this=this;
	   Http.request('post-type-info').then(function(response) {
				_this.setState({
					subCompany:response.subcompanys
				})
     }).catch(function(err) {
          Message.error(err.message);
     });	
	}
    
	


	//是否要渲染
	isRender = () =>{
		this.setState({
			other : new Date,
		})
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
	//新建页开关
	newSwidth = () =>{
		let {openNew} = this.allConfig;
		this.allConfig.openNew = !openNew;
		this.isRender();
	}
	
	//编辑页开关
	editSwidth = () =>{
		let {openEdit} = this.allConfig;
		this.allConfig.openEdit = !openEdit;
		this.isRender();
	}
	//删除页面的开关
	delSwidth = () =>{
		let {openDel} = this.allConfig;
		this.allConfig.openDel = !openDel;
		this.isRender();
	}
	//新建确定
	addSubmit = (values) =>{
		var _this=this;
		Http.request('postListAdd',{},values).then(function(response) {
            _this.setState({
			searchParams:{
				time:+new Date(),
				page:1,
				pageSize:15
			 } 
			}) 
        }).catch(function(err) {
          Message.error(err.message);
        });
		 this.newSwidth();
	}
	//编辑确定
	editSubmit = (params) =>{
         var _this=this;
			Http.request('post-list-edit',{},params).then(function(response) {
				_this.setState({
					searchParams:{
						time:+new Date(),
						page:_this.state.searchParams.page,
						pageSize:15,
						name:_this.state.searchParams.name?_this.state.searchParams.name:""
					}  
				 })
				}).catch(function(err) {
				Message.error(err.message);
			});
			this.editSwidth();
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
        }).catch(function(err) {
          Message.error(err.message);
        });
		this.delSwidth();
	}
	//相关操作
	onOperation = (type, itemDetail) =>{
		if(type == "edit"){
			this.getEditData(itemDetail.id);
			this.editSwidth();
		}else if(type == "del"){
			this.delSwidth();
			this.setState({
				deleteId:itemDetail.id
			})
		}
	}

    //获取编辑信息
	getEditData=(id)=>{
		let {subCompany} = this.state;
		var _this=this;
       Http.request('post-list-watch',{id:id}).then(function(response) {
		   console.log(response,subCompany,">>>>>>>>")
		   if(response.enabled){
			 response.enabled='true'  
		   }else{
			 response.enabled='false'   
		   }
		   _this.setState({
			   editDetail:response
		   })
           Store.dispatch(initialize('EditPostList',response));		   
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

	pageChange=(page)=>{
	   var searchParams={
         page:page
       }
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }

	render(){
		let {jobTypes,subCompany,editDetail}=this.state;
		const {openNew,openEdit,openDel} = this.allConfig;
		return(
      	<div className="basic-post-list">
		  	<Section title="职务列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>
			    <Col
					style={{float:'left'}}
				>
					<Button
							label="新建职务"
							type='button'
							onTouchTap={this.newSwidth}
					/>
				</Col>
				<Col
					align="right" 
					style={{
							marginTop:0,
							float:"right",
							marginRight:-10
						   }}
				>
					<ListGroup>
						<ListGroupItem>
							<SearchForms 
								placeholder='请输入职务名称' 
								onSubmit={this.onSearchSubmit}
							/>
						</ListGroupItem>
					</ListGroup>
				</Col>
	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={false}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName="postJobList"
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>职务名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>职务类型名称</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>更新时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" ></TableRowColumn>
						<TableRowColumn name="code"></TableRowColumn>
						<TableRowColumn name="enabledStr"></TableRowColumn>
						<TableRowColumn name="orderNum"></TableRowColumn>
						<TableRowColumn name="jobTypeName"></TableRowColumn>
						<TableRowColumn name="updatorName"></TableRowColumn>
						<TableRowColumn name="cTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}}></TableRowColumn>
						<TableRowColumn type="operation">
							<Button label="编辑"  type="operation"  operation="edit" />
							<Button label="删除"  type="operation"  operation="del" />
						</TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		   {/*新建用户*/}
			<Dialog
				title="新增职务"
				onClose={this.newSwidth}
				open={openNew}
				contentStyle ={{ width: '630px',height:'auto'}}
			>
				<AddPostList
					onCancel={this.newSwidth}
					onSubmit={this.addSubmit}
					subCompany = {subCompany}
				/>
			</Dialog>
			{/*编辑用户*/}
			<Dialog
				title="编辑职务"
				onClose={this.editSwidth}
				open={openEdit}
				contentStyle ={{ width: '630px',height:'630px'}}
			>
				<EditPostList
					onCancel={this.editSwidth}
					onSubmit={this.editSubmit}
					subCompany = {subCompany}
					editDetail = {editDetail}
				/>
			</Dialog>
			{/*开通门禁*/}
			<Dialog
				title="删除职务"
				onClose={this.delSwidth}
				open={openDel}
				contentStyle ={{ width: '444px'}}
			>
				<Delete
					onCancel={this.delSwidth}
					onSubmit={this.delSubmit}  
				/>
			</Dialog>
			</Section>
        </div>
		);
	}

}
;
