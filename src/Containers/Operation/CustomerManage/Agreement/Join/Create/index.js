import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import Section from 'kr-ui/Section';

import {KrField,LabelText} from 'kr-ui/Form';

import {Grid,Row,Col} from 'kr-ui/Grid';

import { Button } from 'kr-ui/Button';

import http from 'kr/Redux/Utils/fetch';

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
						
							<KrField name="order_type"  grid={1/2} component="select" label="出租方" options={
								[ { value: 'one', label: 'One' },
								{ value: 'two', label: 'Two' }]
							} />

							 <KrField grid={1/2}  name="username" type="text" component="input" label="地址" /> 

							 <KrField grid={1/2}  name="username" component="search" label="联系人" /> 
							 <KrField grid={1/2}  name="username" type="text" component="input" label="电话" /> 

							 <KrField grid={1/2}  name="username" type="text" component="input" label="承租方" /> 
							 <KrField grid={1/2}  name="username" type="text" component="input" label="地址" /> 

							 <KrField grid={1/2}  name="username" type="text" component="input" label="联系人" /> 
							 <KrField grid={1/2}  name="username" type="text" component="input" label="电话" /> 

							 <KrField grid={1/2}  name="username" type="text" component="input" label="所属社区" /> 
							<KrField name="order_type"  grid={1/2} component="select" label="所在楼层" options={[
								{value:'1',label:'1'},
								{value:'2',label:'2'}
							]}/>

							 <KrField grid={1/2}  name="username" type="text" component="input" label="地址" /> 
							 <KrField grid={1/2}  name="username" type="text" component="input" label="合同编号" /> 

							 <KrField grid={1/2}  name="username" type="text" component="input" component="input" label="租赁期限"  requireLabel={true} /> 

							<KrField name="order_type"  grid={1/2} component="select" label="付款方式" options={[
								{value:'1',label:'1'},
								{value:'2',label:'2'}
							]}/>
						

							<KrField name="order_type"  grid={1/2} component="select" label="支付方式" options={[
								{value:'1',label:'1'},
								{value:'2',label:'2'}
							]}/>

						 <KrField grid={1/2}  name="rname"  component="date" grid={1/2} label="签署时间" /> 


						 <KrField name="username" type="text" component="input" label="首付款时间" /> 
						 <KrField grid={1/2}  name="username" type="text" component="input" label="工位" /> 
						 <KrField grid={1/2}  name="username" type="text" component="input" label="会议室" /> 

						 <KrField grid={1/2}  name="username" type="text" component="input" label="租赁用途" placeholder="办公使用" /> 

						 <KrField grid={1/2}  name="username" type="text" component="input" label="租金总额" placeholder="" /> 
						 <KrField grid={1/2}  name="username" type="text" component="input" label="押金总额" /> 

						 <KrField grid={1/2}  name="uname" component="file" label="合同附件" /> 


				<Section title="租赁明细" description="" rightMenu = {
								<Menu>
									  <MenuItem primaryText="删除" />
									  <MenuItem primaryText="分配"  onTouchTap={handleOpen} />
								</Menu>
				}> 

						<Table  displayCheckbox={false}>
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
						 <KrField grid={1}  name="username" type="text" component="input" />
						</Col>
						<Col md={1}>
						       <KrField grid={1}  name="name" type="text" component="input" />
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

	 componentDidMount(){

		 http.get('http://optest.krspace.cn/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname=zhang',{},{}).then(function(response){
			 console.log('success----',response);
		 }).catch(function(err){
			 console.log('err----',err);
		 });

		 http.get('http://optest.krspace.cn/api/krspace-finance-web/action/community-city-selected',{},{}).then(function(response){
			 console.log('api----success----',response);
		 }).catch(function(err){
			 console.log('api----err----',err);
		 });

	 }

	handleOpen(){
		var value = Actions.showModalDialog('http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId=42&floors=3&goalStationNum=1&goalBoardroomNum=1&selectedObjs=[{type:1,id:883},{type:2,id:2}]',900,800);
		console.log('---value',value);
		//this.setState({open: true});
	}

	handleClose(values){
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
