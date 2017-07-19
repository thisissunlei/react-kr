import React from 'react';
import {	
	TabC,
	TabCs
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import PersonalInfo from './PersonalInfo';
import WorkInfo from './WorkInfo';
import './index.less';

export default class PeopleDetail  extends React.Component{

	constructor(props,context){
		super(props, context);
	}



	render(){

		return(

			<div className='people-detail'>
			  <div className='detail-left'>
				<div className='left-pic'>
					pic
				</div>
				<div className='left-text'>
					123
				</div>
			  </div>
			  <div className='detail-right'>
				  <TabCs
			      >
				  <TabC label='基本信息'> 
					  <BasicInfo />
				  </TabC> 
				  
				  <TabC label='个人信息'> 
					  <PersonalInfo />
				  </TabC> 

				  <TabC label='工作信息'> 
					  <WorkInfo />
				  </TabC> 
			  </TabCs>
			    
			  </div>
			</div>
		);
	}
}
