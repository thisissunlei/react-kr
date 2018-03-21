



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
			
		}
		
	}



	componentDidMount(){

	}

	closeChangeMember=()=>{
		let {closeChangeMember} = this.props;
		closeChangeMember && closeChangeMember();
	}



	
	render(){
		let {itemDetail}  = this.props;
		return (
			<div className="change-member">
				<div style={{width:"100%",height:30}}>
					<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.closeChangeMember}/>
				</div>
				<div style={{width:"100%"}}>
					<div className="change-member-item">
						<AllMemberManage groupItemDetail={itemDetail}/>
					</div>
					<div className="change-member-item">
						<GroupMember groupItemDetail={itemDetail}/>
					</div>
				</div>

		  	</div>
		);
	}
}


