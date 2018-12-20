import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
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
  DrawerTitle,
  Message,
  Dialog
} from 'kr-ui';
import './index.less';
import State from '../State';
import CommunityButton from './cardOne.js'
import LastCard from './lastCard.js'
import CardTwo from './cardTwo.js'


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
        <li key={index} style={{width:600,listStyle:'none'}}>
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


@observer
 class NewCommunityList extends React.Component{

	static PropTypes = {

	}

	constructor(props){
		super(props);
		this.state={
			cityId:'',
      communityName:'',
      codeName:'',
      // stepStatus:1,
		}
	}
  componentDidMount(){
      State.searchDataHere();
      Store.dispatch(change('NewCommunityList','portalShow','0'))
      Store.dispatch(change('NewCommunityList','wherefloors',[{}]));
  }
  componentWillReceiveProps(){
    if(State.createType){
      Store.dispatch(change('NewCommunityList','openDate', State.relatedInfo.openDate));
    }
  }

	onSubmit = (values) => {
    console.log('========',values)
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
     

     values.wherefloorsStr=JSON.stringify(values.wherefloors);
        //楼层结束

    delete values.wherefloors;
    
     let data = Object.assign(values,State.cardTwoData)
     console.log("cardtwo>>>>>>>>>>>>",values,State.cardTwoData)
     if(State.createType){
      data.openDate = DateFormat(data.openDate,"yyyy-mm-dd 00:00:00")
    }
    
         //图片结束
     State.newCommunitySubmit(data);
     values.wherefloors = JSON.parse(values.wherefloorsStr);
     
    }

	onCancel = () => {
    State.stepStatus = 1;
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

   //社区名称
   communityNameChange=(value)=>{
     if(value.toString().trim()==''){
       this.setState({
       communityName:'无'
     })
     }else{
       this.setState({
       communityName:value
     })
     }
     State.communityName(value.toString().trim(),'');
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

   	 State.communityCode(value.toString().trim(),'');
   }
    //所属区县
    cityValue=(communityId,cityId,city)=>{
      this.setState({
        cityId:cityId
      })
      Store.dispatch(change('NewCommunityList','cityId',cityId));
      Store.dispatch(change('NewCommunityList','countyId',communityId));
    }
    //地图坐标
    locationMap=(value)=>{
      var xLocation=value.split(',')[1];
      var yLocation=value.split(',')[0];
      Store.dispatch(change('NewCommunityList','latitude',xLocation));
      Store.dispatch(change('NewCommunityList','longitude',yLocation));
    }

   
    //排序
	 orderChange=(params)=>{
		   let cityId = State.cityId;
       let {communityId}=this.props;
       	if(!cityId){
					 Message.error('请先填写城市');
           return ;
				}
		   State.communityRank(params.toString().trim(),cityId,communityId);
   }
  
   preNext=()=>{
     State.stepStatus = 2
   }


	render(){

       let {communityName,codeName}=this.state;
       var nameStyle={}
       let stepStatus = State.stepStatus;
       if(State.isCorpName||State.isCorpCode||communityName=='无'||(codeName&&!communityName)){
        nameStyle={
           height:'105px'
        }
       }else{
        nameStyle={
           height:'auto'
        }
       }
       let openTime = DateFormat(toJS(State.detailData.openDate), "yyyy-mm-dd");


		const {handleSubmit} = this.props;
       console.log('===index',stepStatus)
		return (
           <div className="communityList-m" style={{paddingLeft:9}}>
              <div className="title">
                <DrawerTitle title ='新建社区' onCancel = {this.onCancel}/>
              </div>
              <div className="cheek">
                <div className="titleBar" style={stepStatus==1?{}:{display:'none'}}>
                  <span className="order-number">1</span>
                  <span className="wire"></span>
                  <label className="small-title">关联社区</label>
                </div>
                <div className="small-cheek"  style={stepStatus==1?{}:{display:'none'}}>
                      <CommunityButton></CommunityButton>
                </div>
                <div className="titleBar" style={stepStatus==2?{}:{display:'none'}}>
                  <span className="order-number">2</span>
                  <span className="wire"></span>
                  <label className="small-title">基本信息</label>
                </div>
                <div className="small-cheek"  style={stepStatus==2?{}:{display:'none'}}>
                  <CardTwo></CardTwo>
                </div>
              </div>
			<form  onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
				
				<div className="cheek">
            <div className="titleBar" style={stepStatus==3?{}:{display:'none'}}>
                <span className="order-number">3</span>
                <span className="wire"></span>
                <label className="small-title">运营信息</label>
            </div>
						<div className="small-cheek"  style={stepStatus==3?{}:{display:'none'}}>
                <KrField grid={1/2} label="排序" name="orderNum" style={{width:'262px',marginLeft:15}} component="input" onChange={this.orderChange}></KrField>
                <KrField grid={1/2} label="排序" name="orderNumss" style={{width:0,height:0,display:'none'}} component="input"></KrField>
                <KrField
                  grid={1 / 2}
                  label="开业时间"
                  style={{ width: 262, marginLeft: 28,display:State.createType?'inline-block':'none' }}
                  component="labelText"
                  inline={false}
                  value={openTime ? openTime : "无"}
                />
                <KrField grid={1/2} label="开业时间" name="openDate" style={{width:'262px',marginLeft:32,display:State.createType?'none':'inline-block'}} component="date" requireLabel={true}/>
                {State.isCorpRank&&<div style={{display:'block',color:'red',paddingLeft:'25px',paddingBottom:'10px'}}>该序号已存在</div>}
								<KrField grid={1/2} label="签约开始时间" name="signStartDate" style={{width:260,marginLeft:15}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="签约结束时间" name="signEndDate" style={{width:260,marginLeft:32}} component="date" requireLabel={true}/>
                                <div className="krFlied-box"><KrField grid={1/2} label="设计工位数" name="stationNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">个</span></div>
								<div className="krFlied-box"><KrField grid={1/2} label="会议室总数" name="meetNum" style={{width:239,marginLeft:32,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">间</span></div>

                                <FieldArray name="wherefloors" component={renderMembers}/>

                                <div style={{display:'inline-block'}} className='community-list-time'>
                                 <KrField component="selectTime" label='营业时间'  style={{width:140,zIndex:5,marginLeft:16}} name='businessBegin'/>
                                 <span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>至</span>
								                 <KrField component="selectTime"  style={{width:140,zIndex:5,marginLeft:-1,marginTop:15}} name='businessEnd'/>
                                </div>

								<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:11}} component="input" requireLabel={true}/>
						<div className="end-round" style={{left:'-42px'}}></div>
            <Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='list-btn-center'><Button  label="上一步" type="button" cancle={true} onTouchTap={this.preNext}/></div>
										<Button  label="确定" type="submit"/>
									</ButtonGroup>
								</Col>
							</Row>
						</Grid>
          </div>
				    </div>
						
				 </form>

        <Dialog
					title="提示信息"
					open={State.showLoading}
					contentStyle ={{ width: '400px',height:'200px'}}
					overflow="auto"
					>
                    <p>新建社区中，请勿关闭页面</p>	
										
				</Dialog>
         
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

     
     

     


      // if (!values.opened) {
      //   errors.opened= '请输入社区状态';
      // }

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
      if(State.isCorpRank){
        errors.orderNumss='   '
      }
      console.log('======',errors)

		return errors
	}
export default reduxForm({ form: 'NewCommunityList',validate})(NewCommunityList);
