import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat,Http} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	observer
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
  return (
      <ul style={{padding:0,margin:0}}>
       {fields.map((wherefloorsStr, index) =>
      <li key={index} style={{width:600,listStyle:'none'}}>
        <div className="krFlied-box">
        <KrField
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


@observer
 class EditCommunityList extends React.Component{

	constructor(props){
		super(props);
		this.state={
        codeName:'',
				communityName:''
		}
	}

	onSubmit = (values) => {
     var signStartDate=DateFormat(values.signStartDate,"yyyy-mm-dd hh:MM:ss");
     var signEndDate=DateFormat(values.signEndDate,"yyyy-mm-dd hh:MM:ss");
     if(signStartDate!=''&&signEndDate!=''&&signEndDate<signStartDate){
        Message.error('签约开始时间不能大于签约结束时间');
       return ;
     }
		 if(values.businessBegin!=''&&values.businessEnd!=''&&values.businessEnd<values.businessBegin){
			 Message.error('营业开始时间不能大于营业结束时间');
			return ;
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
     let {communityId}=this.props;
     if(!value.toString().trim()){
       this.setState({
       communityName:'无'
     })
     }else{
       this.setState({
       communityName:value
     })
     }
     State.communityName(value.toString().trim(),communityId);
   }



   //社区编码
   communityCodeChange=(value)=>{
    let {communityId}=this.props;
    this.setState({
      codeName:value
    })
     State.communityCode(value.toString().trim(),communityId);
   }


  	//所属区县
    cityValue=(communityId,cityId,city)=>{
      Store.dispatch(change('editCommunityList','countyId',communityId));
    }



    //地图坐标
    locationMap=(value)=>{
      var xLocation=value.split(',')[1];
      var yLocation=value.split(',')[0];
      Store.dispatch(change('editCommunityList','latitude',xLocation));
      Store.dispatch(change('editCommunityList','longitude',yLocation));
    }



			render(){


				let {codeName,communityName}=this.state;
				var nameStyle={}
				if(State.isCorpName||State.isCorpCode||communityName=='无'||(codeName&&!communityName)){
					nameStyle={
						height:'100px'
					}
				}else{
					nameStyle={
						height:'auto'
					}
				}


				const {handleSubmit,cityData,timeStart,timeEnd} = this.props;




				return (
					<div>
						<form className="communityList-m"  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
							<div className="title">
								<div><span className="new-icon list-icon"></span><label className="title-text">编辑社区</label></div>
								<div className="customer-close" onClick={this.onCancel}></div>
							</div>
							<div className="cheek">
								<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
								<div className="small-cheek">
									<KrField grid={1/2} type='hidden' name='latitude' component="input" style={{width:0}}/>
									<KrField grid={1/2} type='hidden' name='longitude' component="input" style={{width:0}}/>
									<div style={nameStyle}><div style={{height:'auto',display:'inline-block',float:'left'}}><KrField grid={1/2} label="社区名称" name="name" component="input" style={{width:262,marginLeft:15}}  requireLabel={true} onChange={this.communityNameChange}/>
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

						<KrField grid={1/2} label="所属区县" name="countyId"  style={{width:262,marginLeft:16,position:'relative',zIndex:5}} component="city" onSubmit={this.cityValue} requireLabel={true} cityName={cityData}/>

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

                <div style={{display:'inline-block'}} className='community-list-time'>
								<KrField component="selectTime" label='营业时间' style={{width:140,zIndex:5,marginLeft:16}} name='businessBegin' timeNum={timeStart}/>
								<span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>至</span>
								<KrField component="selectTime"  style={{width:140,zIndex:5,marginLeft:-1,marginTop:15}} name='businessEnd' timeNum={timeEnd}/>
                </div>

								<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:9}} component="input" requireLabel={true}/>
           
									<div className="end-round" style={{left:'-42px'}}></div>
								</div>


							</div>
							<Grid style={{marginTop:30}}>
								<Row>
									<Col md={12} align="center">
										<ButtonGroup>
											<div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
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

			 //空格
	 		let regs=/^\s*$/;


	       //楼层检验
	       if (!values.wherefloors || !values.wherefloors.length) {
	         errors.wherefloors = { _error: 'At least one member must be entered' }
	       } else {
	         const membersArrayErrors = []
	         values.wherefloors.forEach((wherefloors, memberIndex) => {
	           const memberErrors = {}
	           if (!wherefloors || !wherefloors.floor||(wherefloors.floor&&regs.test(wherefloors.floor.toString().trim()))) {
	             memberErrors.floor = '请输入所在楼层'
	             membersArrayErrors[memberIndex] = memberErrors
	           }
	           if(wherefloors.floor&&wherefloors.floor.toString().trim()&&!zeroNum.test(wherefloors.floor.toString().trim())){
	             memberErrors.floor = '楼层为整数'
	             membersArrayErrors[memberIndex] = memberErrors
	           }
	           if (!wherefloors || !wherefloors.stationCount||(wherefloors.stationCount&&regs.test(wherefloors.stationCount.toString().trim()))) {
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

	       if(!values.name||(values.name&&regs.test(values.name.toString().trim()))){
	         errors.name = '请填写社区名称';
	       }

	       if(!values.code||(values.code&&regs.test(values.code.toString().trim()))){
	         errors.code='请填写社区编码';
	       }

	       if(!values.local||(values.local&&regs.test(values.local.toString().trim()))){
	         errors.local='请输入社区坐标';
	       }

	       if(!values.area||(values.area&&regs.test(values.area.toString().trim()))){
	         errors.area='请输入社区面积';
	       }
	       if(values.area&&values.area.toString().trim()&&!numberNotZero.test(values.area.toString().trim())){
	         errors.area='请输入正整数';
	       }

	       if (!values.countyId) {
	         errors.countyId= '请填写所属区县';
	       }

	       if (!values.address||(values.address&&regs.test(values.address.toString().trim()))) {
	         errors.address= '请输入详细地址';
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

	       if (!values.stationNum||(values.stationNum&&regs.test(values.stationNum.toString().trim()))) {
	         errors.stationNum= '请输入工位总数';
	       }

	       if (!values.meetNum||(values.meetNum&&regs.test(values.meetNum.toString().trim()))) {
	         errors.meetNum= '请输入会议室总数';
	       }

	       if(!values.contract||(values.contract&&regs.test(values.contract.toString().trim()))){
	         errors.contract='请输入联系方式'
	       }

	 			/*
	 			else if(values.contract.toString().trim()&&!phone.test(values.contract.toString().trim())||!checkTel.test(values.contract.toString().trim())){
	         errors.contract='联系方式错误'
	       }
	 			*/
			return errors
		}
		export default reduxForm({ form: 'editCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(EditCommunityList);
