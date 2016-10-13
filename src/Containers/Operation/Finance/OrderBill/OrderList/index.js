import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

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


import RenderTable from './Table';


//搜索模块
let OrderSearchForm = function(props){

	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName} = props;

	return (
		<form onSubmit={handleSubmit(onSubmit)} >
					<Row>
					<Col md={6}>
						<KrField name="corporationName" type="text"  component="input" placeholder="搜索关键词"/>
					</Col>
					<Col md={2} align="right" > <Button label="搜索"  type="submit" primary={true}/> </Col>
					<Col md={2} align="right" > <Button  primary={true} label="高级查询" type="link"/> </Col>
					</Row>
		</form>
	);
}

OrderSearchForm= reduxForm({
  form: 'orderSearchForm',
})(OrderSearchForm);


//新增按钮模块
let OrderCreateForm = function(props){

	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

	return (

<form onSubmit={handleSubmit(onSubmit)}>


				<KrField name="corporationName" type="text" label="出租方名称" /> 

				<KrField name="enableflag" component="group" label="是否启用">
					<KrField name="enableflag" label="是" type="radio" value="2"/>
					<KrField name="enableflag" label="否" type="radio" value="3" />
				</KrField>
				
				<KrField name="corporationAddress" component="text" type="text" label="详细地址"/> 
				 <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 


				<Grid style={{marginTop:30}}>
					<Row style={{marginTop:30}}>
					<Col md={8}></Col>
					<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
					<Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
					</Row>
				</Grid>

	</form>

	);

}

OrderCreateForm= reduxForm({
  form: 'orderCreateForm',
})(OrderCreateForm);


export default class OrderCreate extends Component {

  constructor(props,context){
	super(props, context);

		this.openCreateDialog = this.openCreateDialog.bind(this);
	  	this.searchParams = this.searchParams.bind(this);

		this.state = {
		  open:false,
		  openCreate:false,
		basic:{}
		}
  }
   
	componentDidMount(){

		var _this = this;

		Store.dispatch(Actions.callAPI('getFinaDataByList',{
			corporationName:'',
			page:'',
			pageSize:20
		})).then(function(response){
			_this.setState({
				basic:response
			});
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});

	}


  openCreateDialog(){
	this.setState({
		  openCreate:!this.state.openCreate
	});
  }


	searchParams(values){
   

		values.corporationName = values.corporationName || ' ';
		values.page = 1;
		values.pageSize = 10;

		var {actions} = this.props;
		var _this = this;

		actions.callAPI('getFinaDataByList',values,{}).then(function(response){ }).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});	
	}

	render() {

		console.log('---->>>',this.state.basic);

		return (

			<div>

				<BreadCrumbs children={['系统运营','财务管理']}/>

				<Section title="财务管理" description=""> 

					<Grid>
					<Row>
					<Col md={8}>
					  <Col md={2}>
						<Button label="收入总额:" primary={true} type='link'/> 
						<Button label="1" primary={true} type='link' />
					  </Col> 
					  <Col md={2}>  
					   <Button label="回款总额:" primary={true} type='link'/>
					   <Button label="￥" primary={true} type='link'/>  
					  </Col> 
					  <Col md={2}>  
					   <Button label="余额:" primary={true} type='link'/>
					   <Button label="￥" primary={true} type='link'/> 
					  </Col>  
					</Col>
					<Col md={4} align="right"> 
						<OrderSearchForm onSubmit={this.searchParams}/>
					</Col> 
					</Row>
					</Grid>

					<RenderTable items={this.state.basic.finaContractMainbillVOList}/>

				</Section>

   </div>
  );
  }
}
