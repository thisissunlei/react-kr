

var Loading = function(canvasElement,context,width,height){

  this.canvasElement = canvasElement;
  this.context = context;
  this.isLoading = true;
  this.canvasWidth = width;
  this.canvasHeight = height;

  this.initialize();

}

Loading.prototype.initialize = function(){
    var context = this.context;
      this.draw(context, 0);
}

Loading.prototype.draw = function(x){
  var isLoading = this.isLoading;
  var canvasElement = this.canvasElement;

  if(!isLoading){
    return;
  }

  var context = this.context;
     context.clearRect(0,0,this.width,this.height);
     context.beginPath();
     context.strokeStyle = '#ff4444';
     if (x < Math.PI*2) {
         x += 0.05;
     } else {
         x = 0;
     }
     context.translate(0,0);
     context.arc(640, 200, 30, 0, x, false); // 顺时针
     context.fillStyle = 'transparent';
     context.closePath();
     context.stroke();
     var _this = this;
     requestAnimationFrame(function () {
       _this.draw(x);
     });
}

Loading.prototype.show = function(){

  this.isLoading = true;

}

Loading.prototype.hide = function(){

  this.isLoading = false;

}

Loading.prototype.get = function(){
  return this.isLoading;
}

module.exports = Loading;
