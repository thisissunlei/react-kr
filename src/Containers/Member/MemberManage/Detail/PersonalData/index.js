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
	List,
	ListItem,
	KrField,
	LabelText,
	KrDate,
	Notify,
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
			baseInfo:{}
		}
	}
	componentDidMount() {
     var _this=this;
		let {
			params
		} = this.props;
		// 会员详情页－－－－基本信息数据
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			id:this.context.router.params.memberId
		})).then(function(response) {
			// console.log(response.baseInfo,"基本信息response.baseInfo");
			if(response.baseInfo.gender=="WOMAN"){
				response.baseInfo.gender  = "女";
			}else if(response.baseInfo.gender=="MAN"){
				 response.baseInfo.gender  = "男";
			}else{
				response.baseInfo.gender  = "保密";
			}
			if(response.baseInfo.maritalStatus=="MARRIED"){
				response.baseInfo.maritalStatus = "已婚";
			}else if(response.baseInfo.maritalStatus=="UNMARRIED"){
				response.baseInfo.maritalStatus = "未婚";
			}else{
				response.baseInfo.maritalStatus = "保密";
			}
			_this.setState({
				baseInfo:response.baseInfo,
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	render() {
		const {
		baseInfo
		} = this.state;
		return (

			<div className='ui-detail-order'>
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
			</div>

		)

	}

}
