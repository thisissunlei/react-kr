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
		console.log("values",values);
		
		let _this = this;
		let httpParam={
			memberId : _this.state.memberId ,
			outerCard : _this.state.detail.outerCode
		};
		Http.request('bind-member-code',{},httpParam).then(function(response) {
			
			State.openBindMemberDialog = false;
			Message.success('绑定成功');	
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
	

	changeMember=(values)=>{
		console.log("value==》",values);
		this.setState({
			memberId : values.id
		})
	}

	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:0,padding:"20px 20px"}} className="bind-member-form">
				<KrField 
					style={{width:290}}
					name="outerCode" 
					component="labelText" 
					label="社区名称 : " 
					value={this.state.detail.communityName} 
					inline={true} 
				/>

				<KrField 
					style={{width:290}}
					name="outerCode" 
					component="labelText" 
					label="卡外号 : " 
					value={this.state.detail.outerCode} 
					inline={true} 
				/>

				

				<KrField 
					name="member"
					component="searchMemeber"
					label="会员名-手机号："
					style={{width:"100%",marginTop:20}}
					onChange = {this.changeMember}
					inline={true}
					requireLabel={true}
				/>

				

				<Grid>
					<Row>
						<Col md={12} align="center" style={{marginTop:20}}>
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="绑定" type="submit" /></div>
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



