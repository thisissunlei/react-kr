import React from 'react';
import {	
	
} from 'kr-ui';
import BasicInfo from './BasicInfo';
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
			  </div>
			</div>
		);
	}

}
