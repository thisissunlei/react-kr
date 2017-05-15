
import React from 'react';

import {Http} from 'kr/Utils';
import {
	KrField,
	Canvas
} from 'kr-ui';
import PlanMapSerarchForm from './PlanMapSerarchForm'
import './index.less';

export default  class PlanMapComponent extends React.Component {



	constructor(props){
		super(props)
		this.state = {
			data:"",
			imgW:"",
			imgH:"",
			otherData:{
				name:'',
				floors:[],
			},
			newfloor:''
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
			let floors = [];
			let name = ""
			response.map(function(item,index){
				floors.push({value:""+item.floor,label:""+item.floor});
				name = item.communityName;
			})
			
			_this.setState({
				data:response,
				otherData:{
					floors:floors,
					name:name
				},
				newfloor:floors[0].value,
			})
			
		}).catch(function(err) {
		
		});
	}

	componentDidMount(){
		
	}

	componentWillReceiveProps(nextProps) {

	}
	canvasEles = () =>{
		let {data,newfloor} = this.state;
		var arr = data.map(function(item,index){
			
			if(item.floor == newfloor){
				
				return <Canvas key = {index} id = {index} data = {item.figures} url = {item.graphFilePath}/>
			}
		})
	 	return arr;
	} 
    floorsChange = (value) =>{
        this.setState({
            newfloor:value,
        })
    }

	render() {
		const {data,otherData} = this.state;
		if(!data){
			return null;
		}
		return (
			
			<div className = "plan-map-content">
				<div className = "plan-map-title" style = {{background:"#fff"}}>
				    <PlanMapSerarchForm 
                        data = {otherData} 
                        floorsChange = {this.floorsChange}
                    />
					
				</div>
				{this.canvasEles()}
			</div>
		);
	}
}