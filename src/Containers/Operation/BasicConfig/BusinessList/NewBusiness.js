
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message
} from 'kr-ui';
import {mobxForm}  from 'kr/Utils/MobxForm';
import './index.less';

 class NewBusiness extends Component{



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

		const {$form} = this.props;
		$form.change('enable',"ENABLE");


	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  //确定按钮
  onSubmit = (values) =>{
  	let {onSubmit} = this.props;
		console.log("kkkkk");

  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
		const {$form} = this.props;
		$form.change('districtId',value);
	}
	render(){
		const { handleSubmit} = this.props;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建商圈</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>


						<div style = {{marginLeft:20}}>
						<KrField grid={1/2} name="no" style={{width:262,marginLeft:28}} component='input'  label="商圈代码" inline={false}  placeholder='请输入代码名称' requireLabel={true}/>
						<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="商圈名称" inline={false}  placeholder='请输入商圈名称' requireLabel={true}/>

						<KrField grid={1/2} label="区县" name="districtId"  style={{width:262,marginLeft:28}} component="city"  requireLabel={false} onSubmit={this.cityValue} requireLabel={true}/>

						<KrField grid={1/2}  name="sort" style={{width:262,marginLeft:28}} component='input'  label="排序" inline={false}  placeholder='请输入客户名称' requireLabel={true}/>
						<KrField grid={1/2}  name="enable" style={{width:262,marginLeft:28}} component="group" label="启用状态" requireLabel={false}>
							 <KrField name="enable" label="是" type="radio" value="ENABLE" />
							 <KrField name="enable" label="否" type="radio" value="DISENABLE" />
						</KrField>
						</div>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' ><Button  label="确定" type="submit"/></div>

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
	const num = /^[0-9]*[1-9][0-9]*$/;
	const integer =  /^[0-9a-zA-Z]*$/;
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
export default mobxForm({ form: 'NewBusinessForm',validate})(NewBusiness);
