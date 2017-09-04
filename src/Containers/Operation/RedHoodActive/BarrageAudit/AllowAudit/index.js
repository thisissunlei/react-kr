import React, { PropTypes } from 'react'; 
import { connect } from 'kr/Redux';

import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { observer } from 'mobx-react';

import {
	Actions,
	Store
} from 'kr/Redux';

import Baidu from 'kr/Utils/Baidu';
import EditAllowAudit from './EditAllowAudit';
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
	Tooltip,
	Message,
	Section,
	Drawer
} from 'kr-ui';
import './index.less';
class AllowAudit extends React.Component {
	

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15,
				name:""

			},
			nowId:'',
			isOpenAudit:false,
			isOpenDelete:false,
		}
		
	}
	auditSwitch = () =>{
		let {isOpenAudit} = this.state;
		this.setState({
			isOpenAudit:!isOpenAudit,
		})
	}
	delSwitch = () =>{
		let {isOpenDelete} = this.state;
		this.setState({
			isOpenDelete:!isOpenDelete,
		})
	}
	onOperation = (type, itemDetail) =>{

        if(type == "delete"){
			this.delSwitch();

		}
		if(type == "edit"){
			this.auditSwitch();

		}
		this.setState({
			nowId:itemDetail.id,
		})
	
    }
	pageChange = () =>{

	}
	auditSubmit = (values) =>{
		var _this=this;
		var params = Object.assign({},values);
		const {nowId} = this.state;
		params.id = nowId;
		
	   	Http.request('rank-type-info',params).then(function(response) {
			_this.auditSwitch();
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}
	deleteSubmit = () =>{
		var _this=this;
		const {nowId} = this.state;
	   	Http.request('rank-type-info',{id:nowId}).then(function(response) {
			_this.delSwitch();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	
	allClose = () =>{
		this.setState({
			isOpenAudit:false,
			isOpenDelete:false
		})
	}


	render() {
		const {isOpenDelete,isOpenAudit} = this.state;
		return (

			<div className="wait-audit" style={{minHeight:910,background:'#fff',marginTop:60}}>
			
	       

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
						<TableHeaderColumn>序号</TableHeaderColumn>
						<TableHeaderColumn>微信id</TableHeaderColumn>
						<TableHeaderColumn>用户头像</TableHeaderColumn>
						<TableHeaderColumn>弹幕内容</TableHeaderColumn>
						<TableHeaderColumn>点赞数</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody >
						<TableRow>

							<TableRowColumn name="identifier"  ></TableRowColumn>
							<TableRowColumn 
								name="name"
								style = {{whiteSpace:"inherit",breakWord:"break-all"}}
							>
							</TableRowColumn>
							
							<TableRowColumn 
								name="photoUrl" 
								style = {{whiteSpace:"inherit"}}
								component={(value,oldValue)=>{
									var height = "auto";
									var isShow = true;
									var imgStyle = {};
									if(!value){
										isShow = false;
										value = "-";
										imgStyle={
											height:80,
											lineHeight:"80px"
										}
									}
									return (
										<div style = {imgStyle}>
											{!isShow && <span>{value}</span>}
											<img className = "dynamics-img" src = {value} style = {{display:isShow ? "inline-block" : "none"}} />
										</div>
										)
										
								}}
							>
							</TableRowColumn>

							<TableRowColumn
								name="linkUrl"
								style = {{whiteSpace:"inherit",breakWord:"break-all"}}	
							>
							</TableRowColumn>

							<TableRowColumn 
								name="orderNum"
								component={(value,oldValue)=>{
									return value||"-"
								}}
							>
							</TableRowColumn>

							<TableRowColumn name="orderNum"></TableRowColumn>


							<TableRowColumn type="operation">
								<Button label="编辑" operateCode="sys_slider_edit"  type="operation"  operation="edit" operateCode="hrm_role_edit"/>
								<Button label="删除" operateCode="sys_slider_delete" type="operation"  operation="delete" />
							</TableRowColumn>
						</TableRow>
					</TableBody>
					<TableFooter></TableFooter>
          		 </Table>
				{/*删除*/}
				<Dialog
					open={isOpenDelete}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					contentStyle ={{ width: '444px',height:236,overflow:'inherit'}}
					onClose={this.allClose}
				>
					<div className = "wait-audit-delete">
						<div className = "wait-audit-delete-content">确定要删除吗？</div>
						<div style = {{display:"inline-block",marginRight:30}}>
							<Button  label="确定" onTouchTap={this.deleteSubmit} /></div>
						<Button  label="取消" type="button" cancle={true} onTouchTap={this.delSwitch} />
					</div>
				</Dialog>

				<Dialog
					title = "审核"
					open={isOpenAudit}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					contentStyle ={{ width: '444px',height:236,overflow:'inherit'}}
					onClose={this.allClose}
				>
					<EditAllowAudit onCancel = {this.auditSwitch} onSubmit = {this.auditSubmit}/>
				</Dialog>


				
			</div>
		);
	}
}
export default AllowAudit;
