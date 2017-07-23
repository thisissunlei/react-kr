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
import AddRankList from './AddRankList';
import EditRankList from './EditRankList';
import DeletePost from './DeletePost';

export default class RankList extends Component{

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
			//数据准备下拉
			jobTypes:[],
			//删除id
			deleteId:''
		}
	}


	componentWillMount(){
	  this.dataReady();
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


	//数据准备
	dataReady=()=>{
		 var _this=this;
	   Http.request('rank-type-info',{
		   orgType:'DEPARTMENT',
		   orgId:'5'
	   }).then(function(response) {
		   _this.setState({
			    jobTypes:response.jobTypes
		  })
     }).catch(function(err) {
          Message.error(err.message);
     });	
	}


	//获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('rank-list-watch',{id:id}).then(function(response) {
				    if(response.enabled){
							response.enabled='true'  
							}else{
								response.enabled='false'   
						 }
           Store.dispatch(initialize('EditRankList',response));
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
	addPostSubmit=(values)=>{
		var _this=this;
		Http.request('rank-list-add',{},values).then(function(response) {
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
				  this.openAddPost();
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
			Http.request('rank-list-edit',{},params).then(function(response) {
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
			this.openEditPost();
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
		  let {deleteId}=this.state;
			var _this=this;
      Http.request('rank-list-delete',{id:deleteId}).then(function(response) {
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
				this.cancelDelete();	
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
		let {jobTypes}=this.state;
		return(
      	<div className="oa-post-type">
		    <Section title="职级管理" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>

				<Col
					style={{float:'left'}}
				>
					<Button
							label="新建职级"
							type='button'
							onTouchTap={this.openAddPost}
					/>
				</Col>
			        
					<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入职级名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
					</Col>

	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={false}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='rank-list-list'
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>职级名称</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>
					<TableHeaderColumn>职级描述</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" ></TableRowColumn>
						<TableRowColumn name="enabled" options={[{label:'启用',value:'true'},{label:'停用',value:'false'}]}></TableRowColumn>
						<TableRowColumn name="descr"></TableRowColumn>
						<TableRowColumn name="updatorName"></TableRowColumn>
						<TableRowColumn name="cTime" component={(value,oldValue)=>{
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

		  {/*新建职务*/}
			<Dialog
					title="新建职级"
					onClose={this.openAddPost}
					open={this.state.openPostType}
					contentStyle ={{ width: '630px',height:'auto'}}
				>
			  <AddRankList 
			    onSubmit={this.addPostSubmit}
				 onCancel={this.openAddPost}
				 jobTypes={jobTypes}
			  />
			</Dialog>

			{/*编辑职务*/}
			<Dialog
					title="编辑职级"
					onClose={this.openEditPost}
					open={this.state.openEditType}
					contentStyle ={{ width: '630px',height:'auto'}}
				>
			  <EditRankList 
			    onSubmit={this.editPostSubmit}
				onCancel={this.openEditPost}
				jobTypes={jobTypes}
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
