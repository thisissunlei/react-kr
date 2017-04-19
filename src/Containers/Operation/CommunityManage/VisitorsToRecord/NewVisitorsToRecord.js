
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
import {reduxForm,Field}  from 'kr/Utils/ReduxForm';
import './index.less';

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
						<div><span className="new-icon"></span><label className="title-text">访客登录</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>



						<KrField grid={1/2} name="communityId" style={{width:262,marginLeft:28}} component='select'  label="社区" inline={false} 
							requireLabel={true}
							options={select.communitys}
						/>
						<KrField grid={1/2}  name="typeId" style={{width:262,marginLeft:28}} component='select'  label="类型" inline={false}  
							requireLabel={true}
							options={[{label:"全部",value:1},{label:"启用",value:"ENABLE"},{label:"禁用",value:"DISENABLE"}]}
							
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
							options={select.round}
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

	return errors;
}
export default reduxForm({ form: 'NewVisitorsToRecord',validate})(NewVisitorsToRecord);
