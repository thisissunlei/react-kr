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
			baseInfo:{}
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
				baseInfo:response.baseInfo,
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
		baseInfo
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
			           <KrField grid={1/3} alignRight={true} label="姓名:" component="labelText" value={baseInfo.name} defaultValue="无"/>

			           <KrField grid={1/3}  alignRight={true} component="labelText"  label="微信:" value={baseInfo.wechatNick} defaultValue="无" />

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="星座:" value={baseInfo.star} defaultValue="无" />

                <KrField grid={1/3} alignRight={true} label="婚姻状况:" component="labelText"  value={baseInfo.maritalStatus} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="年龄:" component="labelText"  value={baseInfo.age} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="邮箱:" component="labelText"  value={baseInfo.email} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="学历:" component="labelText" value={baseInfo.education} defaultValue="无" />

			            <KrField grid={1/3} alignRight={true} label="兴趣爱好:" component="labelText" value={baseInfo.hobby} defaultValue="无"/>
			            <KrField grid={1/3} alignRight={true} label="性别:"   component="labelText" value={baseInfo.gender} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="信仰／宗教:"  component="labelText" value={baseInfo.religion} defaultValue="无"/>
			            <KrField grid={1/3} alignRight={true} label="政治面貌:"   component="labelText" value={baseInfo.political} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="入职年限:"   component="labelText" value={baseInfo.jobAge} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="联系电话:"   component="labelText" value={baseInfo.phone} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="生日:"  component="labelText" value={baseInfo.birthday} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="紧急联系人:"   component="labelText" value={baseInfo.emerPerson} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="注册时间:" component="labelText" type="date" value={baseInfo.registerTime} defaultValue="无"/>
									<KrField grid={1/3} alignRight={true} label="注册来源:" component="labelText" value={baseInfo.registSource} defaultValue="无"/>
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
