import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {reduxForm,submitForm} from 'redux-form';
import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';


import {Grid,Row,Col} from 'kr-ui/Grid';

import { Button } from 'kr-ui/Button';

import {
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import {
	BreadCrumbs,
	Loading,
	Notify
} from 'kr-ui';



export default class JoinDetail extends Component {

	constructor(props,context){
		super(props, context);

	}

  render() {

	 const orderBaseInfo = {};
	 const contractList = [];

    return (

		  <div>


			<BreadCrumbs children={['系统运营','财务管理']}/>

				<Section title="客户订单详情" description=""> 
								
								<Grid style={{marginTop:30}}>

								
									<Row>
										<Col md={6} ><LabelText label="出租方" text=""/></Col>
										<Col md={6} ><LabelText label="地址" text=""/></Col>
									</Row>

								
									<Row>
										<Col md={6} ><LabelText label="联系人" text=""/></Col>
										<Col md={6} ><LabelText label="电话" text=""/></Col>
									</Row>

								
									<Row>
										<Col md={6} ><LabelText label="承租方" text=""/></Col>
										<Col md={6} ><LabelText label="地址" text=""/></Col>
									</Row>

								
									<Row>
										<Col md={6} ><LabelText label="联系人" text=""/></Col>
										<Col md={6} ><LabelText label="电话" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="所属社区" text=""/></Col>
										<Col md={6} ><LabelText label="所属楼层" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="地址" text=""/></Col>
										<Col md={6} ><LabelText label="合同编号" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="支付方式" text=""/></Col>
										<Col md={6} ><LabelText label="租赁期限" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="首付款时间" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="签署日期" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="租赁项目" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="租赁用途" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="租赁总额" text=""/></Col>
										<Col md={6} ><LabelText label="押金总额" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="备注" text=""/></Col>
									</Row>

									<Row>
										<Col md={6} ><LabelText label="上传附件" text=""/></Col>
									</Row>

								</Grid>


								   <Section title="租赁明细" description=""> 

					<Table>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
											<TableHeaderColumn>起始日期</TableHeaderColumn>
											<TableHeaderColumn>结束日期</TableHeaderColumn>
									</TableHeader>
									<TableBody>

									{contractList.map((item,index)=>{
										return (
											 <TableRow key={index}>
											<TableRowColumn>{item.contractcode}</TableRowColumn>
											<TableRowColumn>

													{item.contracttype == 1 && '意向书'}
													{item.contracttype == 2 && '入住协议'}
													{item.contracttype == 3 && ':增续租协议'}
													{item.contracttype == 4 && ':减租协议'}
													{item.contracttype == 5 && ':退租协议'}
													{item.contracttype == 6 && ':增值服务合同'}

											</TableRowColumn>
											<TableRowColumn><Date.Format value={item.contractTotalamount}/></TableRowColumn>
											<TableRowColumn><Date.Format value={item.leaseBegindate}/></TableRowColumn>
											<TableRowColumn> <Date.Format value={item.leaseEnddate}/></TableRowColumn>
											<TableRowColumn><Button  type="link" label="查看" href={`/#/operation/customerManage/${item.customerid}/order/${item.mainbillid}/detail`} />
											<Button type="link" label="编辑"  href={`/#/operation/customerManage/${item.customerid}/order/${item.mainbillid}/edit`} /></TableRowColumn>
										   </TableRow>
											);
									})}
										
								   </TableBody>
							 </Table>		

					  </Section>



							</Section>



			</div>
	);
  }
}

