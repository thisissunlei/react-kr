import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Notify from '../../Notify';
import ReactDOM from 'react-dom';
import './index.less';
import refresh from "./images/location.svg";
import {Actions,Store} from 'kr/Redux';
import WrapComponent from '../WrapComponent';



export default class MapComponent extends Component {
	static defaultProps = {
		
	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			pointLng : 116.404,
			pointLat : 39.915,
			// 是否显示
			showMap : false,
			searchText : ''
		};
	}
	componentWillUnmount() {
		
	}
	componentDidMount() {
		// 百度地图API功能
		let _this = this;
		_this.map = new BMap.Map("mapcomponent"); 

		let {initailPoint} =this.props;
		if(initailPoint){
			_this.setMarker(initailPoint);	
		}else{
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);
		
			_this.map.centerAndZoom(point, 11);
			var marker = new BMap.Marker(point);        // 创建标注    
			_this.map.addOverlay(marker);
			// map可缩放
			_this.map.enableScrollWheelZoom();
			// marker可拖拽
			marker.enableDragging();    
			marker.addEventListener("dragend", function(e){    
			 	_this.setState({
			 		pointLng : e.point.lng,
					pointLat : e.point.lat
			 	},function(){
			 		_this.onChange();
			 	});

			});
		}
		
	}
	// 输入文字
	inputLocation=()=>{
		let _this = this;
		var inputValue = this.refs.mapInput.value;
		if(!inputValue){
			let {initailPoint} =_this.props;
			console.log("initailPoint",initailPoint);
			_this.setMarker(initailPoint);
			
		}else{
			_this.setMarker(inputValue);
		}
			 		
	}
	onChange=()=>{
		// console.log("this.state",this.state);
		const {input}=this.props;
		input.onChange(this.state);
	}
	// 搜索定位
	setMarker=(searchValue)=>{

		let _this =this;

		_this.setState({
			searchText : searchValue
		},function(){
			_this.onChange();
		})
		var options = {      
		      onSearchComplete: function(results){  
					_this.map.clearOverlays();  

		          	if (local.getStatus() == BMAP_STATUS_SUCCESS){ 

		             	_this.setState({
		             		pointLng : results.getPoi(0).point.lng,
							pointLat : results.getPoi(0).point.lat
		             	},function(){

		             		var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);    
							var marker = new BMap.Marker(point);        // 创建标注
							   //移动到搜索的地址 
							_this.map.panTo(new BMap.Point(_this.state.pointLng, _this.state.pointLat), 15); 
							// 增加覆盖物
							_this.map.addOverlay(marker);
							// 标注，，，可拖拽
							marker.enableDragging();
							marker.addEventListener("dragend", function(e){    
							 	_this.setState({
							 		pointLng : e.point.lng,
									pointLat : e.point.lat
							 	},function(){
							 		_this.onChange();
							 	})
							}) ;
							// map可拖拽
							_this.map.enableDragging();
							// map可缩放
							_this.map.enableScrollWheelZoom();
							
		             	})     
		          	}    
		      }      
		};      
		var local = new BMap.LocalSearch(_this.map, options);      
		local.search(searchValue);
	}
	// 是否显示地图
	showMap=()=>{
		this.setState({
			showMap : !this.state.showMap
		},function(){
			// 百度地图API功能
			let _this = this;
			
			_this.map = new BMap.Map("mapcomponent"); 
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);
		
			_this.map.centerAndZoom(point, 11);
			var marker = new BMap.Marker(point);        // 创建标注    
			_this.map.addOverlay(marker);
			// map可缩放
			_this.map.enableScrollWheelZoom();
			// marker可拖拽
			marker.enableDragging();    
			marker.addEventListener("dragend", function(e){    
			 	_this.setState({
			 		pointLng : e.point.lng,
					pointLat : e.point.lat
			 	},function(){
			 		_this.onChange();
			 	});

			});
		})
	}
	render() {
		let {placeholder,style,mapStyle,...other} = this.props;
		let {showMap} =this.state;
		let mapInnerStyle = {};
		var newObj = {};
		if(this.state.showMap){
			newObj.display = "block";

		}else{
			newObj.display = "none";
		}
		Object.assign(mapInnerStyle,mapStyle,newObj);
		
		return(
      		<div className="ui-map-component" style={style}>
				<img src={require('./images/location.svg')} className="ui-map-img" onClick={this.showMap}/>

				<input type="text" placeholder={placeholder} style={{width:"100%",height:"100%",paddingLeft:10,boxSizing:"border-box"}} onChange={this.inputLocation} ref="mapInput"/>
				<div id="mapcomponent" style={mapInnerStyle}></div>
			</div>
      	
		);
	}
}
