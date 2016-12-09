import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import './index.less';
import {
	// Table,
	// TableBody,
	// TableHeader,
	// TableHeaderColumn,
	// TableRow,
	// TableRowColumn,
	// TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
	ListItem,
	KrField,
	LabelText,
	KrDate,
} from 'kr-ui';
export default class BasicInfo extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {

	}

	static PropTypes = {

	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			// params: {
			// 	accountType: 'PAYMENT',
			// 	childType: 'basic',
			// 	propertyId: '',
			// 	propInfo: 'SETTLED',
			// 	orderId: this.props.params.orderId
			// 	page: 1,
			// 	pageSize: 20,
			// 	index:''
			// },
			companyInfo:{}
		}
	}


	componentDidMount() {
		// console.log("this.props.params",this.context.router.params.memberId);
     var _this=this;
		let {
			params
		} = this.props;
		// console.log('222',params);
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			id:this.context.router.params.memberId
		})).then(function(response) {
			// console.log("response",response);
			// console.log("response.baseInfo",response.baseInfo);

			_this.setState({
				companyInfo:response.companyInfo,
				// detailPayment: response.paymentdata,
				// detailIncome: response.incomedata,
				// detailBalance: response.balance,
				// isInitLoading: false,
			},function(){
				// console.log('3333',_this.state.baseInfo);
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	// initBasicInfo() {
	// 	console.log("response",response);
	//
	// }
	render() {
		const {
		companyInfo
			// detailPayment,
			// detailIncome
		} = this.state;
		// console.log("baseInfo",baseInfo);
		// if (!detail.mainbillname) {
		// 	detail.mainbillname = '';
		// }

		// let style={
		// 	color:'#ff6868',
		// }

		return (

			<div className='ui-detail-order'>

			           {/*<KrField grid={1/3} alignRight={true} label="星座:" component="labelText" value={basicinfo.star} defaultValue="无"/>*/}
			           <KrField grid={1/3} alignRight={true} label="职位:" component="labelText" value={companyInfo.jobName} defaultValue="无"/>

			           <KrField grid={1/3}  alignRight={true} component="labelText"  label="工位号:" value={companyInfo.stationCode} defaultValue="无" />

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="社区:" value={companyInfo.communityName} defaultValue="无" />

                <KrField grid={1/3} alignRight={true} label="公司:" component="labelText"  value={companyInfo.customerCompany} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="入驻氪空间状态:" component="labelText"  value={companyInfo.customerCompany} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="入职时间:" component="labelText" type="date" value={companyInfo.entryTime} defaultValue="无"/>


									<KrField grid={1/3} alignRight={true} label="入驻氪空间时间:" component="labelText" type="date" value={companyInfo.customerCompany} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="工作地点:" component="labelText" value={companyInfo.cityName} defaultValue="无" />

									<KrField grid={1/3} alignRight={true} label="离开氪空间时间:" component="labelText" type="date" value={companyInfo.customerCompany} defaultValue="无"/>


									{/*{detailPayment.map((item,index)=>
						    <KrField key={index} grid={1/3} label={item.propname} component="labelText" value={item.propamount}/>
						 )}
						 {detailIncome.map((item,index)=>
						    <KrField key={index} grid={1/3} label={item.propname} component="labelText" value={item.propamount}/>
						 )}*/}
			</div>

		)

	}

}
