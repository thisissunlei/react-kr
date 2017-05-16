
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
			newfloor:'',
			inputStart:0,
			inputEnd:0,
			submitData:[],
		}
		this.getData();
	}
	getData = () =>{
		var _this = this;
		let {data} = this.props;
		if(!data){
			return;
		}
		var res = {
				communityId:data.communityId,
				floor:data.floors,
				mainBillId:data.mainBillId,
				startDate:data.startDate,
				endDate:data.endDate,
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
	dataChange = (data) =>{
		this.setState({
			submitData:data
		})
	}
	canvasEles = () =>{
		let {data,newfloor,inputStart,inputEnd} = this.state;
		const _this = this;
		var arr = data.map(function(item,index){

			if(item.floor == newfloor){

				return <Canvas 
							key = {index} 
							inputStart = {inputStart} 
							inputEnd = {inputEnd} 
							id = {index} 
							data = {item.figures} 
							url = {item.graphFilePath}
							dataChange = {_this.dataChange}
						/>
			}
		})
	 	return arr;
	}
    floorsChange = (value) =>{
        this.setState({
            newfloor:value,
        })
    }
	onSubmit = (data) =>{
		this.setState({
			inputStart:data.inputStart,
			inputEnd:data.inputEnd
		})
	}

	
	allOnsubmit = () =>{
		let {submitData} =this.state;
		const {onClose} = this.props;
		onClose && onClose(submitData);

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
						onSubmit = {this.onSubmit}
						allOnsubmit = {this.allOnsubmit}
                    />

				</div>
				<div id = "plan-map-content"  style = {{width:"100%",overflow:'scroll',height:500}}>
					{this.canvasEles()}
				</div>
			</div>
		);
	}
}
