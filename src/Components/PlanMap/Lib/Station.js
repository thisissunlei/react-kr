
//工位
//======================
var Station = function(x,y,width,height,basic,index){


  this.index = Number(index);
  this.x = Number(x);
  this.y = Number(y);
  this.width = Number(width);
  this.height = Number(height);
  this.strokeStyle = 'red';
  this.fillStyle = '#28C288';
  this.defaultFillStyle = 'transparent';
  this.textStyle = '#499DF1';
  this.checked = false;

  //工位信息
  this.basic = basic;
  this.default = {
      x:x,
      y:y
  };

  //dom
  this.dialog = {
    open:false,
    ele:null
  };

}

Station.prototype.getIndex = function(){
  return this.index;
}

Station.prototype.position = function(x,y){

  if(arguments.length === 2){
      this.x = Number(x)-Number(this.width/2);
      this.y = Number(y)-Number(this.height/2);
  }

  var position = {
    x:this.x,
    y:this.y
  };

  return position;
}

Station.prototype.reset = function(context){
  context.clearRect(this.x,this.y,this.width,this.height);
}

Station.prototype.create = function(context){
  this.reset(context);
  this.stroke(context);
  this.fillText(context);
}

Station.prototype.getChecked = function(){
	return this.checked;
}

Station.prototype.setChecked = function(value){
		this.checked = value;
}

//拖拽创建
Station.prototype.dragCreate = function(context){

}

Station.prototype.stroke = function(context){

  context.moveTo(this.x,this.y);
  context.beginPath();
  context.rect(this.x,this.y,this.width,this.height);
  //context.closePath();

  context.strokeStyle=this.strokeStyle;
  //context.stroke();

  this.fillStyle = this.defaultFillStyle;
  if(this.checked){
    this.fillStyle='red';
  }

  this.fill(context);

}

//中心点
Station.prototype.centerPoint = function(context){
  context.beginPath();
  context.arc(this.x+this.width/2,this.y+this.height/2,2,0,2*Math.PI);
  context.stroke();
}

Station.prototype.fillText = function(context){
  var basic = this.basic;
  var text = basic.name;
  var measureText = context.measureText(text);


  //this.centerPoint(context);

  context.beginPath();
  context.font="12px Verdana";
  context.fillStyle = this.textStyle;
  context.textBaseline="middle";
  context.fillText(text,this.x+this.width/2-measureText.width/2,this.y+this.height/2);
  context.closePath();
}

//填充颜色
Station.prototype.fill = function(context){
  context.fillStyle = this.fillStyle;
  context.fillRect(Number(this.x),Number(this.y),this.width,this.height);
}

Station.prototype.getBasicInfo = function(){
  var basic = this.basic;
  return basic;
}

Station.prototype.closeDialog = function(){
    var ele = this.dialog.ele;
    if(ele === null){
      return ;
    }
    ele.style.display = 'none';
}

Station.prototype.openDialog = function(){
    var ele = this.dialog.ele;
    if(ele === null){
       ele  = this.createDialog();
    }
    this.renderDialog();
    ele.style.display = 'block';
}

Station.prototype.renderDialog = function(){
    var basic = this.basic;
    var stationEle =  this.dialog.ele;
    stationEle.innerHTML = basic.name + (this.checked?'选中':'未选中');
}

//工位信息
Station.prototype.createDialog = function(){

  var basic = this.getBasicInfo();

  var stationEle = document.createElement('div');
  stationEle.style.width = '200px';
  stationEle.style.height = '200px';
  stationEle.style.border = '1px solid #ddd';
  stationEle.style.borderRadius = '4px';
  stationEle.style.position = 'fixed';
  stationEle.style.top = this.y+'px';
  stationEle.style.left = this.x+'px';
  stationEle.style.background = '#fff';

  stationEle.innerHTML = basic.name + (this.checked?'选中':'未选中');

  this.dialog.ele = stationEle;

  document.body.appendChild(stationEle);

  return stationEle;

}

module.exports = Station;
