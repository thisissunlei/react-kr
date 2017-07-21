import React from 'react';
import {	
	TabC,
	TabCs,
} from 'kr-ui';
import {Http} from 'kr/Utils';
import BasicInfo from './BasicInfo';
import PersonalInfo from './PersonalInfo';
import WorkInfo from './WorkInfo';
import './index.less';
import UserImage from './UserImage';

export default class PeopleDetail  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			personId:this.props.params.personId,
		}
	}
   	

	render(){

		let {personId}=this.state;

		return(

			<div className='people-detail'>
			  <div className='detail-left'>
				<div className='left-pic'>

					<UserImage />
				</div>
				<div className='left-text'>
					张屈
					<div className = "left-intro">
						<span>水电费防守打法</span>
						<lable>水电费防守打法</lable>
					</div>
				</div>
			  </div>
			  <div className='detail-right'>
				  <TabCs
			      >
				  <TabC label='基本信息'> 
					  <BasicInfo
					    personId={personId} 
					  />
				  </TabC> 
				  
				  <TabC label='个人信息'> 
					  <PersonalInfo 
					    personId={personId} 
					  />
				  </TabC> 

				  <TabC label='工作信息'> 
					  <WorkInfo 
					   personId={personId} 
					  />
				  </TabC> 
			  </TabCs>
			    
			  </div>
			</div>
		);
	}
}
