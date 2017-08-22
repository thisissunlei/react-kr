import React from 'react';
import Button from '../../Button';
import ImageShear from '../../ImageShear';
import Message from '../../Message';
export default class ShearDialog  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      imgSrc:'',
			file:{}
    }
	}

 onChange=(event)=>{

     var files=event.target.files, //FileList，类数组，不是数组哦
         file=files[0],
         fileName=file.name, //文件名
         fileType=file.type, //文件类型
         fileSize=file.size, //文件大小
         modifiedDate=file.lastModifiedDate, //上次修改时间
         html='';
				 if(fileType!='image/png'&&fileType!='image/gif'&&fileType!='image/jpeg'){
 				    Message.error('只支持：JPG、PNG、GIF');
						return ;
				 }
				 this.setState({
					 file:file
				 })
         this.getImageSize(file,function (imgWidth,imgHeight) {
             html='文件名称：'+fileName+'<br/>'
             +'文件类型：'+fileType+'<br/>'
             +'文件大小：'+fileSize+'<br/>'
             +'上次修改时间：'+modifiedDate+'<br/>'
             +'文件宽高：'+imgWidth+'----'+imgHeight;
             //document.getElementById('show-info').innerHTML=html;
         });
 }

 //获取选择图片的宽高
 getImageSize=(file,callback)=> {
     var _this=this;
     var render=new FileReader();
     render.onload=function (e) {
         var data=e.target.result; //读取的结果
         var image=new Image();
         image.onload=function () {
             var width=image.width,
                 height=image.height;
             callback(width,height);
         };
         image.src=data;
         _this.setState({
           imgSrc:data
         })
     };
     render.readAsDataURL(file);
 }

 onCancel=()=>{
    const {onCancel}=this.props;
    onCancel && onCancel();
 }

 clamp=(data)=>{
	 let {file}=this.state;
   const {clamp}=this.props;
   clamp && clamp(data,file);
 }


	render(){

    let {imgSrc}=this.state;

		return(

			<div style={{paddingLeft:94,paddingTop:18}}>

					<div className='shear-font' style={{marginBottom:10}}>从电脑里挑选一张萌萌哒的照片</div>
          <div className='shear-font'>图片格式只支持：JPG、PNG、GIF，大小不超过2M</div>

          <div className='shear-upload'>
            选择图片
            <input type='file' onChange={this.onChange} ref="inputImg" style={{opacity:0,height:30,position:'absolute',left:0,top:0,cursor:'pointer'}}/>
          </div>

          <div style={{textAlign:'left'}}>
               <div className='shear-pic-img'>
                   <ImageShear
                   url ={imgSrc}
                   height ="200"
                   width = "200"
                   addZoom='10'
                   minusZoom='-10'
                   onCancel={this.onCancel}
                   clamp={this.clamp}
                   />
               </div>
          </div>


			</div>
		);
	}

}
