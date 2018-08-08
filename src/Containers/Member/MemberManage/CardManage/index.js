
import React from 'react';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Title,
	SnackTip,
	Drawer,

} from 'kr-ui';

import EditDetail from "./EditDetail";
import CardManageSearchForm from "./CardManageSearchForm";
import ViewCard from "./ViewCard";
import DeleteCard from "./DeleteCard";
import InputCardForm from "./InputCardForm";
import BindMember from "./BindMember";
import UnBindMember from './UnBindMember';

import './index.less';


import State from './State';
import {
	observer
} from 'mobx-react';
@observer


export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
			openEditDetail: false,
			
			openView: false,

			openDelete : false,

			itemDetail: {},
			item: {},
			list: {},
			realPage:0,
			
			detail:{
				startNum:"",
				endNum:'',
				comminityId :'',
				memo : '',
			},
			openPerson:false,
			personInfo:{},


		}
	}
	//操作相关
	onOperation=(type, itemDetail)=> {
		var _this=this;
		
		this.setState({
			itemDetail
		});
		if (type == 'view') {
			let orderId = itemDetail.id
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}
	//编辑页面开关
	openEditDetailDialog=()=> {
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}
	
	//编辑页面的确定操作
	onEditDetail=(values)=>{
		var _this=this;
		const params={
			id:values.id,
			outerCode:values.outerCode,
			innerCode:values.innerCode,
			communityId :values.communityId,
			memo : values.memo ||""
		}
		Http.request('CardEdit', {}, params).then(function(response) {
			_this.openEditDetailDialog();
			State.cardManageSearchParams = {
				page:State.realPage,
				pageSize: 15,
				type:State.cardManageSearchParams.type,
				value:State.cardManageSearchParams.value,
				date: new Date()
			}
			Message.success("编辑成功");
			
		}).catch(function(err) {
			if (err.message=="该会员卡已被录入") {
		 		err.message="卡号"+_this.state.detail.startNum+"已存在请跳过！"
		 	}else if(err.message=="该卡已被激活,请重刷"){
		 		err.message="会员卡"+values.outerCode+"已被激活，请换卡重刷！"
		 	}else if(err.message=="卡号错误"){
		 		err.message="卡号不可更改!";
		 	}
			Message.error(err.message)
		});

	}


	onLoaded=(response)=> {
		let list = response;
		this.setState({
			list
		})
	}
	//数据刷新
	onFlush=()=>{
		
		State.cardManageSearchParams = {
			page:1,
			pageSize: 15,
			type:'',
			value:'',
			date : new Date()
		}
	}
	
	onPageChange=(page)=>{
		State.realPage = page;
		
	}


	//设置单条数据信息
	setItemDetail=(value)=>{
		this.setState({
			itemDetail:value
		});
	}

	//点击编辑按钮
	openEditDialog=(thisP,itemData)=>{
		let _this = this;

		Http.request('MemberCardEditShow',{id:thisP.id}).then(function(response) {
			
			_this.setItemDetail(response);
			_this.openEditDetailDialog();

		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}


	seeCardDetail=(thisP,itemData)=>{

		
		let _this = this;
		Http.request('MemberCardSeeDetail',{id:thisP.id}).then(function(response) {
			
			_this.setItemDetail(response);
			_this.openViewDialog();			

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	//查看详情
	openViewDialog=()=>{
    	this.setState({
    		openView:!this.state.openView
    	})
    }

    //删除会员卡
    deleteCard=(thisP,itemData)=>{
    	this.setItemDetail(thisP);
    	this.openDeleteDialog();
    }

    bindMember=(thisP,itemData)=>{
    	this.openBindMemberDialogFun();
    	this.setState({
    		itemDetail : thisP
    	})
    }

    openBindMemberDialogFun=()=>{
		State.openBindMemberDialog = !State.openBindMemberDialog;
	}


	unBindMember=(item)=>{
		
		this.openUnBindMemberDialogFun();
    	this.setState({
    		itemDetail : item
    	})
	}

	openUnBindMemberDialogFun=()=>{
		State.openUnBindMemberDialog = !State.openUnBindMemberDialog;
	}




	renderOperation=(itemData)=>{
		let _this =this;
		if(itemData.holderName){
			return(
					<div>
						<Button  operateCode="mbr_define_add" label="编辑"  type="operation" operation="edit" onTouchTap={_this.openEditDialog.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="查看"  type="operation"  operation="view" onTouchTap={_this.seeCardDetail.bind(this,itemData)}/>
						<Button                               label="解绑会员"  type="operation" onTouchTap={_this.unBindMember.bind(this,itemData)}/>

					</div>
				)
		}else{
			return(
					<div>
						<Button  operateCode="mbr_define_add" label="编辑"  type="operation"  operation="edit" onTouchTap={_this.openEditDialog.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="查看"  type="operation"  operation="view" onTouchTap={_this.seeCardDetail.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="删除"  type="operation"  operation="edit" onTouchTap={_this.deleteCard.bind(this,itemData)}/>
						<Button                               label="绑会员"  type="operation" onTouchTap={_this.bindMember.bind(this,itemData)}/>
						
					</div>
				)
		}
	}

    openDeleteDialog=()=>{
    	this.setState({
    		openDelete : !this.state.openDelete
    	})
    }


    submitDeleteDialog=()=>{
    	
    	State.cardManageSearchParams = {
			page:State.realPage,
			pageSize: 15,
			type:State.cardManageSearchParams.type,
			value:State.cardManageSearchParams.value,
			date: new Date()
		}
	    Message.success("操作成功");
	    this.setState({
	    	openDelete:!this.state.openDelete
	    })
    }
	openPersonDeatil=(value)=>{
		
		console.log("value",value);
		window.open(`./#/member/memberManage/list/${value.holder}`,'_blank');

	}


	openPerson=()=>{
		this.setState({
			openPerson:!this.state.openPerson
		})
	}
	


    componentWillUnmount(){
    	State.realPage=1;
    	State.cardManageSearchParams = {
			page:1,
			pageSize: 15,
			type:'',
			value:'',
			date: new Date()
		}
    }


    switchOpenInputCardDialog=()=>{
    	State.openInputCardDialog = !State.openInputCardDialog;
    }


	render(){
		let {personInfo}=this.state;
		return(
			<div className="switchhover card-manage-table">
			<Title value="会员卡-氪空间后台管理系统"/>

					<Section title="会员卡管理" description="" style={{minHeight:"900px"}}>

							<CardManageSearchForm />

							<Table  
								style={{marginTop:8}}
								ajax={true}
								onOperation={this.onOperation}
								onProcessData={(state)=>{
										return state;
									}
								}
								displayCheckbox={false}
								onExport={this.onExport}
								ajaxParams={State.cardManageSearchParams}
								onPageChange={this.onPageChange}
								ajaxFieldListName="items"
								ajaxUrlName='MemberCardManageList'>
								<TableHeader>
									<TableHeaderColumn style={{width:"15%"}}>卡号</TableHeaderColumn>
									<TableHeaderColumn style={{width:"15%"}}>社区</TableHeaderColumn>
									<TableHeaderColumn style={{width:"15%"}}>是否激活</TableHeaderColumn>
									<TableHeaderColumn style={{width:"15%"}}>持卡人</TableHeaderColumn>
									<TableHeaderColumn style={{width:"25%"}}>客户</TableHeaderColumn>
									<TableHeaderColumn style={{width:"15%"}}>操作</TableHeaderColumn>

							</TableHeader>

							<TableBody >
								<TableRow >
									<TableRowColumn name="outerCode" ></TableRowColumn>
									<TableRowColumn name="communityName" 
										component={
											(value,oldValue,itemData)=>{
												if(value==""){
													return (
														<div>
															-
														</div>
													)
												}else{
													return (
														<div>
															{itemData.communityName}
														</div>
													)
												}
												
											}
										}></TableRowColumn>
									<TableRowColumn name="active"
										component={
											(value,oldValue,itemData)=>{
												if(value=="true"){
													return (
														<div>
															已激活
														</div>
													)
												}else{
													return (
														<div  style={{color:"#ff6868"}}>
															未激活
														</div>
													)
												}
												
											}
										}

									></TableRowColumn>
									<TableRowColumn type="operation" name="holderName" 
										component={
											(value,oldValue,itemData)=>{
												if(value==""){
													return (
														<div>
															-
														</div>
													)
												}else{
													return (
														<Button type="operation"  onClick={this.openPersonDeatil.bind(this,itemData)} label={itemData.holderName}    />
													)
												}
												
											}
										}

									></TableRowColumn>
									<TableRowColumn name="customerName"
										component={
											(value,oldValue,itemData)=>{
												if(value==""){
													return (
														<div>
															-
														</div>
													)
												}else{
													return (
														<div>
															{itemData.customerName}
														</div>
													)
												}
												
											}
										}
									></TableRowColumn>
									<TableRowColumn type="operation" component={this.renderOperation}></TableRowColumn>
								 </TableRow>
							</TableBody>

							<TableFooter ></TableFooter>

							</Table>
					</Section>
					

					<Dialog
						title="编辑"
						modal={true}
						open={this.state.openEditDetail}
						onClose={this.openEditDetailDialog}
						bodyStyle={{padding:40}}
						contentStyle={{width:687}}
					>
						<EditDetail 
							detail={this.state.itemDetail} 
							onSubmit={this.onEditDetail} 
							onCancel={this.openEditDetailDialog}
						/>
				  	</Dialog>
				  	<Dialog
						title="查看"
						modal={true}
						open={this.state.openView}
						onClose={this.openViewDialog}
						contentStyle={{width:680}}
					>
						<ViewCard onSubmit={this.openViewDialog} onCancel={this.openViewDialog} detail={this.state.itemDetail}/>
				    </Dialog>

				     <Dialog
						title="删除"
						modal={true}
						open={this.state.openDelete}
						onClose={this.openDeleteDialog}
						contentStyle={{width:400}}
					>
						<DeleteCard 
							onSubmit={this.submitDeleteDialog} 
							onCancel={this.openDeleteDialog} 
							detail={this.state.itemDetail}
						/>
				    </Dialog>



				  	<Dialog
						title="录入会员卡"
						modal={true}
						open={State.openInputCardDialog}
						onClose={this.switchOpenInputCardDialog}
						contentStyle={{width:680}}
					>
						<InputCardForm  onCancel={this.switchOpenInputCardDialog} />
				    </Dialog>
				    
					<Dialog
						title="绑定会员"
						modal={true}
						open={State.openBindMemberDialog}
						onClose={this.openBindMemberDialogFun}
						contentStyle={{width:680}}
					>
						<BindMember  onCancel={this.openBindMemberDialogFun} detail={this.state.itemDetail} />
				    </Dialog>

				    <Dialog
						title="解绑会员"
						modal={true}
						open={State.openUnBindMemberDialog}
						onClose={this.openUnBindMemberDialogFun}
						contentStyle={{width:500}}
					>
						<UnBindMember  onCancel={this.openUnBindMemberDialogFun} detail={this.state.itemDetail} />
				    </Dialog>
			</div>
		);
	}


}
