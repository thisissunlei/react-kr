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
      console.log("fields>>>,",fields);
     return (
        <ul style={{padding:0,margin:0}}>
      {fields.map((wherefloorsStr, index) => {
  
        return (
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
          );
      }
  
      )}
    </ul>
  
   )
  }
  

@observer
class lastCard extends React.Component {
    constructor(){
        super()
        this.state ={
        
        }
    }
    componentDidMount(){
        let {selectArr} = this.state;
   
    }
    onSubmit = (values)=>{
        console.log('onSb=ubmit',values)
    }
    onCancel=()=>{
        console.log('cancel--->')
    }
    
    render() {
      let {selectArr ,projects,used,showWarnOne} = this.state;
      const {handleSubmit} = this.props;

        return (
            <div className='community'>
                <form  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)} onClick={this.closemm} >
                <KrField grid={1/2} label="排序" name="orderNum" style={{width:'262px',marginLeft:15}} component="input" onChange={this.orderChange}></KrField>
				<KrField grid={1/2} label="开业时间" name="openDate" style={{width:'262px',marginLeft:32}} component="date" requireLabel={true}/>
                {State.isCorpRank&&<div style={{display:'block',color:'red',paddingLeft:'25px',paddingBottom:'10px'}}>该序号已存在</div>}
				<KrField grid={1/2} label="签约开始时间" name="signStartDate" style={{width:260,marginLeft:15}} component="date" requireLabel={true}/>
				<KrField grid={1/2} label="签约结束时间" name="signEndDate" style={{width:260,marginLeft:32}} component="date" requireLabel={true}/>
                <div className="krFlied-box"><KrField grid={1/2} label="工位总数" name="stationNum" style={{width:239,marginLeft:16,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">个</span></div>
				<div className="krFlied-box"><KrField grid={1/2} label="会议室总数" name="meetNum" style={{width:239,marginLeft:32,marginRight:3}} component="input" requireLabel={true}></KrField><span className="unit">间</span></div>

                    <FieldArray name="wherefloors" component={renderMembers}/>

                    <div style={{display:'inline-block'}} className='community-list-time'>
                        <KrField component="selectTime" label='营业时间'  style={{width:140,zIndex:5,marginLeft:16}} name='businessBegin'/>
                        <span style={{display:'inline-block',marginTop:35,marginLeft:-10}}>至</span>
						<KrField component="selectTime"  style={{width:140,zIndex:5,marginLeft:-1,marginTop:15}} name='businessEnd'/>
                    </div>

					<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:11}} component="input" requireLabel={true}/>

                    <Grid style={{marginTop:30}}>
                        <Row>
                        <Col md={12} align="center">
                            <ButtonGroup>
                            <div  className='list-btn-center'> <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/></div>
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
    // if(!values.needSyncCommunity){
    //     errors.needSyncCommunity='请选择关联项目';
    // }
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
    if (!values.openDate) {
        errors.openDate= '请输入开业时间';
      }

      if (!values.signStartDate) {
        errors.signStartDate= '请输入签约开始时间';
      }

      if (State.isCorpRank) {
        errors.orderNum= '  ';
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
      if(values.stationNum&&values.stationNum.toString().trim()&&!numberNotZero.test(values.stationNum.toString().trim())){
        errors.stationNum='请输入正整数';
     }
     if(values.meetNum&&values.meetNum.toString().trim()&&!numberNotZero.test(values.meetNum.toString().trim())){
        errors.meetNum='请输入正整数';
     }
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
    return errors
}
export default reduxForm({ form: 'lastCard',validate})(lastCard);