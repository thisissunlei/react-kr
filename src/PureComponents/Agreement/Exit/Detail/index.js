import React, {
	Component,
	PropTypes
} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	SplitLine,
	KrField,
	LabelText,
	PaperBack,
	Title
} from 'kr-ui';
import {Http} from 'kr/Utils'
import Date from 'kr-ui/Date';
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
import dateFormat from 'dateformat';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';

export default class ExitDetail extends Component {


	constructor(props, context) {
		super(props, context);




		this.state = {
			loading: true,
			basic: {
				payment: {},
				stationVos: []
			}
		}

		var _this = this;

		Http.request('getFnaContractWithdrawalById', {
			id: this.props.params.id
		}).then(function(response) {
			_this.setState({
				basic: response,
				loading:false
			});

		});

	}

	  onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	  }


	componentWillMount() {

	}

	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/join/${params.id}/print`
		var newWindow = window.open(url);

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
		const params = this.props.params;

		function onCancel() {
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail"
		}

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}

		const {
			basic
		} = this.state;

		const BasicRender = (props) => {
			const content = {
				position: 'relative',
				width: '100%',
				margin: '0 auto',
				fontSize:14
			}
			const info = {
				paddingBottom:10
			}
			var agreementValue = basic.agreement=='无'?'如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部田欢（tianhuan@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。':basic.agreement;

			return (
				<div className="content agreement-detail" style={content}>
					 <Title value="退租协议书详情页_财务管理"/>
					 <div className="customer-close" onMouseUp ={this.onCancel}></div>
				     <span className="content-title">退租协议书详情页</span>
				  	 <div className="content-info" style={info} >

                            <div className='detail-first'>
								<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.lessorAddress} requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.lessorContacttel} requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.leaseAddress} requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.leaseContacttel} requireBlue={true} toolTrue='true'/>
							</div>
								<SplitLine style={{display:'none'}}/>
							<div className='detail-second'>
								<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="退服务费总额：" value={basic.totalreturn} defaultValue="0" requireBlue={true} toolTrue='true'/>
								<KrField component="labelText" grid={1/2} label="退租押金总额：" value={basic.depositamount} defaultValue="0" requireBlue={true} toolTrue='true'/>

								<KrField component="labelText" grid={1/2} label="撤场日期：" type="date" value={basic.withdrawdate} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="签署日期：" type="date" value={basic.signdate} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1} label="合同编号：" value={basic.contractcode} requireBlue={true} toolTrue='true'/>

								<KrField component="labelText"  label="备注：" value={!basic.contractmark?"无":basic.contractmark} inline={false} requireBlue={true} defaultValue="无"/>
							 	<KrField  name="agreement" component="labelText" label="双方其他约定内容" inline={false} requireBlue={true} defaultValue="无" value={basic.agreement}/>


					<KrField component="group" label="上传附件："  requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>
			  	 </div>
			</div>
		 </div>
			);
		}

		return (

			<div>
				<BreadCrumbs children={['社区运营',,'合同详情','退租合同查看']}/>

				<BasicRender/>
			<Grid style={{marginTop:5,marginBottom:50}}>
				 {showEdit &&  <Row>
					  <Col md={5} align="center"></Col>
					  <Col md={5} align="center"></Col>
				  </Row>}
			</Grid>


		  </div>

		);
	}
}
