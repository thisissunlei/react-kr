
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
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
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
import {mobxForm}  from 'kr/Utils/MobxForm';

 class NewVisitorsToRecord extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			typeValue:'',
		}

	}

	componentDidMount(){

		// const {$form} = this.props;
		// $form.change('enable',"ENABLE");


	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}
	typeChange = (values) =>{
		State.typeValue=values.value;
		this.setState({
			typeValue : values.value
		})
	}

  //确定按钮
  onSubmit = (values) =>{
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
			const {$form} = this.props;
			$form.change('distinctId',value);
	}
	render(){
		const { handleSubmit,select} = this.props;
		const {typeValue} = this.state;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新增访客</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>



						<KrField grid={1/2} name="communityId" style={{width:262,marginLeft:28}} component='select'  label="社区" inline={false}
							requireLabel={true}
							options={select.communitys}
						/>
						<KrField grid={1/2}  name="typeId" style={{width:262,marginLeft:28}} component='select'  label="类型" inline={false}
							requireLabel={true}
							options={select.type}
							onChange = {this.typeChange}

						/>


						{/*面试*/}
						{typeValue == 50 &&<KrField grid={1/2} label="面试类别" name="interviewTypeId"  style={{width:262,marginLeft:28}} component="select"  requireLabel={false}
							options={select.interviewtype}
						/>}

						{/*参加活动*/}
						{typeValue == 51 &&<KrField grid={1/2} label="活动类型" name="activityTypeId"  style={{width:262,marginLeft:28}} component="select"  requireLabel={false}
							options={select.interviewtype}
						/>}

            			<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="姓名" inline={false}  placeholder='请输入姓名' requireLabel={true}/>
						<KrField grid={1/2}  name="tel" style={{width:262,marginLeft:28}} component='input'  label="联系方式" inline={false}  placeholder='请输入联系方式' requireLabel={true}/>

						{/*参观*/}
						{typeValue ==52 &&<KrField grid={1/2}  name="wechat" style={{width:262,marginLeft:28}} component='input'  label="微信" inline={false}  placeholder='请输入微信号' requireLabel={true}/>}

						{/*预约访客，官网预约*/}
						{(typeValue == 49 || typeValue == 732) &&<KrField grid={1/2}  name="num" style={{width:262,marginLeft:28}} component='input'  label="拜访人数" inline={false}  placeholder='请输入拜访人数' requireLabel={true}/>}
            			<KrField grid={1/2}  name="email" style={{width:262,marginLeft:28}} component='input'  label="邮箱" inline={false}  placeholder='请输入邮箱' requireLabel={true}/>

            			{/*参观*/}
  						{typeValue ==52 &&<KrField grid={1/2}  name="purposeId" style={{width:262,marginLeft:28}} component='select'  label="参观目的" inline={false}
							requireLabel={true}
							options={select.purpose}
						/>}

						{/*面试*/}
						{typeValue ==50 &&<KrField grid={1/2}  name="interviewRoundId" style={{width:262,marginLeft:28}} component='select'  label="面试轮次" inline={false}
							requireLabel={true}
							options={select.round}
						/>}
						<KrField grid={1/2}  name="vtime" style={{width:262,marginLeft:28}} component='date'  label="拜访日期" inline={false}  placeholder='请选择拜访时间' requireLabel={true}/>


						{/*预约访客，官网预约*/}
						{(typeValue == 49 || typeValue == 732) &&<KrField grid={1/2}  name="meetedMan" style={{width:262,marginLeft:28}} component='input'  label="被拜访人" inline={false}  placeholder='请输入被拜访人' requireLabel={true}/>}


						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="确定" type="submit"/></div>

										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

								</Col>
							</Row>
						</Grid>
				</form>
		);
	}
}
const validate = values =>{

	const errors = {};
	const phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[35847]\d{9})$)/;

	const email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	// console.log(State.typeValue,">>>>>>>>");
	const typeValue = State.typeValue;
	if(!values.communityId){
		errors.communityId = "社区不能为空"
	}
	if(!values.typeId){
		errors.typeId = "访客类型不能为空"
	}
	//面试相关
	if(typeValue == 50){
		if(!values.interviewTypeId){
			errors.interviewTypeId = "面试类型不能为空"
		}
		if(!values.interviewRoundId){
			errors.interviewRoundId = "面试轮次不能为空"
		}

	}

	//参加活动
	if(typeValue == 51){
		if(!values.activityTypeId){
			errors.activityTypeId = "活动类型不能为空"
		}
	}

	//参观相关
	if(typeValue ==52){
		if(!values.purposeId){
			errors.purposeId = "参观目的不能为空"
		}
		if(!values.wechat){
			errors.wechat = "微信号不能为空"
		}
	}
	//预约访客，官网预约
	if(typeValue == 49 || typeValue == 732){
		if(!values.num){
			errors.num = "拜访人数不能为空"
		}else if(isNaN(values.num)){
			errors.num = "拜访人数只能位正整数"
		}else if(values.num <= 0){
			errors.num = "拜访人数只能位正整数"
		}else if(values.num%1 != 0){
			errors.num = "拜访人数只能位正整数"
		}
		if(!values.meetedMan){
			errors.meetedMan = "被拜访人不能为空"
		}
	}

	if(!values.name){
		errors.name = "姓名不能为空"
	}
	if(!values.tel){
		errors.tel = "联系电话不能为空"
	}else if(!phone.test(values.tel)){
		errors.tel = "联系电话格式错误"
	}


	if(!values.email){
		errors.email = "邮箱不能为空"
	}else if(!email.test(values.email)){
		errors.email = "邮箱的格式不正确"
	}


	if(!values.vtime){
		errors.vtime = "拜访日期不能为空"
	}




	return errors;
}
export default mobxForm({ form: 'NewVisitorsToRecord',validate})(NewVisitorsToRecord);
