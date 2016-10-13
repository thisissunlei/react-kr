import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section
} from 'kr-ui';

import {KrField,LabelText} from 'kr-ui/Form';


import {Grid,Row,Col} from 'kr-ui/Grid';

import { Button } from 'kr-ui/Button';

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
	Dialog
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


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
							 <KrField grid={1/2} name="lessorContactid" component="text" label="联系人id" type="hidden"/> 
							 <KrField grid={1/2} name="lessorname" type="text" component="text" label="联系人"/> 
							 <KrField grid={1/2} name="lessorContacttel" type="text" component="text" label="电话"/> 

							 <KrField grid={1/2} name="" type="text" component="text" label="承租方" value=""/> 
							 <KrField grid={1/2} name="leaseAddress" type="text" component="text" label="地址"/> 

							 <KrField grid={1/2} name="leaseContact" type="text" component="text" label="联系人"/> 
							 <KrField grid={1/2} name="leaseContacttel" type="text" component="text" label="电话"/> 

							 <KrField grid={1/2} name="communityName" type="text" component="text" label="所属社区" /> 

							<KrField grid={1/2} name="whereFloor" component="select" label="所在楼层">
								 <option>请选择订单类型</option>
								<option value="11">Red</option>
								<option value="00ff00">Green</option>
								<option value="0000ff">Blue</option>
							 </KrField>

						<KrField grid={1/2} name="signdate" type="text" component="text" label="签署日期" />
						<KrField grid={1/2} name="contractcode" type="text" component="text" label="合同编号" />
						<KrField grid={1/2} name="totaldownpayment" type="text" component="text" label="定金总额" /> 
						<KrField grid={1/2} name="paymentId" component="select" label="付款方式">
							<option>请选择订单类型</option>
					 		<option value="11">Red</option>
							<option value="00ff00">Green</option>
							<option value="0000ff">Blue</option>
						 </KrField>
					 <KrField grid={1/2} name="leaseBeginDate"  component="date" label="租赁期限" /> 
					 <KrField grid={1/2} name="leaseEndDate"  component="date" label="租赁期限" /> 
					 <KrField grid={1} name="templockday" component="date" label="保留天数" /> 
					 

					 <KrField grid={1} name="uname" type="group" component="group" label="租赁项目"> 
						 <KrField grid={1} name="stationnum" type="text" label="工位"/> 
						 <KrField grid={1} name="boardroomnum" type="text" label="会议室"/> 
		  			</KrField>
					<KrField grid={1} name="contractmark" component="textarea" label="备注" /> 
					 <KrField grid={1/2} name="contractfile" type="file" component="file" label="合同附件"/ > 
					 

				<Section title="租赁明细" description="" rightMenu = {
								<Menu>
									  <MenuItem primaryText="删除" />
									  <MenuItem primaryText="租赁"  onTouchTap={handleOpen} />
								</Menu>
				}> 

			<Table  displayCheckbox={true}>
					<TableHeader>
							<TableHeaderColumn>类别</TableHeaderColumn>
							<TableHeaderColumn>编号／名称</TableHeaderColumn>
							<TableHeaderColumn>开始时间</TableHeaderColumn>
							<TableHeaderColumn>结束时间</TableHeaderColumn>
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

var PlanForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting,submit,cancel } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={2}>
						  <LabelText label="社区名称" text="氪空间"/>
						</Col>
						<Col md={2}>
						  <LabelText label="所属楼层" text="200个"/>
						</Col>
						<Col md={2}>
						  <LabelText label="可租赁工位" text="200个"/>
						</Col>
						<Col md={1}>
						  <LabelText label="选择工位" text=""/>
						</Col>
						<Col md={1}>
						 <KrField name="username" type="text" />
						</Col>
						<Col md={1}>
						       <KrField name="name" type="text" />
						</Col>
					</Row>

					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2}> <Button label="取消"  onTouchTap={cancel} /> </Col>

					</Row>
				</Grid>

		  {/*
			<Button label="重置" primary={true} onTouchTap={reset} disabled={pristine || submitting} />
		  */}

    </form>

  )
}

PlanForm = reduxForm({
  form: 'submitValidation'  
})(PlanForm);



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
