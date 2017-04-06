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
import {ShallowEqual} from 'kr/Utils';


export default class MapComponentNew extends Component {
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
			searchText : '',
			detailSearch : '',
			initialValue:{},
			changePosition:false,
			dragendMarker : false
		};
		this.mapId = 'map_'+Date.now();
	}
	componentWillUnmount() {
		
	}
	componentWillReceiveProps(nextProps){
		// 根据城市定位地图
		if(!this.state.dragendMarker &&!this.state.changePosition && !nextProps.defaultValue && nextProps.initailPoint){
				this.setMarker(nextProps.initailPoint);
		}


		//回填具体地址
		if(this.props.defaultValue){
		
			this.refs.mapInput.defaultValue = nextProps.defaultValue;
			

		}
		//经纬度
		if(nextProps.defaultPoint){
			this.setState({
				pointLng : nextProps.defaultPoint[0],
				pointLat : nextProps.defaultPoint[1],
			})
		}
	}
	componentDidMount() {
		
		// 编辑时input回显
		if(this.props.defaultValue){
			this.refs.mapInput.defaultValue = this.props.defaultValue;
		}
		// 编辑时地图定位回显
		if(this.props.defaultPoint){
			this.setState({
				pointLng : this.props.defaultPoint[0],
				pointLat : this.props.defaultPoint[1],
			})
		}

		// 百度地图API功能
		let _this = this;
		_this.map = new BMap.Map(this.mapId,{enableMapClick: false}); 
			// 对地图进行初始化
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);
			_this.map.centerAndZoom(point, 11);

			var marker = new BMap.Marker(point);        // 创建标注    
			_this.map.addOverlay(marker);
			// map可缩放
			_this.map.enableScrollWheelZoom(true);
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
		// }
		
	}
	// 输入文字
	inputLocation=()=>{

		let _this = this;
		var inputValue = this.refs.mapInput.value;
		this.setState({
			detailSearch : inputValue
		},function(){
			if(!inputValue){
				let {initailPoint} =_this.props;
				_this.setMarker(initailPoint);
				
			}else{
				_this.setMarker(inputValue);
			}
		})			 		
	}
	onChange=()=>{
		const {input}=this.props;
		input.onChange(this.state);
	}
	// 搜索定位
	setMarker=(searchValue)=>{
		let _this =this;
		_this.map.clearOverlays();
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
							var marker = new BMap.Marker(point); // 创建标注
							_this.map.centerAndZoom(point, 15);
							
							_this.map.panTo(point);

								// 增加覆盖物       
							_this.map.addOverlay(marker);
							    
							// 标注，，，可拖拽
							marker.enableDragging();
							marker.addEventListener("dragend", function(e){ 
							 	_this.setState({
							 		pointLng : e.point.lng,
									pointLat : e.point.lat,
									dragendMarker : true
							 	},function(){
									_this.map.panTo(new BMap.Point(_this.state.pointLng, _this.state.pointLat), 15); 

							 		_this.onChange();

							 	})
							}) ;
							// map可拖拽
							_this.map.enableDragging();
							// map可缩放
							_this.map.enableScrollWheelZoom(true);
							
		             	})     
		          	}    
		      }      
		};      
		var local = new BMap.LocalSearch(_this.map, options);      
		local.search(searchValue);
	}
	// 是否显示地图
	showMap=()=>{

		let _this = this;
		this.setState({
			showMap : !this.state.showMap
		},function(){
			// 百度地图API功能
			_this.map = new BMap.Map(this.mapId,{enableMapClick: false}); 

			     
			// 初始化
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);	
			_this.map.centerAndZoom(point, 11);
			// 添加标注
			var marker = new BMap.Marker(point);        // 创建标注    
			_this.map.addOverlay(marker);

			// map可缩放
			_this.map.enableScrollWheelZoom(true);
			// marker可拖拽
			marker.enableDragging();    
			marker.addEventListener("dragend", function(e){ 

			 	_this.setState({
			 		pointLng : e.point.lng,
					pointLat : e.point.lat,
					changePosition:true
			 	},function(){
			 		_this.onChange();
			 	});

			});

		})
	}
	render() {
		let {placeholder,style,mapStyle,defaultValue,...other} = this.props;
		let {showMap} =this.state;
		let mapInnerStyle = {};

		var newObj = {};
		if(this.state.showMap){
			newObj.display = "block";
			newObj.zIndex = 10;
			newObj.position = "absolute";
			newObj.right = 0;
		}else{
			newObj.display = "none";
		}
		Object.assign(mapInnerStyle,mapStyle,newObj);
		
		return(
      		<div className="ui-map-component" style={style}>
				<img src={require('./images/location.svg')} className="ui-map-img" onClick={this.showMap}/>

				<input 
					type="text" 
					placeholder={placeholder} 
					style={{width:"100%",height:"100%",paddingLeft:10,boxSizing:"border-box",paddingRight:30}} 
					onChange={this.inputLocation} 
					ref="mapInput"
				/>
				<div id={this.mapId}  style={mapInnerStyle}></div>
			</div>
      	
		);
	}
}
