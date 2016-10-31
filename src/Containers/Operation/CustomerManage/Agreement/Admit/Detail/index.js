import React, {Component, PropTypes} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	KrField,
	LabelText,
	KrDate,
	Table,
   	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Grid,
	Row,
	Col,
} from 'kr-ui';


import {Actions,Store} from 'kr/Redux';


export default  class AdmitDetail extends Component {


	constructor(props,context){
		super(props, context);


		this.state = {
			isLoading:true,
			basic:{
				payment:{
				},
				stationVos:[]
			}
		}

		var _this = this;



		Store.dispatch(Actions.callAPI('showFinaContractIntentletter', {id:this.props.params.id}))
		.then(function(response){
			_this.setState({
				basic:response,
				isLoading:false
			});
		}).catch(function(err){
			Notify.show([{
				message: err.message,
				type: 'danger'
			}]);
		});

	}

	componentWillMount(){

	}


  render() {

  	let {isLoading} = this.state;

  	if(isLoading){
  		return <Loading />
  	}


	 const orderBaseInfo = {};
	 const contractList = [];
	 function onCancel(){
		location.href="/#/operation/customerManage/"+params.customerId+ "/order/"+params.orderId+"/detail";
	}
	const params = this.props.params;

	function getOrderUrl(){
		return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	  const {basic} = this.state;
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
					<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress} defaultValue="无"/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.lessorContactName} defaultValue="无"/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.lessorContacttel} defaultValue="无"/>

					<KrField component="labelText" grid={1/2} label="承租方" value={basic.customerName} defaultValue="无"/>
					<KrField component="labelText" grid={1/2} label="地址" value={basic.leaseAddress} defaultValue="无"/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.leaseContact} defaultValue="无"/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.leaseContacttel} defaultValue="无"/>

					<KrField component="labelText" grid={1/2} label="所属社区" value={basic.communityName} defaultValue="无"/>
					<KrField component="labelText" grid={1/2} label="所属楼层" value={basic.wherefloor} defaultValue="无"/>


<KrField label="定金总额"   grid={1/2} component="labelText" value={basic.totaldownpayment} defaultValue="0"/>
<KrField component="group" grid={1/2} label="签署日期:">
	<Row style={{marginTop:5}}>
		<KrDate.Format value={basic.signdate}/>
	</Row>
</KrField>
			<KrField label="合同编号"   grid={1/2} component="labelText" value={basic.contractcode} defaultValue="无"/>
			<KrField label="付款方式"   grid={1/2} component="labelText" value={dicName} defaultValue="无"/>
			<KrField label="租赁项目" component="group">
				<KrField label="工位"   grid={1/1} component="labelText" value={basic.stationnum} defaultValue="0"/>
					<KrField label="会议室"   grid={1/1} component="labelText" value={basic.boardroomnum} defaultValue="0"/>
				  </KrField>
 <Grid>
	  <Row style={{padding:10,marginBottom:15}}>
		  <Col md={6} align="left" >租赁期限： <KrDate.Format value={basic.leaseBegindate}/>  ——  <KrDate.Format value={basic.leaseEnddate}/>  </Col>
	  </Row>
</Grid>
<KrField label="保留天数"   grid={1/2} component="labelText" value={basic.templockday} defaultValue="0"/>

<KrField label="备注"   grid={1/1} component="labelText" value={basic.contractmark} defaultValue="无"/>

<KrField label="上传附件"   grid={1/1} component="labelText" value={basic.contractfile} defaultValue="无"/>


<Section title="租赁明细" description=""> 

								<Table displayCheckbox={false}>
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
														<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
														<TableRowColumn>
															{item.stationName}
														</TableRowColumn>
														<TableRowColumn><KrDate.Format value={item.leaseBeginDate}/></TableRowColumn>
														<TableRowColumn><KrDate.Format value={item.leaseEndDate}/></TableRowColumn>
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
					  <Col md={2} align="center"> <Button  label="返回"  type="href" primary={true} href={getOrderUrl()}/> </Col>
					  <Col md={4} align="center"></Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

    );
  }
}





