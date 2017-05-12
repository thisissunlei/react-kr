
import React from 'react';

import Canvas from './Canvas'
import {Http} from 'kr/Utils';

export default  class PlanMapComponent extends React.Component {



	constructor(props){
		super(props)
		
		this.getData();
	}
	getData = () =>{
		var res = {
				communityId:43,
				floor:[3],
				mainBillId:1570,
				startDate:'2017-05-16 00:00:00',
				endDate:'2017-05-26 00:00:00',
				contractId:''
		}
		Http.request('planMap',res).then(function(response) {
			console.log(response,">>>");
			
		}).catch(function(err) {
		
		});
	}

	componentDidMount(){
			
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {

		return (
			
			<div>
				<Canvas />
			</div>
		);
	}
}
