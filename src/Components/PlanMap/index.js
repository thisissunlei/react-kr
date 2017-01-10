
import React from 'react';

import PlanMap from './Lib/PlanMap';

import {
	Actions,
	Store
} from 'kr/Redux';

export default  class PlanMapComponent extends React.Component {

	static displayName = 'PlanMapComponent';

	static defaultPorps = {
		value:'',
	}

	static propTypes = {
				name: React.PropTypes.string,
	}


	constructor(props){
		super(props)


		this.state = {
				configs:{}
		}

	}

	drawCanvas = ()=>{
		var configs = this.state.configs;
		var planMap = new PlanMap('planMapCanvas',configs);
	}

	initializeStyle = ()=>{
		var planMapWrap = this.refs.planMapWrap;

		var loc = planMapWrap.getBoundingClientRect();
		console.log('loc',loc);
		var configs = this.state.configs;
		configs.width = loc.width;
		configs.height = 500;

		this.setState({
			configs
		},function(){
			this.drawCanvas();
		});

	}


	getBasicInfo = ()=>{

		var _this = this;

	 	Store.dispatch(Actions.callAPI('planMap')).then(function(response){
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
				console.log('----')
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
