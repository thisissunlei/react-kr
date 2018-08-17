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
import NewModel from './NewModel';
import EditModel from './EditModel';
import DeleteModel from './DeleteModel';
import './index.less';


export default class SqlModel extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openNewModel:false,
            openEditModel:false,
            openDelete:false,
			searchParams:{
				page:1,
				pageSize:15
            },
            deleteId:''
		}
	}



	onOperation=(type,itemDetail)=>{
		if(type=='edit'){
			this.setState({
                openEditModel:true,
                deleteId:itemDetail.id
            })
            Store.dispatch(initialize('EditModel',itemDetail));
		}else if(type=='delete'){
            this.setState({
                openDelete:true,
                deleteId:itemDetail.id
			})
        }
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
    
    cancelDelete=()=>{
      this.setState({
         openDelete:!this.state.openDelete
      }) 
    }

    deleteSubmit=()=>{
        let {deleteId}=this.state;
        var params={};
        params.id=deleteId;
        var _this=this;
        Http.request('sql-delete',{},params).then(function(response) {
             var searchParams={
                 time:+new Date()
             } 
             _this.setState({
                 searchParams:Object.assign({},_this.state.searchParams,searchParams)  
             })
             _this.cancelDelete();
         }).catch(function(err) {
           Message.error(err.message);
         });
    }

	//新建开关
	openAddModel=()=>{
      this.setState({
         openNewModel:!this.state.openNewModel
	  })
	}

	//新建提交
	addPostSubmit=(params)=>{
	   params=Object.assign({},params);
       var _this=this;
       Http.request('sql-add',{},params).then(function(response) {
            var searchParams={
                time:+new Date()
            } 
            _this.setState({
                searchParams:Object.assign({},_this.state.searchParams,searchParams)  
            })
			_this.openAddModel();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

	//编辑关闭
	openEditModel=()=>{
       this.setState({
        openEditModel:!this.state.openEditModel
	  })
	}

    //编辑提交
	editPostSubmit=(params)=>{
        let {deleteId}=this.state;
       var _this=this;
       params=Object.assign({},params);
       delete params.uTime;
       params.id=deleteId;
       Http.request('sql-edit',{},params).then(function(response) {
            var searchParams={
                time:+new Date()
            } 
            _this.setState({
                searchParams:Object.assign({},_this.state.searchParams,searchParams)  
            })
		  _this.openEditModel();
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

		

		return(
      	<div className="m-sql-list">
		  	<Title value="SQL模板-氪空间后台管理系统"/>
		    <Section title="sql模版" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>

				<Col
					style={{float:'left'}}
				>
					<Button
							label="新建"
							type='button'
							onTouchTap={this.openAddModel}
					/>
				</Col>

					<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入模版名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
					</Col>

	        </Row>


            <Table
			        style={{marginTop:8}}
					ajax={true}
					onOperation={this.onOperation}
					displayCheckbox={false}
					ajaxParams={this.state.searchParams}
					ajaxUrlName='sql-list'
					ajaxFieldListName="items"
				    onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>模版名称</TableHeaderColumn>
					<TableHeaderColumn>数据库类型</TableHeaderColumn>
					<TableHeaderColumn>操作类型</TableHeaderColumn>
					<TableHeaderColumn>SQL模版</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="dbType" style={{wordWrap:'break-word',whiteSpace:'normal'}} 
                          options={[{value:'MYSQL',label:'mysql'},{value:'ORACLE',label:'oracle'}]}
                          >
                        </TableRowColumn>
						<TableRowColumn name="operType" style={{wordWrap:'break-word',whiteSpace:'normal'}} options={[{value:'TABLE_CREATE',label:'创建表'},{value:'TABLE_DELETE',label:'删除表'},{value:'TABLE_EDIT_DESCR',label:'修改表注释'},
                          {value:'FIELD_ADD',label:'新增字段'},{value:'FIELD_DELETE',label:'删除字段'},{value:'FIELD_RENAME',label:'修改字段名'},{value:'FIELD_MODIFY',label:'修改字段属性'},{value:'TABLE_EDIT_NAME',label:'修改表名'}]} ></TableRowColumn>
						<TableRowColumn name="sqlTemplate"  component={(value,oldValue)=>{
		 										var maxWidth=20;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,20)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8}  place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn name="updatorName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
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
			<Dialog
					title="新增模版"
					onClose={this.openAddModel}
					open={this.state.openNewModel}
					contentStyle ={{ width: '685px',height:'auto'}}
				>
			  <NewModel
			      onSubmit={this.addPostSubmit}
				  onCancel={this.openAddModel}
			  />
			</Dialog>

			{/*编辑*/}
			<Dialog
					title="编辑模版"
					onClose={this.openEditModel}
					open={this.state.openEditModel}
					contentStyle ={{ width: '685px',height:'auto'}}
				>
                <EditModel
                    onSubmit={this.editPostSubmit}
                    onCancel={this.openEditModel}
                />
			</Dialog>

            {/*删除*/}
			<Dialog
				title="提示"
				onClose={this.cancelDelete}
				open={this.state.openDelete}
				contentStyle ={{ width: '446px',height:'236px'}}
			>
			<DeleteModel
				onCancel={this.cancelDelete}
				onSubmit={this.deleteSubmit}
			/>
			</Dialog>
        </div>
		);
	}

}
