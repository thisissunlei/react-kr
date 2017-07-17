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
import AddPerson from './AddPerson';
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
			openCard:false
		}
	}
   
   //新建用户
   openAddPersonal=()=>{
      this.setState({
		  openAddPerson:!this.state.openAddPerson
	  })
   }

   //操作
   onOperation=(type, itemDetail)=>{
      if(type=='edit'){

	  }else if(type=='leave'){
		  this.setState({
			  openLeave:true
		  })
	  }else if(type=='go'){
          this.setState({
			  openTransfer:true
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
   addLeaveSubmit=()=>{
      
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
   addTransferSubmit=()=>{
     
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

	render(){

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
						//ajaxParams={State.searchParams}
						onPageChange={this.onPageChange}
						ajaxUrlName='communitySearch'
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
							<TableRowColumn name="code">123</TableRowColumn>
							<TableRowColumn name="name">123</TableRowColumn>
							<TableRowColumn name="cityName">123</TableRowColumn>
							<TableRowColumn name="area">123</TableRowColumn>
							<TableRowColumn name="orderNum">12</TableRowColumn>
						    <TableRowColumn name="openDate">12</TableRowColumn>
							<TableRowColumn name="opened">12</TableRowColumn>
						    <TableRowColumn type="operation">
							   <Button label="编辑"  type="operation"  operation="edit"/>
							   <Button label="离职"  type="operation"  operation="leave"/>
							   <Button label="调动"  type="operation"  operation="go"/>
							   <Button label="解除账号"  type="operation"  operation="open"/>
							   <Button label="开通门禁卡"  type="operation"  operation="give"/>
							</TableRowColumn>
							</TableRow>
							</TableBody>
						    <TableFooter></TableFooter>
					</Table>

					{/*新建用户*/}
					<Drawer
							open={this.state.openAddPerson}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<AddPerson
			               onCancel={this.openAddPersonal}
						   onSubmit={this.addPersonSubmit}   
						/>
					</Drawer>

					{/*离职*/}
					<Dialog
						title="提示"
						onClose={this.cancelLeave}
						open={this.state.openLeave}
						contentStyle ={{ width: '444px'}}
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
						contentStyle ={{ width: '444px'}}
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
