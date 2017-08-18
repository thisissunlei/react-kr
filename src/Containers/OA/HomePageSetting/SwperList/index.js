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
import AddSwper from './AddSwper';
import EditSwper from './EditSwper';
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
			}
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


   pageChange=(page)=>{
	   var searchParams={
         page:page
       }
	  this.setState({
		 searchParams:Object.assign({},this.state.searchParams,searchParams)
	  })
   }
   getDetail = (id) =>{
	   var _this = this;
	   Http.request("home-swper-detail",{id:id}).then(function (response) {
			Store.dispatch(initialize('EditSwper',response));
			_this.setState({
				photoUrl:photoUrl,
			})
		}).catch(function (err) {
			Message.error(err.message);
		});

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
	   	const {nowId} = this.state;
		var params = Object.assign({},data)
		params.id = nowId;
		Http.request("home-swper-add",{},params).then(function (response) {
			Message.success("新建成功");
			_this.switchOpenAdd()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
   editSubmit = (data) =>{
	   	const {nowId} = this.state;
		var _this = this;
		var params = Object.assign({},data)
		params.id = nowId;
		Http.request("home-swper-edit",{},params).then(function (response) {
			Message.success("编辑成功");
			_this.switchOpenEdit()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }

   deleteSubmit = () =>{
	   let {nowId} = this.state;
	   let _this = this;
	   Http.request("home-swper-delete",{},{id:nowId}).then(function (response) {
			Message.success("删除成功");
			_this.switchOpenDelete()
		}).catch(function (err) {
			Message.error(err.message);
		});

   }
   onSearchSubmit = (values) =>{
	   var searchParams = Object.assign({},this.state.searchParams);
	   searchParams.name = values.content;


   }
    onOperation = (type, itemDetail) =>{
        if(type == "delete"){
			this.switchOpenDelete();

		}
		if(type == "edit"){
			this.getDetail(itemDetail.id)
			this.switchOpenEdit();
			
		}
		this.setState({
			nowId:itemDetail.id
		})

    }

	render(){

		let {
			detail,
			code,
			isOpenAdd,
			isOpenEdit,
			isDelete,
			photoUrl
			}=this.state;

		return(
      	<div className="swper-list">
		    <Section title="轮播图列表" description="" style={{marginBottom:-5,minHeight:910}}>
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
				ajaxUrlName='home-swper-list'
				ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>编号</TableHeaderColumn>
					<TableHeaderColumn>名称</TableHeaderColumn>
					<TableHeaderColumn>轮播图</TableHeaderColumn>
					<TableHeaderColumn>链接地址</TableHeaderColumn>
					<TableHeaderColumn>排序</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>

						<TableRowColumn name="identifier" ></TableRowColumn>
						<TableRowColumn name="name"></TableRowColumn>
						<TableRowColumn
							name="photoUrl"
							component={(value,oldValue)=>{
								return (<img src = {value}/>)
							}}
						></TableRowColumn>
						<TableRowColumn
							name="linkUrl"
							component={(value,oldValue)=>{
								return (<a src = {value}>{value}</a>)
							}}
						></TableRowColumn>
						<TableRowColumn name="orderNum"></TableRowColumn>
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
				<AddSwper onSubmit = {this.addSubmit} onCancel = {this.switchOpenAdd} />
			</Drawer>
			{/*编辑*/}
			<Drawer
				open={isOpenEdit}
				width={750}
				openSecondary={true}
				containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				onClose={this.allClose}
			>
				<EditSwper
					photoUrl = {photoUrl}
					onSubmit = {this.editSubmit}
					onCancel = {this.switchOpenEdit}
				/>
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
