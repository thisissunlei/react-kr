/*
 *减租协议(查看）
 *
 *
 */

import React, {
	Component,
	PropTypes
} from 'react';
import {Http} from 'kr/Utils'
import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	SplitLine,
	DotTitle,
	PaperBack,
	Dialog
} from 'kr-ui';
import dateFormat from 'dateformat';
import Print from 'kr/PureComponents/Agreement/Print';


import {
	KrField,
	LabelText,
	KrDate,
	Title,
} from 'kr-ui';

import RaisedButton from 'material-ui/RaisedButton';

import {
	Button
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';

export default class ReduceDetail extends Component {


	constructor(props, context) {
		super(props, context);


		this.state = {
			loading: true,
			basic: {
				payment: {},
				stationVos: []
			},
			oldBasicStationVos:[],
			openAdd:false,
			openMinus:false,
			newBasicStationVos:[],
			url:'',
			openCopyAgreement:false
		}

	}

    addClick=()=>{
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

	componentDidMount() {
		var _this = this;
		Http.request('showFnaContractRentController', {
			id: this.props.params.id,
			communityId: this.props.params.orderId,
			customerId: this.props.params.customerId
		}).then(function(response) {
			_this.setState({
				basic: response,
				loading: false,
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
		});
	}



	componentWillMount() {

	}

	componentWillReceiveProps(){
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

     addRender=()=>{
    	    var _this=this;
            let add='';
             add=(<div onClick={_this.addClick} className='arrow-wrap'><span className='arrow-open'>展开</span><span className='arrow-pic'></span></div>)
            return add
        }

     minusRender=()=>{
    	 var _this=this;
            let minus='';
             minus=(<div onClick={_this.minusClick} className='arrow-wrap'><span className='arrow-open'>收起</span><span className='arrow-pic-do'></span></div>)
            return minus
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/reduce/${params.id}/print?print=`;
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

			return (
				<div className="content agreement-detail" style={content}>
				  	<div className="customer-close" onMouseUp={this.onCancel}></div>
				    <span className="content-title">减租协议书详情页</span>

			      <DotTitle title="租赁明细" >

											<Table displayCheckbox={false}>
															<TableHeader>
																	<TableHeaderColumn>类别</TableHeaderColumn>
																	<TableHeaderColumn>编号／名称</TableHeaderColumn>
																	<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
																	<TableHeaderColumn>减租起始日期</TableHeaderColumn>
																	<TableHeaderColumn>减租结束日期</TableHeaderColumn>
															</TableHeader>
															<TableBody>

															{newBasicStationVos && newBasicStationVos.map((item,index)=>{
																return (
																	 <TableRow key={index}>
																	<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
																	<TableRowColumn>
																		{item.stationName}
																	</TableRowColumn>
																	<TableRowColumn>
																		{item.unitprice}
																	</TableRowColumn>
																	<TableRowColumn><KrDate value={basic.leaseBegindate}/></TableRowColumn>
																	<TableRowColumn><KrDate value={basic.leaseEnddate}/></TableRowColumn>
																   </TableRow>
																	);
															})}

														   </TableBody>
													 </Table>

													  {openAdd&&this.addRender()}
			                                          {openMinus&&this.minusRender()}

											  </DotTitle>

				  	<div className="content-info" style={info} >

                           <div className='detail-first'>
								<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>
							</div>
								<SplitLine style={{display:'none'}}/>
							<div className='detail-first'>
								<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="合同编号：" value={basic.contractcode} defaultValue="无" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="减租金额：" value={basic.rentamount} defaultValue="0" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText"	 grid={1/1} label="签署日期：" value={basic.signdate} type="date" defaultValue="无" requireBlue={true}/>
								<KrField component="labelText"  label="备注：" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>
								<KrField   name="agreement"  component="labelText" label="双方其他约定内容" value={basic.agreement} defaultValue="无" requireBlue={true} inline={false}/>



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

		if (this.state.loading) {
			return (<Loading/>);
		}
		let {eidtBotton} = this.props;
		let showEdit = true;
		if(eidtBotton == "none"){
			showEdit = false;
		}
		const orderBaseInfo = {};
		const contractList = [];

		const {
			basic,
			newBasicStationVos,
			openAdd,
			openMinus
		} = this.state;
		const params = this.props.params;

		function onCancel() {
			// window.history.back();
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail"
		}

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}


		
    

		return (

			<div>

			<Title value="减租协议书详情_财务管理"/>

			<BreadCrumbs children={['社区运营',,'合同详情','减租合同查看']}/>

				{this.BasicRender(basic,newBasicStationVos,openAdd,openMinus)}
				<Grid style={{marginTop:5,marginBottom:50}}>
				 {showEdit &&  <Row>
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
