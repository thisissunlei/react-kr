import React from 'react';
import {Actions,Store} from 'kr/Redux';
//import {mobxForm}  from 'kr/Utils/MobxForm';
import {reduxForm,change,FieldArray}  from 'redux-form';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
	DrawerTitle,
  ButtonGroup
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
      {fields.map((maskStation, index) =>{
				return (
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
	      </li>)
			}
    )}
  </ul>

 )
}





@inject("CommunityMeetingModel")
@observer
class NewAddMeeting  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false,
			//控制会议室
			watchMeeting:false,
			//控制路演厅
			watchHouse:false,
		}
	}

	componentDidMount(){
	  Store.dispatch(change('NewAddMeeting','enable','1'));
		Store.dispatch(change('NewAddMeeting','maskStation',[{}]));
	}

    onSubmit=(values)=> {
		values.id='';
		if(values.startTime && values.endTime){
			var startTime=values.startTime.substring(0,10);
			var endTime=values.endTime.substring(0,10);
			values.closeStartDate=`${startTime} ${values.StartTimeStr}`;
			values.closeEndDate=`${endTime} ${values.EndTimeStr}`;
		}
		values.communityId=this.props.CommunityMeetingModel.communityId;
		
	    const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}


    //校验空间名称
	codeCompare=(params)=>{
      this.props.CommunityMeetingModel.codeStationCompare(params.toString().trim());
	}

    //设备
	deviceChange=(params,item)=>{
	  let list=[];
	  list=item.split(',');
	  Store.dispatch(change('NewAddMeeting', 'deviceIds',list));
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
          Store.dispatch(change('NewAddMeeting','quotedPrice','0'))
       }
	}





	render(){

		let {watchMeeting,watchHouse}=this.state;

		let deviceSpace=[];
		this.props.CommunityMeetingModel.spaceDevices.map((item)=>{
           let list={};
           list.label=item.label;
           list.value=item.value;
           deviceSpace.push(list);
		})

        const {handleSubmit}=this.props;

		return(


	  <div className='m-newMerchants new-meeting meeting-list'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
					<DrawerTitle title ='新增社区空间' onCancel = {this.onCancel}/>
           </div>
            <KrField type='hidden' name="id"/>
						<KrField type='hidden' name="communityId"/>
            <KrField grid={1/2}
								style={{marginTop:1,width:262}}
								name="name"
								component="input"
								label="空间名称"
								requireLabel={true}
	              onChange={this.codeCompare}
						/>

						<KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="spaceType"
								component="select"
								label="空间类型"
							 	requireLabel={true}
								options={this.props.CommunityMeetingModel.sapceTypes}
								onChange={this.spaceTypeChange}
						/>
						{this.props.CommunityMeetingModel.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该空间名称已存在</div>}

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
								label="可容纳人数"
								requireLabel={true}
						 />
                <KrField grid={1/2}
							 	style={{width:262,marginLeft:28}}
								name="location"
								component="input"
								label="空间位置"
							/>



               {watchMeeting&&<div><div style={{display:'block'}} className='community-list-time'>

											<KrField component="timeSelect" label='预定时段'  style={{width:144,zIndex:5}} name='orderStartTimeStr' requireLabel={true}/>
											<span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>-</span>
											<KrField component="timeSelect"  style={{width:144,zIndex:5,marginLeft:-1,marginTop:15}} name='orderEndTimeStr'/>
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
 								requestURI = 'http://op.krspace.cn/api/krspace-finance-web/cmt/space/upload-photo/type/single'
 								inline={false}
 								formfile=' '
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


					 <KrField grid={1/2} style={{width:262}} name="enable" component="group" label="状态" requireLabel={false}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="禁用" type="radio" value='0' />
 						</KrField>

                      <KrField grid={1/2} style={{width:262,marginLeft:29}} name="quotedPrice" component="input"  label="报价"
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
														name='StartTimeStr'
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
														name='EndTimeStr'
												/>
										</div>
									</div>}

						<div className='meeting-device'><KrField
							label="设备情况"
							name='deviceIds'
							component="groupCheckbox"
              defaultValue={deviceSpace}
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

  //空格
	let reg=/^\s*$/;

    if(!values.name||(values.name&&reg.test(values.name.toString().trim()))){
      errors.name='请输入空间名称';
    }

		if(!values.spaceType){
      errors.spaceType='请输入空间类型';
    }

    if(!values.floor){
      errors.floor='请输入所在楼层';
    }

    if(!values.area||(values.area&&reg.test(values.area.toString().trim()))){
		errors.area='请输入面积'
	}

	if(values.area&&isNaN(values.area)){
		errors.area='面积为数字'
	}


  if(!values.capacity||(values.capacity&&reg.test(values.capacity.toString().trim()))){
		errors.capacity='请输入可容纳人数'
	}

	if(values.capacity&&(!numberNotZero.test(values.capacity.toString().trim())&&values.capacity!=0)){
		errors.capacity='可容纳人数为正整数或0'
	}

	if(!values.idlePrice||(values.idlePrice&&reg.test(values.idlePrice.toString().trim()))){
	  errors.idlePrice='请输入空闲时段单价'
   }


if(values.idlePrice&&(!numberNotZero.test(values.idlePrice.toString().trim())&&values.idlePrice!=0)){
	errors.idlePrice='空闲时段单价为正整数或0'
}

if(!values.busyPrice||(values.busyPrice&&reg.test(values.busyPrice.toString().trim()))){
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
		errors.quotedPrice='报价为数字'
	}
	 
	 if(values.quotedPrice&&values.quotedPrice.length>18){
		  errors.quotedPrice='报价长度不能超过18位'
   	}

		return errors
}
export default reduxForm({ form: 'NewAddMeeting',
	validate
})(NewAddMeeting);
