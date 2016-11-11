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
	Form,
	ButtonGroup,
} from 'kr-ui';




export default class SearchForm extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
        codeList:React.PropTypes.arr,
        typeList:React.PropTypes.arr,
        initialValues:React.PropTypes.object,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          
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
		
		
		let {typeList,codeList,initialValues}=this.props;

        

		return(

			    

				<Form name="SearchForm" onSubmit={this.onSubmit} initialValues={initialValues}>
					
					<KrField grid={1} name="orderId" type="hidden"/>
					<KrField grid={1} name="accountType" type="hidden"/>
					<KrField grid={1/2} name="accountId" component="select" label="代码" options={codeList}/> 
					<KrField grid={1/2} name="propertyId" type="select" label="款项" options={typeList}/>
					<KrField grid={1/2} name="startTime" component="date" label="开始日期" />
					<KrField grid={1/2} name="endTime" component="date" label="结束日期" />
					

						   <Grid style={{marginTop:20}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div> 
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>


				</Form>


			);
	}

}
