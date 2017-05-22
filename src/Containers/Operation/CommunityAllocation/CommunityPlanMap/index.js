import React from 'react';
import {
	Title,
	Section,
} from 'kr-ui';
import './index.less';
class CommunityPlanMap  extends React.Component{

	constructor(props,context){
		super(props, context);
	}



	render(){

		return(
         <div>
			 <Title value="平面图配置"/>
			 <Section  title='平面图配置开发' description="" style={{marginBottom:-5,minHeight:910}}>   
				<div className="wrap">
					<div className='plan-header'> 

							<div className='header-floor'>
								
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
								<li id='tab-station'>
									<span>工位元件</span>
									<span className='single-station' id='single-station'></span>
								</li>
								<li id='tab-meeting'>
									<span>会议室元件</span>
									<span className='single-meeting' id='single-meeting'></span>
								</li>
								</div>
								<div className='plan-detail-list'>
								<div className='plan-station' id='plan-station'>                  

								</div>
								<div className='plan-borderRoom' id='plan-borderRoom'>

								</div>
								</div>
							</div>



						</div>
						<div id="app" className="m-main"></div>
					</div>
				 </Section>
             </div>
		); 
	}

}

export default CommunityPlanMap 