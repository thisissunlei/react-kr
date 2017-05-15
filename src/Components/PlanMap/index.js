
import React from 'react';

import Canvas from './Canvas'
import {Http} from 'kr/Utils';

export default  class PlanMapComponent extends React.Component {



	constructor(props){
		super(props)
		this.state = {
			data:""
		}
		this.getData();
	}
	getData = () =>{
		var _this = this;
		var res = {
				communityId:1,
				floor:3,
				mainBillId:1473,
				startDate:'2017-05-29 00:00:00',
				endDate:'2017-05-31 00:00:00',
				contractId:''
		}
		Http.request('planMap',res).then(function(response) {
			
			_this.setState({
				data:response[0]
			})
			
		}).catch(function(err) {
		
		});
	}

	componentDidMount(){
			
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		const {data} = this.state;
		if(!data){
			return null;
		}
		return (
			
			<div>
				<span>{data.communityName}</span>
				<span>{data.floor}</span>
				<Canvas data = {data.figures}/>
			</div>
		);
	}
}
