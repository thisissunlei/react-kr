import React from 'react';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	initialize
} from 'redux-form';
import {
	Button,
	Grid,
	Row,
	Col,
	KrField,
	ButtonGroup
} from 'kr-ui';



class QuitBtnForm extends React.Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		fiMoney: React.PropTypes.number,
		initialValuesId:React.PropTypes.object,
	}

	constructor(props, context) {
		super(props, context);

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {

		}
	}

	componentDidMount() {
		let initialValues={
       	 id:this.props.initialValuesId.id,
       	 finaflowamount:'',
       	 operatedate:''
       }
		Store.dispatch(initialize('QuitBtnForm', initialValues));
	}


    onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);

	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }






	render() {


		const {
			error,
			handleSubmit,
			pristine,
			reset,
			fiMoney
		} = this.props;

       let style={
       	 marginTop:-13
       }
       let heightStyle={
       	 width:'546',
       	 height:'72',
       	 marginTop:'-2'
       }



		return (

			<div className='ui-quit-wrap' style={{marginLeft:35}}>

					     <form onSubmit={handleSubmit(this.onSubmit)}>

						    <KrField name="id" type="hidden"/>
						    <KrField grid={1/2} label="可操作金额"  component="labelText" value={fiMoney} inline={false} defaultValue="0"/>
                            <KrField label="金额（元）"  grid={1/2} right={41}  name="finaflowamount" component="input" type="text" requireLabel={true} style={{marginLeft:-10,marginTop:-2}}/>
                            <KrField type="date" grid={1/2} label="退款日期" right={42} name="operatedate" requireLabel={true} style={{marginTop:4,marginBottom:15}}/>
                            <KrField label="上传附件" grid={1/2} name="fileids" style={{marginLeft:-10,marginTop:2}} component="file" defaultValue={[]}/>
                            <KrField label="备注" style={style} name="finaflowdesc" component="textarea" heightStyle={heightStyle} placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>



						   <Grid style={{marginTop:0,marginBottom:5,marginLeft:-30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm/></div>
										<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
									</ButtonGroup>
								</Col>
							</Row>
						</Grid>


                         </form>
			   </div>

		);

	}

}

const validate = values => {

	const errors = {}


	if (!values.finaflowamount) {
		errors.finaflowamount = '请填写金额';
	}
	if (values.finaflowamount && isNaN(values.finaflowamount)) {
			errors.finaflowamount = '金额必须为数字';
		}
	if (!values.operatedate) {
		errors.operatedate = '请填写退款日期';
	}
	return errors
}
export default reduxForm({
	form: 'QuitBtnForm',
	validate,enableReinitialize:true,keepDirtyOnReinitialize:true
})(QuitBtnForm);
