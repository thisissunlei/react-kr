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
			
		}
	}

	componentDidMount(){
		State.getDicOptions();
	}
	




	render() {
		// let {
		// 	getDoorPermissionListParams,
		// 	itemDetail
		// } = this.state;
		// let groupLevelOptions = State.groupLevelOptions;
		let memberDetailInfo = {},granteeId='',doorTypeOptions=[];
		return (
		    <div className="door-permission-manage  search-company-permmision" style={{minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="门禁权限管理"/>
				<Section title={`查询客户权限`} description="" >
					<SearchGroupForm/>
					<AuthorizationEquipment memberDetailInfo={memberDetailInfo} granteeId={memberDetailInfo.uid} doorTypeOptions={doorTypeOptions} granteeType="USER"/> 
				</Section>
			</div>
		);

	}

}
