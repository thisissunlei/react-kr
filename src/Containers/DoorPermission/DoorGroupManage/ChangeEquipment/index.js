



import {Http} from 'kr/Utils';
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Message,Section,Button,Drawer
} from 'kr-ui';
import './index.less';

import closeImg from './images/close.svg';


import AuthorizationEquipment from '../../MemberDoorPermmision/AuthorizationEquipment';
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

	refreshAuthoriazationEquipmentList=()=>{

		let {freshGroupEquipment} = this.state;
		this.setState({
			freshGroupEquipment: !freshGroupEquipment
		})
	}

	openAddEquipmentDialogFun=()=>{
		State.openAddEquipmentDialog = !State.openAddEquipmentDialog;
	}



	
	render(){
		let {itemDetail}  = this.props;
		let {freshGroupEquipment} = this.state;
		let doorTypeOptions=State.doorTypeOptions;
		console.log("itemDetail",itemDetail);
		let titleText =  "组授权设备 | 组名称："+itemDetail.name 
		return (
			<div className="change-member">
				<div style={{width:"100%",height:30}}>
					<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.closeChangeMember}/>
				</div>
				<div style={{width:"100%"}}>

					
					
					<div className="change-member-item">
						<Section title={titleText} description="" >
							<div style={{    float: "right", marginTop: "-60px"}}>
								<Button label="添加设备"  onTouchTap={this.openAddEquipmentDialogFun} className="button-list"/>
							</div>
							<AuthorizationEquipment memberDetailInfo={itemDetail} doorTypeOptions={doorTypeOptions} granteeId={itemDetail.id} granteeType="USER_GROUP" noShowAddNew={true} freshGroupEquipment={freshGroupEquipment}/> 
							<Drawer 
								open={State.openAddEquipmentDialog}
								onClose = {this.openAddEquipmentDialogFun}
								width={"70%"} 
								openSecondary={true} 
							>	
								<div style={{padding:40}}>
									<div style={{width:"100%",height:30}}>
										<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.openAddEquipmentDialogFun}/>
									</div>
									<AllEquipmentListSearch memberDetailInfo={itemDetail} granteeType="USER_GROUP" refreshPage={this.freshGroupEquipment} doorTypeOptions={doorTypeOptions} refreshAuthoriazationEquipmentList={this.refreshAuthoriazationEquipmentList}/>
								</div>
							</Drawer>
						</Section>
					</div>
					
					
				</div>

		  	</div>
		);
	}
}


