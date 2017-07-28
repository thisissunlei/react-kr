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
	Drawer
} from 'kr-ui';
import AddOrganization from './AddOrganization';
import EditOrganization from './EditOrganization';

export default class OrgList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openPostType:false,
			openEditType:false,
			searchParams:{
				page:1,
				pageSize:15
			},
			//数据准备
			latitude:''
		}
	}
    
	componentWillMount(){
	  this.dataReady();
	}
    
	//所属纬度数据准备
	dataReady=()=>{
		var _this=this;
	   Http.request('post-type-info').then(function(response) {
				_this.setState({
					//latitude:response.subcompanys
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

   //分页
   pageChange=(page)=>{
	   var searchParams={
         page:page
       }
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }
   
   //全部关闭
   allClose=()=>{
      this.setState({
		 openPostType:false,
		 openEditType:false, 
	  })
   }


	render(){

		let {latitude}=this.state;

		return(
      	<div className="oa-or-role">
		    <Section title="机构分权列表" description="" style={{marginBottom:-5,minHeight:910}}>
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
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入机构分权名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
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
					<TableHeaderColumn>机构分权名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>所属纬度</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>启用状态</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody>
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
						<TableRowColumn name="orderNum"></TableRowColumn>
						<TableRowColumn name="updatorName" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
						<TableRowColumn name="descr"></TableRowColumn>
						<TableRowColumn name="orderNum"></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}}></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑"  type="operation"  operation="edit"/>
			            </TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		  </Section>

		  {/*新建*/}
			<Drawer
					open={this.state.openPostType}
					width={750}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					onClose={this.allClose}
				>
			  <AddOrganization 
			      onSubmit={this.addPostSubmit}
				  onCancel={this.openAddPost}
				  latitude={latitude}
			  />
			</Drawer>

			{/*编辑*/}
			 <Drawer
			  		open={this.state.openEditType}
					width={750}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					onClose={this.allClose}
				>
			  <EditOrganization 
			    onSubmit={this.editPostSubmit}
				onCancel={this.openEditPost}
			  />
			</Drawer>
        </div>
		);
	}

}
