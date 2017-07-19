import React from 'react';
import {	
	
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
			  <div className='detail-left'>left</div>
			  <div className='detail-right'>
			     <BasicInfo />
				 {/*<PersonalInfo />*/}
                 {/*<WorkInfo />*/}
			  </div>
			</div>
		);
	}
}
