import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class WatchCommunityList extends Component{

	static PropTypes = {
		
	}

	constructor(props){
		super(props);
		this.state={
			openDown:true,
            openUp:false,
		}
	}
	onSubmit = (values) => {	
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
   
 
 

	
	componentDidMount(){
      
	}

	componentWillReceiveProps(nextProps) {
		
	}
    
    
    
    //展开
    flagOpen=()=>{
      this.setState({
      	openDown:false,
        openUp:true,
      })
    }

    flagDown=()=>{
      this.setState({
      	openDown:true,
        openUp:false,
      })
    }
   

	render(){
     
    var homeDecoration='';
    var communityGo='';
    if(toJS(State.detailData.decoration)=='ROUGHCAST'){
      homeDecoration='毛坯';
    }
    if(toJS(State.detailData.decoration)=='PAPERBACK'){
      homeDecoration='简装';
    }
    if(toJS(State.detailData.decoration)=='HARDCOVER'){
      homeDecoration='精装';
    }
    if(toJS(State.detailData.decoration)=='LUXURIOUS'){
      homeDecoration='豪装';
    }

    if(toJS(State.detailData.orientation)=='EAST'){
      communityGo='东';
    }
    if(toJS(State.detailData.orientation)=='SOUTH'){
      communityGo='南';
    }
    if(toJS(State.detailData.orientation)=='WEST'){
      communityGo='西';
    }
    if(toJS(State.detailData.orientation)=='NORTH'){
      communityGo='北';
    }
    if(toJS(State.detailData.orientation)=='SOUTHEAST'){
      communityGo='东南';
    }
    if(toJS(State.detailData.orientation)=='NORTHEAST'){
      communityGo='东北';
    }
    if(toJS(State.detailData.orientation)=='SOUTHWEST'){
      communityGo='西南';
    }
    if(toJS(State.detailData.orientation)=='NORTHWEST'){
      communityGo='西北';
    }

    var openTime='';
    var startTime='';
    var endTime='';
    var inforStyle='';
    var hereWatch='';
    openTime=dateFormat(toJS(State.detailData.openDate),"yyyy-mm-dd");
    startTime=dateFormat(toJS(State.detailData.signStartDate),"yyyy-mm-dd");
    endTime=dateFormat(toJS(State.detailData.signEndDate),"yyyy-mm-dd");
    
    if(toJS(State.detailData.opened)==true){
      inforStyle='已开业';
    }
    if(toJS(State.detailData.opened)==false){
      inforStyle='未开业';
    }

    if(toJS(State.detailData.portalShow)==true){
      hereWatch='显示';
    }
    if(toJS(State.detailData.portalShow)==false){
      hereWatch='不显示';
    }

    
        var brights_brights=[];
	    var brights_basic=[];
	    var brights_special=[];
	    var brights_ports=[];
	    var brights_round=[];
	    var brights_service=[];
	    var whereFloor=[];
	    var photo=[];
	    var propType=[];
    if(State.detailData.brights){
    	State.detailData.brights.map((item,index)=>{
       if(item.type=='BRIGHTPOINTS'){
       	 brights_brights.push(item); 
       }
       if(item.type=='INFRASTRUCTURE'){
       	 brights_basic.push(item); 
       }
       if(item.type=='SPECIALSERVICE'){
       	 brights_special.push(item); 
       }
       if(item.type=='TRANSPORTATION'){
       	 brights_ports.push(item); 
       }
       if(item.type=='PERIMETER'){
       	 brights_round.push(item); 
       }
       if(item.type=='BASICSERVICE'){
       	 brights_service.push(item); 
       }
    })

    }

    if(State.detailData.wherefloors){
      State.detailData.wherefloors.map((item,index)=>{
        whereFloor.push(item);
      })	 
    }
    if(State.detailData.photos){
      State.detailData.photos.map((item,index)=>{
        photo.push(item);
      })	 
    }
    if(State.detailData.porTypes){
      State.detailData.porTypes.map((item,index)=>{
        propType.push(item);
      })	 
    }
    
    var area='';
    if(State.detailData.area){
      area=State.detailData.area; 
    }else{
      area='无'; 
    }


    //if(State.detailData.)
    console.log(';;;----',State.detailData.photoVOs);
   
         
    let {openDown,openUp}=this.state;


		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
           <div className='m-newMerchants communityList-m' style={{paddingLeft:9}}>
				<div className="title">
						<div><span className="new-icon list-icon"></span><label className="title-text">社区详情</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">
									<KrField grid={1/2} label="社区名称"  component="labelText" style={{width:262,marginLeft:15}} inline={false} value={toJS(State.detailData.name)?toJS(State.detailData.name):'无'}/>

                                    <KrField grid={1/2} label="社区编码"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.code)?toJS(State.detailData.code):'无'} />

                                    <KrField grid={1/2} label="社区面积"  style={{width:262,marginLeft:15}} inline={false} component="labelText" value={(<div style={{marginTop:-5}}><span>{area}</span><span>m</span><sup>2</sup></div>)}></KrField>

                                    
                                    <KrField  grid={1/2}  style={{width:262,marginLeft:28}} component='labelText'  label="所属商圈" inline={false} value={toJS(State.detailData.businessAreaName)?toJS(State.detailData.businessAreaName):'无'}
                                    />
                                    
                                    <KrField grid={1/2} label="所属区县"   style={{width:262,marginLeft:15}} component="labelText" inline={false} value={State.detailData.provinceName&&State.detailData.cityName&&State.detailData.countyName?State.detailData.provinceName+'/'+State.detailData.cityName+'/'+State.detailData.countyName:'无'}/>
									
									<KrField grid={1/2} label="详细地址"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.address)?toJS(State.detailData.address):'无'}/>
									
								   	<KrField grid={1/2} label="社区坐标" component="labelText" style={{width:262,marginLeft:15}}  inline={false} value={State.detailData.latitude&&State.detailData.longitude?'x:'+State.detailData.latitude+',y:'+State.detailData.longitude:'无'}>			 
									</KrField>

                     
									<KrField grid={1/2} label="大厦名称"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.buildName)?toJS(State.detailData.buildName):'无'}/>
									<KrField grid={1/2} label="装修情况"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={homeDecoration?homeDecoration:'无'}
									/>
									<KrField  grid={1/2}  style={{width:262,marginLeft:28}} component='labelText'  label="社区朝向" inline={false} value={communityGo?communityGo:'无'}
									/>

									<KrField grid={1/2} label="标准层高" style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.floorHeight)?toJS(State.detailData.floorHeight)+'m':'无'}></KrField>
									<KrField grid={1/2} label="社区入口" style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.entryNum)?toJS(State.detailData.entryNum)+'个':'无'}></KrField>

									<KrField grid={1/2} label="客梯数量"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.elevatorNum)?toJS(State.detailData.elevatorNum)+'部':'无'}></KrField>
									<KrField grid={1/2} label="货梯数量"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.cargoNum)?toJS(State.detailData.cargoNum)+'部':'无'}></KrField>

									<KrField grid={1/2} label="得房率"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.efficientRate)?toJS(State.detailData.efficientRate)+'%':'无'}></KrField>
									<KrField grid={1/2} label="绿化率"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.greenRate)?toJS(State.detailData.greenRate)+'%':'无'}></KrField>
                                    <div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">运营信息</label></div>
						<div className="small-cheek">
	
								<KrField grid={1/2} label="社区状态"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={inforStyle?inforStyle:'无'}/>
								<KrField grid={1/2} label="开业时间"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={openTime?openTime:'无'}/>
								<KrField grid={1/2} label="签约开始时间"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={startTime?startTime:'无'}/>
								<KrField grid={1/2} label="签约结束时间"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={endTime?endTime:'无'}/>
                                <KrField grid={1/2} label="工位总数"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.stationNum)?toJS(State.detailData.stationNum)+'个':'无'}></KrField>
								<KrField grid={1/2} label="会议室总数"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.meetNum)?toJS(State.detailData.meetNum)+'间':'无'}></KrField>
							   
                               {
                               	whereFloor.map((item,index)=>{
                                   return (<div>
                                     <KrField grid={1/2} label="所在楼层"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={item.floor+'层'}></KrField>
								     <KrField grid={1/2} label="可出租工位数"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={item.stationCount+'个'}></KrField>	  
                                   	</div>)
                               	})
                               }
                                 
                                

								
                                <KrField grid={1/2}  component="labelText" label="营业时间" style={{width:262,marginLeft:15}} inline={false} value={State.detailData.businessBegin&&State.detailData.businessEnd?State.detailData.businessBegin+' 至 '+State.detailData.businessEnd:'无'}>
								
								</KrField>
								


								<KrField grid={1/2} label="联系方式" style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.contract)?toJS(State.detailData.contract):'无'}/>
								
                                {
                                  brights_brights.map((item,index)=>{
                                     return  <KrField grid={1} label="社区亮点"  style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints}/>   
                                  })	
                                }
						        
                                {openDown&&<div><div className='commmunity-open'><div className='open-inner' onClick={this.flagOpen}><span className='list-text'>展开</span><span className='list-pic'></span></div></div>
                                <div className="end-round two-round"></div></div>}

						        {openUp&&<div><div className='commmunity-down'><div className='open-inner' onClick={this.flagDown}><span className='list-text'>收起</span><span className='list-pic'></span></div></div><div className="middle-round"></div></div>}	
						        
						</div>
                        
                        
                      {openUp&&<div>
						<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							 <KrField grid={1/2} label="排序" component="labelText" style= {{width:262,marginLeft:15}} inline={false} value={toJS(State.detailData.orderNum)?toJS(State.detailData.orderNum):'无'}/>	
							 <KrField grid={1/2} label="官网显示状态"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={hereWatch}>
					         </KrField>
                             
                              {
                               	propType.map((item,index)=>{
                                   return (<div>
                                     <KrField grid={1/2} label="工位类型"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={item.type=='MOBILE_DESK'?'移动办公桌':(item.type=='OPEN_WORKSPACE'?'开放工作区':(item.type=='INDEPENDENT_WORKSPACE'?'独立工作区':'无'))}></KrField>
								     <KrField grid={1/2} label="工位价格"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={item.price=='0'?'0':item.price}></KrField>	  
                                   	</div>)
                               	})
                               }
                                 

					         <div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="labelText"   lengthClass='list-length-textarea' inline={false} value={toJS(State.detailData.description)?toJS(State.detailData.description):'无'}/></div>		
						     
						       {
                                  brights_basic.map((item,index)=>{
                                     return  <KrField grid={1} label="基础设施" style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints}/>   
                                  })	
                                }
						        
						        {
                                  brights_service.map((item,index)=>{
                                     return  <KrField grid={1} label="基础服务" style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints}/>   
                                  })	
                                }
						        
						        {
                                  brights_special.map((item,index)=>{
                                     return  <KrField grid={1} label="特色服务" style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints} />   
                                  })	
                                }
						        
						        {
                                  brights_ports.map((item,index)=>{
                                     return  <KrField grid={1} label="交通" style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints}/>   
                                  })	
                                }
						        
						        {
                                  brights_round.map((item,index)=>{
                                     return  <KrField grid={1} label="周边"  style= {{marginLeft:15}} component="labelText" inline={false} value={item.brightPoints}/>   
                                  })	
                                }
						        
                    <div style={{marginTop:'-4px',marginBottom:'20px'}}>
                      <span className='pic-first'>首页图片</span>
                      {
                        State.detailData.photoVOs&&State.detailData.photoVOs.map((item,index)=>{
                           if(item.type=='THEFIRST'){
                             return <img className="image"  src={item.photoUrl}  ref="uploadImage" style={{display:'inline-block',marginLeft:'30px'}}/>
                           }                  
                        })
                      } 
                    </div>

                    <div style={{marginTop:'16px',marginBottom:'20px'}}>
                      <span className='pic-first'>社区列表页图片</span>
                       {
                        State.detailData.photoVOs&&State.detailData.photoVOs.map((item,index)=>{
                           if(item.type=='LIST'){
                             return <img className="image"  src={item.photoUrl}  ref="uploadImage" style={{display:'inline-block',marginLeft:'30px'}}/>
                           }
                        })
                      } 
                    </div>


                    <div style={{marginTop:'16px',marginBottom:'20px'}}>
                      <span className='pic-first'>详情页图片</span>
                       {
                        State.detailData.photoVOs&&State.detailData.photoVOs.map((item,index)=>{
                           if(item.type=='DETAILS'){
                             return <img className="image"  src={item.photoUrl}  ref="uploadImage" style={{display:'inline-block',marginLeft:'30px'}}/>
                           }
                        })
                      } 
                    </div>
 
						     
						</div>
						<div className="end-round"></div>
                     </div>}


				    </div>
						
			 </div>
		);
	}
}

export default reduxForm({ form: 'WatchCommunityList',enableReinitialize:true,keepDirtyOnReinitialize:true})(WatchCommunityList);
