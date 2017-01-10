
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

	componentDidMount(){

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

          var Configs = {
            width:0,
            height:0,
						stations:stations,
						backgroundImage: 'http://optest02.krspace.cn'+data.bgfilepath
          };

					/*
          var pageWidth = window.innerWidth;
          var pageHeight = window.innerHeight;

          if(typeof pageWidth !== 'number'){

            if(document.compatMode == 'CSS1Compat'){
              pageWidth = document.documentElement.clientWidth;
              pageHeight = document.documentElement.clientHeight;
            }else{
              pageWidth = document.body.clientWidth;
              pageHeight = document.body.clientHeight;
            }
          }

          Configs.width = pageWidth;
          Configs.height = pageHeight;
					*/
					var Plugins = {};

          var planMap = new PlanMap('planMapCanvas',Configs,Plugins);

	}).catch(function(error){

	});

	}

	constructor(props){
		super(props);

	}

	componentWillReceiveProps(nextProps) {

	}

	render() {

		return (
			<canvas id="planMapCanvas"></canvas>
		);
	}
}
