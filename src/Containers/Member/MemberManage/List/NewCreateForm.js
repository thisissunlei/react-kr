
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
} from 'kr-ui';


 class NewCreateForm extends Component{
     static contextTypes = {
   		params: React.PropTypes.object.isRequired
   	}

   	static DefaultPropTypes = {
   		initialValues: {
   			customerName: '',
   			communityName: '',
   			lessorAddress: '',
   			payTypeList: [],
   			paymentList: [],
   			fnaCorporationList: [],
   		}
   	}
	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
    this.onChangeSearchCommunity = this.onChangeSearchCommunity.bind(this);
		this.state={
			communityText:''
		}

		Store.dispatch(reset('newCreateForm'));
		Store.dispatch(change('newCreateForm','enableflag','ENABLE'));

	}

	 onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;

		 onCancel && onCancel();

	 }

   onChangeSearchCommunity(community) {
		 console.log('community',community);

 	// 	Store.dispatch(change('creatNewMember', 'communityText', community.communityText));
 	// 	Store.dispatch(change('creatNewMember', 'lessorContactName', personel.lastname));
 	}


	render(){

		const { error, handleSubmit, pristine, reset} = this.props;
		let communityText = 'easda';

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2} name="phone" type="text" label="手机号" requireLabel={true} style={{display:'block'}}
				   requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>



				<KrField grid={1/2} name="communityid" component="searchCommunity" label="社区" onChange={this.onChangeSearchPersonel} requireLabel={true}
			               requiredValue={true} errors={{requiredValue:'社区为必填项'}}/>


        <KrField grid={1/2} name="email" type="text" label="邮箱" requireLabel={true}
				   requiredValue={true} pattern={/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/} errors={{requiredValue:'邮箱为必填项',pattern:'请输入正确邮箱地址'}}/>
        <KrField grid={1/2} name="communityid" component="searchPersonel" label="公司" onChange={this.onChangeSearchPersonel} requireLabel={true}
              requiredValue={true} errors={{requiredValue:'公司为必填项'}}/>
        {/*<KrField name="wherefloor" left={60}  grid={1/2} component="select" label="职位"
          options={optionValues.floorList} multi={true} requireLabel={true}/>*/}
				<KrField grid={1/2} name="ordernum" type="text" label="姓名" requireLabel={true}
           requiredValue={true} errors={{requiredValue:'姓名为必填项'}}/>
				<KrField grid={1/2} name="enableflag" component="group" label="发送验证短信" requireLabel={true}>
						<KrField name="enableflag" grid={1/2} label="是" type="radio" value="ENABLE"/>
						<KrField name="enableflag" grid={1/2} label="否" type="radio" value="DISENABLE" />
              </KrField>
        <KrField grid={1/2} name="accountname" type="text" label="会员卡号" />
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
							<Button  label="取消" type="button"  cancle={true}  onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>

		  </form>
		);
	}
}
export default reduxForm({ form: 'newCreateForm', enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);
const selector = formValueSelector('creatNewMember');

NewCreateForm = reduxForm({
	form: 'creatNewMember',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);
// export default connect((state) => {
//
// 	let changeValues = {};
//
// 	changeValues.lessorId = selector(state, 'lessorId');
// 	changeValues.leaseId = selector(state, 'leaseId');
// 	changeValues.stationnum = selector(state, 'stationnum') || 0;
// 	changeValues.boardroomnum = selector(state, 'boardroomnum') || 0;
// 	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
// 	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
// 	changeValues.wherefloor = selector(state, 'wherefloor') || 0;
//
// 	return {
// 		changeValues
// 	}
//
// })(NewCreateForm);
