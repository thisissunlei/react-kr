import React, {Component} from 'react';
import WrapComponent from '../WrapComponent';

import './index.less';
export default class MapComponentNew extends Component {
	static propTypes = {
		className:React.PropTypes.string,
		placeholder:React.PropTypes.string,
		style:React.PropTypes.object,
		mapStyle:React.PropTypes.object,
		initailPoint:React.PropTypes.string
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
			dragendMarker : false,
			initailPoint:''
		};
		this.mapId = 'map_'+Date.now();
	}
	componentWillReceiveProps(nextProps){
		let _this=this;
		// 根据城市定位地图
		if(!this.state.dragendMarker &&!this.state.changePosition && !nextProps.defaultValue && nextProps.initailPoint &&nextProps.initailPoint !== this.state.initailPoint ){
			this.setState({
				initailPoint : nextProps.initailPoint
			},function(){
				this.setMarker(nextProps.initailPoint);
			})
		}
		// if(!this.state.dragendMarker &&!this.state.changePosition && !nextProps.defaultValue && nextProps.initailPoint){
		// 		this.setMarker(nextProps.initailPoint);
		// }

		//回填具体地址
		if(this.props.defaultValue){
			Debug.log("this.props.defaultValue",this.props.defaultValue);
			this.refs.mapInput.defaultValue = nextProps.defaultValue;
		}
		//经纬度
		var {defaultPoint} = nextProps;
		if(Array.isArray(defaultPoint)){
			this.setState({
				pointLng : defaultPoint[0],
				pointLat : defaultPoint[1],
			},function(){
				_this.onChange();
			})
		}
	}

	onClickOther = (event)=>{

	  	event = event || window.event;
		var target = event.target;
		
		while (target) {
			if (target && target.className && target.className.indexOf('ui-map-component') !== -1) {
				return;
			}
			target = target.parentNode;
		}
        this.setState({
          	showMap:false
        });
    }


 
    componentWillUnmount(){
		

		document.body.removeEventListener("click",this.onClickOther.bind(this)); 	
	}


	componentDidMount() {
		

		document.body.addEventListener("click",this.onClickOther.bind(this));


		let _this = this;
		// 编辑时input回显
		if(this.props.defaultValue){
			this.refs.mapInput.defaultValue = this.props.defaultValue;
		}
		// 编辑时地图定位回显
		const {defaultPoint}=this.props;
		if(Array.isArray(defaultPoint)){
			this.setState({
				pointLng : defaultPoint[0],
				pointLat : defaultPoint[1],
			},function(){
				_this.onChange();
			})
		}
		// 百度地图API功能
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
	}
	// 输入文字
	inputLocation=()=>{
		this.showMap();
		var _this = this;
		var inputValue = this.refs.mapInput.value;
		this.setState({
			detailSearch : inputValue
		},function(){
			if(!inputValue){
				let {initailPoint} =_this.props;
				_this.setMarker(initailPoint);
				return;
			}
			_this.setMarker(inputValue);

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
			detailSearch : searchValue
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
	             		_this.onChange();
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
			showMap : true
		},function(){
			// 百度地图API功能
			_this.map = new BMap.Map(this.mapId,{enableMapClick: false}); 
			// 初始化
			console.log("this.state",this.state);
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);	
			if(_this.refs.mapInput.value){
				_this.map.centerAndZoom(point, 15);
			}else{
				_this.map.centerAndZoom(point, 11);
			}

			
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
			 		console.log("this.state",this.state);
			 		_this.onChange();
			 	});
			});
		})
	}


	isShowMap=(event)=>{
		event.stopPropagation();
		let _this = this;
		this.setState({
			showMap : !_this.state.showMap
		},function(){
			// 百度地图API功能
			_this.map = new BMap.Map(this.mapId,{enableMapClick: false}); 

			// 初始化
			var point = new BMap.Point(_this.state.pointLng, _this.state.pointLat);	
			if(this.refs.mapInput.value){
				_this.map.centerAndZoom(point, 15);
			}else{
				_this.map.centerAndZoom(point, 11);
			}
			
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

	render(){

		let {placeholder,style,mapStyle} = this.props;
		let {showMap} =this.state;
		var newObj = {
			zIndex:10,
			position:'absolute',
			right:0,
			display:'block'
		};
		if(!this.state.showMap){
			newObj.display = 'none';
		}
		var mapInnerStyle=Object.assign({},mapStyle,newObj);
		var inputProps={
			type:'text' ,
			ref:'mapInput',
			placeholder:placeholder, 
			style:{width:'100%',height:'100%',paddingLeft:10,boxSizing:'border-box',paddingRight:30},
			onChange:this.inputLocation,
			onClick :this.showMap
			 
		} 
		var iconProps ={
			src:require('./images/location.svg'),
			className:'ui-map-img',
			onClick:this.isShowMap,
		}
		return(
      		<div className="ui-map-component" style={style}>
				<img {...iconProps}/>
				<input {...inputProps} />
				<div id={this.mapId}  style={mapInnerStyle}></div>
			</div>
		);
	}
}
