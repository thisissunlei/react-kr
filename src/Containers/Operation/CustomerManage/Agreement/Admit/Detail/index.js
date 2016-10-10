import React, {Component, PropTypes} from 'react';

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


			<KrField component="labelText" grid={1/2} label="出租方" value={basic.leaseName}/>
		<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress}/>

<KrField label="联系人"   grid={1/2} component="labelText" value={basic.lessorContactName}/>
<KrField label="电话"   grid={1/2} component="labelText" value={basic.lessorContacttel}/>

											<KrField label="承租方"   grid={1/2} component="labelText" value={basic.leaseName}/>
<KrField label="地址"   grid={1/2} component="labelText" value={basic.leaseAddress}/>

<KrField label="联系人"   grid={1/2} component="labelText" value={basic.leaseContact}/>
<KrField label="电话"   grid={1/2} component="labelText" value={basic.leaseContacttel}/>

<KrField label="所属社区"   grid={1/2} component="labelText" value={basic.wherefloor}/>
<KrField label="所属楼层"   grid={1/2} component="labelText" value={basic.wherefloor}/>

<KrField label="定金总额"   grid={1/2} component="labelText" value=""/>
<KrField label="签署日期"   grid={1/2} component="labelText" value=""/>

<KrField label="合同编号"   grid={1/2} component="labelText" value={basic.contractcode}/>
<KrField label="付款方式"   grid={1/2} component="labelText" value={basic.payment.dicName}/>


<KrField label="租赁项目" component="group">
	<KrField label="工位"   grid={1/1} component="labelText" value={basic.stationnum}/>
	<KrField label="会议室"   grid={1/1} component="labelText" value=""/>
  </KrField>

<KrField label="租赁期限"   grid={1/1} component="labelText" value=""/>

<KrField label="保留天数"   grid={1/2} component="labelText" value={basic.templockday}/>

<KrField label="租赁用途"   grid={1/2} component="labelText" value={basic.rentaluse}/>

<KrField label="备注"   grid={1/2} component="labelText" value={basic.contractmark}/>

<KrField label="上传附件"   grid={1/2} component="labelText" value={basic.contractmark}/>


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
				<BasicRender/>


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





