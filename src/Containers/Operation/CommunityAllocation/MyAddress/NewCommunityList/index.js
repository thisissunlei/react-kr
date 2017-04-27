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
	Message,
  Tabs,
  Tab,
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
    cityValue=(communityId,cityId,city)=>{
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

		return (
      <div className="new-my-address">
        <Tabs className="new-my-address-tabs" inkBarStyle={{background:"#499df1",top:0}} initialSelectedIndex={-1} tabTemplateStyle={{color:"#333"}} style={{width:100}}>
          <Tab label="基本信息"></Tab>
          <Tab label="社区指南"></Tab>
        </Tabs>
      </div>
		);
	}
}
const validate = values =>{

		const errors = {};


      // if(!values.area){
      //   errors.area='请输入社区面积';
      // }

		return errors
	}
export default reduxForm({ form: 'NewCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCommunityList);
