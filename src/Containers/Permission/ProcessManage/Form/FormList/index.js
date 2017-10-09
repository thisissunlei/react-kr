import React,{Component} from 'react';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import DictionaryConfigs from 'kr/Configs/dictionary';
import {
	initialize,
	change
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
import WatchForm from './WatchForm';
import AddTable from './AddTable';
import EditForm from './EditForm';
import SearchUpperForm from './SearchUpperForm';
import './index.less';
export default class FormList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {
				 page:1,
				 pageSize:15,
				 tableName:'',
				 typeId:this.props.data.id,
				 nameKey:'',
				 enabled:'',
				 purpose:''		 
      },
			other:"",
			//创建表id
			creatId:'',
			//字典
			purposeType:[],
			//表单类型
			typeList:[],
			//基本信息
			basicInfo:{},
			//字段信息
			textInfo:[],
			//是否已创建表
			isCreate:false,
		}
		this.allConfig = {
			openNew : false,
      openTable:false,
      openWatch:false,
      openEdit:false,
      openSearch:false
		}
	}

	componentWillReceiveProps(nextProps){
     if(this.props.data.id!=nextProps.data.id){
				var searchParams={};
				searchParams.typeId=nextProps.data.id;
				this.setState({
					searchParams:Object.assign({},this.state.searchParams,searchParams)
				})
		 }
	}

	componentDidMount(){
		  let _this=this;
			Http.request('form-type-select').then(function(response) {
				 _this.setState({
					typeList:response.items
				 })
			}).catch(function(err) {
				Message.error(err.message);
			});
		this.setState({
			purposeType:DictionaryConfigs.ERP_PurposeType
		})
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
		}
		var search=Object.assign({},this.state.searchParams,obj);
		this.setState({
		  searchParams:search
		})
	}
	//新建页开关
	newSwidth = () =>{
		let {openNew} = this.allConfig;
		this.allConfig.openNew = !openNew;
		if(this.allConfig.openNew){
	  	Store.dispatch(change('AddForm','typeId',this.state.searchParams.typeId));		
		}
		this.isRender();
	}
  //创建表的开关
  cancelTable=()=>{
    let {openTable} = this.allConfig;
		this.allConfig.openTable = !openTable;
		this.isRender();
  }

 //编辑页开关
  editOpen=()=>{
		let {creatId}=this.state;
    let {openEdit} = this.allConfig;
		this.allConfig.openEdit = !openEdit;
		this.isRender();
		if(this.allConfig.openEdit){
			this.getBasicInfo(creatId);
		}
  }

  //查看表的开关
  watchTable=()=>{
    let {openWatch} = this.allConfig;
		this.allConfig.openWatch = !openWatch;
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
	
	//高级查询提交
	onSearchUpperSubmit=(params)=>{
		params = Object.assign({},params)
		params.typeId=this.props.data.id;
		params.pageSize=15;
		params.page=1;
		var search={
			tableName:'',
			nameKey:'',
			enabled:'',
			purpose:''	
		}
		this.setState({
			searchParams:Object.assign({},search,params)
		})
		this.cancelSearchUpperDialog();
	}


	//新建确定
	addSubmit = (values) =>{
		values = Object.assign({},values)
		var _this=this;
		Http.request('form-add-list',{},values).then(function(response) {
					var searchParams={};
					searchParams.time=+new Date();
					_this.setState({
						searchParams:Object.assign({},_this.state.searchParams,searchParams)
					})
			    _this.newSwidth();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
	//编辑确定
	editSubmit = (params) =>{
			params = Object.assign({},params)
			delete params.records;
			delete params.purposeStr;
			delete params.enabledStr;
      var _this=this;
			Http.request('form-edit-list',{},params).then(function(response) {
				var searchParams={};
				searchParams.time=+new Date();
				_this.setState({
					searchParams:Object.assign({},_this.state.searchParams,searchParams)
				})
				 _this.getBasicInfo(params.id);
				 _this.editOpen();
				}).catch(function(err) {
				Message.error(err.message);
			});
	}

 //创建表提交
  addRemoveSubmit=(params)=>{
		params = Object.assign({},params);
    let {creatId}=this.state;
		let _this=this;
		Http.request('form-create-table',{},{formId:creatId}).then(function(response) {
			var searchParams={};
			searchParams.time=+new Date();
			_this.setState({
				searchParams:Object.assign({},_this.state.searchParams,searchParams)
			})
			 _this.cancelTable();
			}).catch(function(err) {
			Message.error(err.message);
		});   
  }

	
	//创建表打开
	openTableStart=(itemDetail)=>{
		this.cancelTable();
		this.setState({
			creatId:itemDetail.id
		})
	}

	//打开查看
	warchFormStart=(itemDetail)=>{
		this.watchTable();
    this.getBasicInfo(itemDetail.id);
		this.getTextInfo(itemDetail.id);
		this.setState({
			isCreate:itemDetail.created,
			creatId:itemDetail.id
		})		
	}
 
	//获取表单字段信息
	getTextInfo=(id)=>{
		var _this=this;
		Http.request('form-group-table',{formId:id}).then(function(response) {
			 _this.setState({
				textInfo:response.items
			 })
		 }).catch(function(err) {
			 Message.error(err.message);
		 });
	}

	//获取表单查看基本信息
	getBasicInfo=(id)=>{
		var _this=this;
		Http.request('form-get-edit',{id:id}).then(function(response) {
		   _this.setState({
				basicInfo:response
			 })
			 if(response.enabled){
				 response.enabled='true'
			 }else{
				 response.enabled='false'
			 }
		
			 Store.dispatch(initialize('EditForm',response));
		 }).catch(function(err) {
			 Message.error(err.message);
		 });
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
     let {openWatch,openNew} = this.allConfig;
 		 this.allConfig.openWatch =false;
     this.allConfig.openNew =false;
     this.allConfig.openEdit =false;
 		 this.isRender();
   }

	render(){

		const {openNew,openTable,openSearch} = this.allConfig;
		 
		let {purposeType,typeList,basicInfo,textInfo,isCreate}=this.state;

		return(
      	<div className="basic-type-list">
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
	            ajaxUrlName="form-list-search"
	            ajaxFieldListName="items"
				      onPageChange = {this.pageChange}
              hasBorder={true}
			>
				<TableHeader>
					<TableHeaderColumn>表单名称</TableHeaderColumn>
					<TableHeaderColumn>表单类型</TableHeaderColumn>
          <TableHeaderColumn>表单表名</TableHeaderColumn>
          <TableHeaderColumn>表单分类</TableHeaderColumn>
					<TableHeaderColumn>是否启用</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>是否已创建表</TableHeaderColumn>
					<TableHeaderColumn>创建时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
            <TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
            <TableRowColumn name="typeName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="tableName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="purposeStr" style={{wordWrap:'break-word',whiteSpace:'normal',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="enabledStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="updatorName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
						}}></TableRowColumn>
						<TableRowColumn name="createdStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="cTTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
						}}  style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn type="operation" component={(value,oldValue,detail)=>{
							return <div>
												<span onClick={this.warchFormStart.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>查看</span>
												{!value.created&&<span onClick={this.openTableStart.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>创建表</span>}
										 </div>
							}}>
							
						</TableRowColumn>
					</TableRow>
				 </TableBody>
				<TableFooter></TableFooter>
      </Table>

		   {/*新建表单*/}
			{console.log(this.allConfig.openNew,"OOOOO")}
      <Drawer
					open={this.allConfig.openNew}
					width={750}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					onClose={this.allClose}
				>
        <AddForm
					onCancel={this.newSwidth}
					onSubmit={this.addSubmit}
					purposeType={purposeType}
					typeList={typeList}
				/>
			</Drawer>

      {/*编辑表单*/}
     <Drawer
         open={this.allConfig.openEdit}
         width={750}
         openSecondary={true}
         drawerStyle={{zIndex:110}}
         onClose={this.allClose}
       >
       <EditForm
         onCancel={this.editOpen}
         onSubmit={this.editSubmit}
				 purposeType={purposeType}
				 typeList={typeList}
				 isCreate={isCreate}
				 basicInfo={basicInfo}
       />
     </Drawer>

      {/*查看表单*/}
     <Drawer
         open={this.allConfig.openWatch}
         width={750}
         openSecondary={true}
         drawerStyle={{zIndex:100}}
         onClose={this.allClose}
       >
       <WatchForm
         editOpen={this.editOpen}
         allClose={this.watchTable}
				 basicInfo={basicInfo}
				 textInfo={textInfo}
				 isCreate={isCreate}
       />
     </Drawer>


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
								purposeType={purposeType}
            />
        </Dialog>
        </div>
		);
	}

}
;
