import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Notify,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	Field,
	KrForm
} from 'kr-ui';
import './index.less';

export default class CreateMemberForm extends Component {
	

	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;
		this.getBasicData(this.detail.id);
		this.state={
			jobList:[],
			itemData:{}
		}
	}
	componentDidMount() {
	}

	onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	getBasicData=(memberId)=>{
		let url = this.props.params;
		let params = {
			communityId:url.communityId,
			companyId:url.companyId,
			memberId:memberId
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('getMemberBasicData', params)).then(function(response) {
			console.log(response);
			response[0].memberInfoVO.jobId= 11411;

			response[0].jobList.forEach((item)=>{
				item.value = item.id;
				item.label = item.jobName;
			})
			console.log('createMemberForm',response[0].memberInfoVO);
			Store.dispatch(initialize('createMemberForm', response[0].memberInfoVO));

			_this.setState({
				jobList:response[0].jobList,
				itemData:response[0].memberInfoVO
			})
			

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	communityChange=(mail)=>{
		console.log(mail);
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 		if (filter.test(mail)){
 			console.log('mail');
 			Store.dispatch(Actions.callAPI('membersByEmail', {email:mail})).then(function(response) {
				console.log(response);
				if(response == 1){
					console.log('1');

				}
				
				

			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
 		};
	}
	membersByForeignCode=(value)=>{
		if (value){
 			Store.dispatch(Actions.callAPI('membersByForeignCode', {foreignCode:value})).then(function(response) {
				console.log(response);
				if(response == 1){
					console.log('1');
				}
				
				

			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
 		};
	}



	

	render() {

		
		let {detail,handleSubmit} = this.props;
		let {itemData,jobList} = this.state;
		let images = `./images/all.png`;
		itemData.phone = '13314619606';
		console.log('detail',detail,itemData);

		

		return (
			<div className="edit-form">
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						<span className="person-name">{detail.name}</span>
						{detail.checkStatus?<span className="person-status">未验证</span>:<span className="person-status-not">已验证</span>}
						<span className="person-id">（员工UserID：{detail.id}）</span>

					</div>
					<KrField name="phone" grid={1/2} label="手机号" inline={false} component="labelText" value={itemData.phone} />
					<div className="split-lines"></div>
					<KrField name="communityId" grid={1/2} label="社区" component="searchCommunities" right={30} requiredValue={true}  errors={{requiredValue:'请选择社区'}} requireLabel={true}/>
					<KrField name="foreignCode" grid={1/2} label="会员卡号" component="input" left={30}onBlur={this.membersByForeignCode} requiredValue={true} errors={{requiredValue:'请填写会员卡号'}} requireLabel={true}/>
					<KrField name="companyId" grid={1/2} label="公司" component="searchCompany"  right={30} requiredValue={true} errors={{requiredValue:'请填选择公司'}} requireLabel={true}/>
					<KrField name="email" grid={1/2} label="邮箱:" component="input" left={30} pattern={/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/} onBlur={this.communityChange} requiredValue={true} errors={{requiredValue:'请填写邮箱',pattern:'请输入正确邮箱地址'}} requireLabel={true}/>
					<KrField name="name" grid={1/2}  label="姓名" component="input" right={30}  requireLabel={true} requiredValue={true} errors={{requiredValue:'请填写姓名'}}/>
					<KrField name="jobId" grid={1/2} label="职位" component="select" left={30} options={jobList}/>
					<Grid style={{margin:'20px 0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'234px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
								<ListGroupItem style={{width:'274px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
							</ListGroup>
						  </Row>
					</Grid>



							 </form>
			</div>
)
	}
}
CreateMemberForm = reduxForm({
	form: 'createMemberForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CreateMemberForm);

