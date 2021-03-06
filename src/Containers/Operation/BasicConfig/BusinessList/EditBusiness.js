
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';


import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	DrawerTitle,
	Message
} from 'kr-ui';
import {mobxForm}  from 'kr/Utils/MobxForm';
import './index.less';
import {
	observer,
	inject
} from 'mobx-react';
// @inject("FormModel")
// @observer

 class EditBusiness extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			orderList:[],
			distinctId:'',
		}
	}

	componentDidMount(){
	 	 // Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));
		// const {$form} = this.props;
		// $form.change('enable',"ENABLE");
		// const {FormModel} = this.props;

		// FormModel.initialize('EditBusiness',{});

	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  //确定按钮
  onSubmit = (values) =>{
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
			const {$form} = this.props;
			$form.change('districtId',value);

	}
	render(){
		const { handleSubmit,cityName} = this.props;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
					<DrawerTitle title ='编辑商圈' onCancel = {this.onCancel}/>
				</div>


						<div style={{marginLeft:20}}>
						<KrField grid={1/2} name="no" style={{width:262,marginLeft:28}} component='input'  label="商圈代码" inline={false}  placeholder='请输入代码名称' requireLabel={true}/>
						<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="商圈名称" inline={false}  placeholder='请输入商圈名称' requireLabel={true}/>

						<KrField grid={1/2} label="区县" name="districtId"  style={{width:262,marginLeft:28}} component="city"  requireLabel={false} onSubmit={this.cityValue} cityName = {cityName} requireLabel={true}/>

						<KrField grid={1/2}  name="sort" style={{width:262,marginLeft:28}} component='input'  label="排序" inline={false}  placeholder='请输入客户名称' requireLabel={true}/>
						<KrField grid={1/2}  name="enable" style={{width:262,marginLeft:28}} component="group" label="启用状态" requireLabel={false}>
							 <KrField name="enable" label="启用" type="radio" value="ENABLE" />
							 <KrField name="enable" label="禁用" type="radio" value="DISENABLE" />
						</KrField>
						</div>
						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="确定" type="submit"/></div>

										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

								</Col>
							</Row>
						</Grid>
				</form>
		);
	}
}
const validate = values =>{
	const errors = {};
	const integer =  /^[0-9a-zA-Z]*$/;
	const num = /^[0-9]*[1-9][0-9]*$/;
	if(!values.sort){
		errors.sort = "排序不能为空";
	}else if(!num.test(values.sort)){
		errors.sort = "排序只能为正整数";
	}
	if(!values.no){
		errors.no = "商圈代码不可为空";
	}else if(values.no.length >20){
		errors.no = "商圈代码长度在20是字符以内";
	}else if(!integer.test(values.no)){
		errors.no = "商圈代码由字母与数字组成";
	}
	return errors;
}
export default mobxForm({ form: 'EditBusiness',validate})(EditBusiness);
