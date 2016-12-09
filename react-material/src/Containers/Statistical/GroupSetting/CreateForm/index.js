import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Section

} from 'kr-ui';

class CreateForm  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}
	static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
	 }

	componentDidMount(){

		const {detail}= this.props;

		let initialValues = {};
		 initialValues.id = detail.id;
		 initialValues.accountcode = detail.accountcode;
		 initialValues.accountname = detail.accountname;
		 initialValues.accounttype = detail.accounttype;
		 initialValues.enableflag  = detail.enableflag;
		 initialValues.ordernum = detail.ordernum;
		 initialValues.accountdesc = detail.accountdesc;


		Store.dispatch(initialize('newCreateForm',initialValues));
		Store.dispatch(change('newCreateForm','enableflag','ENABLE'));
	 }


	//取消按钮点击
	 onCancel(){
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }
	 //提交按钮点击
	 onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }



	render(){
		const { error, handleSubmit, pristine, reset} = this.props;

		return(

				<form onSubmit={handleSubmit(this.onSubmit)}>
					<Section title="模板组配置" description="" >

					<KrField name="id" type="hidden" label="id"/> 
					<KrField grid={1/2} name="accountcode" type="text" label="科目编码" requireLabel={true} disabled={true}/> 
					<KrField grid={1/2} name="accountname" type="text" label="科目名称" requireLabel={true}/> 
					<KrField grid={1/2} name="accounttype" type="select" label="科目类别" options={[ {value:'PAYMENT',label:'回款'}, {value:'INCOME',label:'收入'}, ]} requireLabel={true} />
					<KrField grid={1/2} name="ordernum" type="text" label="排序号" requireLabel={true}/> 
					<KrField grid={1/2} name="enableflag" component="group" label="是否启用" requireLabel={true}>
							<KrField name="enableflag" label="是" component="radio" type="radio" value="ENABLE"/>
							<KrField name="enableflag" label="否"  component="radio"  type="radio" value="DISENABLE" />
				  	</KrField> 

					<KrField name="accountdesc" component="textarea" label="描述"  /> 


					<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>

					</Section>
			</form>
		);
	}

}



export default reduxForm({ form: 'CreateForm', enableReinitialize:true, keepDirtyOnReinitialize:true })(CreateForm);







