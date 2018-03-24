



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

import GroupEquipment from './GroupEquipment';
import AllEquipmentListSearch from '../../MemberDoorPermmision/AuthorizationEquipment/AllEquipmentListSearch';

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
			freshGroupEquipment : false
		}
		
	}



	componentDidMount(){

	}

	closeChangeMember=()=>{
		let {closeChangeMember} = this.props;
		closeChangeMember && closeChangeMember();
	}

	freshGroupEquipment=()=>{
		console.log("刷新组内设备===>");
		let {freshGroupEquipment} = this.state;
		this.setState({
			freshGroupEquipment: !freshGroupEquipment
		})
	}


	
	render(){
		let {itemDetail}  = this.props;
		let {freshGroupEquipment} = this.state;
		return (
			<div className="change-member">
				<div style={{width:"100%",height:30}}>
					<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.closeChangeMember}/>
				</div>
				<div style={{width:"100%"}}>
					<div className="change-member-item">
						<GroupEquipment groupItemDetail={itemDetail} freshGroupEquipment={freshGroupEquipment}/>
					</div>
					<div className="change-member-item">
						{/* <AllEquipmentManage groupItemDetail={itemDetail} refreshEquipmentInGroupList={this.freshGroupEquipment}/> */}
						<AllEquipmentListSearch memberDetailInfo={itemDetail} granteeType="USER_GROUP"/>

					</div>
					
				</div>

		  	</div>
		);
	}
}


