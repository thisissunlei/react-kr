import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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
import AddPostList from './AddPostList';
import EditPostList from './EditPostList';
import Delete from './Delete';
export default class PostList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {},
			other:"",
		}
		this.allConfig = {
			openNew : false,
			openEdit : false,
			openDel : false,
			searchParams : {

			}
		}
	}


	onExport = () =>{

	}
	//是否要渲染
	isRender = () =>{
		this.setState({
			other : new Date,
		})
	}
	//搜索确定
	onSearchSubmit = ()=>{

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
	//删除页面的开关
	delSwidth = () =>{
		let {openDel} = this.allConfig;
		this.allConfig.openDel = !openDel;
		this.isRender();
	}
	//关闭所有侧滑
	allClose = () =>{
		let {openNew,openEdit,openDel} = this.allConfig;
		this.allConfig.openNew = false;
		this.allConfig.openEdit = false;
		this.allConfig.openDel = false;
		this.isRender();
	}
	//新建确定
	addSubmit = (values) =>{
		Http.request('postListAdd',{},values).then(function(response) {
           console.log('va',values);
        }).catch(function(err) {
          Message.error(err.message);
        });
		console.log('values',values);
	}
	//编辑确定
	editSubmit = () =>{

	}
	//删除按钮确定t
	delSubmit = () =>{

	}
	//相关操作
	onOperation = (type, itemDetail) =>{
		if(type == "edit"){
			this.editSwidth();

		}else if(type == "del"){
			this.delSwidth();

		}

	}
	render(){
		const {openNew,openEdit,openDel} = this.allConfig;
		return(
      	<div className="basic-post-list">
		  	<Section title="职务列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>
			    <Col
					style={{float:'left'}}
				>
					<Button
							label="新建用户"
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
								placeholder='请输入姓名' 
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
	            displayCheckbox={true}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName="postJobList"
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>职务名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>职务类型名称</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>更新时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="intentionCityName" ></TableRowColumn>
						<TableRowColumn name="stationNum"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn type="operation">
							<Button label="编辑"  type="operation"  operation="edit" />
							<Button label="删除"  type="operation"  operation="del" />
						</TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		   {/*新建用户*/}
			<Dialog
				title="新增职务"
				onClose={this.newSwidth}
				open={openNew}
				contentStyle ={{ width: '630px',height:'auto'}}
			>
				<AddPostList
					onCancel={this.newSwidth}
					onSubmit={this.addSubmit}
					onClose = {this.allClose}   
				/>
			</Dialog>
			{/*编辑用户*/}
			<Dialog
				title="编辑职务"
				onClose={this.editSwidth}
				open={openEdit}
				contentStyle ={{ width: '630px',height:'630px'}}
			>
				<EditPostList
					onCancel={this.editSwidth}
					onSubmit={this.editSubmit}   
				/>
			</Dialog>
			{/*开通门禁*/}
			<Dialog
				title="删除职务"
				onClose={this.delSwidth}
				open={openDel}
				contentStyle ={{ width: '444px'}}
			>
				<Delete
					onCancel={this.delSwidth}
					onSubmit={this.delSubmit}  
				/>
			</Dialog>
			</Section>
        </div>
		);
	}

}
;
