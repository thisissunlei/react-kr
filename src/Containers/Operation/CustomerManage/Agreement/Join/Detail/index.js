import React, {Component, PropTypes} from 'react';

import {
	Menu,
	MenuItem,
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	SplitLine,
	DotTitle
} from 'kr-ui';

import {KrField,LabelText} from 'kr-ui/Form';
import {View} from 'kr-ui/contractView';
import Date from 'kr-ui/Date';
import RaisedButton from 'material-ui/RaisedButton';

import {Actions,Store} from 'kr/Redux';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';
// import './index.less';
export default  class JoinDetail extends Component {
   
	 static contextTypes = {
	  	params: React.PropTypes.object.isRequired
    }

	constructor(props,context){
		super(props, context);


		this.state = {
			loading:true,
			basic:{
				payment:{
				},
			}
		}

		this.BasicRender = this.BasicRender.bind(this);

	}

	componentDidMount(){

		var _this = this;
		Store.dispatch(Actions.callAPI('show-checkin-agreement',{id:this.props.params.id}))
		.then(function(response){
			_this.setState({
				basic:response,
				loading:false
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
	BasicRender(basic){
		const content = {
			position: 'relative',
			width: '900px',
			margin: '0 auto'
		}
		const info = {
			overflow:'hidden',
			padding:30
		}

		  return (
				  <div className="content" style={content}>
				  	<View/>
				  	<div className="content-info" style={info} >
				  			
					<KrField component="labelText" grid={1/2} label="出租方" value={basic.lessorName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.lessorContactName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.lessorContacttel} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="承租方" value={basic.customerName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="地址" value={basic.leaseAddress} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="联系人" value={basic.leaseContact} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="电话" value={basic.leaseContacttel} defaultValue="无" requireBlue={true}/>
					<SplitLine />
					<KrField component="labelText" grid={1/2} label="所属社区" value={basic.communityName} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="所属楼层" value={basic.wherefloor} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="地址" value={basic.communityAddress} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="合同编号" value={basic.contractcode} defaultValue="无" requireBlue={true}/>

					<KrField component="labelText" grid={1/2} label="支付方式" value={basic.payType && basic.payType.dicName} defaultValue="无" requireBlue={true}/>


					<KrField component="group" grid={1/2} label="租赁期限:" requireBlue={true}>

						<Row style={{marginTop:5}}>
						<Date.Format value={basic.leaseBegindate} />  ——  <Date.Format value={basic.leaseEnddate}/>
						</Row>
					</KrField>
					
						
			  <Grid>
				  <Row style={{padding:10,marginBottom:15}}>
					  <Col md={6} align="left" >首付款时间： <Date.Format value={basic.firstpaydate}/>  </Col>
					  <Col md={5} align="left" style={{paddingLeft:10}}>付款方式：  {basic.payment && basic.payment.dicName}</Col>
				  </Row>
				  <Row style={{padding:10,marginBottom:15}}>
					  <Col md={6} align="left" >签署日期： <Date.Format value={basic.signdate}/>  </Col>

				  </Row>
			  </Grid>

					<KrField component="group" label="租赁项目" requireBlue={true} requireBlue={true}>
									<KrField component="labelText" label="工位" value={basic.stationnum} defaultValue="0"/>
									<KrField component="labelText" label="会议室" value={basic.boardroomnum} defaultValue="0"/>
						</KrField>

					<KrField component="labelText" label="租赁用途" value={basic.rentaluse} requireBlue={true}/>

					<KrField component="labelText" grid={1/2}  label="租金总额" value={basic.totalrent} defaultValue="0" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="押金总额" value={basic.totaldeposit} defaultValue="0" requireBlue={true}/>

					<KrField component="labelText"  label="备注" value={basic.contractmark} defaultValue="无" requireBlue={true}/>

					<KrField component="group" label="上传附件" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>

									
					<DotTitle title='租赁明细'>
						<Table displayCheckbox={false}>
							<TableHeader>
									<TableHeaderColumn>类别</TableHeaderColumn>
									<TableHeaderColumn>编号／名称</TableHeaderColumn>
									<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
									<TableHeaderColumn>起始日期</TableHeaderColumn>
									<TableHeaderColumn>结束日期</TableHeaderColumn>
							</TableHeader>
							<TableBody>

							{
								basic.stationVos && basic.stationVos.map((item,index)=>{
								
								return (
									<TableRow key={index}>
										<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
										<TableRowColumn>
										{item.stationName}
										</TableRowColumn>
										<TableRowColumn>
											{item.unitprice}
										</TableRowColumn>
										<TableRowColumn><Date.Format value={item.leaseBeginDate}/></TableRowColumn>
										<TableRowColumn><Date.Format value={item.leaseEnddate}/></TableRowColumn>
									</TableRow>
								);
								})
							}
									
							</TableBody>
						</Table>		

					</DotTitle>
					</div>
			</div>
		  );

	  };


  render() {

  	if(this.state.loading){
  		return(<Loading/>);
  	}
	const params = this.props.params;
	 const orderBaseInfo = {};
	 const contractList = [];


	  const {basic} = this.state;


	function getOrderUrl(){
		return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

    return (

      <div>

			<BreadCrumbs children={['社区运营',,'合同详情','入驻合同查看']}/>

			<Section title="入驻合同(查看)" description=""> 

			{this.BasicRender(basic)}
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





