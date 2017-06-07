
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
			},function(){
				 _this.canvasEles();
			})


		}).catch(function(err) {

		});
	}

	componentDidMount(){

	}

	componentWillUnmount(){
		 this.Map.destory();
	}
	dataChange = (data,allData) =>{
		const {selectedObjs} = this.state;
		let del = [].concat(selectedObjs);

		for(let i=0;i<data.length;i++){

			for(let j=0;j<selectedObjs.length;j++){
				let isDel = true;
				let every = selectedObjs[j];
				let belongType = "STATION"
				if(selectedObjs[j].belongType == 2){
					belongType = "SPACE";
				}
				if(data[i].belongId ==selectedObjs[j].id && data[i].belongType == belongType ){
					del.splice(j, 1);
					isDel = false;
				}
				
			}


		}
		console.log(del,"delete",allData);
		this.setState({
			submitData:allData,
			deleteArr:del
		})
	}




	canvasEles = () =>{
		const {data,newfloor,selectedObjs} = this.state;
		const _this = this;
		var dainitializeConfigs = {};

		for(let i=0; i<data.length;i++){
			if(data[i].floor == newfloor){
				var arr = [];
				arr = data[i].figures.map(function(item ,index){
					var obj = {};
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

						return obj;
				})
				dainitializeConfigs = {
					stations:arr,
					scale:1,
					isMode:'select',
					plugin:{
						onCheckedStationCallback:_this.dataChange
					},
					backgroundImageUrl:"http://optest.krspace.cn" + data[i].graphFilePath
				}
			}
		}
		this.Map =  Map("plan-map-content",dainitializeConfigs);
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

		 deleteArr.map(function(item,index){
			let obj2 = {};
		 	obj2.id = item.id;
		 	obj2.type = item.type;
			obj2.whereFloor = item.whereFloor;

		 	delData.push(obj2);
		 })
		
		const {onClose} = this.props;
		

		onClose && onClose(allData,{deleteData:delData});



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
