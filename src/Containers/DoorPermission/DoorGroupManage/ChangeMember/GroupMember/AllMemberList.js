

import React from 'react';
import {
	Title,
	Button,
	Section,
	Dialog,
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Tooltip
} from 'kr-ui';
import warning from "./images/warning.svg";
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import AllMemberManage from '../AllMemberManage'
import closeImg from '../images/close.svg';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DeleteMemberFromGroup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
		}
	}

	componentDidMount(){
		
	}

	closeAllMemberList=()=>{
		State.openAddMemberDialog = false;
	}

	freshGroupMemberList=()=>{
		let {freshGroupMemberList} =this.props;
		freshGroupMemberList && freshGroupMemberList();
	}
	
	continueOrCloseAllMember=(propsData)=>{

		if(propsData == "close"){
			this.closeAllMemberList()
		}
	}

	render() {
		let {groupItemDetail} = this.props;
		return (
		    <div className="add-member-to-group">
			
				<AllMemberManage groupItemDetail={groupItemDetail} freshGroupMemberList={this.freshGroupMemberList} continueOrCloseAllMember={this.continueOrCloseAllMember}/>
				

			</div>
		);

	}

}

