import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


class NewActivation extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			communityList: [],
			mainbilltypeList: []
		}

	}
	componentDidMount() {

		var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataCommunityAndMainBillType')).then(function(response) {

			const communityList = response.communityList
			const mainbilltypeList = response.mainbilltypeList



			communityList.map(function(item, index) {
				item.label = item.communityname;
				item.value = item.id
				return item;
			});

			mainbilltypeList.map(function(item, index) {
				item.label = item.mainBillTypeDesc;
				item.value = item.mainbilltype;
				return item;
			});

			_this.setState({
				communityList,
				mainbilltypeList
			});

		}).catch(function(err) {
			Notify.show([{
				message: '报错了',
				type: 'danger',
			}]);
		});


	}
	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
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

		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>

				<KrField  right={27}  left={42} right={42} name="foreignCode" type="text" label="会员卡号"/>
				<KrField  right={27}  left={42} right={42} name="interCode" type="text" label="会员卡内码"/>
				<Grid style={{marginTop:10,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
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
		var foreignCode=values.foreignCode;
		console.log( "foreignCode",foreignCode,Object.prototype.toString.call(foreignCode));
		const errors = {}

		if(!values.foreignCode){
			errors.foreignCode = '请输入会员卡号';
		}
		if(foreignCode&&foreignCode.length!=10){
			errors.foreignCode = '请输入10位会员卡号';
		}
		if (isNaN(+foreignCode) ) {
			errors.foreignCode = '卡号由十位数字的卡号组成';

		}
		if (!values.interCode) {
			errors.interCode = '请输入会员卡内码';
		}
		return errors
	}
const selector = formValueSelector('NewActivation');



export default reduxForm({
	form: 'NewActivation',validate
})(NewActivation);
