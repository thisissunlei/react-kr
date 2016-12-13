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

export default class CreateMemberForm extends Component {
	

	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;
		this.getBasicData(this.detail.id);
	}
	componentDidMount() {
		let {
			detail
		} = this.props;
		console.log('detail',detail);
		let initialValues = detail;
		Store.dispatch(initialize('editForm', initialValues));
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
		Store.dispatch(Actions.callAPI('getMemberBasicData', params)).then(function(response) {
			console.log(response);
			

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}



	

	render() {

		
		let {detail} = this.props;
		

		return (
			<div>
				<KrForm name="editForm" initialValues={detail} onSubmit={function(values){
									console.log('values',values);
							}} >
					<div>
						<span>{detail.name}</span>
						<span>未验证</span>
						<span>（员工UserID：{detail.id}）</span>

					</div>
					<FieldControl grid={1} name="phone" label="手机号" component="labelText" / >
					<FieldControl name="communityId" grid={1/2} label="社区" component="input" requiredValue={true} errors={{requiredValue:'请填写时间'}} requireLabel={true}/>
					<FieldControl name="foreignCode" grid={1/2} label="会员卡号" component="input" requiredValue={true} errors={{requiredValue:'请填写时间'}} requireLabel={true}/>
					<FieldControl name="companyId" grid={1/2} label="公司" component="input" requiredValue={true} errors={{requiredValue:'请填写时间'}} requireLabel={true}/>
					<FieldControl name="email" grid={1/2} label="邮箱:" component="input"  requiredValue={true} errors={{requiredValue:'必填'}} requireLabel={true}/>
					<FieldControl name="name" grid={1/2}  label="姓名" component="input" requireLabel={true}/>
					<FieldControl name="jobId" grid={1/2} label="职位" component="input"/>
					<Grid style={{margin:'20px 0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'274px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="button"  onTouchTap={this.onSubmit} width={90} height={34}/></ListGroupItem>
								<ListGroupItem style={{width:'274px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
							</ListGroup>
						  </Row>
					</Grid>



							 </KrForm>
			</div>
)
	}
}

