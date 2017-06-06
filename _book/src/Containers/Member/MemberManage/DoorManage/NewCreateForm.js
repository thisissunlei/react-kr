import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Notify,
	Button,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import './index.less';

export default class NewCreateForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={
			firstDate:'',
			dateend: ''
		}
	}
	//首次加载，只执行一次
	componentWillMount() {

	}
	componentWillReceiveProps(nextProps){
		
	}

	onSubmit=(values)=>{
		var start = new Date(values.beginDate);
		start = start.getTime();
		var end = new Date(values.endDate);
		end = end.getTime();
		if(start>end){
			Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
		}else{
			const {onSubmit} = this.props;
			onSubmit && onSubmit(values);
		}
		
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onStartChange=(personel)=>{

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
		return (
			<div className="edit-form" style={{paddingBottom:"3"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					

					<KrField name="customerId"   grid={1}  label="客户名称" component="searchCompany" requireLabel={true} requiredValue={true}/>
					
					
					<KrField name="communityId" grid={1} label="社区" component="searchCommunity" requiredValue={true} requireLabel={true}/>
					
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
NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);
