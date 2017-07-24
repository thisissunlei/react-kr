import React from 'react';
import {
   Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message,
	Dictionary
} from 'kr-ui';
import {
	AddPostPeople
} from 'kr/PureComponents';
import {Http} from 'kr/Utils';
import Leave from './Leave';
import Remove from './Remove';
import Transfer from './Transfer';
import OpenCard from './OpenCard';
import './index.less';

export default class InService  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAddPerson:false,
			openLeave:false,
			openRemove:false,
			openTransfer:false,
			openCard:false,
			openAccount:false,
			searchParams : {
				page:1,
				pageSize:15,
				searchKey:''
			},
			employees:{
				name:'',
				phone:'',
			},
			//离职id
			leaveId:'',
			//调动数据
			transferDetail:{},
			resourceId:'',
		}
		//判断是否解绑账号
		this.isCard=false;
	}
   
   //新建用户
   openAddPersonal=()=>{
      this.setState({
		  openAddPerson:!this.state.openAddPerson
	  })
   }
   
   //新建用户提交
   addPersonSubmit=(param)=>{
    var data = Object.assign({},param);
	var _this = this;
	data.depId=data.depId.orgId;
	var searchParams={
		time:+new Date()
	}
	Http.request("submit-new-personnel",{},data).then(function (response) {
		_this.setState({
			searchParams:Object.assign({},_this.state.searchParams,searchParams)
		})
		_this.openAddPersonal();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }
   
   //操作开关
   //编辑打开
   operationEdit=(itemDetail)=>{
        this.goDetail(itemDetail);	
   }
   //离职打开
   operationLeave=(itemDetail)=>{
       this.setState({
			openLeave:true,
			leaveId:itemDetail.id
		})
   }
   //解除账号打开
   operationRemove=(itemDetail)=>{
	    this.setState({
			  openRemove:true,
			  resourceId:itemDetail.id
		})	
   }

   //调动打开
   operationTransfer=(itemDetail)=>{
		 this.setState({
			  openTransfer:true,
			  transferDetail:itemDetail
		  })
   }

   //绑定门禁卡打开
   operationCard=(itemDetail)=>{
		this.setState({
			  openCard:true,
			  employees:itemDetail
		})
   }

   //开通账号打开
   operationAccount=(itemDetail)=>{
       this.setState({
			  openAccount:true,
			  resourceId:itemDetail.id
		})
   }


   
   //离职关闭
   cancelLeave=()=>{
     this.setState({
		openLeave:!this.state.openLeave
	 })
   }
   //离职提交
   addLeaveSubmit=(data)=>{
	let {leaveId}=this.state;
	var param = Object.assign({},data);
	param.resourceId=leaveId;
	var searchParams={
		time:+new Date()
	}
	var _this = this;
	Http.request("leaveOnSubmit",{},param).then(function (response) {
		_this.setState({
			searchParams:Object.assign({},_this.state.searchParams,searchParams)
		})
		_this.cancelLeave();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }
  
  //解除关闭
   cancelRemove=()=>{
	 this.setState({
		openRemove:!this.state.openRemove
	 })  
   }
   
   //解除提交
   addRemoveSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("remove-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelRemove();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }

   //开通关闭
    cancelAccount=()=>{
	 this.setState({
		openAccount:!this.state.openAccount
	 })  
   }

     //开通提交
   addOpenSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("open-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelAccount();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }
   
   
   //调动取消
   cancelTransfer=()=>{
	 this.setState({
		openTransfer:!this.state.openTransfer
	 })  
   }
  
   //调动提交
   addTransferSubmit=(data)=>{
		var param = Object.assign({},data);
		var _this = this;
		Http.request("service-switch",{},param).then(function (response) {
			_this.cancelTransfer()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
  
   
   //开通门禁取消
   cancelCard=()=>{
	  this.setState({
		openCard:!this.state.openCard
	 })  
   }
   //开通门禁提交
   addCardSubmit=(param)=>{
	   var _this = this;
		Http.request("bindingCard",{},param).then(function (response) {
			_this.cancelCard();
			Message.success("绑定成功");
		}).catch(function (err) {
			Message.error(err.message);
		});
   }
   
   //关闭所有侧滑
   allClose=()=>{
      this.setState({
		  openAddPerson:false
	  })
   }
   onSearchSubmit = (data) =>{
	var searchParams = Object.assign({},this.state.searchParams);
	searchParams.searchKey = data.content;
	this.setState({
		searchParams
	})
   }
   //跳转详情页
   goDetail = (data) =>{
	    let personId=data.id;
		window.open(`./#/oa/${personId}/peopleDetail`,'123');
   }
	render(){
		const {transferDetail,employees,isCard} = this.state;
		return(

			<div>
					<Title value="在职列表"/>
						<Row style={{marginBottom:21,position:'relative',zIndex:5,marginTop:20}}>

							<Col
								style={{float:'left'}}
							>
								<Button
									label="新建用户"
									type='button'
									onTouchTap={this.openAddPersonal}
								/>
							</Col>

							<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入姓名' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
							</Col>

					</Row>

					<Table
						style={{marginTop:8}}
						ajax={true}
						onOperation={this.onOperation}
						displayCheckbox={false}
						ajaxParams={this.state.searchParams}
						onPageChange={this.onPageChange}
						ajaxUrlName='getInServiceList'
						ajaxFieldListName="items"
					  >
					  
						<TableHeader>
								<TableHeaderColumn>部门</TableHeaderColumn>
								<TableHeaderColumn>姓名</TableHeaderColumn>
								<TableHeaderColumn>人员编码</TableHeaderColumn>
								<TableHeaderColumn>职位</TableHeaderColumn>
								<TableHeaderColumn>入职时间</TableHeaderColumn>
								<TableHeaderColumn>状态</TableHeaderColumn>
								<TableHeaderColumn>是否开通账号</TableHeaderColumn>
								<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>

						<TableBody >
							<TableRow>
								<TableRowColumn name ="depName" ></TableRowColumn>
								<TableRowColumn 
									name ="name"
									component={(value,oldValue,detail)=>{
										return (<div onClick = {() =>{
												this.goDetail(detail)
												}} style={{color:'#499df1',cursor:'pointer'}}>{value}</div>)
									}} 
								 ></TableRowColumn>
								<TableRowColumn name="code"></TableRowColumn>
								<TableRowColumn name ="jobName" ></TableRowColumn>
								<TableRowColumn 
									name ="entryDate" 
									component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
									}}
										
								></TableRowColumn>
								<TableRowColumn name ="status" 
									component={(value,oldValue)=>{
										return (<Dictionary type='ERP_ResourceStatus' value={value}/>)
									}}
								></TableRowColumn>
								<TableRowColumn name ="hasAccountStr"></TableRowColumn>
								<TableRowColumn type="operation" style={{width:'300px'}} component={(value,oldValue,detail)=>{
										return <span>
											    <span onClick={this.operationEdit.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>编辑</span>
												<span onClick={this.operationLeave.bind(this,value)}style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>离职</span>
												<span onClick={this.operationTransfer.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>调动</span>
												{value.hasAccount&&<span onClick={this.operationRemove.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>解除账号</span>}
												{!value.hasAccount&&<span onClick={this.operationAccount.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>开通账号</span>}
												<span onClick={this.operationCard.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>绑定门禁卡</span>
											</span>
								 }}>		
								</TableRowColumn>
							</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
					</Table>

					{/*新建用户*/}
					<AddPostPeople 
					 onCancel={this.openAddPersonal}
					 onSubmit={this.addPersonSubmit}
					 open={this.state.openAddPerson} 
					 onClose={this.allClose}  
					/>

					{/*离职*/}
					<Dialog
						title="离职"
						onClose={this.cancelLeave}
						open={this.state.openLeave}
						contentStyle ={{ width: '630px',height:'auto'}}
					>
					<Leave
					   onCancel={this.cancelLeave}
					   onSubmit={this.addLeaveSubmit}  	
					/>
					</Dialog>

					{/*解除帐号*/}
					<Dialog
						title="解除帐号"
						onClose={this.cancelRemove}
						open={this.state.openRemove}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<Remove
						onCancel={this.cancelRemove}
						onSubmit={this.addRemoveSubmit}  
					/>
					</Dialog>

					{/*开通帐号*/}
					<Dialog
						title="提示"
						onClose={this.cancelAccount}
						open={this.state.openAccount}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<Remove
						onCancel={this.cancelAccount}
						onSubmit={this.addOpenSubmit}  
					/>
					</Dialog>

					{/*人员调动*/}
					<Dialog
						title="人员调动"
						onClose={this.cancelTransfer}
						open={this.state.openTransfer}
						contentStyle ={{ width: '444px',overflow:'inherit'}}
					>
					<Transfer
						onCancel={this.cancelTransfer}
						onSubmit={this.addTransferSubmit}  
						department = {transferDetail}
					/>
					</Dialog>

					{/*开通门禁*/}
					<Dialog
						title="开通门禁卡"
						onClose={this.cancelCard}
						open={this.state.openCard}
						contentStyle ={{ width: '444px'}}
					>
					<OpenCard
						onCancel={this.cancelCard}
						onSubmit={this.addCardSubmit}  
						employees = {employees}
					/>
					</Dialog>
			</div>
		);
	}
}
