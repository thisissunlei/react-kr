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
import AddPostType from './AddPostType';
import EditPostType from './EditPostType';
import DeletePost from './DeletePost';

export default class PostType extends Component{

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
			//数据准备

		}
	}
    
	componentWillMount(){
		//this.dataReady();
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

	//数据准备
	dataReady=()=>{
	   Http.request('postListAdd').then(function(response) {
        }).catch(function(err) {
          Message.error(err.message);
        });	
	}

	//获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('postListAdd',{id:id}).then(function(response) {
           Store.dispatch(initialize('EditPostType',response));
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
	
	//新建职务类型
	openAddPost=()=>{
      this.setState({
		  openPostType:!this.state.openPostType
	  })
	}

	//新建职务类型提交
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
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
	
	//编辑职务类型关闭
	openEditPost=()=>{
       this.setState({
		  openEditType:!this.state.openEditType
	  })
	}

    //编辑职务类型提交
	editPostSubmit=(params)=>{
        var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           _this.setState({
			  searchParams:{
				  time:+new Date(),
				  page:_this.state.searchParams.page,
				  pageSize:15
			  }  
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}


	//关闭所有侧滑
	allClose = () =>{
       this.setState({
		  openEditType:false,
		  openPostType:false
	  })
	}

   //删除关闭
   cancelDelete=()=>{
     this.setState({
		 openDelete:!this.state.openDelete
	 })
   }

   //删除提交
   deleteSubmit=()=>{
     Http.request('postListAdd',{},params).then(function(response) {
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

		return(
      	<div className="oa-post-type">
		    <Section title="职务类型" description="" style={{marginBottom:-5,minHeight:910}}>
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
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入姓名' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
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
				      onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>职务类型名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>更新时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" ></TableRowColumn>
						<TableRowColumn name="code"></TableRowColumn>
						<TableRowColumn name="descr"></TableRowColumn>
						<TableRowColumn name="orderNum"></TableRowColumn>
						<TableRowColumn name="updatorName"></TableRowColumn>
						<TableRowColumn name="uTime"></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑"  type="operation"  operation="edit"/>
			                <Button label="删除"  type="operation"  operation="delete" />
			            </TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		  </Section>

		  {/*新建职务*/}
			<Dialog
					title="新增职务类型"
					onClose={this.openAddPost}
					open={this.state.openPostType}
					contentStyle ={{ width: '630px',height:'500px'}}
				>
			  <AddPostType 
			    onSubmit={this.addPostSubmit}
				onCancel={this.openAddPost}
			  />
			</Dialog>

			{/*编辑职务*/}
			<Dialog
					title="编辑职务类型"
					onClose={this.openEditPost}
					open={this.state.openEditType}
					contentStyle ={{ width: '630px',height:'575px'}}
				>
			  <EditPostType 
			    onSubmit={this.editPostSubmit}
				onCancel={this.openEditPost}
			  />
			</Dialog>

			{/*删除*/}
			<Dialog
				title="提示"
				onClose={this.cancelDelete}
				open={this.state.openDelete}
				contentStyle ={{ width: '444px',height:'190px'}}
			>
			<DeletePost
				onCancel={this.cancelDelete}
				onSubmit={this.deleteSubmit}  	
			/>
			</Dialog>
        </div>
		);
	}

}
