import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

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
} from 'kr-ui';


var JoinCreateForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel ,onSubmit,handleOpen,handleClick} = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

							<KrField name="lessorId"  grid={1/2} component="select" label="出租方" options={
								[ { value: 'one', label: 'One' },
								{ value: 'two', label: 'Two' }]
							} />

							 <KrField grid={1/2}  name="lessorAddress" type="text" component="input" label="地址" /> 

							 <KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" /> 
							 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

							 <KrField grid={1/2}  name="leaseId" type="text" component="input" label="承租方" /> 
							 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

							 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
							 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

							 <KrField grid={1/2}  name="communityid" type="text" component="input" label="所属社区" /> 
							<KrField name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={[
								{value:'1',label:'1'},
								{value:'2',label:'2'}
							]}/>

							 <KrField grid={1/2}  name="username" type="text" component="input" label="地址" /> 
							 <KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号" /> 

							 <KrField grid={1}  name="username" component="group" label="租赁期限"> 
									  <KrField grid={1/2}  name="leaseBeginDate"  component="date"  /> 
									  <KrField grid={1/2}  name="leaseEndDate" component="date"/> 
							  </KrField>

							<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={[
								{value:'1',label:'银行转账'},
								{value:'2',label:'支付宝'},
								{value:'3',label:'微信支付'},
								{value:'4',label:'POS机'},
							]}/>
						

							<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={[
								{value:'1',label:'月度付'},
								{value:'2',label:'季度付'},
								{value:'3',label:'半年付'},
								{value:'4',label:'年付'},
							]}/>

						 <KrField grid={1/2}  name="rname"  component="date" grid={1/2} label="签署时间" /> 


						 <KrField name="username" component="date" label="首付款时间" /> 
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


 class JoinCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.handleOpen = this.handleOpen.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.confirmJoinSubmit = this.confirmJoinSubmit.bind(this);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			open:false,
		}

		JoinCreateForm = reduxForm({
			  form: 'joinCreateForm'  
		})(JoinCreateForm);

	}

	confirmJoinSubmit(values){
	}

	confirmSubmit(values){
		this.setState({open: false});
	}
	 componentDidMount(){

	 }

	handleOpen(){
		var value = Actions.showModalDialog('http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId=42&floors=3&goalStationNum=1&goalBoardroomNum=0&selectedObjs=[{type:1,id:883},{type:2,id:2}]',900,800);
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

    return (

      <div>
			<Section title="创建入驻协议书" description=""> 
				<JoinCreateForm onSubmit={this.confirmJoinSubmit} handleOpen={this.handleOpen} handleClick={this.handleClick}/>
			</Section>

	</div>
	);
  }
}


export default connect((state)=>{
  return {
    items:state.notify.items,
  };
})(JoinCreate);
