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
import Date from 'kr-ui/Date';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';

export default  class AdmitDetail extends Component {


	constructor(props,context){
		super(props, context);


		this.state = {
			basic:{
				payment:{
				},
				stationVos:[]
			}
		}

		var _this = this;

		// Store.dispatch(Actions.callAPI('showFinaContractIntentletter')
		// .then(function(response){
		// 	_this.setState({
		// 		basic:response
		// 	});
		// 	console.log(response);
		// }))

		Store.dispatch(Actions.callAPI('showFinaContractIntentletter', {id:this.props.params.id}))
		.then(function(response){
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
	 function onCancel(){
		location.href="/#/operation/customerManage/"+params.customerId+ "/order/"+params.orderId+"/detail"
	}
	const params = this.props.params;

	function editUrl(){
		return "./#/operation/customerManage/"+params.customerId+"/order/"+params.orderId+"/agreement/admit/"+params.id+"/edit";
	}
	  const {basic} = this.state;
	  console.log('basic', basic);
	  let dicName;
	  if(basic.payment)  {
	  	dicName = basic.payment.dicName;
	  }else{
	  	dicName = '';
	  }

	  const BasicRender = (props)=>{

		  return (
				  <div>

<KrField component="labelText" grid={1/2} label="出租方" value={basic.lessorName}/>
					<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress}/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.lessorContactName}/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.lessorContacttel}/>

					<KrField component="labelText" grid={1/2} label="承租方" value={basic.customerName}/>
					<KrField component="labelText" grid={1/2} label="地址" value={basic.leaseAddress}/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.leaseContact}/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.leaseContacttel}/>

					<KrField component="labelText" grid={1/2} label="所属社区" value={basic.communityName}/>
					<KrField component="labelText" grid={1/2} label="所属楼层" value={basic.wherefloor}/>


<KrField label="定金总额"   grid={1/2} component="labelText" value={basic.totaldownpayment}/>
<KrField component="group" grid={1/2} label="签署日期:">
	<Row style={{marginTop:5}}>
		<Date.Format value={basic.signdate}/>
	</Row>
</KrField>
			<KrField label="合同编号"   grid={1/2} component="labelText" value={basic.contractcode}/>
			<KrField label="付款方式"   grid={1/2} component="labelText" value={dicName}/>
<KrField label="租赁项目" component="group">
	<KrField label="工位"   grid={1/1} component="labelText" value={basic.stationnum}/>
	<KrField label="会议室"   grid={1/1} component="labelText" value={basic.boardroomnum}/>
  </KrField>
 <Grid>
	  <Row style={{padding:10,marginBottom:15}}>
		  <Col md={6} align="left" >租赁期限： <Date.Format value={basic.leaseBegindate}/>  ——  <Date.Format value={basic.leaseEnddate}/>  </Col>

	  </Row>
</Grid>
<KrField label="保留天数"   grid={1/2} component="labelText" value={basic.templockday}/>

<KrField label="备注"   grid={1/1} component="labelText" value={basic.contractmark}/>

<KrField label="上传附件"   grid={1/1} component="labelText" value={basic.contractfile}/>


<Section title="租赁明细" description=""> 

								<Table>
												<TableHeader>
														<TableHeaderColumn>类别</TableHeaderColumn>
														<TableHeaderColumn>编号／名称</TableHeaderColumn>
														<TableHeaderColumn>起始日期</TableHeaderColumn>
														<TableHeaderColumn>结束日期</TableHeaderColumn>
												</TableHeader>
												<TableBody>

												{
													basic.stationVos && basic.stationVos.map((item,index)=>{
													console.log(basic.stationVos);
													return (
														 <TableRow key={index}>
														<TableRowColumn>工单：{item.stationType}</TableRowColumn>
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
					  <Col md={2} align="center"> <Button  label="编辑"  type="href" primary={true} href={editUrl()}/> </Col>
					  <Col md={2} align="center"> <Button  label="确定"  type="submit" primary={true} onTouchTap={onCancel}/> </Col>
					  <Col md={4} align="center"></Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

    );
  }
}





