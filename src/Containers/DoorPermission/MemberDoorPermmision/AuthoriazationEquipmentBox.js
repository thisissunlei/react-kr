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

import MemberInfo from './MemberInfo';
import AuthorizationEquipment from './AuthorizationEquipment';
import BelongOfDoorGroupList from './BelongOfDoorGroupList';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class MemberDoorPermissionManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		}
	}

	

	componentDidMount(){

	}
	


	render() {
		let {
            memberDetailInfo,deviceId
		} = this.props;
        let doorTypeOptions = State.doorTypeOptions;
        var title = "已授权的设备";
		return (
		    <div className="authoriazation-equipment-box" >
                <Section title={title} description="" >
				   {memberDetailInfo.accountInfo &&
				    <AuthorizationEquipment deviceId={deviceId} memberDetailInfo={memberDetailInfo} granteeId={memberDetailInfo.accountInfo.uid} doorTypeOptions={doorTypeOptions} granteeType="USER"/> 
					}
                </Section>
			</div>
		);

	}

}
