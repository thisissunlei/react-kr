
import React, {
	Component
} from 'react';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

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
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Notify,
	Tooltip,
	Message,
	Title,
	KrDate,
	SnackTip

} from 'kr-ui';

import EditDetail from "./EditDetail";
import HeavilyActivation from "./HeavilyActivation";
import NewActivation from "./NewActivation";
import StartCardActivation from "./StartCardActivation"

import './index.less';

export default class List extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			//新建激活页面的开启状态
			openNewActivation: false,
			//编辑页面的开启状态
			openEditDetail: false,
			//批量激活输入卡号的开启状态
			openHeavilyActivation: false,
			//批量激活开始激活
			openStartCardActivation:false,
			itemDetail: {},
			item: {},
			list: {},
			searchParams: {
				foreignCode:'',
				page: 1,
				pageSize: 15,
				other:false
			},
			closeMessageBar:{
				title:'',
				open:false,
				style:{},
				className:'',
				barStyle:{}
			},
			detail:{
				startNum:"",
				endNum:''
			},
			isHeavilyClose:true,
			goHeavilyActivation:"index"


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
	openHeavilyActivationDialog=()=> {
		if(this.state.goHeavilyActivation=="StartCardActivation"){
			this.setState({
				goHeavilyActivation:"index"
			})
		}
		this.setState({
			openHeavilyActivation: !this.state.openHeavilyActivation,
		});
	}
	//新建激活页面开关
	openNewActivationDialog=()=> {
		this.setState({
			openNewActivation: !this.state.openNewActivation,
		});
	}
	//批量激活开始激活页面的开关
	openStartCardActivationDialog=()=>{
		this.setState({
			openStartCardActivation: !this.state.openStartCardActivation,
		});
	}
	//批量激活开始激活页面返回按钮
	throwBack=()=>{
		this.setState({
			goHeavilyActivation:"StartCardActivation"
		})
		Store.dispatch(initialize('HeavilyActivation',this.state.detail));
		this.openStartCardActivationDialog();
		this.openHeavilyActivationDialog();

	}
	//新建激活的确定操作
	onNewActivation=(values)=> {
		// console.log("values",values);
		var _this=this;
		const params={};
		params.foreignCode=values.foreignCode;
		params.interCode=values.interCode;
		Store.dispatch(Actions.callAPI('CardActivation', {}, params)).then(function(response) {
			_this.openNewActivationDialog();
			_this.onFlush();
			Message.success("激活成功！")
		}).catch(function(err) {
			
			if (err.message=="该会员卡已被录入") {
		 		err.message="卡号"+_this.state.detail.startNum+"已存在请跳过！"
		 	}else if(err.message=="该卡已被激活,请重刷"){
		 		err.message="会员卡"+values.foreignCode+"已被激活，请换卡重刷！"
		 	}else if(err.message=="Failed to fetch"){
		 		err.message="连接不到服务器!";
		 	}
		 	Message.error(err.message);
		});
	}

	//输入卡号的确定操作
	onHeavilyActivation=(detail)=> {
		if(!detail.startNum||!detail.endNum){
			return ;
		}else if(detail.endNum-detail.startNum<0){
			Message.error('起始号码不能大于终止号码！')
			return ;
		}
		this.setState({detail:detail},function(){

				this.openHeavilyActivationDialog();
				this.onStartCardActivation()

			}
		)
	}
	//开始激活的确定操作
	onStartCardActivation=(values)=>{
		this.openStartCardActivationDialog();
	}
	//编辑页面的确定操作
	onEditDetail=(values)=>{
		var _this=this;
		const params={};
		console.log(this.state.itemDetail.interCode,"ll",values.interCode)
		if(values.interCode==this.state.itemDetail.interCode){
			
			this.openEditDetailDialog();
			return;
		}
		params.id=values.id;
		params.foreignCode=values.foreignCode;
		params.interCode=values.interCode;
		Store.dispatch(Actions.callAPI('CardEdit', {}, params)).then(function(response) {
			_this.openEditDetailDialog();
			_this.onFlush();
			Message.success("编辑成功");
			
		}).catch(function(err) {
			if (err.message=="该会员卡已被录入") {
		 		err.message="卡号"+_this.state.detail.startNum+"已存在请跳过！"
		 	}else if(err.message=="该卡已被激活,请重刷"){
		 		err.message="会员卡"+values.foreignCode+"已被激活，请换卡重刷！"
		 	}else if(err.message=="Failed to fetch"){
		 		err.message="连接不到服务器!";
		 	}else if(err.message=="卡号错误"){
		 		err.message="卡号不可更改!";
		 	}
			Message.error(err.message)
		});

	}


	//搜索被点击
	onSearchSubmit=(searchParams)=> {
		let obj = {
			foreignCode: searchParams.content,
			pageSize:15,
			page:1,
		}
		this.setState({
			searchParams: obj
		});
	}
	 //打开弹条
	 openMessageBar=(text,type)=>{
	 	var style={};
	 	var className="";
	 	var barStyle={};
	 	if(type=="ok"){
	 		style={position:'fixed',right:0,height:40,color:"#000",top:20};
	 		barStyle={display:"inline-block",backgroundColor:"#edffe2",borderRadius:3,padding:'0px 8px',border:"1px solid #cce6a0"};
	 		className="messagesBarIconOk"
	 	}else{
	 		style={position:'fixed',right:0,height:40,color:"#000",top:20};
	 		barStyle={display:"inline-block",backgroundColor:"#ffe9e9",borderRadius:3,padding:'0px 8px',border:"1px solid #ffb8b8"};
	 		className="messagesBarIconError";
	 	}

	 	this.setState({
	 		closeMessageBar:{
					title:text,
					open:true,
					style:style,
					className:className,
					barStyle:barStyle
				}
	 	})
	 }
	 //关闭弹跳
	 closeMessageBar=()=>{
	 	let detail = Object.assign({},this.state.closeMessageBar);
		 	detail.open=false;
		 this.setState({
			 closeMessageBar:detail
		 })
	 }

	onSearchCancel=()=> {

	}

	onNewCreateCancel=()=> {
		this.openNewCreateDialog();
	}

	onLoaded=(response)=> {
		let list = response;
		this.setState({
			list
		})
	}
//数据刷新
	onFlush=()=>{
		this.setState({
			searchParams: {
				foreignCode:'',
				page: 1,
				pageSize: 15,
				other:!this.state.searchParams.other
			}
		})
	}
	isHeavilyCloseOk=()=>{
		setState({
			isHeavilyClose:true,
		})
	}
	isHeavilyCloseNone=()=>{
		setState({
			isHeavilyClose:false,
		})
	}
		render(){
			
			return(
				<div className="switchhover">
				<Title value="会员配置"/>

						<Section title="会员卡激活" description="" style={{minHeight:"900px"}}>
								<Grid style={{marginBottom:22,marginTop:2}}>
									<Row >
									<Col  align="left" style={{marginLeft:0,float:'left'}}> <Button label="新建激活" type='button' joinEditForm onTouchTap={this.openNewActivationDialog}  /> </Col>
									<Col  align="left" style={{marginLeft:20,float:'left'}}> <Button label="批量激活" type='button' joinEditForm onTouchTap={this.openHeavilyActivationDialog}  /> </Col>
									<Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
										<ListGroup>
											<ListGroupItem> <SearchForms placeholder='请输入会员卡号码' onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
										</ListGroup>
									</Col>
									</Row>
								</Grid>

											<Table  style={{marginTop:8}}
													ajax={true}
													onOperation={this.onOperation}
													onProcessData={(state)=>{
														return state;
													}
												}
												displayCheckbox={false}
												onExport={this.onExport}
												ajaxParams={this.state.searchParams}

												ajaxFieldListName="items"
												ajaxUrlName='CardActivationList'>
												<TableHeader>
													<TableHeaderColumn style={{width:"20%"}}>卡号</TableHeaderColumn>
													<TableHeaderColumn style={{width:"20%"}}>内码</TableHeaderColumn>
													<TableHeaderColumn style={{width:"20%"}}>状态</TableHeaderColumn>
													<TableHeaderColumn style={{width:"20%"}}>激活时间</TableHeaderColumn>
													<TableHeaderColumn style={{width:"20%"}}>操作</TableHeaderColumn>

											</TableHeader>

											<TableBody >
													<TableRow >
														<TableRowColumn name="foreignCode" ></TableRowColumn>
														<TableRowColumn name="interCode" ></TableRowColumn>
														<TableRowColumn name="enable" options={[{label:'已激活',value:'true'},{label:'未激活',value:'false'}]}></TableRowColumn>
														<TableRowColumn name="activeTime" type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
														<TableRowColumn type="operation">
															  <Button label="编辑"  type="operation"  operation="edit" />
														 </TableRowColumn>
													 </TableRow>
											</TableBody>

											<TableFooter ></TableFooter>

											</Table>
						</Section>
						<Dialog
							title="新建激活"
							modal={true}
							open={this.state.openNewActivation}
							onClose={this.openNewActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:442}}
						>
							<NewActivation  onSubmit={this.onNewActivation} onCancel={this.openNewActivationDialog}/>

					  </Dialog>

						<Dialog
							title="批量激活"
							modal={true}
							open={this.state.openHeavilyActivation}
							onClose={this.openHeavilyActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:500}}
						>
							<HeavilyActivation path={this.state.goHeavilyActivation} detail={this.state.detail}  onSubmit={this.onHeavilyActivation} onCancel={this.openHeavilyActivationDialog} isHeavilyCloseNone={this.isHeavilyCloseNone} isHeavilyCloseOk={this.isHeavilyCloseOk}/>
					  </Dialog>

						<Dialog
							title="编辑"
							modal={true}
							open={this.state.openEditDetail}
							onClose={this.openEditDetailDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:442}}
						>
						<EditDetail detail={this.state.itemDetail} onSubmit={this.onEditDetail} onCancel={this.openEditDetailDialog}/>
					  </Dialog>

						<Dialog
							title="批量激活"
							modal={true}
							open={this.state.openStartCardActivation}
							onClose={this.openStartCardActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:500}}
						>
							<StartCardActivation onFlush={this.onFlush} detail={this.state.detail}  onCancel={this.openStartCardActivationDialog} throwBack={this.throwBack} openMessageBar={this.openMessageBar} closeMessageBar={this.closeMessageBar}/>
					  </Dialog>
					  <SnackTip zIndex={20000}  style={this.state.closeMessageBar.style} open={this.state.closeMessageBar.open} title={<span style={this.state.closeMessageBar.barStyle}><span className={this.state.closeMessageBar.className} ></span><span style={{float:"left",color:"#000"}}>{this.state.closeMessageBar.title}</span></span>}  />

				</div>
			);
		}


}
