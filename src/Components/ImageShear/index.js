import React from 'react';
import './index.less';
import Button from '../Button';

export default class ImageShear extends React.Component {
    constructor(props,context){
      super(props, context);
      this.state = {
        data:this.props.url
      }
      this.isDown = false;
      this.imgData = {
        x:0,
        y:0,
        w:0,
        h:0,
        mx:0,
        my:0,
      }
      this.img = null;
      this.mouse = {
        x:0,
        y:0,
      }
      this.mouseInit = {
        x:0,
        y:0,
      }
      //预览图片相对于框的位置
      this.canImgData = {
        x:0,
        y:0
      }

      //宽高比
      this.proportion = 1;

    }

    //初次渲染
    canvasImgRender=(url,width,height,shearHeight,shearWidth)=>{
      var that = this;

      this.ctx = this.myCanvas.getContext("2d");
      this.img = new Image();
      this.img.src = url;
      this.canvasSize(shearWidth||150,shearHeight||150);


      this.moveBox.width = width;
      this.moveBox.height = height;

      this.img.onload = function(event){

        that.imgDataSet(0,0,that.img.width,that.img.height);

        that.proportion = that.floort(that.img.height/that.img.width);
        that.setImgInit();
        that.trget.addEventListener('mousedown',that.imgMousedown);
        that.trget.addEventListener('mouseup',that.imgMouseup);
        that.trget.addEventListener('mousemove',that.imgMouseMove);
        that.trget.addEventListener('mouseout',that.imgMouseOut);
        that.trget.addEventListener('mouseover',that.imgMouseOver)
        that.trget.addEventListener('mousewheel',that.scoll)
        // that.trget.onscroll = function(){
        //   console.log("OOOO")
        // };
        that.canImgSet();
        that.canRander();
      }
    }
    setImgInit = () =>{
      var imgData = Object.assign({},this.imgData);
      var moveBox = this.moveBox.getBoundingClientRect();
      var maxLeng = Math.max(imgData.w,imgData.h);
      var w = 0,h = 0,movex = 0,movey = 0;
      if(imgData.w >= imgData.h){
        w = moveBox.width;
        h = w * this.proportion;
        movey = this.floort((moveBox.height - h)/2);

      }else{
        h = moveBox.height;
        w =  this.floort(h / this.proportion);
        movex = this.floort((moveBox.width - w)/2);
      }
      this.imgData = {
        x:imgData.x + movex,
        y:imgData.y + movey,
        w:w,
        h:h
      }
      this.imgRender();
      this.canImgSet();
      this.canRander();
    }

    componentDidMount(){
      const {url,width,height,shearHeight, shearWidth} = this.props;
      this.canvasImgRender(url,width,height,shearHeight,shearWidth);
    }

    componentWillReceiveProps(nextProps){
       if(nextProps.url!=this.props.url){
         const {url,width,height,shearHeight, shearWidth} = nextProps;
         this.canvasImgRender(url,width,height,shearHeight,shearWidth);
       }
    }

    //设置图片的数据
    imgDataSet = (x,y,w,h) =>{
      this.imgData = {
        x:x,
        y:y,
        w:w,
        h:h
      }

    }
    //设置canvas的大小
    canvasSize = (w,h) =>{
      this.myCanvas.width = w;
      this.myCanvas.height = h;
    }

    //canvas绘制
    canRander = () =>{

      this.ctx.clearRect(0,0,this.myCanvas.width,this.myCanvas.height)

      var x = Math.round(this.canImgData.x);
      var y = Math.round(this.canImgData.y);
      var w = Math.round(this.imgData.w);
      var h = Math.round(this.imgData.h);


      this.ctx.drawImage(this.img,x,y,w,h);

      this.setState({
        data:this.myCanvas.toDataURL()
      })
    }

    //鼠标按下
    imgMousedown = (event) =>{
      this.isDown = true;
      this.mouseInit = {
        x:event.pageX,
        y:event.pageY
      }
    }
    //鼠标松开
    imgMouseup = (event) =>{
      this.isDown = false;
      this.mouseInit = {
        x:event.pageX,
        y:event.pageY
      }
    }
    //鼠标离开canvas
    imgMouseOver = (event) =>{
      this.mouseInit = {
        x:event.pageX,
        y:event.pageY
      }
    }
    //鼠标离开cannvas
    imgMouseOut = (event) =>{
      this.isDown = false;
      this.mouseInit = {
        x:event.pageX,
        y:event.pageY
      }

    }
    //鼠标移动
    imgMouseMove = (event) =>{
     if(this.isDown){

      this.moveLocation(event);
      this.imgRender();
      this.canImgSet();
      this.canRander();
     }
    }
    //获取鼠标的坐标
    moveLocation = (event) =>{
      this.mouse = {
          x:event.pageX,
          y:event.pageY
      }
      //设置背景图片的位置
      this.imgSet();
      this.mouseInit = {
        x:event.pageX,
        y: event.pageY
      }

    }
    //背景图片的位置
    imgRender = () =>{
      var x = Math.round(this.imgData.x);
      var y = Math.round(this.imgData.y);
      var w = Math.round(this.imgData.w);
      var h = Math.round(this.imgData.h);
      this.previewImg.style.left = x+"px";
      this.previewImg.style.top = y+"px";
      this.previewImg.style.width =  w+ "px";
      this.previewImg.style.height = h + "px";
    }

    imgSet = () =>{
      var imgData = Object.assign({},this.imgData);
      var mouseInit = Object.assign({},this.mouseInit);

      var movex = this.mouse.x - mouseInit.x;
      var movey= this.mouse.y - mouseInit.y;
      this.imgData = {
        x: imgData.x + movex ,
        y: imgData.y + movey,
        w:imgData.w,
        h:imgData.h,
        mx:movex,
        my:movey

      }
    }
    //滚轮事件
    scoll = (event) =>{

      var zoom = 0;
      var previewImg = this.previewImg.getBoundingClientRect();
      if(event.wheelDelta>0){
        zoom = parseInt(this.props.addZoom);
      }else{
        zoom = parseInt(this.props.minusZoom);
      }
      var centerx = this.floort(event.pageX - previewImg.left);
      var centery = this.floort(event.pageY - previewImg.top);
      this.setZoom(zoom,{x:centerx,y:centery})
      this.imgRender();
      this.canImgSet();
      this.canRander();

    }
    setZoom = (num,location) =>{
      var zoom = num;
      var imgData = Object.assign({},this.imgData);
      var addW = zoom;
      var addH = (imgData.w+zoom)*this.proportion-imgData.h;
      var movex =  this.floort(location.x / (imgData.w))*zoom;
      var movey =  this.floort(location.y / (imgData.h))*zoom;
      this.imgData = {
        x:imgData.x-movex,
        y:imgData.y-movex,
        w:imgData.w+addW,
        h:imgData.h+addH,
      }
    }

    floort = (number) =>{
      return Math.round(number*1000)/1000
    }

    canImgSet = () =>{
      var myCanvas = this.myCanvas.getBoundingClientRect();
      var previewImg = this.previewImg.getBoundingClientRect();
      this.canImgData = {
        x:previewImg.left - myCanvas.left,
        y:previewImg.top - myCanvas.top ,
      }
    }

    clamp = () =>{
      const {url,width,height} = this.props;
      var moveBox = this.moveBox.getBoundingClientRect();

      var imgdata = this.ctx.getImageData(moveBox.left, moveBox.top,width,height);

      this.setState({
        data:this.myCanvas.toDataURL()
      },function(){
        const {clamp}=this.props;
        clamp && clamp(this.state.data);
      })
    }
    //
    isSub = (can,img) =>{
      var maxLeng = Math.max(img.width,img.height);
      if(maxLeng<=can.width){
        return false;
      }
      return true;
    }
    addZoom = () =>{
      var myCanvas = this.myCanvas.getBoundingClientRect();
      var previewImg = this.previewImg.getBoundingClientRect();
      var centerx = this.floort(myCanvas.left+myCanvas.width / 2 - previewImg.left);
      var centery = this.floort(myCanvas.top+myCanvas.height / 2 - previewImg.top);

      this.setZoom(parseInt(this.props.addZoom),{x:centerx,y:centery})

      this.imgRender();
      this.canImgSet();
      this.canRander();
    }


    subZoom = () =>{
      var myCanvas = this.myCanvas.getBoundingClientRect();
      var previewImg = this.previewImg.getBoundingClientRect();
      var centerx = this.floort(myCanvas.left+myCanvas.width / 2 - previewImg.left);
      var centery = this.floort(myCanvas.top+myCanvas.height / 2 - previewImg.top);
      if(!this.isSub(myCanvas,previewImg)){
          return;
      }
      this.setZoom(parseInt(this.props.minusZoom),{x:centerx,y:centery})
      this.imgRender();
      this.canImgSet();
      this.canRander();
    }

    onCancel=()=>{
      const {onCancel}=this.props;
      onCancel && onCancel();
    }
    // componentWillUnmount(){
    //     this.trget.addEventListener(this.imgMousedown);
    //     this.trget.addEventListener(this.imgMouseup);
    //     this.trget.addEventListener(this.imgMouseMove);
    //     this.trget.addEventListener(this.imgMouseOut);
    //     this.trget.addEventListener(this.imgMouseOver)
    //     this.trget.addEventListener(this.scoll)
    // }



	render() {
    const {
      children,
      className,
      url,
      radius,
      height,
      width,
    } = this.props;
    const {data} = this.state;

    var imgStyle={};
    if(data){
      imgStyle={
        background:'url('+data+') no-repeat center'
      }
    }

		return (

         <div className='shear-pic-wrap'>
            <div
              className = {"image-shear "+className||''}

            >

                <div className = "mask"></div>
                <div
                  className = "move-box"
                  ref = {(ref) =>{
                    this.moveBox = ref;
                  }}
                  style = {{width:width||500,height:height||500}}>
                  <img
                    className = "preview-box"
                    ref = {(ref)=>{
                      this.previewImg = ref;
                    }}
                    src={url || ''}
                  />
                </div>
                <canvas
                  ref = {(ref) =>{
                    this.myCanvas = ref;
                  }}
                  style = {{borderRadius:radius||0}}

                >
                </canvas>
                <div
                ref = {(ref)=>{
                  this.trget = ref;
                }}
                className = "mouse-target"
                >
                </div>
                <div className = "img-size">
                  <div className="add" onClick = {this.addZoom}>+</div>
                  <div className="sub" onClick = {this.subZoom}>-</div>
                </div>
                {/*<button onClick = {this.clamp } style = {{position:"absolute"}}>dainji</button>*/}
              </div>

                <div className='circle-shear-pic' style={imgStyle}>
                    <div className = 'circle-shear-pic-title'>头像预览</div>
                </div>

                <div className='btn-shear'><div  className='ui-btn-center' style={{display:'inline-block',marginRight:'30px'}}><Button  label="确定"  onTouchTap={this.clamp}/></div>
                <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

          </div>
		);

	}

}
