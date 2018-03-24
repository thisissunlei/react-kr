import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';


import SearchGroupForm from './SearchGroupForm';


import AuthorizationEquipment from '../MemberDoorPermmision/AuthorizationEquipment';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DoorGroupManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			companyId : ''
		}
	}

	componentDidMount(){
		State.getDicOptions();
	}


	changeCompany=(item)=>{
		this.setState({
			companyId: item.id
		})
	}
	




	render() {
		// let {
		// 	getDoorPermissionListParams,
		// 	itemDetail
		// } = this.state;
		let {companyId} = this.state;
		// let groupLevelOptions = State.groupLevelOptions;
		let memberDetailInfo = {},granteeId='',doorTypeOptions=[];
		return (
		    <div className="door-permission-manage  search-company-permmision" style={{width:"100%",minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="门禁权限管理"/>
				<Section title={`查询客户权限`} description="" >
					<SearchGroupForm  changeCompany={this.changeCompany}/>
					<AuthorizationEquipment memberDetailInfo={memberDetailInfo} granteeId={companyId} doorTypeOptions={doorTypeOptions} granteeType="CUSTOMER" companyId={companyId}/> 
				</Section>
			</div>
		);

	}

}
