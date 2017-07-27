import React, { PropTypes } from 'react'; 
import {
	Actions,
	Store
} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	Tabs,
	Tab,
	Title,
	Message
} from 'kr-ui';
//在职
import InService from './InService';
//离职
import Leave from './Leave';

class PersonalManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'inservice',
        }
	}
   
   inServiceClick=()=>{
      this.setState({
         tab:'inservice' 
      })
   }
 

   leaveClick=()=>{
       this.setState({
         tab:'leave' 
      })
   }


	render() {
		
        let {
			tab,
		} = this.state;


		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee",
			fontSize:'16px'
		}
		const commenTab = {
			color: '#666',
			borderBottom: "1px solid #eee",
            fontSize:'16px'
		}


		let serviceStyle = (tab=='inservice') ? activeTab : commenTab;
		let leaveStyle = (tab == 'leave') ? activeTab : commenTab;


		return (

			<div className="tab-personal" style={{minHeight:910,background:'#fff'}}>
			       <Title value="人员管理"/>

                    <Tabs className="tabs">
                            <Tab label="在职" onActive={this.inServiceClick} style={serviceStyle}>

                                    {tab=='inservice'&&<InService
                                       
                                    />}
                            </Tab>
                            <Tab label="离职" onActive={this.leaveClick} style={leaveStyle}>

                                    {tab=='leave'&&<Leave
                                        
                                    />}
                            </Tab>
                    </Tabs>
		   </div>
		);
	}
}
export default PersonalManage;
