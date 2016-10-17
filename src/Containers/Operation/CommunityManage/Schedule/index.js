import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	TabItem,
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
} from 'kr-ui';

import ScheduleDetail from './ScheduleDetail';
import FloorPlan from './FloorPlan';

export default  class Schedule extends Component {

	constructor(props,context){
		super(props, context);

	}

	 componentDidMount(){

		 /*
		Store.dispatch(Actions.callAPI('fina-contract-intention',{customerId:params.customerId,mainBillId:params.orderId,communityId:1})).then(function(response){

		}).catch(function(err){

	   	});
		 */
	 }


  render() {

    return (

		 <div>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
			<Section title="计划表" description=""> 

				<Tabs>
					<TabItem>计划表</TabItem>
					<TabItem>平面图</TabItem>
				</Tabs>

			</Section>
		</div>
	);
  }
}





