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
import AuthoriazationEquipmentBox from './AuthoriazationEquipmentBox';
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
			memberDetailInfo : {},
			doorTypeOptions : [],
			memberId : this.props.params.memberId
		}
	}

	

	componentDidMount(){
        this.getDicOptions();
        this.getMemberDetail();
	}
	
	getDicOptions=()=>{
		let _this =this;
		Http.request('getWarningType',{}).then(function(response) {
			var arrNew = [],doorTypeArrNew=[];
			
			if(response.DoorType){
				for (var i=0;i<response.DoorType.length;i++){
					
					doorTypeArrNew[i] = {
						label:response.DoorType[i].desc,
						value:response.DoorType[i].value
					}
				}
			}
	
			State.doorTypeOptions = doorTypeArrNew;
			_this.setState({
				doorTypeOptions : doorTypeArrNew
			})

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

    getMemberDetail=()=>{
        let memberId=this.props.params.memberId;
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
            memberDetailInfo,doorTypeOptions,memberId
		} = this.state;
		let groupLevelOptions = State.groupLevelOptions;

		
		return (
		    <div className="member-door-permmision personsal-door-permmision" >
				<Title value="个人门禁权限"/>
				{/* <Section title={`个人门禁权限`} description="" > */}

					<div className="personal-permmision-item">
                    	<MemberInfo memberDetailInfo={memberDetailInfo}/>
					</div>
					<div className="personal-permmision-item">
				   		<BelongOfDoorGroupList memberDetailInfo={memberDetailInfo} doorTypeOptions={doorTypeOptions} memberId={memberId}/>
                    </div>
					<div className="personal-permmision-item">
						<AuthoriazationEquipmentBox memberDetailInfo={memberDetailInfo} granteeId={memberId} doorTypeOptions={doorTypeOptions} granteeType="USER"/> 
					</div>
					
				{/* </Section> */}
			</div>
		);

	}

}
