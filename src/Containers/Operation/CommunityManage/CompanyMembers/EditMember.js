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
	FieldControl,
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



	

	render() {

		
		let {detail} = this.props;
		let {itemData,jobList} = this.state;
		console.log('detail',detail,itemData);
		

		return (
			<div className="edit-form">
				<KrForm name="editForm" initialValues={itemData} onSubmit={this.onSubmit} >
					<div className="person-info">
						<span className="person-name">{detail.name}</span>
						<span className="person-status">未验证</span>
						<span className="person-id">（员工UserID：{detail.id}）</span>

					</div>
					<FieldControl name="phone" label="手机号" component="labelText" />
					<div></div>
					<FieldControl name="communityId" grid={1/2} label="社区" component="input" right={60} requiredValue={true}  errors={{requiredValue:'请选择社区'}} requireLabel={true}/>
					<FieldControl name="foreignCode" grid={1/2} label="会员卡号" component="input" requiredValue={true} errors={{requiredValue:'请填写会员卡号'}} requireLabel={true}/>
					<FieldControl name="companyId" grid={1/2} label="公司" component="input" right={60}  requiredValue={true} errors={{requiredValue:'请填选择公司'}} requireLabel={true}/>
					<FieldControl name="email" grid={1/2} label="邮箱:" component="input"  requiredValue={true} errors={{requiredValue:'请填写邮箱'}} requireLabel={true}/>
					<FieldControl name="name" grid={1/2}  label="姓名" component="input" requireLabel={true} requiredValue={true} errors={{requiredValue:'请填写姓名'}}/>
					<FieldControl name="jobId" grid={1/2} label="职位" component="select" right={60} options={jobList}/>
					<Grid style={{margin:'20px 0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'234px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
								<ListGroupItem style={{width:'274px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
							</ListGroup>
						  </Row>
					</Grid>



							 </KrForm>
			</div>
)
	}
}

