import React, {
	Component,
	PropTypes
} from 'react';

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
	SplitLine,
	DotTitle,
	PaperBack,
	Title,
	Dialog
} from 'kr-ui';


import dateFormat from 'dateformat';
import Agreement from 'kr/PureComponents/Agreement';
import Print from 'kr/PureComponents/Agreement/Print';


import {
	Actions,
	Store
} from 'kr/Redux';
import {Http} from 'kr/Utils'
import "./index.less";
export default class AdmitDetail extends Component {


	constructor(props, context) {
		super(props, context);


		this.state = {
			isLoading: true,
			basic: {
				payment: {},
				stationVos: []
			},
			oldBasicStationVos:[],
			openAdd:false,
			openMinus:false,
			newBasicStationVos:[],
			openCopyAgreement:false,
			url:''
		}



	}

	addClick=()=>{
		console.log(`====>`);

       let {oldBasicStationVos,newBasicStationVos,openMinus,openAdd}=this.state;
	   this.setState({
	  	 newBasicStationVos:oldBasicStationVos,
	  	 openMinus:true,
	  	 openAdd:false
	    })
	}

	minusClick=()=>{
      let {oldBasicStationVos,newBasicStationVos,openAdd,openMinus}=this.state;
	   this.setState({
	  	 newBasicStationVos:oldBasicStationVos.slice(0,5),
	  	 openAdd:true,
	  	 openMinus:false
	    })
	}

	componentWillMount() {

	}

    componentDidMount() {
    	var _this = this;
		Http.request('showFinaContractIntentletter', {
			id: this.props.params.id
		}).then(function(response) {
			_this.setState({
				basic: response,
				isLoading: false,
				oldBasicStationVos:response.stationVos
			},function(){
				let {newBasicStationVos,oldBasicStationVos,openAdd}=_this.state;
			       if(oldBasicStationVos&&oldBasicStationVos.length>5){
			            _this.setState({
			            	newBasicStationVos:oldBasicStationVos.slice(0,5),
			            	openAdd:true
			            })
			        }
			        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
			        	_this.setState({
			        		newBasicStationVos:oldBasicStationVos,
			        		openAdd:false
			        	})
			        }
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger'
			}]);
		});
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/admit/${params.id}/print?print=`;
		this.setState({
			url:url,
			openCopyAgreement:true
		})
		// var newWindow = window.open(url);

	}
	openCopyAgreementDialog=()=>{
    	this.setState({
    		openCopyAgreement:false
    	})
    }
    confirmPrintAgreement=(value)=>{
    	console.log('confirmPrintAgreement',this.state.url+value);
    	let url = this.state.url+value;
    	this.setState({
    		openCopyAgreement:false
    	})
    	var newWindow = window.open(url);
    }

	 componentWillReceiveProps(){
	 	console.log('==componentWillReceiveProps==>')
    	let {newBasicStationVos,oldBasicStationVos,openAdd}=this.state;
        if(oldBasicStationVos&&oldBasicStationVos.length>5){
            this.setState({
            	newBasicStationVos:oldBasicStationVos.slice(0,5),
            	openAdd:true
            })
        }
        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
        	this.setState({
        		newBasicStationVos:oldBasicStationVos,
        		openAdd:false
        	})
        }
    }

    BasicRender=(basic,newBasicStationVos,openAdd,openMinus)=>{
    	var _this=this;
		const content = {
			position: 'relative',
			width: '100%',
			margin: '0 auto',
			fontSize: 14
		}
		const info = {
			paddingBottom: 10
		}

		let dicName;

		if (basic.payment) {
			dicName = basic.payment.dicName;
		} else {
			dicName = '';
		}
		var agreementValue = basic.agreement=='无'?'如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部陈振江（chenzhenjiang@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。':basic.agreement;
	
			return (
				<div className="content agreement-detail" style={content}>
					<Title value="承租意向书详情页_财务管理"/>
				  	<div className="customer-close" onMouseUp={this.onCancel}></div>
				    <span className="content-title">承租协议书详情页</span>

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
													newBasicStationVos && newBasicStationVos.map((item,index)=>{
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

										   {openAdd&&<div onClick={this.addClick} className='arrow-wrap'><span className='arrow-open'>展开</span><span className='arrow-pic'></span></div>}
			                               {openMinus&& <div onClick={this.minusClick} className='arrow-wrap'><span className='arrow-open'>收起</span><span className='arrow-pic-do'></span></div>}

								  </DotTitle>

				  <div className="content-info" style={info}>
                   <div className='detail-first'>
                    <KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>
				  </div>
					<SplitLine style={{display:'none'}}/>
				  <div className='detail-first'>
					<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="所属楼层：" value={basic.wherefloor} defaultValue="无" requireBlue={true} toolTrue='true'/>


<KrField label="定金总额："   grid={1/2} component="labelText" value={basic.totaldownpayment} defaultValue="0" requireBlue={true} toolTrue='true'/>
<KrField label="签署日期："   grid={1/2} left={60} component="labelText" type="date" value={basic.signdate} defaultValue="0" requireBlue={true}/>

			<KrField label="合同编号："   grid={1/2} component="labelText" value={basic.contractcode} defaultValue="无" requireBlue={true} toolTrue='true'/>
			<KrField label="付款方式："   left={60} grid={1/2} component="labelText" value={dicName} defaultValue="无" requireBlue={true} toolTrue='true'/>

				<KrField label="租赁工位："   grid={1/2} component="labelText" value={basic.stationnum} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField label="租赁独立空间："  left={60} grid={1/2} component="labelText" value={basic.boardroomnum} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField label="租赁期限："   grid={1/2}  component="labelText" value={`${dateFormat(basic.leaseBegindate,"yyyy-mm-dd")}——${dateFormat(basic.leaseEnddate,"yyyy-mm-dd")}`} defaultValue="0" requireBlue={true}/>

<KrField label="保留天数："   grid={1/2} component="labelText" left={60} value={basic.templockday} defaultValue="0" requireBlue={true} toolTrue='true'/>

<KrField label="备注："   grid={1/1} component="labelText" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>
<KrField label="双方其他约定内容："   grid={1/1} component="labelText" value={basic.agreement} defaultValue="无" requireBlue={true} inline={false}/>


					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>

                      </div>

					</div>
				  </div>
			);

		}



	render() {


		let {
			isLoading
		} = this.state;
		let {
			eidtBotton
		} = this.props;

		if (isLoading) {
			return <Loading />
		}

		let showEdit = true;
		if(eidtBotton && eidtBotton == "none"){
			showEdit = false;
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
			basic,
			newBasicStationVos,
			openAdd,
			openMinus
		} = this.state;
		let dicName;

		if (basic.payment) {
			dicName = basic.payment.dicName;
		} else {
			dicName = '';
		}
		const content = {
			position: 'relative',
			width: '100%',
			margin: '0 auto',
			fontSize: 14
		}
		const info = {
			paddingBottom: 10
		}

		

		return (

			<div>

			<BreadCrumbs children={['社区运营',,'合同详情']}/>

				{/*<BasicRender/>*/}
				{this.BasicRender(basic,newBasicStationVos,openAdd,openMinus)}


				<Grid style={{marginTop:5,marginBottom:50}}>
				  { showEdit && <Row>
					  <Col md={5} align="center"></Col>
					  <Col md={2} align="center"> <Button  label="打印"   backgroundColor="#499df1" width={100} height={40} fontSize={16} onClick={this.print}/></Col>
					  <Col md={5} align="center"></Col>
				  </Row>}
			     </Grid>
			   	<Dialog
					title="打印"
					modal={true}
					onClose={this.openCopyAgreementDialog}
					open={this.state.openCopyAgreement}
					contentStyle={{width:700,height:'auto'}}>
						<Print.PrintDialog onSubmit={this.confirmPrintAgreement} onCancel={this.openCopyAgreementDialog} />

				</Dialog>


      </div>

		);
	}
}
