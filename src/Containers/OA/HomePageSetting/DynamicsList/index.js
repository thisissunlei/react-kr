import React,{Component} from 'react';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
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
import AddDynamics from './AddDynamics';
import EditDynamics from './EditDynamics';

export default class DynamicsList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isOpenAdd:false,
			isOpenEdit:false,
			isDelete:false,

			//删除的id
			deleteId:'',
			detail:[],
			searchParams : {
				page: 1,
				pageSize: 15,
				title:""
			},
			nowId:'',
		}
	}

   //新建开关
   switchOpenAdd = () =>{
	   var {isOpenAdd} = this.state;
	   this.setState({
		  isOpenAdd: !isOpenAdd
	   })
   }
   //获取详情信息
   getDetail = (id) =>{
		var _this = this;
		Http.request("dynamics-detail",{id:id}).then(function (response) {
			Store.dispatch(initialize('EditSwper',response));
			_this.setState({
				photoUrl:photoUrl,
			})
		}).catch(function (err) {
			Message.error(err.message);
		});

   }
   //编辑开关
   switchOpenEdit = () =>{
	   var {isOpenEdit} = this.state;
	   this.setState({
		  isOpenEdit: !isOpenEdit
	   })
   }
   //删除开关
   switchOpenDelete = () =>{
	   var {isDelete} = this.state;
	   this.setState({
		  isDelete: !isDelete
	   })
   }

   //页面固定
   pageChange=(page)=>{
	   var searchParams={
         page:page
       }
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }

   //关闭所有侧滑
   allClose = () =>{
	   this.setState({
		    isOpenAdd:false,
			isOpenEdit:false,
			isDelete:false,
	   })
   }

   //删除确定
   deleteSubmit = () =>{
	   let {nowId} = this.state;
	   let _this = this;
	   Http.request("dynamics-delete",{},{id:nowId}).then(function (response) {
			Message.success("删除成功");
			_this.switchOpenDelete()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
   //搜索点击
   onSearchSubmit = (values) =>{
	   var searchParams = Object.assign({},this.state.searchParams);
	   searchParams.title = values.content;
   }
   //相关事件
    onOperation = (type, itemDetail) =>{
        if(type == "delete"){
			this.switchOpenDelete();
		}
		if(type == "edit"){
			this.getDetail(itemDetail.id);
			this.switchOpenEdit();
		}

		this.setState({
			nowId:itemDetail.id,
		})

    }
	//添加确定
	addSubmit = (data) =>{
	   let {nowId} = this.state;
	   let params = Object.assign({},data);
	   
	   let _this = this;
	   Http.request("dynamics-add",{},params).then(function (response) {
			Message.success("新建成功");
			_this.switchOpenAdd()
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	//编辑确定
	editSubmit = (data) => {
		const {nowId} = this.state;
		var params = this.state;
		params.id = nowId;
		let _this = this;
	   	Http.request("dynamics-edit",{},params).then(function (response) {
			Message.success("编辑成功");
			_this.switchOpenEdit()
		}).catch(function (err) {
			Message.error(err.message);
		});

	}

	render(){

		let {detail,code,isOpenAdd,isOpenEdit,isDelete}=this.state;

		return(
      	<div className="dynamics-list">
		    <Section title="最近活动列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>
				<Col
					style={{float:'left'}}
				>
					<Button
						label="新建"
						type='button'
						onTouchTap={this.switchOpenAdd}

					/>
				</Col>
				<Col style={{marginTop:0,float:"right",marginRight:-10}}>
					<ListGroup>
						<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入角色名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
					</ListGroup>
				</Col>

	        </Row>


            <Table
				style={{marginTop:8}}
				ajax={true}
				onOperation={this.onOperation}
				displayCheckbox={false}
				ajaxParams={this.state.searchParams}
				ajaxUrlName='dynamics-list'
				ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>编号</TableHeaderColumn>
					<TableHeaderColumn>标题图</TableHeaderColumn>
					<TableHeaderColumn>标题</TableHeaderColumn>
					<TableHeaderColumn>内容</TableHeaderColumn>
					<TableHeaderColumn>文章类型</TableHeaderColumn>
					<TableHeaderColumn>链接地址</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
            <TableRowColumn name="identifier" ></TableRowColumn>
						<TableRowColumn name="titleUrl"
              				component={(value,oldValue)=>{
								return (<img src = {titleUrl} />)
		 					}}
           				></TableRowColumn>
						<TableRowColumn name="title"
							component={(value,oldValue)=>{
								return (<img src = {value}/>)
							}}
						></TableRowColumn>
						<TableRowColumn name="content" 
							component={(value,oldValue)=>{
								var maxWidth=10;
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
							}}
						></TableRowColumn>
						<TableRowColumn name="articleType"></TableRowColumn>
						<TableRowColumn name="linkUrl"
							component={(value,oldValue)=>{
								return (<a src = {value}>{value}</a>)
							}}
						></TableRowColumn>
						<TableRowColumn name="time" ></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑"  type="operation"  operation="edit" operateCode="hrm_role_edit"/>
			                <Button label="删除"  type="operation"  operation="delete" />
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
				<AddDynamics onCancel = {this.switchOpenAdd} />
			</Drawer>
			{/*编辑*/}
			<Drawer
				open={isOpenEdit}
				width={750}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				onClose={this.allClose}
			>
				<EditDynamics onCancel = {this.switchOpenEdit}/>
			</Drawer>
			{/*删除*/}
			<Dialog
				open={isDelete}
				width={750}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				onClose={this.allClose}
			>
				<div className = "oa-swper-delete">
					<div className = "oa-swper-content">确定要删除****?</div>
					<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" onTouchTap={this.deleteSubmit} /></div>

					<Button  label="取消" type="button" cancle={true} onTouchTap={this.switchOpenDelete} />

				</div>
			</Dialog>
		  </Section>
        </div>
		);
	}

}
