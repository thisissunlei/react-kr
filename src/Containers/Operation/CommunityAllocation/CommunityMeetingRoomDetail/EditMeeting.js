import React from 'react';
import {Actions,Store} from 'kr/Redux';
//import {mobxForm}  from 'kr/Utils/MobxForm';
import {reduxForm,initialize,change,FieldArray}  from 'redux-form';
import {Http,DateFormat} from 'kr/Utils';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup,
  DrawerTitle,
  Message
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';

import './spaceList.less';

const renderField = ({ input, label, placeholder,type, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label||placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

//标签
const renderMask = ({ fields, meta: { touched, error }}) => {
     var krStyle={};
      krStyle={
        width:520
     }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((maskStation, index) =>
      <li key={index} style={{width:600,listStyle:'none'}}>
        <KrField
          style={krStyle}
          grid={1/2}
          name={`${maskStation}.list`}
          type="text"
          component={renderField}
          label={index?'':'标签'}
          placeholder='标签'
          />
					<span onClick={
						() =>{
							if(fields.length>8)
							{return ;}
							fields.insert(index+1,{})
					}} className='addBtn' style={index?{marginTop:17}:{marginTop:32}}></span>
         <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}



@inject("CommunityMeetingModel")
@observer
class EditMeeting  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false,
			listDevice:[],
			//控制会议室
			watchMeeting:false,
			//控制路演厅
			watchHouse:false,
			//图片地址
			picUrl:'',
			picId:'',
			timeStart:'',
			timeEnd:'',
			StartTimeStr:'',
     	    EndTimeStr:'',
		}
	}


	componentWillMount(){
		   let {$form,id}=this.props;
		   //获取编辑信息
			var data={};
			data.id=id;
			var _this=this;
			Http.request('meeting-room-eidData',data).then(function(response) {
				   
				   response.startTime=response.closeStartDate || 0;
				   response.endTime=response.closeEndDate  || 0;
				   if(response.closeStartDate && response.closeEndDate ){
						 var StartTimeStr=DateFormat(response.startTime, 'yyyy-mm-dd HH:MM:ss');
						 	 StartTimeStr=StartTimeStr.substr(11,5);
						 var EndTimeStr=DateFormat(response.endTime, 'yyyy-mm-dd HH:MM:ss')
						     EndTimeStr=EndTimeStr.substr(11,5);
						      _this.setState({
								 StartTimeStr,
						   		 EndTimeStr
						   })
				   }


					 if(response.spaceType=='BOARDROOM'){
						 _this.setState({
							 watchMeeting:true,
							 watchHouse:false
						 })
					 }
					  if(response.spaceType=='ROADSHOW_HALL'){
						 _this.setState({
							 watchHouse:true,
							 watchMeeting:false
						 })
					 }
					 if(response.spaceType=='INDEPENDENT_OFFICE'){
						 _this.setState({
							 watchHouse:false,
							 watchMeeting:false
						 })
					 }


				   let deviceSpace=[];
				   _this.props.CommunityMeetingModel.spaceDevices.map((items,index)=>{
			        let list={};
			        list.label=items.label;
			        list.value=items.value;
			        items.checked=false;
			        response.deviceIds.map((item)=>{
			           if(item==items.value){
			           	 items.checked=true;
			           }
			        })
			        list.checked=items.checked;
			        deviceSpace.push(list);
				  })
				   _this.setState({
				   	    listDevice:deviceSpace,
						 picUrl:response.picUrl,
						 picId:response.picId,
						 timeStart:response.orderStartTimeStr,
						 timeEnd:response.orderEndTimeStr,
						 
				   })
				        Store.dispatch(initialize('EditMeeting',response));
						Store.dispatch(change('EditMeeting','maskStation',response.activeTypes.length?response.activeTypes:[{}]));
					  response.activeTypes.map((item,index)=>{
                      Store.dispatch(change('EditMeeting','maskStation['+index+'].list',item));
					  })
			    }).catch(function(err) {
					Message.error(err.message);
			    });
	  }

    onSubmit=(values)=> {

    	if(values.startTime && values.endTime){
			var startTime=DateFormat(values.startTime, 'yyyy-mm-dd hh:MM:ss');
				startTime=startTime.substring(0,10);
			var endTime=DateFormat(values.endTime, 'yyyy-mm-dd hh:MM:ss');
				endTime=endTime.substring(0,10);
			var StartTimeStr=values.StartTimeStr || this.state.StartTimeStr;
			var EndTimeStr=values.EndTimeStr || this.state.EndTimeStr;
			values.closeStartDate=`${startTime} ${StartTimeStr}`;
			values.closeEndDate=`${endTime} ${EndTimeStr}`;
		}
		values.id=this.props.CommunityMeetingModel.deleteId;
		values.communityId=this.props.CommunityMeetingModel.communityId;
	    const {
		   onSubmit
		} = this.props;
		console.log(values)
		onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}


	//校验商品名称
	 codeCompare=(params)=>{
		 this.props.CommunityMeetingModel.codeStationCompare(params.toString().trim());
	 }


     //设备
	deviceChange=(params,item)=>{
	  let list=[];
	  list=item.split(',');
	  Store.dispatch(change('EditMeeting', 'deviceIds',list));
	}


	spaceTypeChange=(params)=>{
		 if(params.value=='BOARDROOM'){
			 this.setState({
				 watchMeeting:true,
				 watchHouse:false
			 })
		 }

		  if(params.value=='ROADSHOW_HALL'){
			 this.setState({
				 watchHouse:true,
				 watchMeeting:false
			 })
		 }

		 if(params.value=='INDEPENDENT_OFFICE'){
			 this.setState({
				 watchHouse:false,
				 watchMeeting:false
			 })
		 }
	}

	priceBlur=(param)=>{
       if(!param){
          Store.dispatch(change('EditMeeting','quotedPrice','0'))
       }
	}



  render(){

     const {handleSubmit}=this.props;

     let {
     	  listDevice,
     	  watchMeeting,
     	  watchHouse,
     	  picUrl,
     	  timeStart,
     	  timeEnd,
     	  picId,
     	  StartTimeStr,
     	  EndTimeStr
     	}=this.state;

	  let defaultValue={
			picId:picId,
            picUrl:picUrl
	  }
   
    return(

    <div className='m-newMerchants new-meeting'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
					<DrawerTitle title ='编辑社区空间' onCancel = {this.onCancel}/>
           </div>
					 <KrField type='hidden' name="id"/>
	 				<KrField type='hidden' name="communityId"/>
	 				<KrField grid={1/2}
	 						style={{marginTop:1,width:262}}
	 						name="name"
	 						component="input"
	 						label="商品名称"
	 						requireLabel={true}
	 						onChange={this.codeCompare}
	 				/>

					<KrField grid={1/2}
							style={{width:262,marginLeft:28}}
							name="spaceType"
							component="select"
							label="房间类型"
							requireLabel={true}
							options={this.props.CommunityMeetingModel.sapceTypes}
							onChange={this.spaceTypeChange}
					/>

					{this.props.CommunityMeetingModel.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该商品名称已存在</div>}

	 				<KrField grid={1/2}
	 						style={{width:262}}
	 						name="floor"
	 						component="select"
	 						label="所在楼层"
	 						requireLabel={true}
	 						options={this.props.CommunityMeetingModel.floorData}
	 				 />
				<KrField grid={1/2}
					 style={{width:262,marginLeft:28}}
					 name="area"
					 component="input"
					 label="面积（㎡）"
					 requireLabel={true}
				 />
				<KrField grid={1/2}
					 style={{width:262}}
					 name="capacity"
					 component="input"
					 label="工位数"
					 requireLabel={true}
				/>
				<KrField grid={1/2}
					 style={{width:262,marginLeft:28}}
					 name="location"
					 component="input"
					 label="空间位置"
				 />

				<KrField grid={1/2}
					style={{width:262}}
					name="locationType"
					component="select"
					label="方位"
					requireLabel={true}
					options={[{value:'OUTSIDE_SPACE',label:'外侧间'},{value:'INSIDE_SPACE',label:'内侧间'},{value:'UNKNOWN',label:'未知'}]}
				/>
				<KrField grid={1/2}
					style={{width:262,marginLeft:28}}
					name="suiteType"
					component="select"
					label="有无套间"
					requireLabel={true}
					options={[{value:'SUITE',label:'有套间'},{value:'UNSUITE',label:'无套间'},{value:'UNKNOWN',label:'未知'}]}
				/>

				<KrField
                    style={{width:553}}
                    name="descr"
                    component="textarea"
                    label="补充描述"
                    maxSize={25}
                />

				 {watchMeeting&&<div>
				 	<div style={{display:'block'}} className='community-list-time'>
								<KrField component="timeSelect" label='预定时段'  style={{width:144,zIndex:5}} name='orderStartTimeStr' timeNum={timeStart} requireLabel={true}/>
								<span style={{display:'inline-block',marginTop:35,marginLeft:-11,marginRight:1}}>-</span>
								<KrField component="timeSelect"  style={{width:144,zIndex:5,marginLeft:-1,marginTop:15}} name='orderEndTimeStr' timeNum={timeEnd}/>
				 </div>


				 <KrField grid={1/2}
 					style={{width:262}}
 					name="busyPrice"
 					component="input"
					label='单价(积分/0.5h)(11:00~18:00)'
 					placeholder='高峰时段单价'
 					requireLabel={true}
 			 />



				 <KrField grid={1/2}
					style={{width:262,marginLeft:28}}
					name="idlePrice"
					component="input"
					label='单价(积分/0.5h)(其它时段)'
					placeholder='其它时段单价'
					requireLabel={true}
			 /></div>}



			{(watchMeeting||watchHouse)&&<KrField
					 label="空间图片"
					 name="picId"
					 component="newuploadImage"
					 innerstyle={{width:370,height:223,padding:16}}
					 sizePhoto
					 photoSize={'16:9'}
					 pictureFormat={'JPG,PNG,GIF'}
					 pictureMemory={'300'}
					 requestURI = '/api/krspace-finance-web/cmt/space/upload-photo/type/single'
					 inline={false}
					 formfile=' '
					 defaultValue={defaultValue}
					 center='center'
					 requireLabel={true}
				 />}



			{watchHouse&&<span>


			 <FieldArray name="maskStation" component={renderMask}/>

				<KrField
				style={{width:550}}
				grid={1}
				name='remark'
				heightStyle={{height:"78px",width:'541px'}}
				component="textarea"
				maxSize={500}
				label='场地描述'
				placeholder='场地描述'
				/></span>}

				

				<KrField grid={1/2} style={{width:262}} name="enable" component="group" label="启用状态">
					<KrField name="enable" label="启用" type="radio" value='ENABLE' />
					<KrField name="enable" label="不可用" type="radio" value='UNENABLE' />
				    <KrField name="enable" label="下架" type="radio" value='UNDERCARRIAGE' />
			   </KrField>

			    <KrField grid={1/2} style={{width:262,marginLeft:29}} name="quotedPrice" component="input"  label="商品总价"
                 onBlur={this.priceBlur}/>	
				
				{watchMeeting && <div className="u-meet-setting">
										<div className="u-checkbox">
											会议室被占用设置
										</div>
										<div className="u-meet-setTime">
												<KrField
														style={{width:120}}
														name="startTime"
														component="date"
												/>
												<KrField 
														component="timeSelect"
														style={{width:108,marginLeft:40}} 
														name="StartTimeStr"
														timeNum={StartTimeStr}
												/>
												<span style={{display:'inline-block',paddingLeft:10,marginTop:20}}>-</span>
												<KrField
														style={{width:120}}
														name="endTime"
														component="date"
												/>
												<KrField 
														component="timeSelect"  
														style={{width:108,marginLeft:40}} 
														name="EndTimeStr"
														timeNum={EndTimeStr}
												/>
										</div>
									</div>}
			    <div className='meeting-device'><KrField
							label="设备情况"
							name='deviceIds'
							component="groupCheckbox"
              defaultValue={listDevice}
              onChange={this.deviceChange}
			  	childrenInline = {true}
						/></div>




            <Grid style={{marginTop:17,marginBottom:5,marginLeft:-50}}>
              <Row>
                <Col md={12} align="center">
                  <ButtonGroup>
                    <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
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
	//正整数
	let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
	//整数
	let zeroNum=/^-?\d+$/;　

	let areaReg=/^(([1-9]{1}[0-9]{0,2})|([0])|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,2}\.\d{1,2}))$/;

	//空格
	let reg=/^\s*$/;

    if(!values.name||(values.name&&reg.test(values.name.toString().trim()))){
      errors.name='请输入商品名称';
    }

		if(!values.spaceType){
      errors.spaceType='请输入房间类型';
    }

    if(!values.floor){
      errors.floor='请输入所在楼层';
	}
	
	if(!values.locationType){
		errors.locationType='请选择方位';
	}

	if(!values.suiteType){
	    errors.suiteType='请选择有无套间';
	}

    if(!values.area||(values.area&&reg.test(values.area.toString().trim()))){
		errors.area='请输入面积'
	}

	if(values.area&&isNaN(values.area)){
		errors.area='面积为数字'
	}
	
	if(values.area&&!areaReg.test(values.area.toString().trim())){
		errors.area='请输入小于1000的数字,最多2位小数'
	}

  if(!values.capacity||(values.capacity&&reg.test(values.capacity.toString().trim()))){
		errors.capacity='请输入工位数'
	}

	if(values.capacity&&(!numberNotZero.test(values.capacity.toString().trim())&&values.capacity!=0)){
		errors.capacity='工位数为正整数或0'
	}

	if((!values.idlePrice&&values.idlePrice!=0)||(values.idlePrice&&reg.test(values.idlePrice.toString().trim()))){
	  errors.idlePrice='请输入空闲时段单价'
   }


if(values.idlePrice&&(!numberNotZero.test(values.idlePrice.toString().trim())&&values.idlePrice!=0)){
	errors.idlePrice='空闲时段单价为正整数或0'
}

if((!values.busyPrice&&values.busyPrice!=0)||(values.busyPrice&&reg.test(values.busyPrice.toString().trim()))){
   errors.busyPrice='请输入高峰时段单价'
}


if(values.busyPrice&&(!numberNotZero.test(values.busyPrice.toString().trim())&&values.busyPrice!=0)){
errors.busyPrice='高峰时段单价为正整数或0'
}

if(values.busyPrice&&values.busyPrice.toString().trim().length>5){
errors.busyPrice='高峰时段单价最多5位'
}
if(values.idlePrice&&values.idlePrice.toString().trim().length>5){
errors.idlePrice='空闲时段单价最多5位'
}




if(!values.picId){
errors.picId='请上传图片'
}


//标签
if (!values.maskStation || !values.maskStation.length) {
errors.maskStation = { _error: 'At least one member must be entered' }
} else {
const membersArrayErrors = []
values.maskStation.forEach((porTypes, memberIndex) => {
	const memberErrors = {}
	if (porTypes.list&&porTypes.list.toString().trim()&&porTypes.list.length>20) {
		memberErrors.list = '标签长度不超过20个字符'
		membersArrayErrors[memberIndex] = memberErrors
	}
})
if(membersArrayErrors.length) {
errors.maskStation = membersArrayErrors
}
}

    if(values.quotedPrice&&isNaN(values.quotedPrice)){
		errors.quotedPrice='商品总价为数字'
	}

	if(values.quotedPrice&&values.quotedPrice.length>18){
		  errors.quotedPrice='商品总价长度不能超过18位'
   	}


		return errors
}
export default reduxForm({ form: 'EditMeeting',validate})(EditMeeting);
