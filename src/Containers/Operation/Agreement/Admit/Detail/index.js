import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section
} from 'kr-ui';

import { Button } from 'kr-ui/Button';
import {Actions,Store} from 'kr/Redux';

import {Grid,Row,Col} from 'kr-ui/Grid';
import {KrField,LabelText} from 'kr-ui/Form';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';

import store from './store';


@observer

export default  class AdmitDetail extends Component {


	constructor(props,context){
		super(props, context);


		this.state = {
			basic:{
				payment:{
				},
				stationList:[]
			}
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('showFinaContractIntentletter')).then(function(response){
			console.log('---',response);
			_this.setState({
				basic:response
			});
		});

	}

	componentWillMount(){

	}


  render() {


	 const orderBaseInfo = {};
	 const contractList = [];


	  const {basic} = this.state;

	  const BasicRender = (props)=>{

		  return (
				  <div>

<Grid style={{marginTop:30}}>

											
												<Row>
													<Col md={6} ><LabelText label="出租方" text={basic.leaseName}/></Col>
													<Col md={6} ><LabelText label="地址" text={basic.lessorAddress}/></Col>
												</Row>
												<Row>
													<Col md={6} ><LabelText label="联系人" text={basic.lessorContactName}/></Col>
													<Col md={6} ><LabelText label="电话" text={basic.lessorContacttel}/></Col>
												</Row>

											
												<Row>
													<Col md={6} ><LabelText label="承租方" text={basic.leaseName}/></Col>
													<Col md={6} ><LabelText label="地址" text={basic.leaseAddress}/></Col>
												</Row>
												<Row>
													<Col md={6} ><LabelText label="联系人" text={basic.leaseContact}/></Col>
													<Col md={6} ><LabelText label="电话" text={basic.leaseContacttel}/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="所属社区" text={basic.wherefloor}/></Col>
													<Col md={6} ><LabelText label="所属楼层" text={basic.wherefloor}/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="定金总额" text=""/></Col>
													<Col md={6} ><LabelText label="签署日期" text=""/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="合同编号" text={basic.contractcode}/></Col>
													<Col md={6} ><LabelText label="付款方式" text={basic.payment.dicName}/></Col>
												</Row>


												<Row>
													<Col md={6} ><LabelText label="租赁项目" /></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="工位" text={basic.stationnum}/></Col>
													<Col md={6} ><LabelText label="会议室" text=""/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="租赁期限" text=""/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="保留天数" text={basic.templockday}/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="租赁用途" text={basic.rentaluse}/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="备注" text={basic.contractmark}/></Col>
												</Row>

												<Row>
													<Col md={6} ><LabelText label="上传附件" text={basic.contractmark}/></Col>
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

												{basic.stationList.length && basic.stationList.map((item,index)=>{
													return (
														 <TableRow key={index}>
														<TableRowColumn>{item.stationType}</TableRowColumn>
														<TableRowColumn>
															{item.stationId}
														</TableRowColumn>
														<TableRowColumn><Date.Format value={item.leaseBeginDate}/></TableRowColumn>
														<TableRowColumn><Date.Format value={item.leaseEndDate}/></TableRowColumn>
													   </TableRow>
														);
												})}
													
											   </TableBody>
										 </Table>		



			  

								  </Section>
				  </div>
		  );

	  }

    return (

      <div>

			<BreadCrumbs children={['社区运营',,'合同详情']}/>

			<Section title="承租合同" description=""> 
				<BasicRender store={store}/>

<Grid style={{marginTop:30}}>
				  <Row>
					  <Col md={4} align="center"></Col>
					  <Col md={2} align="center"> <Button  label="编辑"  type="submit" primary={true}/> </Col>
					  <Col md={2} align="center"> <Button  label="创建"  type="submit" primary={true}/> </Col>
					  <Col md={4} align="center"></Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

    );
  }
}





