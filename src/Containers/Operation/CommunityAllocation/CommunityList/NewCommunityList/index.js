import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray,arrayPush} from 'redux-form';
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
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';
import State from '../State';


const renderField = ({ input, label, placeholder,type, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label||placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

//楼层增加与减少
const renderMembers = ({ fields, meta: { touched, error }}) => {

   return (
      <ul style={{padding:0,margin:0}}>
    {fields.map((item, index) => {

      return (
        <li key={index} style={{width:600}}>
       <div className="krFlied-box">
       <KrField
          style={{width:239,marginLeft:16,marginRight:3}}
          requireLabel={true}
          grid={1/2}
          name={`${item}.floor`}
          type="text"
          component={renderField}
          label="所在楼层"/>
          <span className="unit">层</span>
        </div>
        <div className="krFlied-box"><KrField
          style={{width:201,marginLeft:33,marginRight:3}}
          requireLabel={true}
          grid={1/2}
          name={`${item}.stationCount`}
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
        );
    }

    )}
  </ul>

 )
}

//社区亮点-亮点
const renderBrights = ({ fields, meta: { touched, error }}) => {
     var krStyle={};
      krStyle={
        width:228,
        marginLeft:18,
        marginRight:3,
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
          label={index?'':'社区亮点'}
          placeholder='社区亮点'
          />
        <span onClick={() => fields.insert(index+1,{type:'BRIGHTPOINTS'})} className='addBtn' style={index?{marginTop:17}:{marginTop:32}}></span>
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}

//社区亮点-基础服务
const renderBasic = ({ fields, meta: { touched, error }}) => {
  var krStyle={};
       krStyle={
        width:517,
        marginLeft:15
      }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((brightsStr, index) =>
      <li key={index} style={{width:600}}>
        <KrField
          style={krStyle}
          grid={1}
          name={`${brightsStr}.brightPoints`}
          heightStyle={{height:"78px",width:'508px'}}
          component="textarea"
          maxSize={100}
          label={index?'':'基础服务'}
          placeholder='请输入基础服务'
          />
        <span onClick={() => fields.insert(index+1,{type:'BASICSERVICE'})} className='addBtn' style={index?{marginTop:40}:{marginTop:53}}></span>
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}

//社区亮点-特色服务
const renderSpecial = ({ fields, meta: { touched, error }}) => {
  var krStyle={};
       krStyle={
        width:517,
        marginLeft:15
      }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((brightsStr, index) =>
      <li key={index} style={{width:600}}>
        <KrField
          style={krStyle}
          grid={1}
          name={`${brightsStr}.brightPoints`}
          heightStyle={{height:"78px",width:'508px'}}
          component="textarea"
          maxSize={100}
          label={index?'':'特色服务'}
          placeholder='请输入特色服务'
          />
         <span onClick={() => fields.insert(index+1,{type:'SPECIALSERVICE'})} className='addBtn' style={index?{marginTop:40}:{marginTop:53}}></span>
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>
 )
}

//社区亮点-基础设施
const renderService = ({ fields, meta: { touched, error }}) => {
  var krStyle={};
       krStyle={
        width:517,
        marginLeft:15
      }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((brightsStr, index) =>
      <li key={index} style={{width:600}}>
        <KrField
          style={krStyle}
           grid={1}
           name={`${brightsStr}.brightPoints`}
           heightStyle={{height:"78px",width:'508px'}}
           component="textarea"
           maxSize={100}
           label={index?'':'基础设施'}
           placeholder='请输入基础设施'
          />
        <span onClick={() => fields.insert(index+1,{type:'INFRASTRUCTURE'})} className='addBtn' style={index?{marginTop:40}:{marginTop:53}}></span>
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
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((porTypesStr, index) =>
       <li key={index} style={{width:600}}><KrField
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
 class NewCommunityList extends React.Component{

	static PropTypes = {

	}

	constructor(props){
		super(props);
		this.state={
			cityId:'',
			openDown:true,
      openUp:false,
      communityName:'',
      codeName:''
		}
	}
  componentDidMount(){
      State.searchDataHere();
      Store.dispatch(change('NewCommunityList','portalShow','0'))
      Store.dispatch(change('NewCommunityList','wherefloors',[{}]));
      Store.dispatch(change('NewCommunityList','bright_bright',[{type:'BRIGHTPOINTS'}]));
      Store.dispatch(change('NewCommunityList','porTypes',[{}]));
      Store.dispatch(change('NewCommunityList','bright_basic',[{type:'BASICSERVICE'}]));
      Store.dispatch(change('NewCommunityList','bright_service',[{type:'INFRASTRUCTURE'}]));
      Store.dispatch(change('NewCommunityList','bright_special',[{type:'SPECIALSERVICE'}]));
  }

	onSubmit = (values) => {
     var signStartDate=DateFormat(values.signStartDate,"yyyy-mm-dd hh:MM:ss");
     var signEndDate=DateFormat(values.signEndDate,"yyyy-mm-dd hh:MM:ss");
     if(signStartDate!=''&&signEndDate!=''&&signEndDate<signStartDate){
        Message.error('开始时间不能大于结束时间');
       return ;
     }

     var flagDesk=0;
     var flagOpen=0;
     var flagSpace=0;
     var twoNum=0;
     var oneNum=0;
     var porTypes=values.porTypes;
     var opend=values.opened;
     porTypes.map((item,index)=>{
       if(item.type=='MOBILE_DESK'){
         flagDesk++;
       }
       if(item.type=='OPEN_WORKSPACE'){
         flagOpen++;
       }
       if(item.type=='INDEPENDENT_WORKSPACE'){
         flagSpace++;
       }
     })
     if(flagDesk>=2||flagOpen>=2||flagSpace>=2){
       Message.error('工位类型不能重复');
       return ;
     }


     if(opend=='1'){
      if(porTypes.length<2){
        Message.error('至少选择两种工位类型');
        return ;
      }
      if(porTypes.length>=2){
        porTypes.map((item)=>{
          if(item.type&&item.price){
            twoNum++;
          }
          if((item.type&&!item.price)||(!item.type&&item.price)){
            oneNum++;
          }
        })
        if(twoNum<2){
          Message.error('至少填写两项完整的工位类型和价格');
          return ;
        }
        if(oneNum>0){
          Message.error('不能单写一项类型或价格');
          return ;
        }
       }
     }

		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

   //社区名称
   communityNameChange=(value)=>{
     if(value==''){
       this.setState({
       communityName:'无'
     })
     }else{
       this.setState({
       communityName:value
     })
     }
     State.communityName(value,'');
   }

   communityNameFocus=(value)=>{
      if(!value){
       this.setState({
       communityName:'无'
       })
      }
   }

   //社区编码
   communityCodeChange=(value)=>{
    let {codeName}=this.state;
    this.setState({
      codeName:value
    })

   	 State.communityCode(value,'');
   }

   //社区排序
    communityRankChange=(value)=>{
     let {cityId}=this.state;
     if(value){
        State.communityRank(value,cityId,'');
     }

   }


    //所属区县
    cityValue=(cityId,communityId,city)=>{
      this.setState({
        cityId:cityId
      })
      Store.dispatch(change('NewCommunityList','cityId',cityId));
      Store.dispatch(change('NewCommunityList','countyId',communityId));
    }



	componentWillReceiveProps(nextProps) {
	}

    //地图坐标
    locationMap=(value)=>{
      var xLocation=value.split(',')[0];
      var yLocation=value.split(',')[1];
      Store.dispatch(change('NewCommunityList','latitude',xLocation));
      Store.dispatch(change('NewCommunityList','longitude',yLocation));
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





       let {communityName,codeName}=this.state;
       var nameStyle={}
       if(State.isCorpName||State.isCorpCode||communityName=='无'||(codeName&&!communityName)){
        nameStyle={
           height:'105px'
        }
       }else{
        nameStyle={
           height:'auto'
        }
       }




    let {openDown,openUp}=this.state;

		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
           <div>
			<form className="m-newMerchants communityList-m" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
				<div className="title">
						<div><span className="new-icon list-icon"></span><label className="title-text">新建社区</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">
                                    <KrField grid={1/2} type='hidden' name='latitude' component="input" style={{width:0}}/>
                                    <KrField grid={1/2} type='hidden' name='cityId' component="input" style={{width:0}}/>
                                    <KrField grid={1/2} type='hidden' name='longitude' component="input" style={{width:0}}/>
									                  <div style={nameStyle}><div style={{height:'auto',display:'inline-block',float:'left'}}><KrField grid={1/2} label="社区名称" name="name" component="input" style={{width:262,marginLeft:15}}  requireLabel={true} onChange={this.communityNameChange} onBlur={this.communityNameFocus}/>
                                      {State.isCorpName && <div style={{fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该社区名称已存在</div>}
                                    </div>
                                    <div style={{height:'auto',display:'inline-block',float:'left'}}><KrField grid={1/2} label="社区编码" name="code" style={{width:262,marginLeft:28}} component="input" requireLabel={true} onChange={this.communityCodeChange}/>

                                     {State.isCorpCode && <div style={{fontSize:14,color:"red",paddingLeft:40,paddingBottom:7}}>该社区编码已存在</div>}
                                    </div>
                                    </div>
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

                                 <KrField component="selectTime" label='营业时间' inputStyle={{width:110}} style={{width:140,zIndex:5,marginLeft:16}} name='businessBegin'/>
                                 <span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>至</span>
								                 <KrField component="selectTime" inputStyle={{width:110}} style={{width:140,zIndex:5,marginLeft:-1,marginTop:15}} name='businessEnd'/>


								<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:11}} component="input" requireLabel={true}/>

                                <FieldArray name="bright_bright" component={renderBrights}/>

                                {openDown&&<div><div className='commmunity-open'><div className='open-inner' onClick={this.flagOpen}><span className='list-text'>展开</span><span className='list-pic'></span></div></div>
                                <div className="end-round two-round"></div></div>}

						        {openUp&&<div><div className='commmunity-down'><div className='open-inner' onClick={this.flagDown}><span className='list-text'>收起</span><span className='list-pic'></span></div></div><div className="middle-round"></div></div>}

						</div>


                      <div style={{display:openUp?'block':'none'}}>
						<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							 <KrField grid={1/2} label="排序" name="orderNum" component="input" style={{width:262,marginLeft:15}} onChange={this.communityRankChange}/>
							 <KrField grid={1/2} label="官网显示状态" name="portalShow" style={{width:262,marginLeft:28,marginRight:13}} component="group" requireLabel={true}>
					              <KrField name="portalShow" label="显示" type="radio" value='1' style={{marginTop:5,display:'inline-block',width:84}}/>
					             	<KrField name="portalShow" label="不显示" type="radio" value='0'  style={{marginTop:5,display:'inline-block',width:84}}/>
					         </KrField>
                {State.isCorpRank && <div style={{fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该序号已存在</div>}

                    <FieldArray name="porTypes" component={renderStation}/>

                  <div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" name="description" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="textarea"  maxSize={200} placeholder='请输入社区简介' lengthClass='list-length-textarea'/></div>
						     <FieldArray name="bright_basic" component={renderService}/>
                 <FieldArray name="bright_service" component={renderBasic} />
                 <FieldArray name="bright_special" component={renderSpecial}/>
						     <KrField grid={1} label="交通" name="brightPorts.brightPoints"  heightStyle={{height:"78px",width:'530px'}}  component="textarea"  maxSize={100} placeholder='请输入交通' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
						     <KrField grid={1} label="周边" name="brightRound.brightPoints" heightStyle={{height:"78px",width:'530px'}}  component="textarea"  maxSize={100} placeholder='请输入周边' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
						   <div style={{marginTop:'-16px'}}>
                 <span className='upload-pic-first'>上传首页图片</span>
                 <KrField name="photosStr_first"
    								component="uploadImageList"
    								style={{marginTop:10,textAlign:'left'}}
                    imgFlag={true}
					         />
               </div>

               <div style={{marginTop:'16px'}}>
                 <span className='upload-pic-first'>上传社区列表页图片</span>
                 <KrField name="photosStr_list"
                    component="uploadImageList"
                    style={{marginTop:10,textAlign:'left'}}
                    imgFlag={true}
                   />
               </div>


               <div style={{marginTop:'16px'}}>
                 <span className='upload-pic-first'>上传详情页图片</span>
                 <KrField name="photosStr_detail"
                    component="uploadImageList"
                    style={{marginTop:10,textAlign:'left'}}
                    imgFlag={false}
                    innerBoxStyle={{width:254,height:70}}
                    innerStyle={{left:110,top:12}}
                   />
               </div>

						</div>
						<div className="end-round"></div>
                     </div>


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
		let stationN = /^([1-9][0-9]{0,2})$/;
    let stationNP=/^([0-9][0-9]{0,4})$/;
    //正整数
		let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
    //非负整数
    let noMinus=/^(0|[1-9]\d*)$/;
		//整数
		let zeroNum=/^-?\d+$/;　
    //坐标
    var reg =/^[-\+]?\d+(\.\d+)\,[-\+]?\d+(\.\d+)$/;


      //楼层检验
      if (!values.wherefloors || !values.wherefloors.length) {
        errors.wherefloors = { _error: 'At least one member must be entered' }
      } else {
        const membersArrayErrors = []
        values.wherefloors.forEach((wherefloors, memberIndex) => {
          const memberErrors = {}
          if (!wherefloors || !wherefloors.floor) {
            memberErrors.floor = '请输入所在楼层'
            membersArrayErrors[memberIndex] = memberErrors
          }
          if(wherefloors.floor&&wherefloors.floor.toString().trim()&&!zeroNum.test(wherefloors.floor.toString().trim())){
            memberErrors.floor = '楼层为整数'
            membersArrayErrors[memberIndex] = memberErrors
          }
          if (!wherefloors || !wherefloors.stationCount) {
            memberErrors.stationCount = '请输入可出租工位数'
            membersArrayErrors[memberIndex] = memberErrors
          }
          if(wherefloors.stationCount&&wherefloors.stationCount.toString().trim()&&!noMinus.test(wherefloors.stationCount.toString().trim())){
            memberErrors.stationCount = '可出租工位数为非负整数'
            membersArrayErrors[memberIndex] = memberErrors
          }
        })
        if(membersArrayErrors.length) {
          errors.wherefloors = membersArrayErrors
        }
      }


          //工位校验
       if (!values.porTypes || !values.porTypes.length) {
          errors.porTypes = { _error: 'At least one member must be entered' }
        } else {
          const membersArrayErrors = []
          values.porTypes.forEach((porTypes, memberIndex) => {
            const memberErrors = {}
            if (porTypes.price&&porTypes.price.toString().trim()&&!stationNP.test(porTypes.price.toString().trim())) {
              memberErrors.price = '价格不超过五位整数'
              membersArrayErrors[memberIndex] = memberErrors
            }
          })
        if(membersArrayErrors.length) {
          errors.porTypes = membersArrayErrors
        }
      }


    if(values.floorHeight&&isNaN(values.floorHeight)){
       errors.floorHeight='请输入数字';
    }
    if(values.entryNum&&values.entryNum.toString().trim()&&!numberNotZero.test(values.entryNum.toString().trim())){
       errors.entryNum='请输入正整数';
    }
    if(values.elevatorNum&&values.elevatorNum.toString().trim()&&!numberNotZero.test(values.elevatorNum.toString().trim())){
       errors.elevatorNum='请输入正整数';
    }
    if(values.cargoNum&&values.cargoNum.toString().trim()&&!numberNotZero.test(values.cargoNum.toString().trim())){
       errors.cargoNum='请输入正整数';
    }
    if(values.efficientRate&&isNaN(values.efficientRate)){
       errors.efficientRate='请输入数字';
    }
    if(values.greenRate&&isNaN(values.greenRate)){
       errors.greenRate='请输入数字';
    }
    if(values.stationNum&&values.stationNum.toString().trim()&&!numberNotZero.test(values.stationNum.toString().trim())){
       errors.stationNum='请输入正整数';
    }
    if(values.meetNum&&values.meetNum.toString().trim()&&!numberNotZero.test(values.meetNum.toString().trim())){
       errors.meetNum='请输入正整数';
    }

    if(values.local&&values.local.toString().trim()&&!reg.test(values.local.toString().trim())){
      errors.local='请填写正确的坐标格式';
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
      if(values.area&&values.area.toString().trim()&&!numberNotZero.test(values.area.toString().trim())){
        errors.area='请输入正整数';
      }

      if (!values.countyId) {
        errors.countyId= '请填写所属区县';
      }

      if (!values.address) {
        errors.address= '请输入详细地址';
      }

       //排序
    if(values.orderNum&&isNaN(values.orderNum)){
      errors.orderNum='请输入数字';
    }
    if(values.orderNum&&values.orderNum.length>3){
      errors.orderNum = '最多输入3个字符';
    }
    if(values.orderNum&&values.orderNum.toString().trim()&&!stationN.test(values.orderNum.toString().trim())){
      errors.orderNum = '请输入3位以内正整数,不能以0开头';
    }


			values.opened = String(values.opened);
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

      if(!values.contract){
        errors.contract='请输入联系方式'
      }
			/*
			else if(values.contract.toString().trim()&&!phone.test(values.contract.toString().trim())||!checkTel.test(values.contract.toString().trim())){
        errors.contract='联系方式错误'
      }
			*/

		return errors
	}
export default reduxForm({ form: 'NewCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCommunityList);