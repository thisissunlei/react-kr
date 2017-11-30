import React from 'react';

import {
	reduxForm,
	initialize,
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	Message,
	Notify,
	Button,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';
import {ShallowEqual} from 'kr/Utils';

export default class MemeberEditMemberForm extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state={
			status:true,
			initializeValues:{},
			open:'false',
			onsubmit:true,
			phoneSame:'true',
			onsubmitCode:true,
			code:'',
			email:'',
			companyInfo:{},
		}
	}

	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData();
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
		}
	}

	onSubmit=(values)=>{
		//this.communityChange(values.email);
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
		
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	getBasicData=()=>{
		const {detail}=this.props;
		let url = this.props.params;
		
		let _this = this;
		Http.request('members-basic-date', {id:detail.uid}).then(function(response) {
			response.leader=String(response.leader);
			Store.dispatch(initialize('memeberEditMemberForm', response));

			_this.setState({
				phone:response.phone,
				companyInfo:{
					label:response.companyName,
					value:response.csrId,
					companyName:response.companyName,
					csrId:response.csrId,
				}
			})


		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	// communityChange=(mail)=>{
	// 	let params = {
	// 		email :mail
	// 	}
	// 	this.setState({
	// 	 open:true
	//  })
	// 	let {detail} = this.props;
	// 	let _this = this;

	// 	Http.request('isEmailRegistered',params).then(function(response){
	// 		 //邮箱已注册
	// 		 if(detail.phone == response.phone){
	// 			 _this.setState({
	// 					 onsubmit:true
	// 				 })
	// 			 return;
	// 		 }else{
	// 			 Message.warntimeout('该邮箱已被绑定','error');

	// 				 _this.setState({
	// 					 onsubmit:false
	// 				 })
	// 		 }


	// 	}).catch(function(err){
	// 	 //邮箱未注册
	// 	 _this.setState({
	// 		 onsubmit:true
	// 	 })
	// 	});
	// }
	membersByForeignCode=(codes)=>{
		let params = {
			code :codes
		}
		let _this = this;
		this.setState({
		 open:true
	 })
		let {detail} = this.props;
		if(params.code !== undefined){
			Http.request('membersByForeignCode',params).then(function(response){
				 //会员卡号已注册
				 if(detail.phone == response.phone){
					 _this.setState({
						 onsubmitCode:true
					 })
					 return;
				 }else if(response.phone !='-1' && response.id){
					 Message.warntimeout('会员卡号已注册','error');
					 _this.setState({
						 onsubmitCode:false
					 })
				 }else{
				 	Message.warntimeout(response.name,'error');
					 _this.setState({
						 onsubmitCode:false
					 })
				 }
			}).catch(function(err){
			 //会员卡号未注册
			 _this.setState({
				 onsubmitCode:true
			 })
			});
		}

	}





	render() {
		let {detail,handleSubmit} = this.props;
		let {companyInfo}=this.state;
		let images = `./images/all.png`;
		// itemData.phone = '13314619606';
		return (
			<div className="edit-form" style={{paddingBottom:"3"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						{/* <span className="person-name">{detail.name}</span>
						{detail.checkStatus?<span className="person-status-not">已验证</span>:<span className="person-status">未验证</span>} */}
						<span className="person-id">员工UserID：{detail.uid}</span>
					</div>
					<div className="split-lines"></div>
					<KrField name="phone" grid={1/2} label="手机号" inline={false} right={30}   requireLabel={true}/>
					<KrField name="communityId" grid={1/2} label="社区" component="searchCommunityAll" right={30}   requireLabel={true} inline={false}/>
					<KrField name="csrId" grid={1/2} label="公司" component="searchCompany" ValueInfo={companyInfo}  right={30} requiredValue={true} requireLabel={true}/>
					<KrField name="name" grid={1/2}  label="姓名" type="text" right={30}  requireLabel={true} requiredValue={true} />
					<KrField name="email" grid={1/2} label="邮箱:" type="text" right={30}  onBlur={this.communityChange} />
					<KrField name="job" grid={1/2} label="职位" right={30}  />
					<KrField grid={1/2} right={30} name="identityCard" type="text" label="身份证号" style={{width:'252px',marginRight:'30'}} />
					<KrField name="leader" component="group" label="Leader"  style={{width:252}} >
						<KrField name="leader" label="是" type="radio" value="1" />
						<KrField name="leader" label="否" type="radio" value='0' />
					</KrField>
					<Grid style={{margin:'20px 0',marginBottom:'0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'270px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
								<ListGroupItem style={{width:'240px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
							</ListGroup>
						  </Row>
					</Grid>
				</form>
			</div>
)
	}
}
const validate = values => {

	const errors = {}
	let code = /^\d{10}$/;
	let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
	let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;     
    if( values.identityCard && !reg.test(values.identityCard)){   
         errors.identityCard = '身份证输入不合法';   
    }

	if (!values.phone) {
		errors.phone = '请输入电话号码';
	}
	if (values.phone && !phone.test(values.phone) ) {
		errors.phone = '请输入正确电话号';
	}
	if (!values.csrId) {
		errors.csrId = '请输入公司名称';
	}

	if (!values.name || /^\s+$/.test(values.name)) {
		errors.name = '请输入姓名';
	}
	if (values.email &&!email.test(values.email) ) {
        errors.email = '请输入正确邮箱';
    }
  if (values.phone && !phone.test(values.phone) ) {
      errors.phone = '请输入正确电话号';
  }
  // if (values.foreignCode && !code.test(values.foreignCode) ) {
  //     errors.foreignCode = '会员卡号为10位纯数字';
  // }
  
    // if (!values.foreignCode) {
    //     errors.foreignCode = '请输入会员卡号';
    // }
	return errors
}
MemeberEditMemberForm = reduxForm({
	form: 'memeberEditMemberForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(MemeberEditMemberForm);
