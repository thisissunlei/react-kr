import React from 'react';
import {reduxForm,initialize,change}  from 'redux-form';
import {
	Title,
	Section,
	KrField,
	Message,
	PlanMapAll
} from 'kr-ui';
import {Http} from 'kr/Utils';
import './index.less';
class CommunityPlanMap  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isStation:true,
			figureSets:[],
			floors:[],
			//平面图传参
            initializeConfigs:{},
			//上传文件
			fileData:'',
			//大小一致
			sameSize:false,
			//放大比例
			scaleSize:1,
			//选择楼层
			selectFloor:3,
			//拖拽差值
			minusX:'',
			minusY:'',
			//拖拽标志
			dragFlag:false,
			//是否是工位
			isStation:true,
			//工位会议室id名称
			nameStation:'',
			//元件值
			cellname:'',
			//传的canvas对象
			stationObj:{
			},
			//必须拖拽释放请求
			upFlag:false
		}
	}



getMapConfigs = ()=>{
let {selectFloor}=this.state;
var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
var _this = this;
Http.request('plan-get-detail',{
		  floor:selectFloor,
		  communityId:href
	  }).then(function(response) {
	
			 var stationsDataOrigin = response.figures;
             var stations = [];

			 stations = stationsDataOrigin.map(function(item,index){
				var obj = {};
				var x=item.cellCoordX;
				var y=item.cellCoordY;

				obj.x = Number(x);
				obj.y = Number(y);

				obj.width = item.cellWidth;
				obj.height = item.cellHeight;
				obj.name = item.cellName;
				obj.basic = {
				name:item.cellName,
				id:item.canFigureId
				};

				return obj;
			});
				var InitializeConfigs = {
					stations:stations,
					backgroundImageUrl:'http://optest.krspace.cn'+response.graphFilePath
				}
            
				_this.setState({
				figureSets:response.figureSets,
				initializeConfigs:InitializeConfigs,
				})
		}).catch(function(err) {
			Message.error(err.message);
		})
}


getMapFloor = ()=>{

	var _this = this;
 	var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
	Http.request('getCommunityFloors',{
		  communityId:href
	  }).then(function(response) {
		    _this.setState({
				floors:response.floors,
			});
			_this.getMapConfigs();
	  }).catch(function(err) {
			Message.error(err.message);
	  });
}

componentWillMount(){
	 var _this=this;
	 this.getMapFloor();
}

componentDidMount(){
	document.addEventListener('mousemove',this.eventListen)
}

 onSubmit=()=>{
 
 }

 //工位元件hover
  mouseOverStaion=()=>{
    this.setState({
	 isStation:true	
	})
   document.getElementById('tab-meeting').style.borderBottom='2px solid #eee';
   document.getElementById('tab-station').style.borderBottom='2px solid rgb(219, 237, 254)'; 
  }

  //会议室元件hover
  mouseOverMeeting=()=>{
	this.setState({
	 isStation:false	
	})
   document.getElementById('tab-station').style.borderBottom='2px solid #eee'; 
   document.getElementById('tab-meeting').style.borderBottom='2px solid rgb(219, 237, 254)'
  }

  //楼层
  floor=(value)=>{
	this.setState({
		selectFloor:value.label
	})
  }
  
  //工位大小一致
  sizeSameCheck=(event)=>{
    this.setState({
		sameSize:event.target.checked
	})
  }
  
  //放大比例
  rangeSelect=(event)=>{
    document.getElementById("ratioSelectVal").innerHTML=parseInt(event.target.value*100);
	this.setState({
		scaleSize:Number(event.target.value)
	})
  }
 
  //上传文件
  fileUpload=(event)=>{
    document.getElementById("bgfilename").innerHTML=event.target.files[0].name;
	this.setState({
		fileData:event.target.files[0]
	})
  }

  //保存
  save=()=>{
    
  }
  
  //上传
  upload=()=>{
   let {selectFloor,fileData}=this.state;
	var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
    Http.request('plan-upload',{},{
     communityId:href,
	 id:'',
	 floor:selectFloor,
	 GraphFile:fileData
	}).then(function(response) {
		console.log('ssss',response);  
	  }).catch(function(err) {
		 Message.error(err.message);
	  });
  }


//点击
allStationDown=(event)=>{
  let {isStation}=this.state;
  this.setState({
	minusX:event.clientX-event.target.getBoundingClientRect().left,
	minusY:event.clientY-event.target.getBoundingClientRect().top,
	dragFlag:true 
   })
   if(isStation){
     this.setState({
		nameStation:'single-drag-square',
		cellname:event.target.nextSibling.innerHTML
	 })
   }else{
	 this.setState({
		nameStation:'single-drag-meeting',
		cellname:event.target.innerHTML
	 })  
   }
}

//移动
eventListen=(event)=>{
  let {dragFlag,nameStation,minusX,minusY}=this.state;
  if(dragFlag){
     this.setState({
		 upFlag:true
	 })
     document.getElementById(nameStation).style.display='inline-block';
     document.getElementById(nameStation).style.left=event.clientX-minusX+'px';
     document.getElementById(nameStation).style.top=event.clientY-minusY+'px';
  }
}

//释放
allStationUp=(event)=>{
   let {isStation,cellname,upFlag}=this.state;
   var type='';
   var width='';
   var height='';
   if(isStation){
       type='station';
       width=30;
       height=30;
    }else{
       type='meeting';
       width=118;
       height=48;
    } 
	if(upFlag){
      this.setState({
		dragFlag:false,
		upFlag:false,
		stationObj:{
			x:event.target.getBoundingClientRect().left + width/2,
			y:event.target.getBoundingClientRect().top + height/2,
			width:width,
			height:height,
			type:type,
			name:cellname
		},
		//figureSets:figureSets.splice()
     })
	} 
	 document.getElementById("single-drag-meeting").style.display='none';
     document.getElementById("single-drag-square").style.display='none';

}





	render(){

        let {handleSubmit}=this.props;
		let {isStation,figureSets,floors,initializeConfigs,fileData,sameSize,scaleSize,stationObj}=this.state;
		var floor=[];
		floors.map((item,index)=>{
          var list={};
		  list.label=item;
		  list.value=item;
		  floor.push(list);
		})

        

		return(
         <div>
			 <Title value="平面图配置"/>
			 <Section  title='平面图配置开发' description="" style={{marginBottom:-5,minHeight:910}}>   
				<div className="wrap">
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					<div className='plan-header'> 

							<div className='header-floor'>
								<KrField  name='floor' label='楼层:' 
								 inline={true} component='select'
								 options={floor}
								 onChange={this.floor}
								/>
							</div>


							<div className="size-type">
								<input type="checkbox" id="sizeCheckbox" title="工位大小一致" onChange={this.sizeSameCheck}/>
								<span>工位大小一致</span>
							</div>


							<div className="num-type">
								<span className="til">当前比例：</span>    
								<input type="range" id="ratioSelect" min="0.1" max="2" step="0.1"  onChange={this.rangeSelect}/>
								<output id="ratioSelectVal">100</output>%
							</div>
									
								<div className='upload-img'>
								<input type="file" id="backgroundImg" name="file" style={{width:'60px'}} onChange={this.fileUpload}/>
								<div className="back-type">                       
								<span id="bgfilename" style={{fontSize:'14px'}}>
									
								</span> 
								</div>  
								<div className='upload-btn' onClick={this.upload}>上传</div>  
							</div>

							<div className='save-header' id='save-header' onClick={this.save}>保存</div>  
									
						</div>
				      

						<div className="m-station" id='m-station' 
						 onMouseDown={this.allStationDown}
						 onMouseUp={this.allStationUp}
						>

						<div className='station-pic' id='single-drag-square'></div>
						<div className="meeting-pic" id='single-drag-meeting'></div>

						<div className='plan-body-left'>
								<div className='tab-list'>
								<li id='tab-station' onMouseOver={this.mouseOverStaion}>
									<span>工位元件</span>
									{isStation&&<span className='single-station'></span>}
								</li>
								<li id='tab-meeting' onMouseOver={this.mouseOverMeeting}>
									<span>会议室元件</span>
									{!isStation&&<span className='single-meeting'></span>}
								</li>
								</div>
								<div className='plan-detail-list'>
								{isStation&&<div className='plan-station'>                  
                                     {figureSets&&figureSets.map((item,index)=>{
								       if(item.belongType=="STATION"){
										   return (<div key={index} className="plan-wrap-pic">
											<div className="station-pic"></div>
											<span>{item.cellName}</span>
							              </div>)
									   }
									 })}
								</div>}
								{!isStation&&<div className='plan-borderRoom'>
                                     {figureSets&&figureSets.map((item,index)=>{
								       if(item.belongType=="SPACE"){
										   return (<div key={index} className="plan-meeting-pic">
												<div className="meeting-pic">{item.cellName}</div>
											</div>)
									   }
									 })}
								</div>}
								</div>
							</div>



						</div>
						
						<PlanMapAll  
						  initializeConfigs={initializeConfigs}
						  fileData={fileData}
						  sameSize={sameSize}
						  scaleSize={scaleSize}
						  stationObj={stationObj}
						  />
					
					 </form>
					</div>
				 </Section>
             </div>
		); 
	}

}
export default reduxForm({ form: 'CommunityPlanMap'})(CommunityPlanMap);
