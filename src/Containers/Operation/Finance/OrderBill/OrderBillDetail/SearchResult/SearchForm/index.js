import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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
	Form
} from 'kr-ui';




export default class SearchForm extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          openSearch:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(forms){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(forms);
	}
	
	render(){
		let detail=this.props.detail;
		console.log('detail',detail)
		return(

				<Form name="SearchForm"  onSubmit={this.onSubmit} >
					
					<KrField grid={1} name="accountType" component="select" label="代码" /> 
					<KrField grid={1} name="operatedate" type="select" component="date" label="款项" />
					<KrField grid={1/2} name="startTime" component="date" label="开始日期" />
					<KrField grid={1/2} name="endTime" component="date" label="结束日期" />
					<Button  label="确定" type="submit" primary={true} /> 
					<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
				</Form>


			);
	}

}
