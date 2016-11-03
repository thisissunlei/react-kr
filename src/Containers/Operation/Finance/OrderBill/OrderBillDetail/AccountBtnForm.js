import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
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
	Form,
	Dialog,
	KrField,
	ButtonGroup,
} from 'kr-ui';




class AccountBtnForm extends Component{
    static contextTypes = {
	  params: React.PropTypes.object.isRequired
    }
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.object,
		initialValues:React.PropTypes.object,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          Addaccount:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	componentDidMount() {

    
      let initialValues={
       	 propid:this.props.initialValues.propid,
       	 preCode:'0',
       	 mainbillid:this.context.params.orderId,
       	 operatedate:'',
       	 finaflowamount:'',
       	 accountid:''
       }
	   Store.dispatch(initialize('AccountBtnForm',initialValues));
		
	}
	
	render(){
		const {optionList,error,handleSubmit,pristine,reset} = this.props;
		

		return(
				<form  onSubmit={handleSubmit(this.onSubmit)}>
					<KrField  name="propid" type="hidden"/>
					<KrField  name="mainbillid" type="hidden"/>
					<KrField grid={1} name="accountid" component="select" label="代码名称" options={optionList} requireLabel={true}/> 
					<KrField grid={1} name="operatedate" type="date" component="date" label="挂账日期" requireLabel={true}/> 
					<KrField name="preCode" component="group" label="金额正负" requireLabel={true}>
		                <KrField name="preCode" label="正" type="radio" value="0"/>
		                <KrField name="preCode" label="负" type="radio" value="1" />
		            </KrField> 
					
					<KrField grid={1} name="finaflowamount" type="text" component="input" label="金额（元）" requireLabel={true}/> 
					<KrField grid={1} name="finaflowdesc" type="text" component="input" label="备注" /> 
					<KrField grid={1} name="fileids" component="file" label="上传附件" />


					
					<Grid style={{marginTop:20}}>
						<Row>
							<Col md={12} align="right">
								<ButtonGroup>
									<Button  label="确定" type="submit" primary={true} /> 
									<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
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

		if(!values.accountid){
			errors.accountid = '请填写代码名称';
		}
		if(!values.operatedate){
			errors.operatedate = '请填写挂帐日期';
		}
		if(!values.finaflowamount){
			errors.finaflowamount = '请填写金额';
		}
		if (values.finaflowamount && isNaN(values.finaflowamount)) {
			errors.finaflowamount = '金额必须为数字';
		}	
	
		return errors
	}

export default reduxForm({
	form: 'AccountBtnForm',
	validate,enableReinitialize:true,keepDirtyOnReinitialize:true
})(AccountBtnForm);




