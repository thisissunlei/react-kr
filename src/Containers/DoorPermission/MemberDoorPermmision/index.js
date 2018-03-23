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
			memberDetailInfo : {}
		}
	}

	componentDidMount(){
        State.getDicOptions();
        this.getMemberDetail();
    }

    getMemberDetail=()=>{
        let memberId=this.props.params.memberId;
        console.log("memberId",memberId); 
        let that = this;       
        Http.request('get-member-detail',{id:memberId}).then(function(response) {

            that.setState({
                memberDetailInfo : response
            })
            
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    


	render() {
		let {
            memberDetailInfo
		} = this.state;
		let groupLevelOptions = State.groupLevelOptions;
		return (
		    <div className="member-door-permmision" >
				<Title value="个人门禁权限"/>
				<Section title={`个人门禁权限`} description="" >
					
                    <MemberInfo memberDetailInfo={memberDetailInfo}/>
                    <BelongOfDoorGroupList memberDetailInfo={memberDetailInfo}/>
                    <AuthorizationEquipment memberDetailInfo={memberDetailInfo}/> 
					
				</Section>
			</div>
		);

	}

}
