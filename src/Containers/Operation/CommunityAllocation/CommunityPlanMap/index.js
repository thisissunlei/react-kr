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
		}
	}

componentWillMount(){
	 var _this=this;
	 var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
	 window.planInfo = {};
	  Http.request('getCommunityFloors',{
		  communityId:href
	  }).then(function(response) {
		    _this.setState({
				floors:response.floors,
			})
	  }).catch(function(err) {
			Message.error(err.message);
	  })

	  Http.request('plan-get-detail',{
		  floor:3,
		  communityId:href
	  }).then(function(response) {
			console.log('resp',response);
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
				obj.name = item.cellname;
				obj.basic = {
				name:item.cellname,
				id:item.canFigureId
				};

				return obj;
			});

				window.planInfo.stations = [].concat(stations[0]);
				window.planInfo.backgroundImage = response.graphFilePath;

				var InitializeConfigs = {
					stations:stations,
					scale:1,
					backgroundImageUrl:window.planInfo.backgroundImage
				}

				//window.map = new Map('app',InitializeConfigs);
          
            if(response.stationSizeSame=='SAME'){
				document.getElementById("sizeCheckbox").checked=true;
			}
            _this.setState({
			 figureSets:response.figureSets	
			})
		}).catch(function(err) {
			Message.error(err.message);
		})
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
    console.log('bar',value);
  }
  
  //工位大小一致
  sizeSameCheck=(event)=>{
    map.setStationToSame(event.target.checked,function(code,message){
      if(code<0){
        alert('请选择工位');
        document.getElementById("sizeCheckbox").checked=false;
      }
    })
  }
  
  //放大比例
  rangeSelect=(event)=>{
    document.getElementById("ratioSelectVal").innerHTML=parseInt(event.target.value*100);
    map.setScale(Number(event.target.value));
  }
 
  //上传文件
  fileUpload=(event)=>{
    document.getElementById("bgfilename").innerHTML=event.target.files[0].name;
    map.setBackgroundImage(event.target.files[0]);
  }

  //保存
  save=()=>{
   
  }
  
  //上传
  upload=()=>{
   
  }


	render(){

        let {handleSubmit}=this.props;
		let {isStation,figureSets,floors}=this.state;
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
				      

						<div className="m-station" id='m-station'>

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
						<div id="app" className="m-main">
							<PlanMapAll />
						</div>
					 </form>
					</div>
				 </Section>
             </div>
		); 
	}

}
export default reduxForm({ form: 'CommunityPlanMap'})(CommunityPlanMap);
