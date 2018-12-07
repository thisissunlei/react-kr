import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray,reset} from 'redux-form';
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

@observer
class cardTwo extends React.Component {
    constructor(){
        super()
        this.state ={
        
        }
    }
    componentDidMount(){
        let {selectArr} = this.state;
   
    }

    onSubmit=(values)=>{
        console.log('======',values)
        State.stepStatus = 3;
        State.cardTwoData = values;
    }
    onCancel=()=>{
        State.stepStatus = 1;
    }

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
      Store.dispatch(change('cardTwo','cityId',cityId));
      Store.dispatch(change('cardTwo','countyId',communityId));
    }
    //地图坐标
    locationMap=(value)=>{
      var xLocation=value.split(',')[1];
      var yLocation=value.split(',')[0];
      Store.dispatch(change('cardTwo','latitude',xLocation));
      Store.dispatch(change('cardTwo','longitude',yLocation));
    }

   
    render() {
      let {selectArr ,projects,used,showWarnOne} = this.state;
      const {handleSubmit} = this.props;
      console.log('step1--->',State.projects)
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


        return (
            <div className='community' style={{margin:0}}>
			    <form onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
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
                    <KrField grid={1/2} label="装修情况" name="decoration"  style={{width:262,marginLeft:21,zIndex:2}} component="select"
									  options={[{label:'毛坯',value:'ROUGHCAST'},{label:'简装',value:'PAPERBACK'},{label:'精装',value:'HARDCOVER'},{label:'豪装',value:'LUXURIOUS'}]}
									/>
					<div className='location-m'>
                        <KrField grid={1/2} label="社区坐标" component="input" name='local' style={{width:262,marginLeft:16}}  requireLabel={true}  onChange={this.locationMap}></KrField>
                        <a className='mapLocation' href={`http:\/\/api.map.baidu.com/lbsapi/getpoint/index.html`} target='_blank'/>
                        <KrField grid={1/2} label="大厦名称" name="buildName" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/>
                    </div>
                                    <KrField grid={1/2} label="所属区县" name="countyId"  style={{width:262,marginLeft:16,position:'relative',zIndex:5}} component="city" onSubmit={this.cityValue} requireLabel={true}/>
									<KrField grid={1/2} label="详细地址" name="address" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>
									
									
									<KrField  grid={1/2}  name="orientation" style={{width:262,marginLeft:16}} component='select'  label="社区朝向" inline={false}
                                      options={[{label:'东',value:'EAST'},{label:'南',value:'SOUTH'},{label:'西',value:'WEST'},{label:'北',value:'NORTH'},{label:'东南',value:'SOUTHEAST'},{label:'东北',value:'NORTHEAST'},{label:'西南',value:'SOUTHWEST'},{label:'西北',value:'NORTHWEST'}]}
									/>

									<div className="krFlied-box"><KrField grid={1/2} label="标准层高" name="floorHeight" style={{width:239,marginLeft:28,marginRight:3}} component="input" ></KrField><span className="unit">m</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="社区入口" name="entryNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">个</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="客梯数量" name="elevatorNum" style={{width:239,marginLeft:30,marginRight:3}} component="input" ></KrField><span className="unit">部</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="货梯数量" name="cargoNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">部</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="得房率" name="efficientRate" style={{width:239,marginLeft:30,marginRight:3}} component="input" ></KrField><span className="unit">%</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="绿化率" name="greenRate" style={{width:239,marginLeft:16,marginRight:3}} component="input" ></KrField><span className="unit">%</span></div>
                                    <div className="middle-round"></div>
                      <Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='list-btn-center'><Button  label="上一步" type="button" cancle={true} onTouchTap={this.onCancel}/></div>
										<Button  label="确定" type="submit"/>
									</ButtonGroup>
								</Col>
							</Row>
						</Grid>
                </form>
            </div>
        )
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


  // //楼层检验
  // if (!values.wherefloors || !values.wherefloors.length) {
  //   errors.wherefloors = { _error: 'At least one member must be entered' }
  // } else {
  //   const membersArrayErrors = []
  //   values.wherefloors.forEach((wherefloors, memberIndex) => {
  //     const memberErrors = {}
  //     if (!wherefloors || !wherefloors.floor||(wherefloors.floor&&regs.test(wherefloors.floor.toString().trim()))) {
  //       memberErrors.floor = '请输入所在楼层'
  //       membersArrayErrors[memberIndex] = memberErrors
  //     }
  //     if(wherefloors.floor&&wherefloors.floor.toString().trim()&&!zeroNum.test(wherefloors.floor.toString().trim())){
  //       memberErrors.floor = '楼层为整数'
  //       membersArrayErrors[memberIndex] = memberErrors
  //     }
  //     if (!wherefloors || !wherefloors.stationCount||(wherefloors.stationCount&&regs.test(wherefloors.stationCount.toString().trim()))) {
  //       memberErrors.stationCount = '请输入可出租工位数'
  //       membersArrayErrors[memberIndex] = memberErrors
  //     }
  //     if(wherefloors.stationCount&&wherefloors.stationCount.toString().trim()&&!noMinus.test(wherefloors.stationCount.toString().trim())){
  //       memberErrors.stationCount = '可出租工位数为非负整数'
  //       membersArrayErrors[memberIndex] = memberErrors
  //     }
  //   })
  //   if(membersArrayErrors.length) {
  //     errors.wherefloors = membersArrayErrors
  //   }
  // }



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
// if(values.stationNum&&values.stationNum.toString().trim()&&!numberNotZero.test(values.stationNum.toString().trim())){
//    errors.stationNum='请输入正整数';
// }
// if(values.meetNum&&values.meetNum.toString().trim()&&!numberNotZero.test(values.meetNum.toString().trim())){
//    errors.meetNum='请输入正整数';
// }

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

  // if (!values.openDate) {
  //   errors.openDate= '请输入开业时间';
  // }

  // if (!values.signStartDate) {
  //   errors.signStartDate= '请输入签约开始时间';
  // }

  // if (!values.signEndDate) {
  //   errors.signEndDate= '请输入签约结束时间';
  // }

  // if (!values.stationNum||(values.stationNum&&regs.test(values.stationNum.toString().trim()))) {
  //   errors.stationNum= '请输入工位总数';
  // }

  // if (!values.meetNum||(values.meetNum&&regs.test(values.meetNum.toString().trim()))) {
  //   errors.meetNum= '请输入会议室总数';
  // }

  // if(!values.contract||(values.contract&&regs.test(values.contract.toString().trim()))){
  //   errors.contract='请输入联系方式'
  // }

        /*
        else if(values.contract.toString().trim()&&!phone.test(values.contract.toString().trim())||!checkTel.test(values.contract.toString().trim())){
    errors.contract='联系方式错误'
  }
        */

    return errors
}
export default reduxForm({ form: 'cardTwo',validate})(cardTwo);