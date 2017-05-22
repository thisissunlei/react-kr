import React from 'react';
import {reduxForm,initialize,change}  from 'redux-form';
import {
	Title,
	Section,
	KrField,
	Message,
} from 'kr-ui';
import {Http} from 'kr/Utils';
import './index.less';
class CommunityPlanMap  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isStation:true,
			figureSets:[]
		}
	}

componentDidMount(){
	 var _this=this;
	  Http.request('plan-get-detail',{
		  floor:3,
		  communityId:4
	  }).then(function(response) {
			console.log('resp',response);
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


	render(){

        let {handleSubmit}=this.props;
		let {isStation,figureSets}=this.state;

		return(
         <div>
			 <Title value="平面图配置"/>
			 <Section  title='平面图配置开发' description="" style={{marginBottom:-5,minHeight:910}}>   
				<div className="wrap">
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					<div className='plan-header'> 

							<div className='header-floor'>
								<KrField  name='floor' label='楼层' inline={true} component='select'/>
							</div>


							<div className="size-type">
								<input type="checkbox" id="sizeCheckbox" title="工位大小一致" />
								<span>工位大小一致</span>
							</div>


							<div className="num-type">
								<span className="til">当前比例：</span>    
								<input type="range" id="ratioSelect" min="0.1" max="2" step="0.1"  />
								<output id="ratioSelectVal">100</output>%
							</div>
									
								<div className='upload-img'>
								<input type="file" id="backgroundImg" name="file" style={{width:'60px'}} />
								<div className="back-type">                       
								<span id="bgfilename">
									
								</span> 
								</div>  
								<div className='upload-btn'>上传</div>  
							</div>

							<div className='save-header' id='save-header'>保存</div>  
									
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
						<div id="app" className="m-main"></div>
					 </form>
					</div>
				 </Section>
             </div>
		); 
	}

}
export default reduxForm({ form: 'CommunityPlanMap'})(CommunityPlanMap);
