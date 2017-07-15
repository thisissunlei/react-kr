import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	KrField,
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class WatchCommunityList extends  React.Component{

	constructor(props){
		super(props);
	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
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
    openTime=DateFormat(toJS(State.detailData.openDate),"yyyy-mm-dd");
    startTime=DateFormat(toJS(State.detailData.signStartDate),"yyyy-mm-dd");
    endTime=DateFormat(toJS(State.detailData.signEndDate),"yyyy-mm-dd");

    if(toJS(State.detailData.opened)==true){
      inforStyle='已开业';
    }
    if(toJS(State.detailData.opened)==false){
      inforStyle='未开业';
    }

	  var whereFloor=[];
  
    if(State.detailData.wherefloors){
      State.detailData.wherefloors.map((item,index)=>{
        whereFloor.push(item);
      })
    }

    var area='';
    if(State.detailData.area){
      area=State.detailData.area;
    }else{
      area='无';
    }



		const {handleSubmit} = this.props;

		return (
           <div className='communityList-m' style={{paddingLeft:9}}>
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

								   	<KrField grid={1/2} label="社区坐标" component="labelText" style={{width:262,marginLeft:15}}  inline={false} value={State.detailData.latitude&&State.detailData.longitude?'x:'+State.detailData.longitude+',y:'+State.detailData.latitude:'无'}>
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
                
                    <div className="end-round" style={{left:'-42px'}}></div>
                </div>

				    </div>

			 </div>
		);
	}
}

export default reduxForm({ form: 'WatchCommunityList'})(WatchCommunityList);
