import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Notify,
	Button,
	BreadCrumbs,
} from 'kr-ui';

import Schedule from './Schedule';
import FloorPlan from './FloorPlan';

export default  class CommunityManage extends Component {

	constructor(props,context){
		super(props, context);
		
		
	}

	componentDidMount(){

	}
	

	


  render() {

    return (

		 <div>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
			<Section title="计划表" description=""> 
				 <Tabs>
					<Tab label="计划表" >
						<Schedule />
					</Tab>
					<Tab label="平面图" >
					   <FloorPlan />
					</Tab>
			</Tabs>

			</Section>
			
			
			
		</div>
	);
  }
}





