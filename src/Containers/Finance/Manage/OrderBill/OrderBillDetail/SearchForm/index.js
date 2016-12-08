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
	FieldControl,
	Form,
	ListGroup,
	ListGroupItem,
	ButtonGroup,
	KrForm,
} from 'kr-ui';
import './index.less';



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


            <div className='ui-search'>
				<KrForm name="SearchForm" onSubmit={this.onSubmit} initialValues={initialValues}>

					<FieldControl grid={1} name="orderId" type="hidden"/>
					<FieldControl grid={1} name="accountType" type="hidden"/>
					<FieldControl grid={1/2} name="accountId" right={26} component="select" label="代码" options={codeList}/>
					<FieldControl grid={1/2} name="propertyId" right={26} type="select" label="款项" options={typeList}/>

						<FieldControl grid={1/1}  component="group" label="日期" style={{marginTop:4}}>
							<ListGroup>
									<ListGroupItem>
											<FieldControl  name="startTime"  component="date" />
									</ListGroupItem>
									<ListGroupItem>
											<div style={{marginTop:10,paddingLeft:10}}> 至 </div>
									</ListGroupItem>
									<ListGroupItem>
											  <FieldControl  name="endTime"  component="date" />
									</ListGroupItem>
							</ListGroup>
					</FieldControl>

					<Grid style={{marginTop:8,marginBottom:5}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>


				</KrForm>
             </div>

			);
	}

}
