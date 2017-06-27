import React, {
	PropTypes
} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	KrField,
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
	SplitLine,
	DotTitle,
	PaperBack,
	Title,
} from 'kr-ui';


import {DateFormat,Http} from 'kr/Utils';


import {
	Actions,
	Store
} from 'kr/Redux';


export default class AdmitDetail extends React.Component {


	constructor(props, context) {
		super(props, context);


		this.state = {
			isLoading: true,
			basic: {
				payment: {},
				stationVos: []
			}
		}

		var _this = this;



		Http.request('showFinaContractIntentletter', {
			id: this.props.params.id
		}).then(function(response) {
			_this.setState({
				basic: response,
				isLoading: false
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger'
			}]);
		});

	}

	componentWillMount() {

	}
	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/admit/${params.id}/print`
		var newWindow = window.open(url);

	}

	render() {

		let {
			isLoading
		} = this.state;

		if (isLoading) {
			return <Loading />
		}


		const orderBaseInfo = {};
		const contractList = [];

		function onCancel() {
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail";
		}
		const params = this.props.params;

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}

		const {
			basic
		} = this.state;
		let dicName;

		if (basic.payment) {
			dicName = basic.payment.dicName;
		} else {
			dicName = '';
		}
		const content = {
			position: 'relative',
			width: '900px',
			margin: '0 auto',
			fontSize: 14
		}
		const info = {
			padding: '30px 70px',
			paddingBottom: 10
		}

		const BasicRender = (props) => {

			return (
				<div className="content" style={content}>
						<Title value="承租意向书详情页_财务管理"/>
				  	<PaperBack label="承租意向书详情页"/>
				  	<div className="content-info" style={info} >

<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true}/>
					<SplitLine />
					<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="所属楼层：" value={basic.wherefloor} defaultValue="无" requireBlue={true}/>


<KrField label="定金总额："   grid={1/2} component="labelText" value={basic.totaldownpayment} defaultValue="0" requireBlue={true}/>
<KrField label="签署日期："   grid={1/2} left={60} component="labelText" type="date" value={basic.signdate} defaultValue="0" requireBlue={true}/>

			<KrField label="合同编号："   grid={1/2} component="labelText" value={basic.contractcode} defaultValue="无" requireBlue={true}/>
			<KrField label="付款方式："   left={60} grid={1/2} component="labelText" value={dicName} defaultValue="无" requireBlue={true}/>

				<KrField label="租赁工位："   grid={1/2} component="labelText" value={basic.stationnum} defaultValue="0" requireBlue={true}/>
					<KrField label="租赁独立空间："  left={60} grid={1/2} component="labelText" value={basic.boardroomnum} defaultValue="0" requireBlue={true}/>
					<KrField label="租赁期限："   grid={1/2}  component="labelText" value={`${DateFormat(basic.leaseBegindate,"yyyy-mm-dd")}——${DateFormat(basic.leaseEnddate,"yyyy-mm-dd")}`} defaultValue="0" requireBlue={true}/>

<KrField label="保留天数："   grid={1/2} component="labelText" left={60} value={basic.templockday} defaultValue="0" requireBlue={true}/>

<KrField label="备注："   grid={1/1} component="labelText" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>
<KrField label="双方其他约定内容："   grid={1/1} component="labelText" value={basic.agreement} defaultValue="无" requireBlue={true} inline={false}/>

					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>


								<DotTitle title='租赁明细'>

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
													return (
														 <TableRow key={index}>
														<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
														<TableRowColumn>
															{item.stationName}
														</TableRowColumn>
														<TableRowColumn><KrDate value={item.leaseBeginDate}/></TableRowColumn>
														<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>
													   </TableRow>
														);
												})}

											   </TableBody>
										 </Table>





								  </DotTitle>
								  </div>
				  </div>
			);

		}

		return (

			<div style={{minWidth:1000}}>

			<BreadCrumbs children={['社区运营',,'合同详情']}/>

			<Section title="承租意向书" description="" bodyPadding={"20px 20px 150px 20px"}>
				<BasicRender/>


				<Grid style={{margin:"0 auto",width:230}}>
				  <Row style={{width:230}}>
					  <Col  align="center" style={{marginRight:30,float:"left"}}> <Button  label="返回"  type="href" joinEditForm href={getOrderUrl()} width={100} height={40} fontSize={16}/> </Col>
					  <Col  align="center" style={{float:"left"}}> <Button  label="打印"   backgroundColor="#499df1" width={100} height={40} fontSize={16} onClick={this.print}/>  </Col>
				</Row>
			  </Grid>

			</Section>
      </div>

		);
	}
}
