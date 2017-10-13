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
import './index.less';
import AddPic from './AddPic';
import EditPic from './EditPic';
// import DeleteRole from './DeleteRole';

export default class SwperList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isOpenAdd:false,
			isOpenEdit:false,
			isDelete:false,
			//删除的id
			nowId:'',
			detail:[],
			photoUrl:'',
			searchParams : {
				page: 1,
				pageSize: 15,
				name:""
			},
			name:''
		}
	}
   componentDidMount(){

    }
   //新建开关
   switchOpenAdd = () =>{
	   var {isOpenAdd} = this.state;
	   this.setState({
		  isOpenAdd: !isOpenAdd
	   })
	   
   }
   //编辑开关
   switchOpenEdit = (value) =>{
	   var {isOpenEdit} = this.state;
	   this.setState({
		  isOpenEdit: !isOpenEdit,
          detail:value,
	   })
   }
   
   //删除开关
   switchOpenDelete = (value) =>{
	   
	   var {isDelete} = this.state;
	   this.setState({
		  isDelete: !isDelete,
		  detail:value
	   })
   }


   pageChange=(page)=>{
	   var searchParams={
         page:page
       };
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }

   allClose = () =>{
	   this.setState({
		    isOpenAdd:false,
			isOpenEdit:false,
			isDelete:false,
	   })
   }
   addSubmit = (data) =>{
	   	var _this = this;
		var params = Object.assign({},data)
		Http.request("web-pclist-listadd-editor",{},params).then(function (response) {
			Message.success("新建成功");
			_this.switchOpenAdd()
			_this.refresh();
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
   editSubmit = (data) =>{
	   	const {nowId} = this.state;
		var _this = this;
		var params = Object.assign({},data)
		params.id = nowId;
	
		
		Http.request("web-pclist-listadd-editor",{},data).then(function (response) {
			Message.success("编辑成功");
			_this.switchOpenEdit()
			_this.refresh();
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
     upPublish= (value)=>{
		 var _this=this;
		 var pub = 0;
       if(value.published=='0') {
          pub=1;
	   }
	   
	   Http.request("web-pclist-listadd-up-down",{},{id:value.id,published:pub}).then(function (response) {
		if(pub){
			Message.success("上线成功");
		}else{
			Message.success("下线成功");
		}
		
		_this.refresh();
		}).catch(function (err) {
			Message.error(err.message);
		});

	 }
   deleteSubmit = () =>{
	   let _this = this;
	   let value = this.state.detail;
	   Http.request("web-pclist-listadd-delete",{},{id:value.id}).then(function (response) {
			Message.success("删除成功");
			_this.switchOpenDelete()
			_this.refresh("delete");
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
//    deletePic=(value)=>{
     
//    }
//    onSearchSubmit = (values) =>{
// 	   console.log('这个事什么事件');
// 	   var searchParams = Object.assign({},this.state.searchParams);
// 	   searchParams.name = values.content;
// 	   this.setState({
// 		   searchParams
// 	   })


//    }
    // onOperation = (type, itemDetail) =>{
    //     if(type == "delete"){
	// 		this.switchOpenDelete();

	// 	}
	// 	if(type == "edit"){
	// 		this.getDetail(itemDetail.id)
	// 		this.switchOpenEdit();
			
	// 	}
	// 	this.setState({
	// 		nowId:itemDetail.id,
	// 		name:itemDetail.name
	// 	})

    // }
	jump = (src) =>{
		window.location.href = src;
	}
	refresh = (type) =>{
		let searchParams = Object.assign({},this.state.searchParams);
		searchParams.other  = new Date();
		if(type == "delete"){
			searchParams.page = 1;
		}
		this.setState({
			searchParams
		})
    }

	render(){

		let {
			detail,
			code,
			isOpenAdd,
			isOpenEdit,
			isDelete,
			photoUrl,
			name
			}=this.state;

		return(
      	<div className="pic-list">
		    <Section title="轮播图列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>
				<Col
					style={{float:'left'}}
				>
					<Button
						label="新建"
						type='button'
						operateCode="por_mobilepic_editsave"
						onTouchTap={this.switchOpenAdd}
					/>
				</Col>
				{/*<Col style={{marginTop:0,float:"right",marginRight:-10}}>
					<ListGroup>
						<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入内容' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
					</ListGroup>
				</Col>*/}

	        </Row>


            <Table
				style={{marginTop:8}}
				ajax={true}
				onOperation={this.onOperation}
				displayCheckbox={false}
				ajaxParams={this.state.searchParams}
				ajaxUrlName='web-piclist-listshow'
				ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>编号</TableHeaderColumn>
					<TableHeaderColumn>轮播图</TableHeaderColumn>
					<TableHeaderColumn>标题</TableHeaderColumn>	
					<TableHeaderColumn>简介</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>

						<TableRowColumn name="identifier" ></TableRowColumn>
						<TableRowColumn
							name="logo"
							component={(value,oldValue)=>{
								return (<img className = "swper-img" src = {value}/>)
							}}
						></TableRowColumn>
						<TableRowColumn 
							name="title"
							component={(value,oldValue)=>{
								
								var maxWidth=10;
								
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div  className='tooltipParent'><div className='tableOver' ><span>{value}</span></div><Tooltip offsetTop={8} place='top' ><div style = {{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{oldValue}</div></Tooltip></div>)
							}}
						
						></TableRowColumn>
						<TableRowColumn 
							name="desrc"
							component={(value,oldValue)=>{	
								var maxWidth=10;
								
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div  className='tooltipParent'><div className='tableOver' ><span>{value}</span></div><Tooltip offsetTop={8} place='top' ><div style = {{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{oldValue}</div></Tooltip></div>)
							}}
						
						></TableRowColumn>
						<TableRowColumn 
							name="orderNum"
							component={(value,oldValue)=>{	
							
								return (<div  className='tooltipParent'><div className='tableOver' ><span>{value}</span></div><Tooltip offsetTop={8} place='top' ><div style = {{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{oldValue}</div></Tooltip></div>)
							}}
						
						></TableRowColumn>
						<TableRowColumn name="published"
						component={(value,oldValue)=>{
							if(value=='0'){
								return (<div>下线</div>)
							}else{
								return (<div>上线</div>)
							}
								
							}}
						></TableRowColumn>
						<TableRowColumn type="operation"
						name='published'
						component={(value,oldValue,itemData)=>{	      
												//上线状态
												if(itemData.published=='1'){
												  return (
															<span>
															<Button label="下线" operateCode="por_mobilepic_publish" type="operation"  operation="offLine" onTouchTap={this.upPublish.bind(this,itemData)} />
															<Button label="编辑" operateCode="por_mobilepic_editsave"  type="operation"  operation="edit" onTouchTap={this.switchOpenEdit.bind(this,itemData)}/>
															<Button label="删除" operateCode="por_mobilepic_delete" type="operation"  operation="delete" onTouchTap={this.switchOpenDelete.bind(this,itemData)}/>
															</span>
														)
												}else{
													//下线状态
													return (
														<span>
														<Button label="上线" operateCode="por_mobilepic_publish" type="operation"  operation="offLine"onTouchTap={this.upPublish.bind(this,itemData)} />
														<Button label="编辑" operateCode="por_mobilepic_editsave"  type="operation"  operation="edit"  onTouchTap={this.switchOpenEdit.bind(this,itemData)}/>
														<Button label="删除" operateCode="por_mobilepic_delete" type="operation"  operation="delete" onTouchTap={this.switchOpenDelete.bind(this,itemData)}/>
														</span>
													)


												}
											}}
						    >  
			            </TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		   {/*新建*/}
			<Drawer
				open={isOpenAdd}
				width={750}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				onClose={this.allClose}
			>
				<AddPic onSubmit = {this.addSubmit} onCancel = {this.switchOpenAdd} />
			</Drawer>
			{/*编辑*/}
			<Drawer
				open={isOpenEdit}
				width={750}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				onClose={this.allClose}
			>
				<EditPic 
					detail = {detail}
					photoUrl = {photoUrl}
					onSubmit = {this.editSubmit}
					onCancel = {this.switchOpenEdit}
				/>
			</Drawer>
			{/*删除*/}
			<Dialog
				open={isDelete}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				contentStyle ={{ width: '444px',height:236,overflow:'inherit'}}
				onClose={this.allClose}
			>
				<div className = "oa-swper-delete">
					<div className = "oa-swper-content">{`确定要删除${name}?`}</div>
					<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" onTouchTap={this.deleteSubmit} /></div>

					<Button  label="取消" type="button" cancle={true} onTouchTap={this.switchOpenDelete} />

				</div>
			</Dialog>
		  </Section>


        </div>
		);
	}

}
