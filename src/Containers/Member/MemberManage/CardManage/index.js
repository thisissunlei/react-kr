
import React from 'react';
import {initialize} from 'redux-form';

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
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Message,
	Title,
	SnackTip,
	Drawer,

} from 'kr-ui';

import EditDetail from "./EditDetail";
import HeavilyActivation from "./HeavilyActivation";
import StartCardActivation from "./StartCardActivation";
import CardManageSearchForm from "./CardManageSearchForm";
import ImportCard from "./ImportCard";
import ViewCard from "./ViewCard";
import DeleteCard from "./DeleteCard";
import InputCardForm from "./InputCardForm";
import MemberPersonInfo from "./MemberPersonInfo";
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
			//编辑页面的开启状态
			openEditDetail: false,
			//批量激活输入卡号的开启状态
			// openHeavilyActivation: false,
			//批量激活开始激活
			// openStartCardActivation:false,

			// openImportCard: false,

			openView: false,

			openDelete : false,

			itemDetail: {},
			item: {},
			list: {},
			realPage:0,
			// searchParams: {
			// 	type:'',
			// 	value:'',
			// 	page: 1,
			// 	pageSize: 15,
			// },
			// closeMessageBar:{
			// 	title:'',
			// 	open:false,
			// 	style:{},
			// 	className:'',
			// 	barStyle:{}
			// },
			detail:{
				startNum:"",
				endNum:'',
				comminityId :'',
				memo : '',
			},
			// isHeavilyClose:true,
			// goHeavilyActivation:"index"
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
	//批量激活输入卡号页面开关
	// openHeavilyActivationDialog=()=> {
	// 	if(this.state.goHeavilyActivation=="StartCardActivation"){
	// 		this.setState({
	// 			goHeavilyActivation:"index"
	// 		})
	// 	}
	// 	this.setState({
	// 		openHeavilyActivation: !this.state.openHeavilyActivation,
	// 	});
	// }
	
	//批量激活开始激活页面的开关
	// openStartCardActivationDialog=()=>{
	// 	this.setState({
	// 		openStartCardActivation: !this.state.openStartCardActivation,
	// 	});
	// }
	//批量激活开始激活页面返回按钮
	// throwBack=()=>{
	// 	this.setState({
	// 		goHeavilyActivation:"StartCardActivation"
	// 	})
	// 	Store.dispatch(initialize('HeavilyActivation',this.state.detail));
	// 	this.openStartCardActivationDialog();
	// 	this.openHeavilyActivationDialog();

	// }
	

	//输入卡号的确定操作
	// onHeavilyActivation=(detail)=> {
	// 	if(!detail.startNum||!detail.endNum){
	// 		return ;
	// 	}else if(detail.endNum-detail.startNum<0){
	// 		Message.error('起始号码不能大于终止号码！')
	// 		return ;
	// 	}
	// 	this.setState({detail:detail},function(){

	// 			this.openHeavilyActivationDialog();
	// 			this.onStartCardActivation()

	// 		}
	// 	)
	// }
	//开始激活的确定操作
	// onStartCardActivation=(values)=>{
	// 	this.openStartCardActivationDialog();
	// }
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
				type:'',
				value:'',
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


	
	 //打开弹条
	 // openMessageBar=(text,type)=>{
	 // 	var style={};
	 // 	var className="";
	 // 	var barStyle={};
	 // 	if(type=="ok"){
	 // 		style={position:'fixed',right:0,height:40,color:"#000",top:20};
	 // 		barStyle={display:"inline-block",backgroundColor:"#edffe2",borderRadius:3,padding:'0px 8px',border:"1px solid #cce6a0"};
	 // 		className="messagesBarIconOk"
	 // 	}else{
	 // 		style={position:'fixed',right:0,height:40,color:"#000",top:20};
	 // 		barStyle={display:"inline-block",backgroundColor:"#ffe9e9",borderRadius:3,padding:'0px 8px',border:"1px solid #ffb8b8"};
	 // 		className="messagesBarIconError";
	 // 	}

	 // 	this.setState({
	 // 		closeMessageBar:{
		// 			title:text,
		// 			open:true,
		// 			style:style,
		// 			className:className,
		// 			barStyle:barStyle
		// 		}
	 // 	})
	 // }
	 //关闭弹跳
	 // closeMessageBar=()=>{
	 // 	let detail = Object.assign({},this.state.closeMessageBar);
		// detail.open=false;
		// State.cardManageSearchParams = {
		// 				page:State.realPage,
		// 				pageSize: 15,
		// 				type:'',
		// 				value:'',
		// 				date: new Date()
		// 			}
		// this.setState({
		// 	closeMessageBar:detail
	 //    })
	 // }

	// onSearchCancel=()=> {

	// }

	// onNewCreateCancel=()=> {
	// 	this.openNewCreateDialog();
	// }

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
	// isHeavilyCloseOk=()=>{
	// 	setState({
	// 		isHeavilyClose:true,
	// 	})
	// }
	// isHeavilyCloseNone=()=>{
	// 	setState({
	// 		isHeavilyClose:false,
	// 	})
	// }
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



	renderOperation=(itemData)=>{
		let _this =this;
		if(itemData.holderName){
			return(
					<div>
						<Button  operateCode="mbr_define_add" label="编辑"  type="operation" operation="edit" onTouchTap={_this.openEditDialog.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="查看"  type="operation"  operation="edit" onTouchTap={_this.seeCardDetail.bind(this,itemData)}/>
					</div>
				)
		}else{
			return(
					<div>
						<Button  operateCode="mbr_define_add" label="编辑"  type="operation"  operation="edit" onTouchTap={_this.openEditDialog.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="查看"  type="operation"  operation="edit" onTouchTap={_this.seeCardDetail.bind(this,itemData)}/>
						<Button  operateCode="mbr_define_add" label="删除"  type="operation"  operation="edit" onTouchTap={_this.deleteCard.bind(this,itemData)}/>
						
					</div>
				)
		}
	}

	// openImportCardDialog=()=>{
	// 	this.changeImportCardDilogOpen();
	// }

	// changeImportCardDilogOpen=()=>{
	// 	this.setState({
	// 		openImportCard : !this.state.openImportCard
	// 	})
	// }




	// onCardSubmit=()=>{
    	
	//     Message.success("操作成功");
	//     this.setState({
	//     	openImportCard:!this.state.openImportCard
	//     })
	//     this.onFlush();
 //    }

    openDeleteDialog=()=>{
    	this.setState({
    		openDelete : !this.state.openDelete
    	})
    }


    submitDeleteDialog=()=>{
    	
    	State.cardManageSearchParams = {
			page:State.realPage,
			pageSize: 15,
			type:'',
			value:'',
			date: new Date()
		}
	    Message.success("操作成功");
	    this.setState({
	    	openDelete:!this.state.openDelete
	    })
    }
	openPersonDeatil=(value)=>{
		this.setState({
			personInfo:value,
			openPerson:!this.state.openPerson
		})
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
			<Title value="会员卡管理"/>

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
					
				  	{/*<Dialog
						title="会员卡入库"
						modal={true}
						open={this.state.openImportCard}
						onClose={this.openImportCardDialog}
						contentStyle={{width:480}}
					>
						<ImportCard onSubmit={this.onCardSubmit} onCancel={this.openImportCardDialog} />
				    </Dialog>

					<Dialog
						title="批量激活(填写卡外码)"
						modal={true}
						open={this.state.openHeavilyActivation}
						onClose={this.openHeavilyActivationDialog}
						bodyStyle={{paddingTop:45}}
						contentStyle={{width:687}}
					>
						<HeavilyActivation path={this.state.goHeavilyActivation} detail={this.state.detail}  onSubmit={this.onHeavilyActivation} onCancel={this.openHeavilyActivationDialog} isHeavilyCloseNone={this.isHeavilyCloseNone} isHeavilyCloseOk={this.isHeavilyCloseOk}/>
				  </Dialog>*/}

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
					
					{/*<Dialog
						title="批量激活（填写卡内码）"
						modal={true}
						open={this.state.openStartCardActivation}
						onClose={this.openStartCardActivationDialog}
						bodyStyle={{paddingTop:45}}
						contentStyle={{width:500}}
					>
						<StartCardActivation onFlush={this.onFlush} detail={this.state.detail}  onCancel={this.openStartCardActivationDialog} throwBack={this.throwBack} openMessageBar={this.openMessageBar} closeMessageBar={this.closeMessageBar}/>
				  </Dialog>
				  <SnackTip zIndex={20000}  style={this.state.closeMessageBar.style} open={this.state.closeMessageBar.open} title={<span style={this.state.closeMessageBar.barStyle}><span className={this.state.closeMessageBar.className} ></span><span style={{float:"left",color:"#000"}}>{this.state.closeMessageBar.title}</span></span>}  />
					*/}


				  	<Dialog
						title="录入会员卡"
						modal={true}
						open={State.openInputCardDialog}
						onClose={this.switchOpenInputCardDialog}
						contentStyle={{width:680}}
					>
						<InputCardForm  onCancel={this.switchOpenInputCardDialog} />
				    </Dialog>
					<Drawer
						modal={true}
						width={750}
						open={this.state.openPerson}
						onClose={this.openPerson}
						openSecondary={true}
						containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
						>
							<MemberPersonInfo
									detail={personInfo}
									onCancel={this.openPerson} 
									
							/>
					</Drawer>
			</div>
		);
	}


}
