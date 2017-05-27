
import React from 'react';

import {Http,DateFormat} from 'kr/Utils';
import {
	KrField,
	Canvas
} from 'kr-ui';
import PlanMapSerarchForm from './PlanMapSerarchForm'
import './index.less';

export default class PlanMapComponent extends React.Component {



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
			selectedObjs:this.props.data.selectedObjs,
			deleteArr:[]
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
				contractId:data.contractId || '',
		}

		Http.request('planMap',res).then(function(response) {
			let floors = [];
			let name = "";
			let arr = [];
			arr = response.map(function(item,index){
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
	dataChange = (floor,data,deleteData) =>{
		let {otherData,selectedObjs,deleteArr} = this.state;
		let obj = {};
		let arr = [];
		let delArr = [];
		let deldata = [];
		
		otherData.floors.map(function(item,index){
			if(floor == item.value){
				obj[floor]={
					data : data || [],
					deleteArr :  deleteData || []
				}

				arr = obj[item.value].data.concat(arr);
				delArr = obj[item.value].deleteArr.concat(delArr);
			}
			
		})

		for(let i=0;i<data.length;i++){
			for(let j=0;j<deleteArr.length;j++){
				if(deleteArr[j].belongId == data[i].belongId && deleteArr[j].belongType == data[i].belongType ){
					deleteArr.splice(j, 1);

				}
			}

		}
		selectedObjs && selectedObjs.map(function(item,index){

				if(delArr.length !=0 && delArr[0].belongId == item.id && delArr[0].belongType == item.belongType  ){

					deleteArr.push(delArr[0]);
				}

		})
		this.setState({
			submitData:arr,
			deleteArr:deleteArr
		})
	}




	canvasEles = () =>{
		let {data,newfloor,inputStart,inputEnd,selectedObjs} = this.state;
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
							selectedObjs = {selectedObjs}
							newfloor = {newfloor}
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


	allOnSubmit = () =>{
		let {submitData,deleteArr} =this.state;
		let {data} = this.props;
		let allData = [];
		let delData = [];
		submitData.map(function(item,index){
			var obj1 = {};
			obj1.id = item.belongId;
			obj1.type = item.belongType;
			obj1.whereFloor = item.floor;
			obj1.name = item.cellName;
			obj1.leaseBeginDate = DateFormat(data.startDate,"yyyy-mm-dd");
			obj1.leaseEndDate =DateFormat(data.endDate,"yyyy-mm-dd");


				allData.push(obj1);
		})
		
		 deleteArr.map(function(item,index){
			let obj2 = {};
		 	obj2.id = item.belongId;
		 	obj2.type = item.belongType;
			obj2.whereFloor = item.floor;

		 	delData.push(obj2);
		 })
		const {onClose} = this.props;
		
		onClose && onClose(allData,delData);
		


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
						allOnSubmit = {this.allOnSubmit}
                    />

				</div>
				<div id = "plan-map-content"  style = {{width:"100%",overflow:'scroll',height:500}}>
					{this.canvasEles()}
				</div>
			</div>
		);
	}
}
