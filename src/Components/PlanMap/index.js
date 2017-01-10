
import React from 'react';

import PlanMap from './Lib/PlanMap';

import {
	Actions,
	Store
} from 'kr/Redux';

export default  class PlanMapComponent extends React.Component {

	static displayName = 'PlanMapComponent';

	static defaultProps = {
		communityId:4,
		wherefloor:3,
		mainBillId:521,
		startDate:'2016-12-30',
		endDate:'2016-12-31',
		contractId:''
	}

	static propTypes = {
			communityId: React.PropTypes.any,
			wherefloor: React.PropTypes.any,
			mainBillId: React.PropTypes.any,
			startDate: React.PropTypes.string,
			endDate: React.PropTypes.string,
			contractId: React.PropTypes.any,
	}


	constructor(props){
		super(props)
		this.state = {
				configs:{},
				plugns:{
					onCheckedStation:this.onCheckedStation,
					swapStationStaff:this.swapStationStaff
				}
		}

	}

	//点选工位
	onCheckedStation = (clickStation,selectedStations)=>{
			const {onCheckedStation} = this.props;
			onCheckedStation && onCheckedStation(clickStation,selectedStations);
	}
	//交换工位员工信息
	swapStationStaff = (originStation,targetStation)=>{
		console.log('---<<',originStation,targetStation);
	}

	drawCanvas = ()=>{
		const {configs,plugns} = this.state;
		var planMap = new PlanMap('planMapCanvas',configs,plugns);
	}

	initializeStyle = ()=>{
		var planMapWrap = this.refs.planMapWrap;

		var loc = planMapWrap.getBoundingClientRect();
		var configs = this.state.configs;
		configs.width = loc.width;
		configs.height = 800;

		this.setState({
			configs
		},function(){
			this.drawCanvas();
		});

	}


	getBasicInfo = ()=>{

		var _this = this;
	 	Store.dispatch(Actions.callAPI('planMap',Object.assign({},this.props))).then(function(response){
	           var data  = response.shift();
	          var stationsDataOrigin = data.figures;
	          var stations = [];
	          stations = stationsDataOrigin.map(function(item,index){
	            var obj = {};
	            var cellcoord = item.cellcoord;
	            cellcoord = cellcoord.split(',');
	            var x  = cellcoord.shift().split(':').pop();
	            var y  = cellcoord.pop().split(':').pop();

	            obj.x = x;
	            obj.y = y;

	            obj.width = item.cellwidth;
	            obj.height = item.cellheight;
	            obj.name = item.cellname;
	            obj.basic = {
	              name:item.cellname,
	              id:'yay'
	            };
	            return obj;
	          });

	          var configs = {
	            width:0,
	            height:0,
							stations:stations,
							backgroundImage: 'http://optest02.krspace.cn'+data.bgfilepath
	          };
					_this.setState({configs},function(){
						this.initializeStyle();
					});
		}).catch(function(error){

		});
	}

	componentDidMount(){
			this.getBasicInfo();
			window.addEventListener("resize",function(){
				//this.initializeStyle();
			},false);
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {

		return (
			<div ref="planMapWrap">
				<canvas id="planMapCanvas"></canvas>
			</div>
		);
	}
}
