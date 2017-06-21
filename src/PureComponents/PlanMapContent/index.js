
import React from 'react';

import {Http,DateFormat,Map} from 'kr/Utils';
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
			selectedObjs:this.props.data.selectedObjs||[],
			deleteArr:[],
			isOperation:true,
		}
		this.getData();
	}
	getData = () =>{
		var _this = this;
		let {data} = this.props;
		console.log(this.props.data.selectedObjs,"????")
		let selectedObjs = this.props.data.selectedObjs||[];
		
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
			var allDataObj = {};
			
			arr = response.map(function(item,index){
				var allData = [];
				floors.push({value:""+item.floor,label:""+item.floor});
				name = item.communityName;
				item.figures.map(function(eveItem,eveIndex){
					
					for(let j=0; j<selectedObjs.length;j++){
							let belongType = "STATION";
							if(selectedObjs[j].belongType == 2){
								belongType = "SPACE";
							}
							
							if(eveItem.belongId ==selectedObjs[j].id && eveItem.belongType == belongType){
								var obj = {};
								obj.name = eveItem.cellName;
								obj.whereFloor = eveItem.floor;
								obj.belongType = eveItem.belongType;
								obj.belongId = Number(eveItem.belongId);
								allData.push(obj);
							}

						}
						if(selectedObjs.length == 0 && eveItem.status && eveItem.status == 3){
							var obj = {};
								obj.name = eveItem.cellName;
								obj.whereFloor = eveItem.floor;
								obj.belongType = eveItem.belongType;
								obj.belongId = Number(eveItem.belongId);
								allData.push(obj);
						}
				})

				allDataObj["a"+item.floor] = [].concat(allData);
				
			})

			_this.setState({
				data:response,
				otherData:{
					floors:floors,
					name:name
				},
				newfloor:floors[0].value,
				submitData:allDataObj
			},function(){
				 _this.canvasEles();
			})


		}).catch(function(err) {

		});
	}

	componentDidMount(){

	}


	componentWillUnmount(){
		//  
	}
	dataChange = (data,allData) =>{

		const {selectedObjs,newfloor,submitData,deleteArr} = this.state;
		let del = [].concat(selectedObjs);
		var allDataObj = Object.assign({},submitData);
		var delDataObj = Object.assign({},deleteArr)
		for(let i=0;i<allData.length;i++){

			for(let j=0;j<del.length;j++){
				
				let belongType = "STATION"
				if(del[j].belongType == 2){
					belongType = "SPACE";
				}
				if(allData[i].belongId ==del[j].id && allData[i].belongType == belongType ){
					del.splice(j, 1);
					
				}	
			}
		}
		allDataObj["a"+newfloor] = [].concat(allData);
		delDataObj["a"+newfloor] = [].concat(del);
		
		this.setState({
			submitData:allDataObj,
			deleteArr:delDataObj,
			isOperation:false,
		})
	}




	canvasEles = () =>{
		const {data,newfloor,selectedObjs,inputStart,inputEnd} = this.state;
		const _this = this;
		var dainitializeConfigs = {};
		let start = Number(inputStart);
		let end = Number(inputEnd);
		
		for(let i=0; i<data.length;i++){
			if(data[i].floor == newfloor){
				var arr = [];
				arr = data[i].figures.map(function(item ,index){
					var obj = {};
						let cellName =  Number(item.cellName);
						var x = item.cellCoordX;
						var y = item.cellCoordY;
						obj.x = Number(x);
						obj.y = Number(y);
						obj.width = Number(item.cellWidth);
						obj.height = Number(item.cellHeight);
						obj.name = item.cellName;
						obj.whereFloor = item.floor;
						obj.belongType = item.belongType;
						obj.belongId = Number(item.belongId);
						obj.id = Number(item.id);
						obj.canFigureId = item.canFigureId;
						obj.type=obj.belongType;
						if(item.status){
							obj.status=item.status;
						}
						for(let j=0; j<selectedObjs.length;j++){
							let belongType = "STATION";
							if(selectedObjs[j].belongType == 2){
								belongType = "SPACE";
							}
							if(item.belongId ==selectedObjs[j].id && item.belongType == belongType ){
								
								obj.checked = true;

							}
						}
						if(cellName >= start && cellName <= end){
							obj.checked = true;
						}

						return obj;
				})
				dainitializeConfigs = {
					stations:arr,
					scale:1,
					isMode:'select',
					plugin:{
						onCheckedStationCallback:_this.dataChange
					},
					backgroundImageUrl:"http://"+window.location.host + data[i].graphFilePath
				}
			}

		}
		this.Map =  Map("plan-map-content",dainitializeConfigs);
	}
    floorsChange = (value) =>{
		let _this = this;
		this.Map.destory();
        this.setState({
            newfloor:value,
        },function(){
			_this.canvasEles();
		})
    }
	onSubmit = (data) =>{
		var _this = this;
		
		this.setState({
			inputStart:data.inputStart,
			inputEnd:data.inputEnd,
		},function(){
			_this.canvasEles();
		})
	}


	allOnSubmit = () =>{
		let {submitData,deleteArr} =this.state;
		let {data} = this.props;
		let allData = [];
		let delData = [];
		let submitDataAll = [];
		let deleteDataArr = [];
		// submitData.map(function(item,index){
		// 	submitDataAll = submitDataAll.concat(item);
		// });
		// deleteArr.map(function(item,index){
		// 	deleteDataArr = deleteDataArr.concat(item)
		// });
		for(let i in submitData){
			submitDataAll = submitDataAll.concat(submitData[i]);
		}
		for(let i in deleteArr){
			deleteDataArr = deleteDataArr.concat(deleteArr[i]);
		}


		 
		submitDataAll.map(function(item,index){
			var obj1 = {};
			let belongType = 1;
			if( item.belongType == "SPACE"){
				belongType = 2;
			}
			obj1.id = item.belongId;
			obj1.type = belongType;
			obj1.whereFloor = item.whereFloor;
			obj1.name = item.name;
			obj1.leaseBeginDate = DateFormat(data.startDate,"yyyy-mm-dd");
			obj1.leaseEndDate =DateFormat(data.endDate,"yyyy-mm-dd");


			allData.push(obj1);
		})

		 deleteDataArr.map(function(item,index){
			let obj2 = {};
		 	obj2.id = item.id;
		 	obj2.type = item.belongType;
			obj2.whereFloor = item.whereFloor;

		 	delData.push(obj2);
		 })
		
		const {onClose} = this.props;
		

		onClose && onClose(allData,{deleteData:delData});
		this.Map.destory();
		


	}

	render() {
		const {data,otherData} = this.state;
		

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

				</div>
			</div>
		);
	}
}
