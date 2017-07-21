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
			searchParams : {
				page:1,
				pageSize:15,
				searchKey:''
			},
			oldDepartment:'',
		}
	}
   
   //新建用户
   openAddPersonal=()=>{
      this.setState({
		  openAddPerson:!this.state.openAddPerson
	  })
   }
   
   //新建用户提交
   addPersonSubmit=(params)=>{
     console.log('params',params);   
   }

   //操作
   onOperation=(type, itemDetail)=>{
      if(type=='edit'){
		 let personId=1;
         this.goDetail(itemDetail)
	  }else if(type=='leave'){
		  this.setState({
			  openLeave:true
		  })
	  }else if(type=='go'){
          this.setState({
			  openTransfer:true,
			  oldDepartment:itemDetail.depId
		  })
	  }else if(type=='open'){
          this.setState({
			  openRemove:true
		  })
	  }else if(type=='give'){
          this.setState({
			  openCard:true
		  })
	  }
   }
   
   //离职关闭
   cancelLeave=()=>{
     this.setState({
		openLeave:!this.state.openLeave
	 })
   }
   //离职提交
   addLeaveSubmit=(data)=>{

	var param = Object.assign({},data);
	var _this = this;
	Http.request("leaveOnSubmit",param).then(function (response) {
		_this.cancelLeave()
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
		Http.request("transferOnSubmit",param).then(function (response) {
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
   addCardSubmit=()=>{
    
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
		window.open(`./#/oa/${data.personId}/peopleDetail`,'123');
   }
	render(){
		const {oldDepartment} = this.state;
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
						//ajax={true}
						onOperation={this.onOperation}
						displayCheckbox={true}
						exportSwitch={true}
						onExport={this.onExport}
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
								<TableRowColumn name ="depId" ></TableRowColumn>
								<TableRowColumn 
									name ="name"
									component={(value,oldValue,detail)=>{
										return (<div onClick = {() =>{
												this.goDetail(detail)
												}}>value</div>)
									}} 
								 ></TableRowColumn>
								<TableRowColumn name ="code" ></TableRowColumn>
								<TableRowColumn name ="jobName" ></TableRowColumn>
								<TableRowColumn name ="entryDate" ></TableRowColumn>
								<TableRowColumn name ="status" ></TableRowColumn>
								<TableRowColumn name ="name" >12</TableRowColumn>
								<TableRowColumn type="operation">
								<Button label="编辑"  type="operation"  operation="edit"/>
								<Button label="离职"  type="operation"  operation="leave"/>
								<Button label="调动"  type="operation"  operation="go"/>
								<Button label="解除账号"  type="operation"  operation="open"/>
								<Button label="绑定门禁卡"  type="operation"  operation="give"/>
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
						title="提示"
						onClose={this.cancelLeave}
						open={this.state.openLeave}
						contentStyle ={{ width: '630px',height:'355px'}}
					>
					<Leave
					   onCancel={this.cancelLeave}
					   onSubmit={this.addLeaveSubmit}  	
					/>
					</Dialog>

					{/*解除帐号*/}
					<Dialog
						title="提示"
						onClose={this.cancelRemove}
						open={this.state.openRemove}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<Remove
						onCancel={this.cancelRemove}
						onSubmit={this.addRemoveSubmit}  
					/>
					</Dialog>

					{/*人员调动*/}
					<Dialog
						title="人员调动"
						onClose={this.cancelTransfer}
						open={this.state.openTransfer}
						contentStyle ={{ width: '444px'}}
						department = {oldDepartment}
					>
					<Transfer
						onCancel={this.cancelTransfer}
						onSubmit={this.addTransferSubmit}  
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
					/>
					</Dialog>
			</div>
		);
	}
}
