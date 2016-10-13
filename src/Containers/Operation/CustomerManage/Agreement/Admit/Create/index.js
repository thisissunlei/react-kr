import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';


import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog,

	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	LabelText,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	BreadCrumbs,
} from 'kr-ui';


var CreateForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel ,onSubmit,handleOpen,handleClick,openConfirmDialog} = props;

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

							<KrField  grid={1/2} name="leaseId" component="select" label="出租方">
								 <option>请选择订单类型</option>
								<option value="11">Red</option>
								<option value="00ff00">Green</option>
								<option value="0000ff">Blue</option>
							 </KrField>

							 <KrField grid={1/2} name="lessorAddress" type="text" component="text" label="地址"/> 
							 <KrField grid={1/2} name="lessorId" component="text" label="联系人id" type="hidden"/> 
							 <KrField grid={1/2} name="lessorname" type="text" component="text" label="联系人"/> 
							 <KrField grid={1/2} name="lessorContacttel" type="text" component="text" label="电话"/> 

							 <KrField grid={1/2} name="leaseContact" type="text" component="text" label="承租方"/> 
							 <KrField grid={1/2} name="leaseAddress" type="text" component="text" label="地址"/> 

							 <KrField grid={1/2} name="lessorContactName" type="text" component="text" label="联系人"/> 
							 <KrField grid={1/2} name="leaseContacttel" type="text" component="text" label="电话"/> 

							 <KrField grid={1/2} name="communityName" type="text" component="text" label="所属社区" /> 

							<KrField grid={1/2} name="wherefloor" component="select" label="所在楼层">
								 <option>请选择订单类型</option>
								<option value="11">Red</option>
								<option value="00ff00">Green</option>
								<option value="0000ff">Blue</option>
							 </KrField>

						<KrField grid={1/2} name="signdate" type="text" component="text" label="签署日期" />
						<KrField grid={1/2} name="totaldownpayment" type="text" component="text" label="定金总额" /> 
						<KrField grid={1/2} name="paymentId" component="select" label="付款方式">
							<option>请选择订单类型</option>
					 		<option value="11">Red</option>
							<option value="00ff00">Green</option>
							<option value="0000ff">Blue</option>
						 </KrField>
					 <KrField grid={1/2} name="leaseBegindate"  component="date" label="租赁期限" /> 
					 <KrField grid={1/2} name="leaseEndDate"  component="date" label="租赁期限" /> 
					 <KrField grid={1/2} name="templockday" component="date" label="保留天数" /> 
					 <KrField grid={1/2} name="username" component="date" label="租赁项目" /> 

					 <KrField grid={1} name="uname" type="group" component="group" label="租赁项目"> 
						 <KrField grid={1} name="stationnum" type="text" label="工位"/> 
						 <KrField grid={1} name="username" type="text" label="会议室"/> 
		  			</KrField>

					 <KrField grid={1/2} name="uname" type="file" component="file" label="合同附件"/ > 
					 <KrField grid={1} name="contractmark" component="textarea" label="备注" /> 

				<Section title="租赁明细" description="" rightMenu = {
								<Menu>
									  <MenuItem primaryText="删除" />
									  <MenuItem primaryText="分配"  onTouchTap={handleOpen} />
								</Menu>
				}> 

			<Table  displayCheckbox={true}>
					<TableHeader>
							<TableHeaderColumn>类别</TableHeaderColumn>
							<TableHeaderColumn>编号／名称</TableHeaderColumn>
							<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
							<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
					</TableHeader>
					<TableBody>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>
				   </TableBody>
			 </Table>

			</Section>

			<Button  label="确定"  type="button" onTouchTap={openConfirmDialog} primary={true}/>

		</form>
  )
}


 class JoinEdit extends Component {

	constructor(props,context){
		super(props, context);


		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.confirmJoinSubmit = this.confirmJoinSubmit.bind(this);

		this.openConfirmDialog = this.openConfirmDialog.bind(this);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			open:false,
			confirmDialog:false
		}


		CreateForm = reduxForm({
			  form: 'admitCreateForm'  
		})(CreateForm);



	}

	confirmJoinSubmit(values){

		var {actions} = this.props;
		values.customerid = this.props.params.customerId;

		actions.callAPI('addFinaContractIntentletter',{},values).then(function(response){
			Notify.show([{
				message:'创建成功',
				type: 'success',
			}]);
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}
	
	openConfirmDialog(){

		this.setState({
			confirmDialog:!this.state.confirmDialog
		});

	}




	confirmSubmit(values){
		console.log('---',values);
		this.setState({open: false});
	}
	handleOpen(){
		this.setState({open: true});
	}

	handleClose(values){
		console.log('---',values);
		this.setState({open: false});
	}

	handleClick(){
		console.log('----');
	}

  render() {

		 const actions = [
			  <Button
				label="确认"
				primary={true}
				onTouchTap={this.handleClose}
			  />,
			  <Button
				label="取消"
				primary={true}
				 style={{marginLeft:10}}
				onTouchTap={this.openConfirmDialog}
			  />,
			];

		  const { error, handleSubmit, pristine, reset, submitting,submit} = this.props;

    return (

      <div>

			<BreadCrumbs children={['社区运营',,'合同','承租协议','新增']}/>

			<Section title="承租协议书(新增)" description=""> 
				<CreateForm onSubmit={this.confirmJoinSubmit} handleOpen={this.handleOpen} handleClick={this.handleClick} openConfirmDialog={this.openConfirmDialog}/>
			</Section>

			<Dialog
				title="确认"
				modal={true}
				actions={actions}
				autoScrollBodyContent={true}
				 contentStyle={{width: '90%',maxWidth: 'none'}}
				open={this.state.confirmDialog}>

				<CreateForm onSubmit={this.confirmJoinSubmit} handleOpen={this.handleOpen} handleClick={this.handleClick} openConfirmDialog={this.openConfirmDialog}/>

			</Dialog>

			</div>
	);
  }
}


export default connect((state)=>{
  return {
    items:state.notify.items,
  };
})(reduxForm({
  form: 'joinForm'  
})(JoinEdit));
