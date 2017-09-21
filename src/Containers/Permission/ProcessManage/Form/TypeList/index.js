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
import AddType from './AddType';
import EditType from './EditType';
import './index.less';
export default class TypeList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {
				page:1,
				pageSize:15,
				nameKey:"",
			},
			other:"",
		}
		this.allConfig = {
			openNew : false,
			openEdit : false,
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
			nameKey: params.content,
      		pageSize:15,
			page:1,
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

	//新建确定
	addSubmit = (values) =>{
		var _this=this;
		Http.request('add-form-type',{},values).then(function(response) {
			_this.setState({
				searchParams:{
					time:+new Date(),
					page:1,
					pageSize:15
				}
			})
			const {addSubmit}=_this.props;
			addSubmit && addSubmit();
			_this.newSwidth();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
	//编辑确定
	editSubmit = (params) =>{
         var _this=this;
			Http.request('edit-form-type',{},params).then(function(response) {
				_this.setState({
					searchParams:{
						time:+new Date(),
						page:_this.state.searchParams.page,
						pageSize:15,
						nameKey:_this.state.searchParams.nameKey?_this.state.searchParams.nameKey:""
					}
				 })
				 const {editSubmit}=_this.props;
				 editSubmit && editSubmit();
				 _this.editSwidth();
				}).catch(function(err) {
				Message.error(err.message);
			});
	}

	//相关操作
	onOperation = (type, itemDetail) =>{
		if(type == "edit"){
			this.getEditData(itemDetail.id);
			this.editSwidth();
		}
	}

    //获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('get-form-data',{id:id}).then(function(response) {
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

	render(){

		const {openNew,openEdit} = this.allConfig;
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
							placeholder='请输入表单类型名称'
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
	            ajaxUrlName="get-from-list"
	            ajaxFieldListName="items"
			    onPageChange = {this.pageChange}
              	hasBorder={true}
			>
				<TableHeader>
					<TableHeaderColumn>表单类型</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="orderNum" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="descr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="updatorName" 
							component={(value,oldValue)=>{
								var maxWidth=10;
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
							}} 
						></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn type="operation">
							<Button label="编辑"  type="operation"  operation="edit" operateCode="hrm_job_edit"/>
						</TableRowColumn>
					</TableRow>
				 </TableBody>
				<TableFooter></TableFooter>
      </Table>
		   {/*新建用户*/}
			<Dialog
				title="新增表单类型"
				onClose={this.newSwidth}
				open={openNew}
				contentStyle ={{ width: '666px',height:'auto'}}
			>
				<AddType
					onCancel={this.newSwidth}
					onSubmit={this.addSubmit}
				/>
			</Dialog>
			{/*编辑用户*/}
			<Dialog
				title="编辑表单类型"
				onClose={this.editSwidth}
				open={openEdit}
				contentStyle ={{ width: '666px',height:'auto'}}
			>
				<EditType
					onCancel={this.editSwidth}
					onSubmit={this.editSubmit}
				/>
			</Dialog>
        </div>
		);
	}

}
;
