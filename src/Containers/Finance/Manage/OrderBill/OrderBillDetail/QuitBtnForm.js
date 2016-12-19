import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	reduxForm,
	formValueSelector,
	initialize
} from 'redux-form';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
	ListItem,
	LabelText,
	Dialog,
	KrField,
	ButtonGroup
} from 'kr-ui';



class QuitBtnForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		initialValues: React.PropTypes.object,
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
       	 id:this.props.initialValues.id,
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
			initialValues
		} = this.props;

       let style={
       	 marginTop:-18
       }
       let heightStyle={
       	 width:'546',
       	 height:'72'
       }


		return (

			<div className='ui-quit-wrap' style={{marginLeft:35}}>
                 
					     <form onSubmit={handleSubmit(this.onSubmit)}>
 
						    <KrField name="id" type="hidden"/>
						     <KrField grid={1/2} label="可操作金额"  component="labelText" value={initialValues.fiMoney} inline={false} defaultValue="无"/>
                            <KrField label="金额（元）"  grid={1/2} right={41}  name="finaflowamount" component="input" type="text" requireLabel={true} style={{marginLeft:-10}}/>
                             <KrField label="上传附件" grid={1/2} name="fileids" style={{marginLeft:-5}} component="file"/>
                            <KrField type="date" grid={1/2} label="退款日期" right={42} name="operatedate" requireLabel={true} style={{marginLeft:-6,marginTop:5}}/>    
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








