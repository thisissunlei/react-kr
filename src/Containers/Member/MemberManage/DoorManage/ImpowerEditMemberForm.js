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
	Message,
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
import {ShallowEqual} from 'kr/Utils';

export default class ImpowerEditMemberForm extends Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={
			status:true,
			jobList:[],
			itemData:{},
			initializeValues:{},
			open:'false',
			onsubmit:true,
			phoneSame:'true',
			onsubmitCode:true,
			code:'',
			email:'',
		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
		}
	}

	onSubmit=(values)=>{
		this.communityChange(values.email);
		if(values.foreignCode){
			this.membersByForeignCode(values.foreignCode);
		}
	 	let {onsubmit,onsubmitCode} = this.state;
	 	if(onsubmit && onsubmitCode){
	 		const {onSubmit} = this.props;
		 	onSubmit && onSubmit(values);
		}
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	getBasicData=(memberId)=>{
		let url = this.props.params;
		let params = {
			communityId:'',
			companyId:'',
			memberId:memberId.id || ''
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('getMemberBasicData', params)).then(function(response) {
			response.jobList.forEach((item)=>{
				item.value = item.id;
				item.label = item.jobName;
			})
			console.log("response.memberInfoVO",response.memberInfoVO);
			Store.dispatch(initialize('memeberEditMemberForm', response.memberInfoVO));

			_this.setState({
				jobList:response.jobList,
				itemData:response.memberInfoVO,
				phone:response.memberInfoVO.phone,
				code:response.memberInfoVO.foreignCode,
			})


		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	
	





	render() {
		let {detail,handleSubmit} = this.props;
		let {itemData,jobList} = this.state;
		let images = `./images/all.png`;
		console.log("detail",detail);
		return (
			<div className="edit-form" style={{paddingBottom:"3"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						<span>客户姓名：&nbsp;</span>
						<span className="person-name">{detail.name}</span>
					</div>

					<KrField name="communityId" grid={1} label="社区" component="searchCommunity" right={30} requiredValue={true} requireLabel={true}/>
					
					<KrField name="registerTime" grid={1} label="授权开始时间" component="date" right={30} requiredValue={true}  requireLabel={true}/>

					<KrField name="registerTime" grid={1} label="授权结束时间" component="date" right={30} requiredValue={true}  requireLabel={true}/>


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
	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}
	if (!values.registerTime) {
		errors.communityId = '授权开始时间';
	}
	
	return errors
}
ImpowerEditMemberForm = reduxForm({
	form: 'impowerEditMemberForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImpowerEditMemberForm);
