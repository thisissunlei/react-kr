
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
	Message
} from 'kr-ui';
import {reduxForm,Field}  from 'kr/Utils/ReduxForm';
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
		// console.log("44")

	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  //确定按钮
  onSubmit = (values) =>{
		console.log(values,"??????");
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
			const {$form} = this.props;
			$form.change('distinctId',value);
	}
	render(){
		const { handleSubmit,cityName} = this.props;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建商圈</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>

						

						<KrField grid={1/2} name="no" style={{width:262,marginLeft:28}} component='input'  label="商圈代码" inline={false}  placeholder='请输入代码名称' requireLabel={true}/>
						<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="商圈名称" inline={false}  placeholder='请输入商圈名称' requireLabel={true}/>

						<KrField grid={1/2} label="区县" name="distinctId"  style={{width:262,marginLeft:28}} component="city"  requireLabel={false} onSubmit={this.cityValue} cityName = {cityName}/>

						<KrField grid={1/2}  name="sort" style={{width:262,marginLeft:28}} component='input'  label="排序" inline={false}  placeholder='请输入客户名称' requireLabel={true}/>
						<KrField grid={1/2}  name="enable" style={{width:262,marginLeft:28}} component="group" label="启用状态" requireLabel={false}>
							 <KrField name="enable" label="是" type="radio" value="ENABLE" />
							 <KrField name="enable" label="否" type="radio" value="DISENABLE" />
						</KrField>

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

	return errors;
}
export default reduxForm({ form: 'EditBusiness',validate})(EditBusiness);
