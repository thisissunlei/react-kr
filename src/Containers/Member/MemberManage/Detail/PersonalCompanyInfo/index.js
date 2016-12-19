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
export default class  CompanyInfo extends Component {
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
			console.log("_this",_this);
			_this.setState({
				companyInfo:response.companyInfo,
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
			           <KrField grid={1/3} alignRight={true} label="公司名称:" component="labelText" value={companyInfo.customerCompany} defaultValue="无"/>

			           <KrField grid={1/3}  alignRight={true} component="labelText"  label="投资轮次:" value={companyInfo.round} defaultValue="无" />

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="项目名称:" value={companyInfo.projectCategoryName} defaultValue="无" />

                <KrField grid={1/3} alignRight={true} label="办公城市:" component="labelText"  value={companyInfo.cityName} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="详细地址:" component="labelText"  value={companyInfo.detailAddress} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="公司网址:" component="labelText" type="date" value={companyInfo.website} defaultValue="无"/>
			</div>

		)

	}

}
