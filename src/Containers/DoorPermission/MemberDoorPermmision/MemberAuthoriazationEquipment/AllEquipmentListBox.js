import React from 'react';
import {
	Section,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import close from '../images/close.svg';

import AllEquipmentListSearch from './AllEquipmentListSearch';


import State from './State';
import PropsState from '../State';

import {
	observer,
	inject
} from 'mobx-react';
@observer


export default class AllEquipmentListBox extends React.Component {

	constructor(props, context) {
        super(props, context);
        
		this.state = {
         
		}
    }
    
    closeAddAuthoriazation=()=>{
        State.openNewCreateAuthoriazation = !State.openNewCreateAuthoriazation;
	}
	

	refreshAuthoriazationEquipmentList=()=>{
		
		let {refreshAuthoriazationEquipmentList} = this.props;
		refreshAuthoriazationEquipmentList && refreshAuthoriazationEquipmentList();
	}


	render() {
        let {memberDetailInfo,doorTypeOptions,granteeType} = this.props;
		return (
		    <div className="can-operate-equipment">
                <div style={{width:"100%",height:30,boxSizing: "border-box"}}>
                    <img src={close} style={{dispaly:"inline-block",verticalAlign:"top",width:30,float:"right",cursor:"pointer"}} onClick={this.closeAddAuthoriazation}/>
                </div>
               	<AllEquipmentListSearch memberDetailInfo={memberDetailInfo} granteeType={granteeType} refreshAuthoriazationEquipmentList={this.refreshAuthoriazationEquipmentList} doorTypeOptions={doorTypeOptions}/>
			</div>
		);

	}

}