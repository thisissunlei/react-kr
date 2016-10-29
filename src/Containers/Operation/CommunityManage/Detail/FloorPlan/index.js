import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
	IframeContent,
} from 'kr-ui';


export default  class FloorPlan extends Component {

	constructor(props,context){
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);

	}

	 componentDidMount(){

	 }

	 getStationUrl(){

	     let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		// stationVos = stationVos.map(function(item){
		// 	var obj = {};
		// 	obj.id = item.stationId;
		// 	obj.type = item.stationType;
		// 	return obj;
		// });

		let params = {
			communityId:1,
			wherefloor:3,
			date:'2016-10-10',
			dateend:'2016-10-10',
		};

		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		return url ;
	}


  render() {

    return (

		 <div>
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>

		</div>
	);
  }
}









