import Loading from './Loading';
import Station from './Station';
import Log from './Log';

//平面图
//=======================
var PlanMap = function(elementIdName,Configs,Plugins){

    this.configs = Configs;
    this.plugins = Plugins;
    //dom信息
    this.elementIdName = elementIdName;
    this.canvasElement = document.getElementById(elementIdName);

    this.context = this.canvasElement.getContext('2d');

    //基本信息
    this.scaleX = 1;
    this.scaleY = 1;
    this.backgroundImage = null;

    this.width = Configs.width;
    this.height = Configs.height;


    this.canvasElement.setAttribute('width',this.width);
    this.canvasElement.setAttribute('height',this.height);

	//多选拖动、单选
	this.single = 1;

	//clickstation
	this.clickStation = null;

    //默认
    this.default = {
      translateX:0,
      translateY:0,
    };

    this.translateX = 0;
    this.translateY = 0;


    //工位信息
    this.stations = [];
    this.beginDragStation = null;
    this.selectedStations = [];

    //事件状态
    this.eventType = {
      //click
      click:0,
      clickLeft:0,
      clickRight:0,
      //move
      move:0,
      //drag
      isJudgeDrag:0,
      drag:0,
      dragBegin:0,
      dragEnd:0,
      dragMap:0,
      dragStation:0,
      //whell－滚轮事件
      whell:0,
      whellUp:0,
      whellDown:0
    }

    //坐标信息
    this.mousePosition = {
      down:{
        x:0,
        y:0
      },
      up:{
        x:0,
        y:0
      },
      move:{
        x:0,
        y:0
      },
      current:{
        x:0,
        y:0
      }
    }

    //zoomIn、zoomOut、fulleScreen、translate
    this.operation = '';

    this.permission = {
      edit:1,
    }

    this.loading = new Loading(this.canvasElement,this.context,this.width,this.height);

    var _this = this;
    // this.loading.show();
    this.initializeStyle();
    this.loadBackgroundImage(function(){
      _this.loading.hide();
        !_this.loading.get() && _this.initialize();
    });
}

PlanMap.prototype.getContext = function(){
  var canvasElement = this.canvasElement;
  return canvasElement.getContext('2d');
}

PlanMap.prototype.setOperation = function(value){
    this.operation = value;
}

PlanMap.prototype.getOperation = function(){
  return this.operation;
}

//权限
PlanMap.prototype.setPermission = function(options){
    this.permission = Object.assign({},this.permission,options);
}

PlanMap.prototype.getPermission = function(){
  return this.permission;
}

PlanMap.prototype.fullScreen = function(){
  var canvasElement = this.canvasElement;
}

//坐标
PlanMap.prototype.setPosition = function(type,loc){
  var position = {
    x:Math.floor(loc.x),
    y:Math.floor(loc.y)
  };
  var mousePosition = Object.assign(this.mousePosition);
  mousePosition[type] = position;
  this.mousePosition = mousePosition;
}

PlanMap.prototype.getPosition = function(type){
  var mousePosition = Object.assign(this.mousePosition);
  return mousePosition[type];
}

//设置事件真值推理，其他值
PlanMap.prototype.setEventTrueSimilar = function (type){
  var eventType = this.eventType;
  switch (type) {

    case 'click': {
      eventType = Object.assign({},eventType,{click:1,clickLeft:0});
      break;
    }

    case 'clickLeft': {
      eventType = Object.assign({},eventType,{click:1,clickLeft:1,clickRight:0});
      break;
    }
    case 'clickRight': {
      eventType = Object.assign({},eventType,{click:1,clickLeft:0,clickRight:1});
      break;
    }

    case 'drag': {
        eventType = Object.assign({},eventType,{drag:1,dragEnd:0});
      break;
    }

    case 'dragBegin': {
        eventType = Object.assign({},eventType,{drag:1,dragEnd:0,dragBegin:1});
      break;
    }
    case 'dragEnd': {
        eventType = Object.assign({},eventType,{drag:0,dragEnd:1,dragBegin:0,dragStation:0,dragMap:0});
      break;
    }
    case 'dragMap': {
        eventType = Object.assign({},eventType,{drag:1,dragEnd:0,dragStation:0});
      break;
    }
    case 'dragStation': {
        eventType = Object.assign({},eventType,{drag:1,dragEnd:0,dragMap:0});
      break;
    }

    default:

  }

  this.eventType = eventType;
}


PlanMap.prototype.setEvent = function(type,value){

  var eventType = Object.assign({},this.eventType);
  if(!eventType.hasOwnProperty(type)){
    return ;
  }

  //设置相似的值
  value && this.setEventTrueSimilar(type);

  eventType = this.eventType;
  eventType[type] = value;
  this.eventType = eventType;
}

PlanMap.prototype.getEvent = function(type){
  var eventType = Object.assign({},this.eventType);
  if(!eventType.hasOwnProperty(type)){
    return false;
  }
  return eventType[type];
}


//平面图-初始化
PlanMap.prototype.initialize = function(){
  //this.initializeStyle();
  this.initializeTransForm();
  this.initializeStations();
  this.initializeEvents();
}

PlanMap.prototype.initializeTransForm = function(){
  var backgroundImage = this.backgroundImage;
  var canvasElement = this.canvasElement;

  this.scaleY = Number(canvasElement.height) / Number(canvasElement.height);

}

//平面图-初始化
PlanMap.prototype.loadBackgroundImage = function(callback){
  var image = new Image();
  image.src = this.configs.backgroundImage;
  var _this = this;
  image.onload = function(){
    _this.backgroundImage = this;
    callback && callback();
  }
}

PlanMap.prototype.setTransform = function(){
  var context = this.context;
  context.setTransform(this.scaleX,0,0,this.scaleY,this.translateX,this.translateY);
}

PlanMap.prototype.reset = function(){

  var context = this.getContext();
  var canvasElement = this.canvasElement;

  var sw = canvasElement.width;
  var sh = canvasElement.height;

  var dw = sw*this.scaleX;
  var dh = sh*this.scaleY;

  canvasElement.width = canvasElement.width;

  //context.setTransform(1,0,0,1,this.translateX,this.translateY);
  context.setTransform(this.scaleX,0,0,this.scaleY,this.translateX,this.translateY);

  context.clearRect(0,0,canvasElement.width,canvasElement.height);
  context.fillStyle = '#fff';
  context.fillRect(0,0,this.width,this.height);

  context.drawImage(this.backgroundImage,0,0,this.backgroundImage.width,this.backgroundImage.height);

}

//平面图-外观样式

PlanMap.prototype.initializeStyle = function(){
  var canvasElement = this.canvasElement;
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

  if(!this.width){
    this.width = pageWidth;
    this.height = pageHeight;
    canvasElement.setAttribute('width',pageWidth);
    canvasElement.setAttribute('height',pageHeight);
  }

}

//在工位中
PlanMap.prototype.isPointInPath = function(x,y){
  var context = this.getContext();
  return context.isPointInPath(x,y);
}
//查找开始draw station
PlanMap.prototype.mapBeiginDrawStation = function(){

  var mouseDownPosition = this.getPosition('down');
  var offsetX = mouseDownPosition.x;
  var offsetY = mouseDownPosition.y;
  var stations = this.getStations();
  var beginDragStation  = null;
  //查找起始工位

  if(this.isPointInPath(offsetX,offsetY)){
    stations.forEach(function(station,index){
      if(offsetX >=station.x && offsetX<=(station.x+station.width)){
        beginDragStation = station;
      }
    });
  }
  this.beginDragStation = beginDragStation;
}
//查找结束 draw station
PlanMap.prototype.mapEndDrawStation = function(){

  var mouseUpPosition = this.getPosition('up');
  var offsetX = mouseUpPosition.x;
  var offsetY = mouseUpPosition.y;

  var stations = this.getStations();
  var endDragStation  = null;

  //查找起始工位

  if(this.isPointInPath(offsetX,offsetY)){
    stations.forEach(function(station,index){
      if(offsetX >=station.x && offsetX<=(station.x+station.width)){
        endDragStation = Object.assign({},station);
      }
    });
  }

  this.endDragStation = endDragStation;
}


//拖动工位
PlanMap.prototype.onDragStation = function(){

  //判断是否有权限

  var permission = this.permission;

  if(!(permission.hasOwnProperty('edit') && permission.edit)){
    return ;
  }

  var clickStation = this.clickStation;

  if(this.selectedStations.length && clickStation &&  clickStation.getChecked()){
    this.createDragStationCanvas();
  }

  //响应拖拽工位开始事件
  if(this.getEvent('dragBegin') && this.getEvent('dragStation')){
    return ;
  }

  this.setEvent('drag',1);
  this.setEvent('dragBegin',1);
  this.setEvent('dragStation',1);
  this.onDragStationBegin();

}

PlanMap.prototype.onDragStationBegin = function(){
  var canvasElement = this.canvasElement;
  Log.debug('拖拽工位开始了');
  var selected = [];
  if(this.single){
    var downPosition = this.getPosition('down');
    var selectedStation = this.hasPositionStation(downPosition);

    if(selectedStation.getChecked()){
      selected.push(selectedStation);
    }
  }else{
    //选中的工位
    var stations = this.getStations();
    stations.map(function(item,index){
      if(item.getChecked()){
        var station = new Station(item.x,item.y,item.width,item.height,item.basic,item.index);
        selected.push(station);
      }
    });
  }
  this.selectedStations = selected;
}

PlanMap.prototype.createDragStationCanvasModal = function(){

  var context = this.context;
  var canvasElement = this.canvasElement;
  context.beginPath();
  context.rect(-Math.abs(this.translateX),-Math.abs(this.translateY),this.width*this.scaleX+2*Math.abs(this.translateX),this.height+2*Math.abs(this.translateY));
  context.strokeStyle = "#ddd";
  context.fillStyle = "rgba(0,0,0,0.5)";
  context.closePath();
  context.stroke();
  context.fill();
}

PlanMap.prototype.createDragStationCanvas = function(){

  var context = this.context;
  var canvasElement = this.canvasElement;
  var selectedStations = this.selectedStations;

  var position = this.getPosition('move');

  this.drawStations();
  this.createDragStationCanvasModal();

  var move = this.getPosition('move');

  var _this = this;

  //选中的工位
  selectedStations.map(function(station){

    var positionX  = station.default.x + move.x / _this.scaleX - station.x;
    var positionY = station.default.y + move.y / _this.scaleY - station.y;

    station.position(positionX,positionY);
    station.create(context);
  });
}

//交换工位上的员工信息
PlanMap.prototype.swapStationStaff = function(originStation,targetStation){

	var Plugns = this.plugins;

	Plugns && Plugns.swapStationStaff && Plugns.swapStationStaff(originStation.getBasicInfo(),targetStation.getBasicInfo());

	targetStation.setChecked(originStation.getChecked());
	originStation.setChecked(!originStation.getChecked());


	var stations = this.getStations();
	stations.splice(originStation.getIndex(),1,originStation);
	stations.splice(targetStation.getIndex(),1,targetStation);

	this.setStations(stations);

	this.drawStations();


}

PlanMap.prototype.onDragStationEnd = function(){

	var downLoc = this.getPosition('down');
	var upLoc = this.getPosition('up');

	var originStation = this.hasPositionStation(downLoc);
	var targetStation = this.hasPositionStation(upLoc);

	if(targetStation && originStation.getIndex() !== targetStation.getIndex()){
		this.swapStationStaff(originStation,targetStation);
	}

  this.selectedStations = [];

}

//默认前一个值
/*
PlanMap.prototype.setDefault = function(config){
  var defaultConfigs = Object.assign({},this.default,config);
  this.default = defaultConfigs;
}
*/
//平面图移动
PlanMap.prototype.translate = function(translateX,translateY){

  var context = this.getContext();
  var canvasElement = this.canvasElement;
  var backgroundImage = this.backgroundImage;

  //加上边界值
  //translateX = (translateX<0?translateX:0);
  //translateX = (translateX<-backgroundImage.width*this.scaleX?-backgroundImage.width*this.scaleX:translateX);

  //translateY = (translateY<0?translateY:0);
  //translateY = (translateY<-backgroundImage.height?-backgroundImage.height:translateY);

  this.translateX = translateX;
  this.translateY = translateY;

}




PlanMap.prototype.onLeftEventClick = function(){

  var isOk = (this.getEvent('clickLeft') && !this.getEvent('clickRight'));
  if(!isOk){
    return ;
  }

  Log.debug('左点击事件');

  var mouseUpPosition = this.getPosition('up');
  this.onCheckedStation(mouseUpPosition);
}

PlanMap.prototype.onRightEventClick = function(){

  var isOk = (!this.getEvent('clickLeft') && this.getEvent('clickRight'));
  if(!isOk){
    return ;
  }

  var mouseUpPosition = this.getPosition('up');

  if(this.isPositionInStation(mouseUpPosition)){

    var targetStation = this.hasPositionStation(mouseUpPosition);

    if(targetStation === null){
      return ;
    }

    this.openStationDialog(targetStation);
  }

}

PlanMap.prototype.hasPositionStation = function(loc){

  if(typeof loc !== 'object'){
    throw new Error('PlanMap:hasPositionStation,参数@loc为对象');
  }

  var stations = this.getStations();
  var hasStation = null;
  for(var i = 0;i<stations.length;i++){
    var station = stations[i];
    if(loc.x >=station.x*this.scaleX && loc.x<=(station.x+station.width)*this.scaleX && (loc.y>=station.y*this.scaleY) && loc.y<= (station.y+station.height)*this.scaleY){
      hasStation = station;
      break;
    }
  }
  return hasStation;
}
//坐标在工位上
PlanMap.prototype.isPositionInStation = function(loc){
  var isOk = false;
  let stations = this.getStations();

  /*
  TODO:bug
  if(!this.isPointInPath(loc.x,loc.y)){
  return isOk;
  }
  */
  if(this.hasPositionStation(loc)){
    isOk = true;
  }

  return isOk;
}

PlanMap.prototype.calcScale = function(){

  var move  = this.getPosition('move');

  var defaultScale = 0.1;

  //缩小
   if(this.getEvent('whell') && this.getEvent('whellUp')){
    defaultScale = -defaultScale;
  }

  var scaleX = this.scaleX+defaultScale;
  var scaleY = this.scaleY+defaultScale;


  var defaultTranslateX = Number(move.x)*Number(defaultScale);
  //- Number(move.x);
  var defaultTranslateY = Number(move.y)*Number(defaultScale);
  // - Number(move.y);


  //放大
  if(this.getEvent('whell') && this.getEvent('whellDown')){
    defaultTranslateX = -defaultTranslateX;
    defaultTranslateY = -defaultTranslateY;
    //缩小
  }else if(this.getEvent('whell') && this.getEvent('whellUp')){
    defaultTranslateX = -defaultTranslateX;
    defaultTranslateY = -defaultTranslateY;
  }


var translateX = this.translateX + defaultTranslateX;
var translateY = this.translateY + defaultTranslateY;


	if(scaleX<0.6 || scaleX >10){
		return ;
	}

	this.translate(translateX,translateY);
	this.scale(scaleX,scaleY);

	this.drawStations();
}

//平面图－events
PlanMap.prototype.initializeEvents = function(){

	let canvasElement = this.canvasElement;
	let context = this.getContext();

	let _this = this;


	var canvasMouseWhellEvent = function(event){
		var position = _this.windowToCanvas(event);
		_this.setPosition('down',position)

			var deltaY = event.deltaY;
		if(deltaY>0){
			_this.setEvent('whell',1);
			_this.setEvent('whellDown',1);
			_this.setEvent('whellUp',0);
		}else{
			_this.setEvent('whell',1);
			_this.setEvent('whellDown',0);
			_this.setEvent('whellUp',1);
		}

		_this.calcScale();

	}

	window.addEventListener("mousewheel",canvasMouseWhellEvent,false);

	//取消鼠标右击事件

	var canvasCancelRightMouseEvent = function(event){
		// 鼠标右击事件
		if(event.button === 2){
			event.preventDefault()
		};
	}

	//鼠标点击
	var canvasMouseDown = function(event){
		event = event || window.event;

		event.preventDefault();

		_this.setEvent('drag',0);

		var position = _this.windowToCanvas(event);
		_this.setPosition('down',position);
		//_this.setDefault({translateX:_this.translateX,translateY:_this.translateY});

		//鼠标右击事件
		if(event.button === 2){
			document.addEventListener('contextmenu', canvasCancelRightMouseEvent, false);
			_this.setEvent('clickRight',1);
			_this.setEvent('clickLeft',0);

			return false;
		}else{
			_this.setEvent('clickRight',0);
			_this.setEvent('clickLeft',1);
		}

		//移动
		window.setTimeout(function(){
				canvasElement.addEventListener('mousemove',canvasMouseMove,false);
				},10);
	}
	//鼠标移动
	var canvasMouseMove = function(e){
		e = e || window.event;


		_this.setEvent('drag',1)
			_this.setEvent('click',0)
			_this.setEvent('clickLeft',0)
			_this.setEvent('clickRight',0)


			//判断是拖拽背景图、工位
			var loc = _this.windowToCanvas(e);
		_this.setPosition('move',loc);
		_this.onDrag();

	}

	canvasElement.addEventListener('mousemove',function(event){
			_this.setPosition('move',_this.windowToCanvas(event));

			var canvasElement = _this.canvasElement;
			var loc = _this.windowToCanvas(event);
			//更改鼠标状态
			if(_this.hasPositionStation(loc)){
			canvasElement.style.cursor = 'pointer';
			}

			},false);

	//mousedown
	canvasElement.addEventListener('mousedown',canvasMouseDown,false);

	//mouseup
	canvasElement.addEventListener('mouseup',function(event){
			event = event || window.event;

			document.removeEventListener('contextmenu', canvasCancelRightMouseEvent, false);

			_this.setPosition('up',_this.windowToCanvas(event))

			canvasElement.removeEventListener('mousemove',canvasMouseMove,false);

			_this.onDragEnd();



			_this.onClick();

			});
}

PlanMap.prototype.judgeClick = function(){

	var mouseDownPosition = this.getPosition('down');
	var mouseUpPosition = this.getPosition('up');
	var diffX = Math.abs(mouseDownPosition.x - mouseUpPosition.x);
	var diffY = Math.abs(mouseDownPosition.y - mouseUpPosition.y);

	if(diffX < 1 && diffY<1){
		this.setEvent('click',1);
	}

}

//判断是拖拽工位还是map
PlanMap.prototype.judgeDragStationOrMap = function(){

  var mouseDownPosition = this.getPosition('down');
  var isStation = false;
  if(this.hasPositionStation(this.getPosition('down'))){
        isStation = true;
  }

  this.setEvent('dragStation',Number(isStation));
  this.setEvent('dragMap',Number(!isStation));
  this.setEvent('isJudgeDrag',1);
}

PlanMap.prototype.onDrag = function(){

  if(!this.getEvent('isJudgeDrag')){
	   this.judgeDragStationOrMap();
  }

	if(this.getEvent('drag') && this.getEvent('dragMap')){
		this.onDragMap();
		return ;
	}

	if(this.getEvent('drag') && this.getEvent('dragStation')){
		this.onDragStation();
		return ;
	}
}

PlanMap.prototype.onDragBegin = function(){
	this.onDragMapBegin();
}

PlanMap.prototype.onDragEnd = function(){

	//重置
	this.drawStations();


	if(this.getEvent('drag') && this.getEvent('dragBegin') && this.getEvent('dargMap')){
		this.onDragMapEnd();
	}

	if(this.getEvent('drag')  && this.getEvent('dragStation')){
		this.onDragStationEnd();
	}

	this.setEvent('drag',0);
	this.setEvent('dragBeigin',0);
	this.setEvent('dragEnd',1);
	this.setEvent('dragMap',0);
	this.setEvent('dragStation',0);
  this.setEvent('isJudgeDrag',0);
}

//拖动平面图

PlanMap.prototype.onDragMapBegin = function(){

	if(!(this.getEvent('drapBegin') && this.getEvent('dragMap'))){
		return ;
	}

	Log.debug('拖拽底图开始了');
}

PlanMap.prototype.onDragMapEnd = function(){
	Log.debug('拖拽底图结束了');
	this.setEvent('drag',0);
}

PlanMap.prototype.onDragMap = function(){

	var origin = this.getPosition('down');
	var move = this.getPosition('move');
	var x = move.x - origin.x;
	var y = move.y - origin.y;

	var context = this.getContext();
	var canvasElement = this.canvasElement;
	var backgroundImage = this.backgroundImage;

	var translateX = this.translateX+x;
	var translateY = this.translateY+y;


	this.translate(translateX,translateY);

	this.drawStations(context);

	if(this.getEvent('dragBegin') && this.getEvent('dragMap')){
		return ;
	}

	this.setEvent('drag',1);
	this.setEvent('dragBegin',1);

	//this.onDragBegin();

}


PlanMap.prototype.onClick = function(){
	if(!this.getEvent('click')){
		return ;
	}
	this.onRightEventClick();
	this.onLeftEventClick();
}

//取消其他选中的station
PlanMap.prototype.cancelCheckedAllStation = function(){
	var stations = this.getStations();
	var clickStation = this.clickStation;

	stations.forEach(function(station,index){
		if(station.getIndex() === clickStation.getIndex()){
			return ;
		}
		station.checked = false;
	});

	this.setStations(stations);
}

PlanMap.prototype.setClickStation = function(clickStation){
    this.clickStation = clickStation;
}

PlanMap.prototype.getClickStation = function(){
  return this.clickStation;
}

//点击选中
PlanMap.prototype.onCheckedStation = function(loc){


	let stations = this.getStations();
	//关闭所有station dialog
	this.closeAllStationDialog();


	let clickStation = this.hasPositionStation(loc);
	if(!clickStation){
		return ;
	}

  clickStation.setChecked(!clickStation.getChecked());
	stations.splice(clickStation.getIndex(),1,clickStation);

  this.setClickStation(clickStation);


	this.setStations(stations);

	this.drawStations();

  var plugins = this.plugins;

  plugins.onCheckedStation && plugins.onCheckedStation(clickStation,this.getCheckedStations());

}

PlanMap.prototype.getCheckedStations = function(){
  var stations = this.stations;

  var checkedStations = [];

  stations.map(function(station){
    if(station.getChecked()){
      checkedStations.push(station);
    }
  });

  return checkedStations;
}

//关闭所有的stations dialog

PlanMap.prototype.closeAllStationDialog = function(station){
	//关闭其他的工位dialog
	var stations = this.getStations();
	stations.map(function(item,index){
			item.closeDialog();
			});
}

//打开单个station dialog
PlanMap.prototype.openStationDialog = function(station){
	if(!this.getEvent('clickRight')){
		return ;
	}

	this.closeAllStationDialog();

	Log.debug('选中了工位');
	Log.debug(station);

	station.openDialog();

}

//平面图－工位拖拽
PlanMap.prototype.dragStation = function(){

}

//平面图-选择工位
PlanMap.prototype.setStationPostion = function(station){
	var translateX = this.translateX;
	var translateY = this.translateY;
	return station;
}

//设置stations
PlanMap.prototype.setStations = function(stations){
	this.stations = stations;
}

PlanMap.prototype.getStations = function(){
	return this.stations;
}

PlanMap.prototype.drawStations = function(context){

	context = context||this.getContext();
	var canvasElement = this.canvasElement;
	var stations = this.getStations();

	this.reset();
	var _this = this;
	stations.forEach(function(station,index){
			station.position(Number(station.default.x),Number(station.default.y));
			station.create(context);
	});
}

//平面图-鼠标位置

PlanMap.prototype.windowToCanvas = function(event){
	var position = {
x:0,
  y:0
	};

	var canvasElement = this.canvasElement;
	let bbox = {};
	bbox = canvasElement.getBoundingClientRect();

	var clientX = event.clientX;
	var clientY = event.clientY;

	position.x = clientX-bbox.left * (this.width / bbox.width) -this.translateX;
	position.y = clientY-bbox.top * (this.height / bbox.height)-this.translateY;

	position.x = (position.x<0?Math.ceil(position.x):Math.floor(position.x));
	position.y = (position.y<0?Math.ceil(position.y):Math.floor(position.y));

	return position;

};


PlanMap.prototype.scale = function(scaleX,scaleY){
	this.scaleX = scaleX;
	this.scaleY = scaleY;
}


//平面图－工位信息－初始化
PlanMap.prototype.initializeStations = function(){

	//工位数据
	var stationsData = this.configs.stations;
	var stations = [];

	var context = this.getContext();
	var translateX = this.translateX;
	var translateY = this.translateY;

	stationsData.map(function(item,index){

			let x = item.x;
			let y = item.y;
			let width = item.width;
			let height = item.height;
			let station =  new Station(x,y,width,height,item.basic,index);

			stations.push(station);

			});

	this.setStations(stations);

	this.drawStations();


}


module.exports = PlanMap;
