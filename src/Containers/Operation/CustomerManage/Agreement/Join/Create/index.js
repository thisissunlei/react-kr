import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';

import Section from 'kr-ui/Section';

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



var JoinCreateForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel ,onSubmit,handleOpen,handleClick} = props;

  return (

    <form onSubmit={handleSubmit(onSubmit)}>


					<Grid style={{marginTop:30,paddingLeft:30,paddingRight:30}}>

						<Row>
							<Col md={5}>
							  <KrField name="order_type" component="select" label="出租方">
								 <option>请选择订单类型</option>
										<option value="11">Red</option>
										<option value="00ff00">Green</option>
										<option value="0000ff">Blue</option>
							 </KrField>
							 </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="地址" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="联系人" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="电话" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="承租方" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="地址" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="联系人" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="电话" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="所属社区" /> </Col>
							<Col md={5} mdOffset="2"> 
	<KrField name="order_type" component="select" label="所在楼层">
								 <option>请选择订单类型</option>
										<option value="11">Red</option>
										<option value="00ff00">Green</option>
										<option value="0000ff">Blue</option>
							 </KrField>
							</Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="地址" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="合同编号" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="租赁期限"  requireLabel={true} /> </Col>
							<Col md={5} mdOffset="2"> 
							<KrField name="order_type" component="select" label="付款方式">
								 <option>请选择订单类型</option>
										<option value="11">Red</option>
										<option value="00ff00">Green</option>
										<option value="0000ff">Blue</option>
							 </KrField> 
							 </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="order_type" component="select" label="支付方式">
								 <option>请选择订单类型</option>
										<option value="11">Red</option>
										<option value="00ff00">Green</option>
										<option value="0000ff">Blue</option>
							 </KrField>  </Col>
							<Col md={5} mdOffset="2"> <KrField name="rname" type="date" label="签署时间" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="首付款时间" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="工位" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="会议室" /> </Col>
						</Row>

						<Row>
							<Col md={11}> <KrField name="username" type="text" label="租赁用途" placeholder="办公使用" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="username" type="text" label="租金总额" placeholder="" /> </Col>
							<Col md={5} mdOffset="2"> <KrField name="username" type="text" label="押金总额" /> </Col>
						</Row>

						<Row>
							<Col md={5}> <KrField name="uname" type="file" label="合同附件" /> </Col>
						</Row>

					</Grid>

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
						</TableRow>

						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>

				   </TableBody>
			 </Table>


			</Section>

			<Button  label="确定"  type="submit" primary={true}/>

		</form>

  )
}

JoinCreateForm = reduxForm({
  form: 'joinCreateForm'  
})(JoinCreateForm);

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

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			open:false,
		}

	}

	confirmJoinSubmit(values){
		console.log('---',values);
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
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
				  />,
				  <Button
					label="Submit"
					primary={true}
					onTouchTap={this.handleClose}
				  />,
				];


  const { error, handleSubmit, pristine, reset, submitting,submit} = this.props;

    return (

      <div>

			<Section title="创建入驻协议书" description=""> 

				<JoinCreateForm onSubmit={this.confirmJoinSubmit} handleOpen={this.handleOpen} handleClick={this.handleClick}/>
	
			</Section>

			<Dialog
				title="平面图"
				modal={true}
				 contentStyle={{width: '90%',maxWidth: 'none'}}
				open={this.state.open}>

				<PlanForm ref="formdata" submit={this.confirmSubmit} cancel={this.handleClose}/>

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