import React, {
	PropTypes
} from 'react';

import {DateFormat,Http} from 'kr/Utils';

import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	KrDate,
	SplitLine,
	DotTitle,
	PaperBack,
	Title,
} from 'kr-ui';

import {
	Actions,
	Store
} from 'kr/Redux';


export default class JoinDetail extends React.Component {

	constructor(props, context) {
		super(props, context);


		this.state = {
			loading: true,
			basic: {
				payment: {},
			}
		}

		this.BasicRender = this.BasicRender.bind(this);

	}

	componentDidMount() {

		var _this = this;
		Http.request('show-checkin-agreement', {
				id: this.props.params.id
			})
			.then(function(response) {
				_this.setState({
					basic: response,
					loading: false
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
	BasicRender(basic) {
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

		return (
			<div className="content" style={content}>
				<Title value="增租协议书详情页_财务管理"/>
				  	<PaperBack label="增租协议书详情页"/>
				  	<div className="content-info" style={info} >


					<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true}/>
					<SplitLine />
					<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="所属楼层：" value={basic.wherefloor} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="合同编号：" value={basic.contractcode} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="支付方式：" value={basic.payType && basic.payType.dicName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="租赁期限：" value={`${DateFormat(basic.leaseBegindate,"yyyy-mm-dd")}——${DateFormat(basic.leaseEnddate,"yyyy-mm-dd")}`} defaultValue="无" requireBlue={true}/>


					<KrField component="labelText" grid={1/2} label="首付款时间：" type="date" value={basic.firstpaydate} requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="付款方式："  value={basic.payment.dicName} defaultValue="无" requireBlue={true}/>
				<KrField component="labelText" grid={1/2}  label="租金总额：" value={basic.totalrent} defaultValue="0" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="押金总额：" value={basic.totaldeposit} defaultValue="0" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="签署日期：" value={DateFormat(basic.signdate,"yyyy-mm-dd")} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" label="租赁工位：" grid={1/2}  value={basic.stationnum} requireBlue={true} defaultValue="0" requireBlue={true}/>
					<KrField component="labelText" label="租赁独立空间：" grid={1/2} value={basic.boardroomnum} requireBlue={true} defaultValue="0" requireBlue={true}/>





					<KrField component="labelText"  label="备注：" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>
					<KrField   name="agreement" type="labelText" component="labelText" label="双方其他约定内容" value={basic.agreement} defaultValue="无" requireBlue={true} inline={false}/>
					<KrField component="group" label="上传附件：" requireBlue={true}>
						{basic.contractFileList && basic.contractFileList.map((item,index)=>{
							return (<span style={{display:'block',lineHeight:'30px',paddingLeft:5}} key={index}><a href={item.fileUrl} style={{textDecoration:'none',color:'#499df1'}}>{item.fileName}</a></span>)
						})}
					</KrField>


					<DotTitle title='租赁明细'>

						<Table displayCheckbox={false} >
							<TableHeader>
									<TableHeaderColumn>类别</TableHeaderColumn>
									<TableHeaderColumn>编号／名称</TableHeaderColumn>
									<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
									<TableHeaderColumn>优惠后单价（元／月）</TableHeaderColumn>
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
										<TableRowColumn>
											{item.originalUnitprice}
										</TableRowColumn>
										<TableRowColumn>
											{item.unitprice}
										</TableRowColumn>
										<TableRowColumn><KrDate value={item.leaseBeginDate}/></TableRowColumn>
										<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>
									</TableRow>
								);
								})
							}

							</TableBody>
						</Table>

					</DotTitle>
					{basic.saleList &&(<DotTitle title='优惠明细'>
						<Table displayCheckbox={false}>
							<TableHeader>
									<TableHeaderColumn>优惠类型</TableHeaderColumn>
									<TableHeaderColumn>开始时间</TableHeaderColumn>
									<TableHeaderColumn>结束时间</TableHeaderColumn>
									<TableHeaderColumn>折扣</TableHeaderColumn>
									<TableHeaderColumn>优惠金额</TableHeaderColumn>
							</TableHeader>
							<TableBody>
							{basic.saleList.map((item,index)=>{
								return (
									<TableRow key={index}>
										<TableRowColumn>{item.tacticsName}</TableRowColumn>
										<TableRowColumn>
											<KrDate value={item.validStart}/>
										</TableRowColumn>
										<TableRowColumn>
											<KrDate value={item.validEnd}/>
										</TableRowColumn>
										<TableRowColumn>{item.discount==0?'-':`${item.discount}折`}</TableRowColumn>
										<TableRowColumn>{item.discountAmount}</TableRowColumn>
									</TableRow>
								);
								})
							}

							</TableBody>
						</Table>
					</DotTitle>)}
					</div>
			</div>
		);

	};

	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/increase/${params.id}/print`
		var newWindow = window.open(url);

	}
	render() {

		if (this.state.loading) {
			return (<Loading/>);
		}
		const params = this.props.params;
		const orderBaseInfo = {};
		const contractList = [];


		const {
			basic
		} = this.state;

		function onCancel() {
			window.history.back();
		}

		function editUrl() {
			return "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/join/" + params.id + "/edit";
		}

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}

		return (

			<div>

			<BreadCrumbs children={['社区运营',,'合同详情','增租合同查看']}/>

			<Section title="增租协议书" description="" bodyPadding={"20px 20px 150px 20px"}>

			{this.BasicRender(basic)}
			  <Grid style={{margin:"0 auto",width:230}}>
				  <Row style={{width:230}}>
					 	<Col style={{marginRight:30,float:"left"}} align="center">  <Button  label="返回"  type="href" joinEditForm href={getOrderUrl()} width={100} height={40} fontSize={16}/></Col>
						<Col style={{float:"left"}} align="center"><Button  label="打印"   backgroundColor="#499df1" width={100} height={40} fontSize={16} onClick={this.print}/> </Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

		);
	}
}