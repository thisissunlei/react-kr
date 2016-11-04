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
} from 'kr-ui';

import {
	KrField,
	LabelText
} from 'kr-ui/Form';
import {
	View
} from 'kr-ui/contractView';

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

		Store.dispatch(Actions.callAPI('getFnaContractWithdrawalById', {
			id: this.props.params.id
		})).then(function(response) {
			_this.setState({
				basic: response
			});

		});

		setTimeout(function() {
			_this.setState({
				loading: false
			});
		}, 2000);
	}

	componentWillMount() {

	}


	render() {

		if (this.state.loading) {
			return (<Loading/>);
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
		basic.firstpaydate = dateFormat(basic.firstpaydate, "yyyy-mm-dd h:MM:ss");
		basic.signdate = dateFormat(basic.signdate, "yyyy-mm-dd h:MM:ss");
		const BasicRender = (props) => {
			const content = {
				position: 'relative',
				width: '900px',
				margin: '0 auto'
			}
			const info = {
				overflow: 'hidden',
			}

			return (
				<div className="content" style={content}>
				  	<View/>
				  	<div className="content-info" style={info} >
				  	

								<KrField component="labelText" grid={1/2} label="出租方" value={basic.lessorName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress}/>

								<KrField component="labelText" grid={1/2} label="联系人" value={basic.lessorContactName}/>
								<KrField component="labelText" grid={1/2} label="电话" value={basic.lessorContacttel}/>

								<KrField component="labelText" grid={1/2} label="承租方" value={basic.customerName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.leaseAddress}/>

								<KrField component="labelText" grid={1/2} label="联系人" value={basic.leaseContact}/>
								<KrField component="labelText" grid={1/2} label="电话" value={basic.leaseContacttel}/>
								<SplitLine />
								<KrField component="labelText" grid={1/2} label="所属社区" value={basic.communityName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.communityAddress}/>

								<KrField component="labelText" grid={1} label="合同编号" value={basic.contractcode}/>

								<KrField component="labelText" grid={1/2} label="退租金总额" value={basic.totalreturn} defaultValue="0"/>
								<KrField component="labelText" grid={1/2} label="退租押金总额" value={basic.depositamount} defaultValue="0"/>

								<KrField component="labelText" grid={1/2} label="撤场日期" value={basic.firstpaydate}/>
								<KrField component="labelText" grid={1/2} label="签署日期" value={basic.signdate}/>

								<KrField component="labelText"  label="备注" value={basic.contractmark}/>

					<KrField component="group" label="上传附件">
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>
			</div>
				  </div>
			);

		}

		return (

			<div>
				<BreadCrumbs children={['社区运营',,'合同详情','退租合同查看']}/>
				<Section title="退租协议书" description=""> 
					<BasicRender/>
					<Grid style={{marginTop:30}}>
				  <Row>
					  <Col md={5} align="center"></Col>
					  <Col md={2} align="center"> <Button  label="返回"  type="href"  href={getOrderUrl()}/> </Col>
					  <Col md={5} align="center"></Col>
				  </Row>
			  </Grid>
				</Section>

		  </div>

		);
	}
}