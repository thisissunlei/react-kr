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
import AddForm from './AddForm';
import AddTable from './AddTable';
import EditForm from './EditForm';
import SearchUpperForm from './SearchUpperForm';
import './index.less';
export default class FormList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {

      },
			other:"",
		}
		this.allConfig = {
			openNew : false,
			openEdit : false,
      openTable:false,
      openSearch:false
		}
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
  //创建表的开关
  cancelTable=()=>{
    let {openTable} = this.allConfig;
		this.allConfig.openTable = !openTable;
		this.isRender();
  }

  //高级查询开关
  cancelSearchUpperDialog=()=>{
    let {openSearch} = this.allConfig;
    this.allConfig.openSearch = !openSearch;
    this.isRender();
  }
  openSearchUpperDialog=()=>{
    this.cancelSearchUpperDialog();
  }
	//编辑页开关
	editSwidth = () =>{
		let {openEdit} = this.allConfig;
		this.allConfig.openEdit = !openEdit;
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
			    _this.newSwidth();
        }).catch(function(err) {
          Message.error(err.message);
        });
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
				 _this.editSwidth();
				}).catch(function(err) {
				Message.error(err.message);
			});
	}

 //创建表提交
  addRemoveSubmit=(params)=>{
    this.cancelTable();
  }

	//相关操作
	onOperation = (type, itemDetail) =>{
		if(type == "watch"){

		}else{
      this.cancelTable();
    }
	}

    //获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('post-list-watch',{id:id}).then(function(response) {
         Store.dispatch(initialize('EditType',response));
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

   allClose=()=>{
     this.newSwidth();
   }

	render(){

		const {openNew,openEdit,openTable,openSearch} = this.allConfig;
		return(
      	<div className="basic-post-list">
	        <Row style={{marginBottom:21,marginTop:22}}>
			    <Col
					style={{float:'left'}}
				>
					<Button
							label="新建"
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
								placeholder='请输入表单名称'
								onSubmit={this.onSearchSubmit}
							/>
						</ListGroupItem>
            <ListGroupItem>
              <Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/>
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
					<TableHeaderColumn>职务编码</TableHeaderColumn>
          <TableHeaderColumn>所属分部</TableHeaderColumn>
          <TableHeaderColumn>职务类型</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
            <TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
            <TableRowColumn name="code" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="subName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="jobTypeName" style={{wordWrap:'break-word',whiteSpace:'normal',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="enabledStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="orderNum" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="descr" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
						<TableRowColumn name="updatorName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn type="operation">
							<Button label="查看"  type="operation"  operation="watch" operateCode="hrm_job_edit"/>
              <Button label="创建表"  type="operation"  operation="add" operateCode="hrm_job_edit"/>
						</TableRowColumn>
					</TableRow>
				 </TableBody>
				<TableFooter></TableFooter>
      </Table>

		   {/*新建表单*/}
      <Drawer
					open={this.allConfig.openNew}
					width={700}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					onClose={this.allClose}
				>
        <AddForm
					onCancel={this.newSwidth}
					onSubmit={this.addSubmit}
				/>
			</Drawer>

			{/*编辑表单*/}
			<Dialog
				title="编辑表单类型"
				onClose={this.editSwidth}
				open={openEdit}
				contentStyle ={{ width: '666px',height:'auto'}}
			>
				<EditForm
					onCancel={this.editSwidth}
					onSubmit={this.editSubmit}
				/>
			</Dialog>

      {/*创建表*/}
      <Dialog
        title="提示"
        onClose={this.cancelTable}
        open={openTable}
        contentStyle ={{ width: '446px',height:'auto'}}
      >
      <AddTable
        onCancel={this.cancelTable}
        onSubmit={this.addRemoveSubmit}
      />
      </Dialog>

      {/*高级查询*/}
          <Dialog
          title="高级查询"
          onClose={this.cancelSearchUpperDialog}
          open={openSearch}
          contentStyle ={{ width: '666px',height:'auto'}}
          >
            <SearchUpperForm
                onCancel={this.cancelSearchUpperDialog}
                onSubmit={this.onSearchUpperSubmit}
            />
        </Dialog>
        </div>
		);
	}

}
;
