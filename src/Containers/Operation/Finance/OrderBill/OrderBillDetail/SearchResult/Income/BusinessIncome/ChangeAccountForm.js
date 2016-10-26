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
} from 'kr-ui';




export default class ChangeAccountForm extends Component{

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
	
	render(){
		const {optionList,initialValues} = this.props;
		

		return(
				<Form name="jyayayoinForm"  onSubmit={this.onSubmit} initialValues={initialValues}>
					
					<KrField grid={1} name="accountid" component="select" label="代码名称" options={optionList}/> 
					<KrField grid={1} name="operatedate" type="date" component="date" label="付款日期" /> 
					<KrField name="preCode" component="group" label="金额正负">
		                <KrField name="preCode" label="正" type="radio" value="0"/>
		                <KrField name="preCode" label="负" type="radio" value="1" />
		            </KrField> 
					
					<KrField grid={1} name="finaflowamount" type="text" component="input" label="金额（元）" /> 
					<KrField grid={1} name="finaflowdesc" type="text" component="input" label="备注" /> 
					<KrField grid={1} name="fileids" component="file" label="上传附件" />
					<Button  label="确定" type="submit" primary={true} /> 
					<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
				</Form>

			);
	}

}







