import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

//楼层增加与减少
const renderMembers = ({ fields, meta: { touched, error } }) => {

	if(!fields.length){
	   fields.push({})
	 }

    //var fields=Array.prototype.slice.call(fields);
    //console.log('pppp---',fields instanceof Array)

  return (
      <ul style={{padding:0,margin:0}}>
    {fields.map((wherefloorsStr, index) => 
      <li key={index}>
        <div className="krFlied-box"><KrField 
          style={{width:239,marginLeft:16,marginRight:3}}
          requireLabel={true}
          grid={1/2}
          name={`${wherefloorsStr}.floor`}
          type="text"
          component={renderField}
          label="所在楼层"/>
          <span className="unit">层</span>
        </div>
        <div className="krFlied-box"><KrField
          style={{width:201,marginLeft:33,marginRight:3}}
          requireLabel={true}
          grid={1/2}
          name={`${wherefloorsStr}.stationCount`}
          type="text"
          component={renderField}
          label="可出租工位数"/>
           <span className="unit">个</span>
        </div>
        <span onClick={() => fields.insert(index+1,{})} className='addBtn'></span>       
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>

 )
}

//社区亮点
const renderBrights = ({ fields, meta: { touched, error },type,label}) => {
	if(!fields.length){
	   fields.push({type:type})
	 }  
	var krStyle={};  
	if(type=='BRIGHTPOINTS'){
      krStyle={
      	width:228,
      	marginLeft:18,
      	marginRight:3,
      }
	}else{
	  krStyle={
      	width:517,
      	marginLeft:15
      }
	}
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((brightsStr, index) =>
      <li key={index}>      
        <KrField
          style={krStyle}
          grid={1/2}
          name={`${brightsStr}.brightPoints`}
          type="text"
          component={renderField}
          label={label}
          />
        <span onClick={() => fields.insert(index+1,{type:type})} className='addBtn' style={{marginTop:32}}></span>       
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}


//工位价格
const renderStation = ({ fields, meta: { touched, error }}) => {
	if(!fields.length){
	   fields.push({})
	 }    
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((porTypesStr, index) =>
       <li key={index}><KrField 
          style={{width:262,marginLeft:15}}
          grid={1/2}
          name={`${porTypesStr}.type`}
          options={[{label:'移动办公桌',value:'MOBILE_DESK'},{label:'开放工作区',value:'OPEN_WORKSPACE'},{label:'独立工作区',value:'INDEPENDENT_WORKSPACE'}]}
          component='select'
          label="工位类型"/>
        <div className="krFlied-box"><KrField
          style={{width:153,marginLeft:30,marginRight:3}}
          grid={1/2}
          name={`${porTypesStr}.price`}
          type="text"
          component={renderField}
          label="工位价格"/>
          <span className="unit">元/工位/月</span>
        </div>
        <span onClick={() => fields.insert(index+1,{})} className='addBtn'></span>       
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}





@observer
 class EditCommunityList extends Component{

	static PropTypes = {
		
	}

	constructor(props){
		super(props);
		this.state={
			openDown:true,
            openUp:false,
            cityId:''
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
   
   //社区名称
   communityNameChange=(value)=>{
     State.communityName(value);
   }
   //社区编码
   communityCodeChange=(value)=>{
   	 State.communityCode(value);
   }
	
    //社区排序
    communityRankChange=(value)=>{
     let {cityId}=this.state;
   	 State.communityRank(value,cityId);
   } 

	//所属区县
    cityValue=(cityId,communityId,city)=>{
     this.setState({
        cityId:cityId 
      })
      Store.dispatch(change('editCommunityList','countyId',communityId));
    }

	

    //地图坐标
    locationMap=(value)=>{
      var xLocation=value.split(',')[0];
      var yLocation=value.split(',')[1];
      Store.dispatch(change('editCommunityList','latitude',xLocation));
      Store.dispatch(change('editCommunityList','longitude',yLocation));
    }

    componentWillMount(){
       let {id}=this.props;
       Store.dispatch(Actions.callAPI('communityGetEdit',{id:id})).then(function(response) {
	      Store.dispatch(initialize('editCommunityList',response)); 
	      Store.dispatch(change('editCommunityList','local',response.latitude+','+response.longitude));
	      Store.dispatch(change('editCommunityList','countyId',response.provinceName+'/'+response.countyName));
	      response.brights.map((item,index)=>{
            if(item.type=="BRIGHTPOINTS"){
            	Store.dispatch(change('editCommunityList','bright4['+index+'].brightPoints',item.brightPoints));
            	Store.dispatch(change('editCommunityList','bright4['+index+'].type','BRIGHTPOINTS'));
            }
            if(item.type=="INFRASTRUCTURE"){
            	Store.dispatch(change('editCommunityList','bright1['+index+'].brightPoints',item.brightPoints));
            	Store.dispatch(change('editCommunityList','bright1['+index+'].type','INFRASTRUCTURE'));
            }
            if(item.type=="SPECIALSERVICE"){
            	Store.dispatch(change('editCommunityList','bright3['+index+'].brightPoints',item.brightPoints));
            	Store.dispatch(change('editCommunityList','bright3['+index+'].type','SPECIALSERVICE'));
            }
            if(item.type=="BASICSERVICE"){
            	Store.dispatch(change('editCommunityList','bright2['+index+'].brightPoints',item.brightPoints));
            	Store.dispatch(change('editCommunityList','bright2['+index+'].type','BASICSERVICE'));
            }
            if(item.type=="TRANSPORTATION"){
            	Store.dispatch(change('editCommunityList','bright5.brightPoints',item.brightPoints));
            }
            if(item.type=="PERIMETER"){
            	Store.dispatch(change('editCommunityList','bright6.brightPoints',item.brightPoints));
            }
	      })

          if(response.opened==true){
          	 Store.dispatch(change('editCommunityList','opened','1')); 
          }
          if(response.opened==false){
          	 Store.dispatch(change('editCommunityList','opened','0')); 
          }
          
	   }).catch(function(err) {
		 Message.error(err.message);
	  });	
      
    
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
     

    
       //时间下拉开始
		var skipMinut=10;
        var arrMinuts=[];
        var arrHour=[];
        var arrMinuts_new=[];
        var arrHour_new=[];
        var optionsTime=[];
        var optionTimeList=[];
        for(var i=0;i<25;i++){
          arrHour.push(i);	
        }
        for(var i=0;i<6;i++){
          arrMinuts.push(i*skipMinut);
        }
        arrHour.map(function(item,index){
           if(item<10){
           	 item='0'+item;
           }
         arrHour_new.push(item);
        })
        arrMinuts.map(function(item,index){
           if(item==0){
           	 item='0'+item;
           }
          arrMinuts_new.push(item); 
        })
        for(var i=0;i<arrMinuts_new.length;i++){
        	 for(var j=0;j<arrHour_new.length;j++){
        	 	optionsTime.push(arrHour_new[j]+':'+arrMinuts_new[i]);
        	 }
        }        
        optionsTime.map((item,index)=>{
           optionTimeList.push({label:item,value:item});
        })
       //时间下拉结束

      

         let {openDown,openUp}=this.state;

		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
           <div>
			<form className="m-newMerchants communityList-m" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
				<div className="title">
						<div><span className="new-icon list-icon"></span><label className="title-text">编辑社区</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">
                                    <KrField grid={1/2} type='hidden' name='latitude' component="input" style={{width:0}}/>
                                    <KrField grid={1/2} type='hidden' name='longitude' component="input" style={{width:0}}/>
									<KrField grid={1/2} label="社区名称" name="name" component="input" style={{width:262,marginLeft:15}}  requireLabel={true} onChange={this.communityNameChange} />

                                    <KrField grid={1/2} label="社区编码" name="code" style={{width:262,marginLeft:28}} component="input" requireLabel={true} onChange={this.communityCodeChange}/>

                                    <div className="krFlied-box"><KrField grid={1/2} label="社区面积" name="area" style={{width:239,marginLeft:16,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">m<sup>2</sup></span></div>
                                    <KrField  grid={1/2}  name="businessAreaId" style={{width:262,marginLeft:22}} component='select'  label="所属商圈" inline={false}  
                                     options={toJS(State.searchData)}
                                    />

                                    <KrField grid={1/2} label="所属区县" name="countyId"  style={{width:262,marginLeft:16,position:'relative',zIndex:5}} component="city" onSubmit={this.cityValue} requireLabel={true}/>
									
									<KrField grid={1/2} label="详细地址" name="address" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>
									
								   	<div className='location-m'><KrField grid={1/2} label="社区坐标" component="input" name='local' style={{width:262,marginLeft:16}}  requireLabel={true}  onChange={this.locationMap}>			 
									</KrField>

									<a className='mapLocation' href={`http:\/\/api.map.baidu.com/lbsapi/getpoint/index.html`} target='_blank'/>
                     
									<KrField grid={1/2} label="大厦名称" name="buildName" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/></div>
									<KrField grid={1/2} label="装修情况" name="decoration"  style={{width:262,marginLeft:16,zIndex:2}} component="select" 
									  options={[{label:'毛坯',value:'ROUGHCAST'},{label:'简装',value:'PAPERBACK'},{label:'精装',value:'HARDCOVER'},{label:'豪装',value:'LUXURIOUS'}]}
									/>
									<KrField  grid={1/2}  name="orientation" style={{width:262,marginLeft:28}} component='select'  label="社区朝向" inline={false} 
                                      options={[{label:'东',value:'EAST'},{label:'南',value:'SOUTH'},{label:'西',value:'WEST'},{label:'北',value:'NORTH'},{label:'东南',value:'SOUTHEAST'},{label:'东北',value:'NORTHEAST'},{label:'西南',value:'SOUTHWEST'},{label:'西北',value:'NORTHWEST'}]}
									/>

									<div className="krFlied-box"><KrField grid={1/2} label="标准层高" name="floorHeight" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">m</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="社区入口" name="entryNum" style={{width:239,marginLeft:33,marginRight:3}} component="input" ></KrField><span className="unit">个</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="客梯数量" name="elevatorNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">部</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="货梯数量" name="cargoNum" style={{width:239,marginLeft:33,marginRight:3}} component="input" ></KrField><span className="unit">部</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="得房率" name="efficientRate" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">%</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="绿化率" name="greenRate" style={{width:239,marginLeft:36,marginRight:3}} component="input" ></KrField><span className="unit">%</span></div>	
                                    <div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">运营信息</label></div>
						<div className="small-cheek">
	
								<KrField grid={1/2} label="社区状态" name="opened" style={{width:262,marginLeft:15}} component="select" requireLabel={true} options={[{label:'已开业',value:'1'},{label:'未开业',value:'0'}]}/>
								<KrField grid={1/2} label="开业时间" name="openDate" style={{width:260,marginLeft:29}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="签约开始时间" name="signStartDate" style={{width:260,marginLeft:15}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="签约结束时间" name="signEndDate" style={{width:260,marginLeft:29}} component="date" requireLabel={true}/>
                                <div className="krFlied-box"><KrField grid={1/2} label="工位总数" name="stationNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">个</span></div>
								<div className="krFlied-box"><KrField grid={1/2} label="会议室总数" name="meetNum" style={{width:239,marginLeft:32,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">间</span></div>	
							   
                               
                                 
                                

                                <FieldArray name="wherefloors" component={renderMembers}/>
								
                                <KrField grid={1/2}  component="group" label="营业时间" style={{paddingLeft:'16px'}}>
								<div className='community-listDate'>
									<ListGroup>
										<ListGroupItem><div className='community-date-start' ><KrField  style={{width:120,marginLeft:-10,marginTop:2}} name="businessBegin" component="select" 
                                           options={optionTimeList}
										/></div></ListGroupItem>
											<div className='community-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
										<ListGroupItem><div className='community-date-end'><KrField name="businessEnd" style={{width:120,marginTop:2}} component="select" 
                                            options={optionTimeList}
										/></div></ListGroupItem>
									</ListGroup>
				                </div>
								</KrField>
								


								<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:9}} component="input" requireLabel={true}/>
								
						        <FieldArray name="bright4" component={renderBrights} type='BRIGHTPOINTS' label='社区亮点' />

						        
                                {openDown&&<div><div className='commmunity-open'><div className='open-inner' onClick={this.flagOpen}><span className='list-text'>展开</span><span className='list-pic'></span></div></div>
                                <div className="end-round two-round"></div></div>}

						        {openUp&&<div><div className='commmunity-down'><div className='open-inner' onClick={this.flagDown}><span className='list-text'>收起</span><span className='list-pic'></span></div></div><div className="middle-round"></div></div>}	
						        
						</div>
                        
                        
                      {openUp&&<div>
						<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							 <KrField grid={1/2} label="排序" name="orderNum" component="input" style={{width:262,marginLeft:15}} onChange={this.communityRankChange} />	
							 <KrField grid={1/2} label="官网显示状态" name="portalShow" style={{width:262,marginLeft:28,marginRight:13}} component="group" requireLabel={true}>
					              	<KrField name="portalShow" label="显示" type="radio" value={true} onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					             	<KrField name="portalShow" label="不显示" type="radio" value={false} onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					         </KrField>

					         <FieldArray name="porTypes" component={renderStation}/> 
					         <div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" name="description" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="textarea"  maxSize={200} placeholder='请输入社区简介' lengthClass='list-length-textarea'/></div>		
						     
						     <FieldArray name="bright1" component={renderBrights} type='INFRASTRUCTURE' label='基础设施' />
						     <FieldArray name="bright2" component={renderBrights} type='BASICSERVICE' label='基础服务' />
						     <FieldArray name="bright3" component={renderBrights} type='SPECIALSERVICE' label='特色服务' />      
						     <KrField grid={1/2} label="交通" name="bright5.brightPoints" component="input" style={{width:552,marginLeft:15}}/>
						     <KrField grid={1/2} label="周边" name="bright6.brightPoints" component="input" style={{width:552,marginLeft:15}}/>
						     <KrField name="uploadImage" 
								component="uploadImage" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					         />
						</div>
						<div className="end-round"></div>
                     </div>}


				    </div>
						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
										<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/>
									</ButtonGroup>
								</Col>
							</Row>
						</Grid>
				 </form>
			 </div>
		);
	}
}
const validate = values =>{

		const errors = {};
		let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
		let checkTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
		let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		let RMB=/^(([1-9]\d*)|0)(\.\d{2})?$/;
		let stationN = /^([1-9][0-9]{0,7})$/;
		let staionPriceReg = /^([1-9][0-9]{0,7})$|^\d{1,8}(\.\d{1,2})?$/;
        
        //正整数
		let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
		
		/*if (!values.wherefloorsStr || !values.wherefloorsStr.length) {
          errors.wherefloorsStr = { _error: 'At least one member must be entered' }
        } else {
          const membersArrayErrors = []
          values.wherefloorsStr.forEach((wherefloorsStr, memberIndex) => {
            const memberErrors = {}
            if (!wherefloorsStr || !wherefloorsStr.floor) {
              memberErrors.floor = '请输入所在楼层'
              membersArrayErrors[memberIndex] = memberErrors
            }
            if(wherefloorsStr.floor&&!noMinus.test(wherefloorsStr.floor)){
               memberErrors.floor = '楼层为非负整数'
               membersArrayErrors[memberIndex] = memberErrors
            }
            if (!wherefloorsStr || !wherefloorsStr.stationCount) {
              memberErrors.stationCount = '请输入可出租工位数'
              membersArrayErrors[memberIndex] = memberErrors
            }
            if(wherefloorsStr.stationCount&&!noMinus.test(wherefloorsStr.stationCount)){
               memberErrors.stationCount = '可出租工位数为非负整数'
               membersArrayErrors[memberIndex] = memberErrors
            }
          })
        if(membersArrayErrors.length) {
          errors.wherefloorsStr = membersArrayErrors
        }
         }


          //工位校验
		   if (!values.porTypesStr || !values.porTypesStr.length) {
			    errors.porTypesStr = { _error: 'At least one member must be entered' }
			  } else {
			    const membersArrayErrors = []
			    values.porTypesStr.forEach((porTypesStr, memberIndex) => {
			      const memberErrors = {}
			      if (!porTypesStr.type&&porTypesStr.price) {
			        memberErrors.type = '请填写工位类型'
			        membersArrayErrors[memberIndex] = memberErrors
			      }
			      if (porTypesStr.price&&!zeroNum.test(porTypesStr.price)&&porTypes.price.length>5) {
			        memberErrors.price = '价格不超过五位整数'
			        membersArrayErrors[memberIndex] = memberErrors
			      }

			      if (porTypesStr.type&&!porTypesStr.price) {
			        memberErrors.price = '请填写工位价格'
			        membersArrayErrors[memberIndex] = memberErrors
			      }
			    })
		    if(membersArrayErrors.length) {
		      errors.porTypesStr = membersArrayErrors
		    }
         }
         
         

            //基础设施类	
            if (!values.bright1 || !values.bright1.length) {
			    errors.bright1 = { _error: 'At least one member must be entered' }
			  } else {	  
			    const bright1ArrayErrors = []
			    values.bright1.forEach((bright1, memberIndex) => {
			      const memberErrors = {}
			      if (bright1.brightPoints&&bright1.brightPoints.length>100) {
			      	bright1.brightPoints=bright1.brightPoints.substr(0,bright1.brightPoints.length-1);
			        memberErrors.brightPoints = '不能超过100字'
			        bright1ArrayErrors[memberIndex] = memberErrors
			      }
			    })
		    if(bright1ArrayErrors.length) {
		      errors.bright1 = bright1ArrayErrors
		    }
         }

         

        
         

		if(!values.name){
			errors.name = '请填写社区名称';
		}

		if(!values.code){
			errors.code='请填写社区编码';
		}

		if(!values.local){
			errors.local='请输入社区坐标';
		}
        
		if(!values.area){
			errors.area='请输入社区面积';
		}
		if(values.area&&!numberNotZero.test(values.area)){
			 errors.area='请输入正整数';
		}

		if (!values.countyId) {
			errors.countyId= '请填写所属区县';
		}

		if (!values.address) {
			errors.address= '请输入详细地址';
		}

		if(values.orderNum&&!numberNotZero.test(values.orderNum)){
			errors.orderNum='只能输入正整数';
		}

		if (!values.opened) {
			errors.opened= '请输入社区状态';
		}

		if (!values.openDate) {
			errors.openDate= '请输入开业时间';
		}

		if (!values.signStartDate) {
			errors.signStartDate= '请输入签约开始时间';
		}

		if (!values.signEndDate) {
			errors.signEndDate= '请输入签约结束时间';
		}

		if (!values.stationNum) {
			errors.stationNum= '请输入工位总数';
		}

		if (!values.meetNum) {
			errors.meetNum= '请输入会议室总数';
		}

		if (!values.contract) {
			errors.contract= '请输入联系方式';
		}

		if(!values.contract){
			errors.contract='请输入联系方式'
		}else if(!phone.test(values.contract)||!checkTel.test(values.contract)){
			errors.contract='联系方式错误'
		}*/
		return errors
	}
export default reduxForm({ form: 'editCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(EditCommunityList);
