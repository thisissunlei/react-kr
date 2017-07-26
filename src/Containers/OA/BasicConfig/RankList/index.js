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
				pageSize:15,
			},
			//数据准备下拉
			jobTypes:[],
			//删除id
			deleteId:'',
			subCompany:[],
			editDetail:{}
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
        Http.request('rank-list-watch',{id:id}).then(function(response) {
			if(response.enabled){
				response.enabled='true'  
			}else{
				response.enabled='false'   
			}
			_this.setState({
				editDetail:response
			})
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
				_this.openAddPost();
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
	    delete params.cTime;
		delete params.uTime;
			Http.request('rank-list-edit',{},params).then(function(response) {
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
			_this.cancelDelete();	
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
						<TableRowColumn name="name" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
						<TableRowColumn name="enabled" options={[{label:'启用',value:'true'},{label:'停用',value:'false'}]}></TableRowColumn>
						<TableRowColumn name="descr" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
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
					contentStyle ={{ width: '666px',height:'auto'}}
			>
			  <AddRankList 
			     onSubmit={this.addPostSubmit}
				 onCancel={this.openAddPost}

				 subCompany = {subCompany} 

			  />
			</Dialog>

			{/*编辑职务*/}
			<Dialog
					title="编辑职级"
					onClose={this.openEditPost}
					open={this.state.openEditType}
					contentStyle ={{ width: '666px',height:'auto'}}
				>
			  <EditRankList 
					onSubmit={this.editPostSubmit}
					onCancel={this.openEditPost}
					subCompany = {subCompany} 
					editDetail = {editDetail}
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
