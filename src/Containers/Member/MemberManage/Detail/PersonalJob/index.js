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
	Message,
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

			workInfo:{}
		}
	}


	componentDidMount() {
		var _this=this;
		let {
			params
		} = this.props;
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			id:this.context.router.params.memberId
		})).then(function(response) {
			_this.setState({
				workInfo:response.workInfo,
			},function(){
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render() {
		const {
		workInfo
		} = this.state;

		return (

			<div className='ui-detail-order'>


			           <KrField grid={1/3} alignRight={true} label="职位:" component="labelText" value={workInfo.jobName} defaultValue="无"/>

			           <KrField grid={1/3}  alignRight={true} component="labelText"  label="工位号:" value={workInfo.stationCode} defaultValue="无" />

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="社区:" value={workInfo.communityName} defaultValue="无" />

                <KrField grid={1/3} alignRight={true} label="公司:" component="labelText"  value={workInfo.customerCompany} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="入驻氪空间状态:" component="labelText"  value={workInfo.customerCompany} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="入职时间:" component="labelText" type="date" value={workInfo.entryTime} defaultValue="无"/>


									<KrField grid={1/3} alignRight={true} label="入驻氪空间时间:" component="labelText" type="date" value={workInfo.customerCompany} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="工作地点:" component="labelText" value={workInfo.cityName} defaultValue="无" />

									<KrField grid={1/3} alignRight={true} label="离开氪空间时间:" component="labelText" type="date" value={workInfo.customerCompany} defaultValue="无"/>

			</div>

		)

	}

}
