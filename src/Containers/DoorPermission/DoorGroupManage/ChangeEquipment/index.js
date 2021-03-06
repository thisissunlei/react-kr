



import {Http} from 'kr/Utils';
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Message,Section,Button,Drawer,Dialog,DialogInner
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

	refreshAuthoriazationEquipmentList=(param)=>{

		let {freshGroupEquipment} = this.state;
		this.setState({
			freshGroupEquipment: !freshGroupEquipment
		})
		if(param && param == true){
			this.openAddEquipmentDialogFun()
		}
	}

	openAddEquipmentDialogFun=()=>{
		State.openAddEquipmentDialog = !State.openAddEquipmentDialog;
	}



	
	render(){
		let {itemDetail}  = this.props;
		let {freshGroupEquipment} = this.state;
		let doorTypeOptions=State.doorTypeOptions;
		let titleText =  "组授权设备 | 组名称："+itemDetail.name ;
		return (
			<div className="change-member">
				<div style={{width:"100%",height:30}}>
					<img src={closeImg} style={{float:"right",width:30,cursor:"pointer"}} onClick={this.closeChangeMember}/>
				</div>
				<div style={{width:"100%"}}>

					
					
					<div className="change-member-item">
						<Section title={titleText} description="" >
							<div style={{    float: "right", marginTop: "-60px"}}>
								{itemDetail.groupLevel=="NORMAL" && <Button label="添加设备"  onTouchTap={this.openAddEquipmentDialogFun} className="button-list"/>
								}							
							</div>
							<AuthorizationEquipment memberDetailInfo={itemDetail} doorTypeOptions={doorTypeOptions} granteeId={itemDetail.id} granteeType="USER_GROUP" noShowAddNew={true} freshGroupEquipment={freshGroupEquipment}/> 
							<DialogInner 
								title="设备列表"
								open={State.openAddEquipmentDialog}
								onClose = {this.openAddEquipmentDialogFun}
								bodyStyle={{overflow:"scroll",maxHeight:600}}
								noMaxHeight = {true}
								contentStyle={{width:1016,maxHeight:750}}
							>	
								<div  className="all-equipment-box">
									
									<AllEquipmentListSearch memberDetailInfo={itemDetail} granteeType="USER_GROUP" refreshPage={this.freshGroupEquipment} doorTypeOptions={doorTypeOptions} refreshAuthoriazationEquipmentList={this.refreshAuthoriazationEquipmentList}/>
								</div>
							</DialogInner>
						</Section>
					</div>
					
					
				</div>

		  	</div>
		);
	}
}


