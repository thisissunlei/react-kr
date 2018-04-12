import React, {
	PropTypes
} from 'react';
import './index.less';
import {
	reduxForm,
	formValueSelector,
	initialize
} from 'redux-form';
import {
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message
} from 'kr-ui';
import {Http} from 'kr/Utils';


import State from './State';
import {
	observer
} from 'mobx-react';
@observer


class EditDetail extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		
		this.state = {
			detail:props.detail,
			memberId :''
		}
		
	}

	onSubmit=(values)=>{
		
		let _this = this;
		let {detail} = this.state;
		let httpParam={
			holder : detail.holder,
			cardId : detail.id 
		};
		Http.request('unbind-member-code',{},httpParam).then(function(response) {
			
			State.openUnBindMemberDialog = false;
			Message.success('解绑成功');	
			State.cardManageSearchParams = {
				page:1,
				pageSize: 15,
				type:'',
				value:'',
				date: new Date()
			}	

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	onCancel=()=>{
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	


	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let  {detail} = this.state;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:0,padding:"20px 20px"}} className="bind-member-form">

				<p style={{width:"100%",textAlign:"center",color:"#333"}}>确定要解除{detail.holderName}与卡：{detail.outerCode}的绑定关系吗？</p>
				<Grid>
					<Row>
						<Col md={12} align="center" style={{marginTop:20}}>
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}

const validate = values =>{
	
	const errors = {}

	if(!values.member){
		errors.member = '请选择会员';
	}
	return errors

}
const selector = formValueSelector('EditDetail');

export default reduxForm({
	form: 'EditDetail',validate
})(EditDetail);



