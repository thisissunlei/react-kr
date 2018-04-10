



import {Http} from 'kr/Utils';
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Message,
} from 'kr-ui';
import './index.less';

import closeImg from './images/close.svg';

import GroupMember from './GroupMember';
import AllMemberManage from './AllMemberManage';
import {
	Toggle
}from 'material-ui';

import State from '../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class ChangeMember extends React.Component{
	constructor(props){
		super(props);
		this.state={
			toggleChoosed: false
		}
		
	}



	componentDidMount(){
		this.getToggleChoosed();
	}

	getToggleChoosed=()=>{
		let {itemDetail} = this.props;
		let that =this;
		Http.request('getInitailToogleAddToCompanyTeamAuto',{id:itemDetail.id}).then(function(response) {
			that.setState({
				toggleChoosed : response.autoAddUser
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	closeChangeMember=()=>{
		let {closeChangeMember} = this.props;
		closeChangeMember && closeChangeMember();
	}

	freshGroupMemberList=()=>{
		let {freshGroupMemberList} = this.state;
		this.setState({
			freshGroupMemberList : !freshGroupMemberList
		})
	}

	changeAutoAddMemberToCompanyTeam=(event,isInputChecked)=>{
		let {itemDetail}= this.props;
		this.setState({
			toggleChoosed : isInputChecked
		})
		Http.request('changeToogleAddToCompanyTeamAuto',{},{id:itemDetail.id,autoAddUser:isInputChecked}).then(function(response) {
			
		}).catch(function(err) {
			Message.error(err.message);
		});

	}

	
	render(){
		let {itemDetail}  = this.props;
		let {freshGroupMemberList,toggleChoosed} = this.state;
		return (
			<div className="change-member">
				<div style={{width:"100%",height:30}}>
					<div style={{float:"left",marginLeft:10}}>
						{	itemDetail.groupLevel=="CUSTOMER" &&
							<Toggle 
								toggled={toggleChoosed} 
								label="新增员工是否自动加入客户默认组" 
								labelPosition="right"
								labelStyle={{fontSize:14,width:220,marginTop:5}} 
								onToggle={this.changeAutoAddMemberToCompanyTeam}
								trackStyle={{height:25,lineHeight:25}}
								trackSwitchedStyle={{backgroundColor:"red"}}
								thumbStyle={{marginTop:5}}
							/>
						
					
						}
					</div>
					<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.closeChangeMember}/>
				</div>
				<div style={{width:"100%"}}>
				
					<div className="change-member-item group-member-list">

						<GroupMember groupItemDetail={itemDetail} freshGroupMemberList={freshGroupMemberList}/>
					</div>
					
				</div>

		  	</div>
		);
	}
}


