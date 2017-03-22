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
import {ShallowEqual,DateFormat} from 'kr/Utils';

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

		Store.dispatch(initialize('impowerEditMemberForm', this.detail));

	}
	componentWillReceiveProps(nextProps){
		
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
		}
	}
	componentDidMount(){
		var start = DateFormat(this.detail.beginDate,"yyyy-mm-dd hh:MM:ss");
		var end = DateFormat(this.detail.endDate,"yyyy-mm-dd hh:MM:ss");
		
		console.log("start",start,"end",end);
		this.setState({
			date:start,
			dateend : end
		})
	}

	onSubmit=(values)=>{
		let _this = this;
		var start = new Date(values.beginDate);
		start = start.getTime();
		var end = new Date(values.endDate);
		end = end.getTime();
		console.log("start",start,"end",end);
		if(start >end){
			Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
		}else{
			let submitParams={
				id : values.id,
				communityId : values.communityId,
				customerId : values.customerId,
				beginDate : _this.state.date,
				endDate : _this.state.dateend,
			}
			const {onSubmit} = this.props;
			onSubmit && onSubmit(submitParams);
			}
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onStartChange=(personel)=>{
		console.log("kaishi",personel)
		let firstDate = new Date(personel);
		let {date} = this.state;
		if (this.state.dateend) {
			let endDate = new Date(this.state.dateend);
			let start = firstDate.getTime();
			let end = endDate.getTime();
			if (start <= end) {
				this.setState({
					date: personel
				})
			} else {
				this.setState({
					date: personel
				})
				Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
			}
		} else {
			this.setState({
				date: personel
			})
		}


		

	}
	onEndChange=(personel)=>{
		let {dateend}= this.state;

		let secondDate = new Date(personel);
		let end = this.state.dateend;
		if (this.state.date) {
			let firstDate = new Date(this.state.date);
			let start = firstDate.getTime();
			let end = secondDate.getTime();
			if (start <= end) {
				this.setState({
					dateend: personel
				})
			} else {
				this.setState({
					dateend: personel
				})
				Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
			}
		} else {
			this.setState({
				dateend: personel
			})
		}
	}
	

	render() {
		let {detail,handleSubmit} = this.props;
		let {itemData,jobList} = this.state;
		return (
			<div className="edit-form" style={{paddingBottom:"3"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						<span>客户姓名：&nbsp;</span>
						<span className="person-name">{detail.customerName}</span>
					</div>

					<KrField name="communityId" grid={1} label="社区" component="searchCommunity" right={30} requiredValue={true} requireLabel={true} style={{padding:0}}/>
					
					<KrField name="beginDate" grid={1} label="授权开始时间" component="date" requiredValue={true}  requireLabel={true} onChange={this.onStartChange}/>

					<KrField name="endDate" grid={1} label="授权结束时间" component="date" requiredValue={true}  requireLabel={true} onChange={this.onEndChange}/>

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
	
	if (!values.customerId) {
		errors.customerId = '请输入客户名称';
	}
	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}
	if (!values.beginDate) {
		errors.beginDate = '请输入开始时间';
	}
	if (!values.endDate) {
		errors.endDate = '请输入结束时间';
	}
	
	return errors
}
ImpowerEditMemberForm = reduxForm({
	form: 'impowerEditMemberForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImpowerEditMemberForm);
