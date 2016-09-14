import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';



import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {LabelText} from 'kr-ui/Form';




import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import {
	BreadCrumbs,
	Loading
} from 'kr-ui';



import {
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
} from 'material-ui';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import {List, ListItem} from 'material-ui/List';


class OrderDetail extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);


		this.state = {
			open:false,
			loading:true,
		}

	}

	componentDidMount(){


		var {actions} = this.props;
		var _this = this;


		console.log('00000');

		actions.callAPI('get-order-detail',{
			mainBillId:'343432'
		},{}).then(function(response){

			console.log('-resp3233onse',response);

		}).then(function(err){
			console.log('--333err',err);
		});

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},1000)
	}

	confirmSubmit(values){
		console.log('--->>>>',values);
	}

	back(){

	}


  render() {



  	if(this.state.loading){
  		return(<Loading/>);
  	}


    return (

      <div>

			<BreadCrumbs children={['系统运营','财务管理']}/>

			<Section title="客户订单详情" description="" style={{paddingLeft:50,paddingRight:50}}> 



<Stepper activeStep={1}>
		          <Step>
		            <StepLabel>承租意向书</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>入驻协议书</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>增租协议书</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>续租协议书</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>减租协议书</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>退租协议书</StepLabel>
		         </Step>

        </Stepper>

				
				<Grid style={{marginTop:30}}>

				
					<Row>
						<Col md={4} ><LabelText label="社区名称" text="haahh"/></Col>
						<Col md={4} ><LabelText label="客户名称" text="haahh"/></Col>
						<Col md={4} ><LabelText label="订单名称" text="haahh"/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="当前工位数" text="haahh"/></Col>
						<Col md={4} ><LabelText label="计划入驻" text="haahh"/></Col>
						<Col md={4} ><LabelText label="计划离开" text="haahh"/></Col>
					</Row>

					<Row>
						<Col md={4} ></Col>
						<Col md={4} ><LabelText label="实际入驻" text=""/></Col>
						<Col md={4} ><LabelText label="实际离开" text=""/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="订单总额" text=""/></Col>
						<Col md={4} ><LabelText label="已回款额" text=""/></Col>
						<Col md={4} ><LabelText label="未回款额" text=""/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="应收租金" text=""/></Col>
						<Col md={4} ><LabelText label="实收租金" text=""/></Col>
						<Col md={4} ><LabelText label="实收押金" text=""/></Col>
					</Row>
					<Row>
						<Col md={4} ><LabelText label="实收定金" text=""/></Col>
						<Col md={4} ><LabelText label="其他" text=""/></Col>
						<Col md={4} ><LabelText label="营业外收入" text=""/></Col>
					</Row>
					<Row>
						<Col md={4} ><LabelText label="退款额" text=""/></Col>
						<Col md={4} ><LabelText label="其他收入" text=""/></Col>
						<Col md={4} ><LabelText label="订单描述" text=""/></Col>
					</Row>
				

				</Grid>





					
			       
<Table>
					<TableHeader>
							<TableHeaderColumn>合同编号</TableHeaderColumn>
							<TableHeaderColumn>合同类型</TableHeaderColumn>
							<TableHeaderColumn>合同总额</TableHeaderColumn>
							<TableHeaderColumn>合同开始时间</TableHeaderColumn>
							<TableHeaderColumn>合同结束日期</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn><RaisedButton label="查看" href="/#/operation/customerManage/343/order/34324/detail" />
							<RaisedButton label="编辑" href="/#/operation/customerManage/343/order/34324/detail" /></TableRowColumn>
						</TableRow>
				   </TableBody>
			 </Table>
	




			 	<Table style={{marginTop:20}}>

					<TableBody>
						 <TableRow>
							<TableRowColumn>
								客户名称
							</TableRowColumn>
							
							<TableRowColumn>
								客户名称
							</TableRowColumn>

							<TableRowColumn>
								客户名称
							</TableRowColumn>
					 </TableRow>
				   </TableBody>
			 </Table>




			</Section>


	 </div>
	);
  }
}



function mapStateToProps(state){
	return  {
		items:state.notify.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);



