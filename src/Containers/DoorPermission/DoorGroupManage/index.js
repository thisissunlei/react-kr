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


import NewCreateDoorGroup from './NewCreateDoorGroup';
import EditDoorGroup from './EditDoorGroup';
import SearchGroupForm from './SearchGroupForm';
import DeleteGroupDialog from './DeleteGroupDialog';
import ChangeMember from './ChangeMember';
import ChangeEquipment from './ChangeEquipment';
import DoorGroupList from './DoorGroupList';


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

	}

	

	componentWillUnmount(){

		State.openNewCreateDoorGroup =false;
		State.openChangeEquipmentDialog =false;
		State.openChangeMemeberDialog = false;
		State.openNewCreateDoorGroup =false;
		State.openEditDoorGroup=false;
		State.openDeleteGroup = false;
		
		
	}
	



	render() {
		
		return (
		    <div className="door-permission-manage" style={{minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<DoorGroupList/>
			</div>
		);

	}

}
