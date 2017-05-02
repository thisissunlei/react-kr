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
  ButtonGroup
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';


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
	   if(!fields.length){
      fields.push({})
		 }
		 if(fields.length>9){
		 }
     var krStyle={};
      krStyle={
        width:520
     }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((brightsStr, index) =>
      <li key={index} style={{width:600}}>
        <KrField
          style={krStyle}
          grid={1/2}
          name={`${brightsStr}.brightPoints`}
          type="text"
          component={renderField}
          label={index?'':'标签'}
          placeholder='标签'
          />
        <span onClick={() => fields.insert(index+1,{})} className='addBtn' style={index?{marginTop:17}:{marginTop:32}}></span>
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
class NewAddMeeting  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false,
			//控制会议室
			watchMeeting:false,
			//控制路演厅
			watchHouse:false
		}
	}

	componentDidMount(){
	  Store.dispatch(change('NewAddMeeting','enable','1'));
	}

    onSubmit=(values)=> {
		values.id='';
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
      this.props.CommunityMeetingModel.codeStationCompare(params);
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

	  <div className='m-newMerchants meeting-list'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">新增社区空间</label></div>
              <div className="customer-close" onClick={this.onCancel}></div>
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

            <KrField grid={1/2}
								style={{width:262}}
								name="floor"
								component="select"
								label="所在楼层"
							 	requireLabel={true}
							 	options={this.props.CommunityMeetingModel.floorData}
						 />
						 {this.props.CommunityMeetingModel.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该空间名称已存在</div>}
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


               {watchMeeting&&<div><div style={{display:'inline-block'}} className='community-list-time'>
											<KrField component="selectTime" label='预定时段'  style={{width:144,zIndex:5}} name='orderStartTime' requireLabel={true}/>
											<span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>~</span>
											<KrField component="selectTime"  style={{width:144,zIndex:5,marginLeft:-1,marginTop:15}} name='orderEndTime'/>
               </div>

							 <KrField
 									 label=""
 									 name="picId"
 									 component="newuploadImage"
 									 innerstyle={{width:332,height:186,padding:16}}
 									 sizePhoto
 									 photoSize={'16:9'}
 									 pictureFormat={'JPG,PNG,GIF'}
 									 pictureMemory={'300'}
 									 requestURI = '/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic'
 									 inline={false}
 									 formfile=' '
 									 center='center'
 								 />


							 <KrField grid={1/2}
						  	style={{width:262}}
								name="idlePrice"
								component="input"
								label="单价(积分/0.5h)"
								requireLabel={true}
						 />

						  <KrField grid={1/2}
						  	style={{width:262,marginLeft:28}}
								name="busyPrice"
								component="input"
								label="单价(积分/0.5h)"
								requireLabel={true}
						 /></div>}






						{watchHouse&&<span><KrField
								label=""
								name="picId"
								component="newuploadImage"
								innerstyle={{width:332,height:186,padding:16}}
								sizePhoto
								photoSize={'16:9'}
								pictureFormat={'JPG,PNG,GIF'}
								pictureMemory={'300'}
								requestURI = '/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic'
								inline={false}
								formfile=' '
								center='center'
							/>


					   <FieldArray name="bright" component={renderMask}/>

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


					 <KrField grid={1/2}  name="enable" component="group" label="状态" requireLabel={false}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="禁用" type="radio" value='0' />
 						</KrField>




						<div className='meeting-device'><KrField
							label="设备情况"
							name='deviceIds'
							component="groupCheckbox"
                            defaultValue={deviceSpace}
                            onChange={this.deviceChange}
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

    if(!values.name){
      errors.name='请输入空间名称';
    }

    if(!values.floor){
      errors.floor='请输入所在楼层';
    }

    if(!values.area){
		errors.area='请输入面积'
	}

	if(values.area&&isNaN(values.area)){
		errors.area='面积为数字'
	}

    if(!values.capacity){
		errors.capacity='请输入可容纳人数'
	}

	if(values.capacity&&!zeroNum.test(values.capacity.toString().trim())){
		errors.capacity='可容纳人数为整数'
	}

		return errors
}
export default reduxForm({ form: 'NewAddMeeting',validate})(NewAddMeeting);
